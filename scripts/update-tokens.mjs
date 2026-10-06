/**
 * Updates the design files from phalcon/assets: public/css/tokens.css (from
 * phalcon/css/tokens.css) and src/code-theme.json (from
 * phalcon/css/code-theme.json). The CI workflow runs it before the tests and
 * the build. It does not commit: the committed copies are the default.
 *
 *   node scripts/update-tokens.mjs             download the files from assets.phalcon.io
 *   node scripts/update-tokens.mjs --from DIR  read DIR/tokens.css and DIR/code-theme.json instead
 *
 * A file that cannot be read, or that has a problem (see tokensProblems and
 * codeThemeProblems in src/lib/), keeps its committed copy and prints a GitHub
 * Actions warning. Each file is checked alone. The exit code is 0 also then.
 */
import { readFileSync, writeFileSync } from 'node:fs';

import { codeThemeProblems, definedCodeRoles } from '../src/lib/code-theme.mjs';
import { tokensProblems } from '../src/lib/tokens.mjs';
import { usedBySite } from './token-sources.mjs';

const SOURCE = 'https://assets.phalcon.io/phalcon/css';

const FILES = [
    {
        copy: 'public/css/tokens.css',
        name: 'tokens.css',
        problems: (text) => tokensProblems(text, usedBySite()),
    },
    {
        copy: 'src/code-theme.json',
        name: 'code-theme.json',
        problems: (text) => codeThemeProblems(text, definedCodeRoles(readFileSync('public/css/newdesign.css', 'utf8'))),
    },
];

const args = process.argv.slice(2);
const from = args.includes('--from') ? args[args.indexOf('--from') + 1] : null;

/** The new file, as { text } or { problem }. */
async function load(name) {
    try {
        if (from) {
            return { text: readFileSync(`${from}/${name}`, 'utf8') };
        }

        const response = await fetch(`${SOURCE}/${name}`, { signal: AbortSignal.timeout(30000) });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return { text: await response.text() };
    } catch (error) {
        return { problem: `cannot read the file: ${error.message}` };
    }
}

for (const { copy, name, problems: check } of FILES) {
    const loaded = await load(name);
    const problems = loaded.problem ? [loaded.problem] : check(loaded.text);

    if (problems.length > 0) {
        problems.forEach((problem) => console.log(`::warning title=Design tokens::${name}: ${problem}`));
        console.log(`kept          ${copy}`);
    } else if (readFileSync(copy, 'utf8') === loaded.text) {
        console.log(`same          ${copy}`);
    } else {
        writeFileSync(copy, loaded.text);
        console.log(`changed       ${copy}`);
    }
}
