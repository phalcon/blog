import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { codeThemeProblems, definedCodeRoles } from './design-checks.mjs';

// The checks are tested in phalcon/assets (tests/design-checks.test.mjs). Here: the blog's own files.

const css = readFileSync(new URL('../../public/css/site.css', import.meta.url), 'utf8');
const copy = readFileSync(new URL('../code-theme.json', import.meta.url), 'utf8');

/** The --code- declarations of the first rule with this exact selector. */
const block = (selector) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? '';
};

test('the committed copy is a code theme that the blog can use', () => {
    // Only the shape: the rules change in phalcon/assets, and the deploy must accept them.
    assert.deepEqual(codeThemeProblems(copy, definedCodeRoles(css)), []);
});

test('site.css maps every --code- variable of the theme to the syntax token of each tone', () => {
    const roles = new Set([...copy.matchAll(/var\(--code-([a-z0-9-]+)\)/g)].map((match) => match[1]));

    for (const [selector, tone] of [['.astro-code', 'light'], ['html.dark .astro-code', 'dark']]) {
        const declarations = block(selector);

        for (const role of roles) {
            const token = role === 'bg' ? `--ph-${tone}-code-bg` : `--ph-${tone}-syntax-${role}`;

            assert.match(declarations, new RegExp(`--code-${role}:\\s*var\\(${token}\\);`), `${selector} --code-${role}`);
        }
    }
});
