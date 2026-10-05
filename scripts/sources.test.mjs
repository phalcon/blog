import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { missingTokens } from '../src/lib/tokens.mjs';
import { sourceFiles, usedBySite } from './token-sources.mjs';

const root = new URL('../', import.meta.url);

test('the source scan covers the stylesheet, components, layout and pages, not tests, posts or the tokens file', () => {
    // A token that only a component uses must count as used.
    const files = sourceFiles();

    for (const file of ['public/css/newdesign.css', 'src/components/Header.astro', 'src/components/Meta.astro', 'src/layouts/Base.astro', 'src/pages/404.astro']) {
        assert.ok(files.includes(file), file);
    }

    assert.ok(!files.includes('public/css/tokens.css'));
    assert.ok(!files.some((file) => file.endsWith('.test.mjs') || file.startsWith('src/content/')));
});

test('no source types a color', () => {
    // Colors come from public/css/tokens.css (phalcon/assets), so a palette change is made once.
    const typed = sourceFiles().flatMap((file) =>
        readFileSync(new URL(file, root), 'utf8')
            .split('\n')
            .flatMap((line, index) => [...line.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)].map((match) => `${file}:${index + 1} ${match[0]}`))
    );

    assert.deepEqual(typed, []);
});

test('the tokens file defines every token that the blog uses', () => {
    const tokens = readFileSync(new URL('public/css/tokens.css', root), 'utf8');

    assert.deepEqual(missingTokens(tokens, usedBySite()), []);
});

test('the source scan counts a token that a component reads by name', () => {
    // Meta.astro gives --ph-slate-900 and --ph-brand-400 to resolveToken(), for the browser colors.
    const used = usedBySite();

    assert.ok(used.has('--ph-slate-900'), '--ph-slate-900');
    assert.ok(used.has('--ph-brand-400'), '--ph-brand-400');
});

test('the CI workflow gets the design files before the tests', () => {
    // The tests and the build must see the files that the deploy publishes.
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');
    const step = workflow.indexOf('run: node scripts/update-tokens.mjs');

    assert.ok(step > 0, 'the step is missing');
    assert.ok(step < workflow.indexOf('run: npm test'), 'the step must come before the tests');
});
