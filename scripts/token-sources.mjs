/**
 * The design tokens that the blog's source uses. The source tests and
 * scripts/update-tokens.mjs use it: a tokens file must define all of them.
 */
import { readdirSync, readFileSync } from 'node:fs';

import { usedTokens } from '../src/lib/tokens.mjs';

const root = new URL('../', import.meta.url);

/**
 * The source files that can use a token or type a color: the stylesheets in
 * public/css/, and the components, layouts, pages and modules in src/. Tests,
 * posts and the tokens file are not sources.
 *
 * @returns {string[]} paths relative to the repository root, sorted
 */
export function sourceFiles() {
    const css = readdirSync(new URL('public/css/', root))
        .filter((file) => file.endsWith('.css') && file !== 'tokens.css')
        .map((file) => `public/css/${file}`);
    const src = readdirSync(new URL('src/', root), { recursive: true })
        .filter((file) => /\.(astro|css|mjs|ts)$/.test(file))
        .filter((file) => !file.endsWith('.test.mjs') && !file.startsWith('content/'))
        .map((file) => `src/${file}`);

    return [...css, ...src].sort();
}

/**
 * Every --ph- token that a source file uses in var().
 *
 * @returns {Set<string>}
 */
export function usedBySite() {
    return new Set(sourceFiles().flatMap((file) => [...usedTokens(readFileSync(new URL(file, root), 'utf8'))]));
}
