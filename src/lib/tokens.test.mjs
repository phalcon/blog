import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { resolveToken } from './design-checks.mjs';

// The checks are tested in phalcon/assets (tests/design-checks.test.mjs). Here: the blog's own copy.

test('the committed copy is a tokens file: its backgrounds and syntax colors have a value', () => {
    // Only the shape: the values change in phalcon/assets, and the deploy must accept a new palette.
    const copy = readFileSync(new URL('../../public/css/tokens.css', import.meta.url), 'utf8');

    for (const name of ['--ph-dark-bg', '--ph-light-bg', '--ph-dark-syntax-keyword']) {
        assert.notEqual(resolveToken(copy, name), null, name);
    }
});
