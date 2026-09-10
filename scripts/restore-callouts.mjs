/**
 * Restores the alert callouts that the Jekyll-to-MDX conversion deleted.
 *
 * A Jekyll post marked an alert box with a kramdown attribute list attached
 * to the block right above it:
 *
 *   > **NOTE**: Linux packages will be available in a couple of hours
 *   {: .alert .alert-danger }
 *
 * `convert-posts.mjs` used to delete the directive line and leave the block
 * as plain markdown, so the text survived but the styling did not. This
 * script reads the untouched Jekyll source to learn where each callout goes
 * and which class it takes, then edits the already-converted MDX files in
 * place to wrap that block in `<Callout>`.
 *
 * Run once, by hand, against files `convert-posts.mjs` already produced.
 * Running `convert-posts.mjs` again is a separate, later step and is not
 * this script's job. Running this script itself more than once is safe: a
 * block already wrapped in `<Callout>` is left alone.
 *
 *   node scripts/restore-callouts.mjs [sourceDir] [targetDir]
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIRECTIVE = /^\s*\{:\s*\.alert\s+\.alert-(\w+)\s*\}\s*$/;
const AUTOLINK = /<(https?:\/\/[^>\s]+)>/g;

/**
 * Finds every alert directive in one Jekyll post, together with the lines
 * of the block each one decorates.
 *
 * @param {string} source the raw Jekyll post
 */
export function findCallouts(source) {
    const lines = source.split('\n');
    const callouts = [];

    for (let i = 0; i < lines.length; i += 1) {
        const match = DIRECTIVE.exec(lines[i]);

        if (match === null) {
            continue;
        }

        const block = [];
        let j = i - 1;

        while (j >= 0 && lines[j].trim() !== '') {
            block.unshift(lines[j]);
            j -= 1;
        }

        callouts.push({ line: i + 1, type: match[1], block });
    }

    return callouts;
}

/** Strips one leading blockquote marker; a plain-paragraph line is unchanged. */
function stripQuote(line) {
    return line.startsWith('> ') ? line.slice(2) : line;
}

/*
 * A separate MDX repair rewrote bare autolinks, because MDX would otherwise
 * parse `<https://...>` as JSX. Apply the same transform so the source text
 * matches the MDX, and ignore trailing whitespace, which differs on a few
 * lines between the two files. Leading whitespace is never trimmed: it is
 * meaningful for blockquote and indented-paragraph blocks.
 */
function normalize(line) {
    return line.replace(AUTOLINK, '[$1]($1)').replace(/[ \t]+$/, '');
}

/** Finds every start index in `lines` where `block` occurs, ignoring the differences `normalize` accounts for. */
function findBlock(lines, block) {
    const needle = block.map(normalize);
    const positions = [];

    for (let i = 0; i <= lines.length - needle.length; i += 1) {
        let matches = true;

        for (let k = 0; k < needle.length; k += 1) {
            if (normalize(lines[i + k]) !== needle[k]) {
                matches = false;
                break;
            }
        }

        if (matches) {
            positions.push(i);
        }
    }

    return positions;
}

/** True when `pos` sits right inside an existing `<Callout>...</Callout>` of `length` lines. */
function alreadyWrapped(lines, pos, length) {
    const before = lines[pos - 1]?.trim() ?? '';
    const after = lines[pos + length]?.trim() ?? '';

    return before.startsWith('<Callout') && after === '</Callout>';
}

function main() {
    const sourceDir = process.argv[2] ?? '../_posts';
    const targetDir = process.argv[3] ?? 'src/content/posts';

    const files = readdirSync(sourceDir).filter((file) => file.endsWith('.md'));
    let seen = 0;
    let already = 0;
    let restored = 0;

    for (const file of files) {
        const source = readFileSync(join(sourceDir, file), 'utf8');
        const callouts = findCallouts(source);

        if (callouts.length === 0) {
            continue;
        }

        const targetPath = join(targetDir, file.replace(/\.md$/, '.mdx'));
        const lines = readFileSync(targetPath, 'utf8').split('\n');
        let changed = false;

        for (const callout of callouts) {
            seen += 1;

            const text = callout.block.map((line) => normalize(stripQuote(line)));
            const done = findBlock(lines, [`<Callout type="${callout.type}">`, ...text, '</Callout>']);

            if (done.length >= 1) {
                already += 1;
                continue;
            }

            const positions = findBlock(lines, callout.block).filter(
                (pos) => !alreadyWrapped(lines, pos, callout.block.length),
            );

            if (positions.length !== 1) {
                const found = positions.length === 0 ? 'not found' : `found ${positions.length} times`;

                console.log(
                    `${file}:${callout.line}: ${found}, looked for: ${JSON.stringify(callout.block.join('\n'))}`,
                );
                continue;
            }

            const [start] = positions;
            const replacement = [`<Callout type="${callout.type}">`, ...text, '</Callout>'];

            lines.splice(start, callout.block.length, ...replacement);
            changed = true;
            restored += 1;
        }

        if (changed) {
            writeFileSync(targetPath, lines.join('\n'), 'utf8');
        }
    }

    console.log(`already restored: ${already}`);
    console.log(`newly restored: ${restored}`);
    console.log(`total: ${already + restored} of ${seen}`);
}

if (process.argv[1]?.endsWith('restore-callouts.mjs')) {
    main();
}
