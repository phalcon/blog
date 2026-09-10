import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { readingMinutes } from './reading.mjs';

test('readingMinutes never returns less than one', () => {
    assert.equal(readingMinutes('one word'), 1);
    assert.equal(readingMinutes(''), 1);
});
