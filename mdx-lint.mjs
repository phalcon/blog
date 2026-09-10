/* Compiles every post with the MDX parser and reports the failures. */
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import { readFileSync, readdirSync } from 'node:fs';

const dir = process.argv[2] ?? 'src/content/posts';
const files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
const failures = [];

for (const file of files) {
    const source = readFileSync(`${dir}/${file}`, 'utf8');
    try {
        await compile(source, { remarkPlugins: [remarkFrontmatter, remarkGfm] });
    } catch (error) {
        failures.push({
            file,
            line: error.line ?? error.place?.start?.line,
            column: error.column ?? error.place?.start?.column,
            reason: error.reason ?? error.message,
        });
    }
}

console.log(`checked ${files.length} files, ${failures.length} fail`);
console.log('');
for (const f of failures) {
    console.log(`${f.file}:${f.line ?? '?'}:${f.column ?? '?'}  ${f.reason}`);
}
