import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { definedTokens, missingTokens, resolveToken, tokensProblems, usedTokens } from './tokens.mjs';

const css = `/* A comment: --ph-fake: #000000; var(--ph-ghost) */
:root {
    --ph-night-950: #070d0c;
    --ph-dark-bg: var(--ph-night-950);
    --ph-loop-a: var(--ph-loop-b);
    --ph-loop-b: var(--ph-loop-a);
}
`;

test('definedTokens lists the --ph- names that the rule defines', () => {
    assert.deepEqual([...definedTokens(css)].sort(), ['--ph-dark-bg', '--ph-loop-a', '--ph-loop-b', '--ph-night-950']);
});

test('definedTokens ignores names in a comment', () => {
    assert.ok(!definedTokens(css).has('--ph-fake'));
});

test('usedTokens finds var() references, also with spaces and a fallback', () => {
    const text = 'a { color: var(--ph-one); background: var( --ph-two , red); }';

    assert.deepEqual([...usedTokens(text)].sort(), ['--ph-one', '--ph-two']);
});

test('usedTokens ignores references in a comment', () => {
    assert.deepEqual([...usedTokens(css)].sort(), ['--ph-loop-a', '--ph-loop-b', '--ph-night-950']);
});

test('missingTokens lists the used names that are not defined, sorted', () => {
    assert.deepEqual(missingTokens(css, ['--ph-zeta', '--ph-dark-bg', '--ph-alpha']), ['--ph-alpha', '--ph-zeta']);
});

test('resolveToken follows var() references to the value', () => {
    assert.equal(resolveToken(css, '--ph-dark-bg'), '#070d0c');
    assert.equal(resolveToken(css, '--ph-night-950'), '#070d0c');
});

test('resolveToken returns null for an unknown name and for a loop', () => {
    assert.equal(resolveToken(css, '--ph-nope'), null);
    assert.equal(resolveToken(css, '--ph-loop-a'), null);
});

test('tokensProblems accepts a file that defines every used token', () => {
    assert.deepEqual(tokensProblems(css, ['--ph-dark-bg']), []);
});

test('tokensProblems names each used token that is missing', () => {
    assert.deepEqual(tokensProblems(css, ['--ph-dark-bg', '--ph-light-bg']), ['--ph-light-bg is missing']);
});

test('tokensProblems names a reference that the file does not define', () => {
    const file = ':root { --ph-dark-bg: var(--ph-night-951); --ph-light-bg: #f7faf8; }';

    assert.deepEqual(tokensProblems(file, ['--ph-light-bg']), ['--ph-night-951 is missing']);
});

test('tokensProblems names each used token that has no value', () => {
    assert.deepEqual(tokensProblems(css, ['--ph-dark-bg', '--ph-loop-a']), ['--ph-loop-a has no value']);
});

test('tokensProblems rejects a file that is not a tokens file', () => {
    const page = '<!DOCTYPE html><html><body>Not found</body></html>';

    assert.deepEqual(tokensProblems(page, ['--ph-dark-bg']), ['the file has no :root rule']);
    assert.deepEqual(tokensProblems('', ['--ph-dark-bg']), ['the file has no :root rule']);
});

test('the committed copy is a tokens file: its backgrounds and syntax colors have a value', () => {
    // Only the shape: the values change in phalcon/assets, and the deploy must accept a new palette.
    const copy = readFileSync(new URL('../../public/css/tokens.css', import.meta.url), 'utf8');

    for (const name of ['--ph-dark-bg', '--ph-light-bg', '--ph-dark-syntax-keyword']) {
        assert.notEqual(resolveToken(copy, name), null, name);
    }
});
