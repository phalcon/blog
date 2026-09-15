/*
 * Gives every post the same front matter: the keys in one order, and the tags
 * as an alphabetical list.
 *
 *   node scripts/normalize-frontmatter.mjs [directory]
 *
 * Key order: title, date, image (only when the post has one), tags.
 *
 * The values of title, date and image are copied from the source exactly as
 * they are, quotes included. Only the tags are rebuilt: they are trimmed,
 * sorted without regard to case, and written as a list with two spaces of
 * indentation. A tag gets quotes only when YAML needs them, so "0.3" keeps
 * its quotes (it would become a number) and "3.4.x" loses them.
 *
 * After each rewrite the script parses its own output and compares the values
 * with the original. It stops at the first difference.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const YAML = createRequire('/app/package.json')('yaml');

const KEYS = ['title', 'date', 'image', 'tags'];

/* Tags that name a product keep the product's own spelling. */
const TAG_SPELLING = new Map([['mysql', 'MySQL']]);

/** Splits a post into its front matter text and the rest of the file. */
const split = (text) => {
    if (!text.startsWith('---\n')) {
        throw new Error('the file does not start with front matter');
    }

    const end = text.indexOf('\n---', 3);

    if (end === -1) {
        throw new Error('the front matter has no end marker');
    }

    return { body: text.slice(end + 1), front: text.slice(4, end + 1) };
};

/** The source text of each single-line key, with its leading space. */
const rawValues = (front) => {
    const raw = new Map();

    for (const line of front.split('\n')) {
        const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):(.*)$/);

        if (!match) {
            continue;
        }

        if (!KEYS.includes(match[1])) {
            throw new Error(`unexpected key: ${match[1]}`);
        }

        raw.set(match[1], match[2]);
    }

    return raw;
};

/** The tags, trimmed, spelled as the product spells them, and sorted. */
const cleanTags = (tags) =>
    tags
        .map((tag) => String(tag).trim())
        .map((tag) => TAG_SPELLING.get(tag.toLowerCase()) ?? tag)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b));

/** The same values, with the tags compared without regard to case. */
const same = (before, after) =>
    before.title === after.title &&
    String(before.date) === String(after.date) &&
    before.image === after.image &&
    before.tags.length === after.tags.length &&
    before.tags
        .map((tag) => String(tag).trim().toLowerCase())
        .sort()
        .join('|') ===
        after.tags
            .map((tag) => tag.toLowerCase())
            .sort()
            .join('|');

const dir = process.argv[2] ?? 'src/content/posts';
const files = readdirSync(dir, { recursive: true }).filter((f) => f.endsWith('.mdx'));
let changed = 0;

for (const file of files) {
    const path = `${dir}/${file}`;
    const text = readFileSync(path, 'utf8');
    const { body, front } = split(text);
    const data = YAML.parse(front);
    const raw = rawValues(front);
    const tags = cleanTags(data.tags ?? []);

    const lines = KEYS.filter((key) => key !== 'tags' && raw.has(key)).map(
        (key) => `${key}:${raw.get(key)}`
    );
    const rebuilt = `---\n${lines.join('\n')}\n${YAML.stringify({ tags }).trimEnd()}\n${body}`;

    const check = YAML.parse(split(rebuilt).front);

    if (!same(data, check)) {
        throw new Error(`${path}: the values changed, nothing written`);
    }

    if (rebuilt !== text) {
        writeFileSync(path, rebuilt);
        changed++;
    }
}

console.log(`checked ${files.length} posts, ${changed} rewritten`);
