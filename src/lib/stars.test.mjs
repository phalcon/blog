import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { cphalconStars, formatStars } from './stars.mjs';

const feed = (repositories) => JSON.stringify({ repositories });

test('formatStars shows a count below 1000 as it is', () => {
    assert.equal(formatStars(0), '0');
    assert.equal(formatStars(999), '999');
});

test('formatStars shows thousands with one decimal, cut and not rounded up', () => {
    assert.equal(formatStars(1000), '1k');
    assert.equal(formatStars(10821), '10.8k');
    assert.equal(formatStars(10899), '10.8k');
});

test('formatStars rejects a value that is not a star count', () => {
    assert.throws(() => formatStars(null), /is not a star count/);
    assert.throws(() => formatStars(-1), /is not a star count/);
    assert.throws(() => formatStars(1.5), /is not a star count/);
});

test('cphalconStars reads the count of phalcon/cphalcon', () => {
    assert.equal(cphalconStars(feed([{ id: 'phalcon/phalcon', stars: 5 }, { id: 'phalcon/cphalcon', stars: 10821 }])), 10821);
});

test('cphalconStars gives null for a file that the nav cannot use', () => {
    assert.equal(cphalconStars('<!doctype html>'), null);
    assert.equal(cphalconStars('null'), null);
    assert.equal(cphalconStars(JSON.stringify({ repositories: 'x' })), null);
    assert.equal(cphalconStars(feed([{ id: 'phalcon/phalcon', stars: 5 }])), null);
    assert.equal(cphalconStars(feed([{ id: 'phalcon/cphalcon', stars: '10821' }])), null);
    assert.equal(cphalconStars(feed([{ id: 'phalcon/cphalcon', stars: -1 }])), null);
});

test('the committed repositories.json has a star count for cphalcon', () => {
    // The nav reads this copy at build time. The refresh replaces it only with a file that has a count.
    const json = readFileSync(new URL('../repositories.json', import.meta.url), 'utf8');

    assert.notEqual(cphalconStars(json), null);
});
