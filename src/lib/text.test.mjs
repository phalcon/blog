import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { excerpt, formatDate, formatIsoDate, servedPath, tagSlug } from './text.mjs';

test('tagSlug lowercases and joins words with a hyphen', () => {
    assert.equal(tagSlug('chit chat'), 'chit-chat');
    assert.equal(tagSlug('Phalcon5'), 'phalcon5');
});

test('tagSlug strips punctuation and edge hyphens', () => {
    assert.equal(tagSlug('3.2.x'), '3-2-x');
    assert.equal(tagSlug('  spaced  '), 'spaced');
});

test('formatDate matches the Jekyll "%b %d, %Y" output', () => {
    assert.equal(formatDate(new Date('2026-08-28T01:02:00.000Z')), 'Aug 28, 2026');
});

test('formatIsoDate returns the date part only', () => {
    assert.equal(formatIsoDate(new Date('2026-08-28T01:02:00.000Z')), '2026-08-28');
});

test('excerpt takes the first paragraph only', () => {
    const body = 'First paragraph.\n\nSecond paragraph.';

    assert.equal(excerpt(body), 'First paragraph.');
});

test('excerpt skips a leading heading and a leading image', () => {
    const body = '## Heading\n\n![alt](/assets/files/x.png)\n\nReal text.';

    assert.equal(excerpt(body), 'Real text.');
});

test('excerpt skips a linked image line', () => {
    const body = '[![Poll](/assets/files/x.png)](https://vimeo.com/1 "Watch")\n\nReal text.';

    assert.equal(excerpt(body), 'Real text.');
});

test('excerpt removes an inline image without leaving its marker', () => {
    assert.equal(excerpt('See ![this](/a.png) here.'), 'See here.');
});

test('excerpt strips blockquote markers', () => {
    const body = '> **NOTE**: Packages arrive soon.\n\nIntro.';

    assert.equal(excerpt(body), 'NOTE: Packages arrive soon.');
});

test('excerpt strips a nested blockquote and joins its lines', () => {
    const body = '> Greetings!\n>\n> I am a 20 year veteran.\n\nIntro.';

    assert.equal(excerpt(body), 'Greetings! I am a 20 year veteran.');
});

test('excerpt removes markdown links, emphasis and code ticks', () => {
    const body = 'We released [`phalcon/quill`](https://github.com/phalcon/quill) today.';

    assert.equal(excerpt(body), 'We released phalcon/quill today.');
});

test('excerpt removes inline HTML tags but keeps their text', () => {
    const body = '<h5 class="alert alert-warning">\n<strong>TLDR;</strong> We released new docs.\n</h5>';

    assert.equal(excerpt(body), 'TLDR; We released new docs.');
});

test('excerpt keeps comparison operators that are not HTML tags', () => {
    const body = 'Works if PHP < 8.0 and ext > 5.9 are present.';

    assert.equal(excerpt(body), 'Works if PHP < 8.0 and ext > 5.9 are present.');
});

test('excerpt caps at the limit and appends an ellipsis', () => {
    const body = 'x'.repeat(400);
    const result = excerpt(body, 320);

    assert.equal(result.length, 321);
    assert.ok(result.endsWith('…'));
});

test('excerpt collapses newlines inside a paragraph', () => {
    assert.equal(excerpt('one\ntwo'), 'one two');
});

test('servedPath strips the html extension', () => {
    assert.equal(servedPath('/page-2.html'), '/page-2');
    assert.equal(servedPath('/tag/release.html'), '/tag/release');
});

test('servedPath turns an index file into its directory', () => {
    assert.equal(servedPath('/index.html'), '/');
    assert.equal(servedPath('/tag/index.html'), '/tag/');
});

test('servedPath does not truncate a slug ending in index', () => {
    assert.equal(servedPath('/post/phalcon-db-index.html'), '/post/phalcon-db-index');
});

test('servedPath leaves a slug ending in -html alone', () => {
    assert.equal(servedPath('/post/learn-html.html'), '/post/learn-html');
});
