/**
 * Converts the Jekyll posts to MDX.
 *
 * Run once. The output is committed. The script stays so the conversion can be
 * repeated if a rule turns out to be wrong.
 *
 *   node scripts/convert-posts.mjs [sourceDir] [targetDir]
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
const DATE_FROM_NAME = /^(\d{4})-(\d{2})-(\d{2})-/;
/*
 * A kramdown attribute list that marks an alert box: the lines right above
 * it are the block it decorates, and the class name after `.alert-` is the
 * callout type (danger, info, notice, warning).
 */
const ALERT_DIRECTIVE = /^((?:[ \t]*\S.*\n)+)[ \t]*\{:[ \t]*\.alert[ \t]+\.alert-(\w+)[ \t]*\}[ \t]*\n/gm;

/**
 * Applies every conversion rule to one file and returns the new text.
 *
 * @param {string} source   the raw Jekyll post
 * @param {string} filename used for the date fallback
 */
export function convertPost(source, filename) {
    const parsed = FRONTMATTER.exec(source);

    if (parsed === null) {
        throw new Error(`${filename}: no frontmatter found`);
    }

    const [, rawFrontmatter, rawBody] = parsed;

    return `---\n${frontmatter(rawFrontmatter, filename)}\n---\n${body(rawBody)}`;
}

/** Drops `layout:` and adds `date:` when the post does not carry one. */
function frontmatter(block, filename) {
    const lines = block
        .split('\n')
        .filter((line) => !/^layout:\s/.test(line))
        /* `image:` with no value parses as null, which the schema's optional
           string rejects. One post writes it that way; it means "no image". */
        .filter((line) => !/^image:\s*$/.test(line));

    if (!lines.some((line) => /^date:\s/.test(line))) {
        const match = DATE_FROM_NAME.exec(basename(filename));

        if (match === null) {
            throw new Error(`${filename}: no date in the frontmatter and none in the file name`);
        }

        const [, year, month, day] = match;

        lines.push(`date: ${year}-${month}-${day}T00:00:00.000Z`);
    }

    return lines.join('\n');
}

/**
 * Body rules:
 *
 * 1. A kramdown attribute list that marks an alert becomes a `<Callout>`
 *    wrapped around the block it used to decorate. Kramdown rendered that
 *    block as `<blockquote class="alert alert-TYPE">`; `<Callout type="TYPE">`
 *    renders the same markup, so no post needs its own import.
 * 2. Liquid `raw` tags go. MDX needs no escaping inside a code fence, which is
 *    the only place these appear.
 * 3. The excerpt marker goes. MDX 3 rejects HTML comments, and the excerpt is
 *    now the first paragraph.
 * 4. ```pho is a typo for ```php in one post.
 */
function body(text) {
    return text
        .replace(ALERT_DIRECTIVE, (_match, block, type) => {
            const inner = block
                .replace(/\n$/, '')
                .split('\n')
                .map((line) => (line.startsWith('> ') ? line.slice(2) : line))
                .join('\n');

            return `<Callout type="${type}">\n${inner}\n</Callout>\n`;
        })
        .replace(/^[ \t]*\{%-?\s*(end)?raw\s*-?%\}[ \t]*\n/gm, '')
        .replace(/\{%-?\s*(end)?raw\s*-?%\}/g, '')
        .replace(/^[ \t]*<!--\s*more\s*-->[ \t]*\n\n?/gm, '')
        .replace(/<!--\s*more\s*-->/g, '')
        .replace(/^```pho$/gm, '```php');
}

function main() {
    const sourceDir = process.argv[2] ?? '../_posts';
    const targetDir = process.argv[3] ?? 'src/content/posts';

    mkdirSync(targetDir, { recursive: true });

    const files = readdirSync(sourceDir).filter((file) => file.endsWith('.md'));
    let written = 0;

    for (const file of files) {
        const source = readFileSync(join(sourceDir, file), 'utf8');
        const target = file.replace(/\.md$/, '.mdx');

        writeFileSync(join(targetDir, target), convertPost(source, file), 'utf8');
        written += 1;
    }

    console.log(`converted ${written} of ${files.length} posts into ${targetDir}`);
}

if (process.argv[1]?.endsWith('convert-posts.mjs')) {
    main();
}
