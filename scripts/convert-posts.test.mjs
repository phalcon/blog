import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { convertPost } from './convert-posts.mjs';

const NAME = '2012-03-07-welcome-to-the-phalcon-blog.md';

test('removes the layout line', () => {
    const source = '---\nlayout: post\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\nBody.\n';

    assert.ok(!convertPost(source, NAME).includes('layout:'));
});

test('adds a date taken from the file name when none is present', () => {
    const source = '---\nlayout: post\ntitle: Hello\n---\nBody.\n';

    assert.ok(convertPost(source, NAME).includes('date: 2012-03-07T00:00:00.000Z'));
});

test('keeps an existing date untouched', () => {
    const source = '---\nlayout: post\ntitle: Hello\ndate: 2012-03-07T09:30:00.000Z\n---\nBody.\n';

    const result = convertPost(source, NAME);

    assert.ok(result.includes('date: 2012-03-07T09:30:00.000Z'));
    assert.equal(result.match(/^date:/gm).length, 1);
});

test('keeps the title, the tags and the image', () => {
    const source =
        '---\nlayout: post\ntitle: "Hello"\nimage: /assets/files/x.svg\ntags:\n  - php\n  - phalcon\n---\nBody.\n';

    const result = convertPost(source, NAME);

    assert.ok(result.includes('title: "Hello"'));
    assert.ok(result.includes('image: /assets/files/x.svg'));
    assert.ok(result.includes('  - php'));
    assert.ok(result.includes('  - phalcon'));
});

test('drops an image key that has no value', () => {
    const source = '---\nlayout: post\ntitle: Hello\nimage: \ndate: 2012-03-07T00:00:00.000Z\n---\nBody.\n';

    const result = convertPost(source, NAME);

    assert.ok(!result.includes('image:'));
    assert.ok(result.includes('title: Hello'));
});

test('keeps a tags block whose key line has no inline value', () => {
    const source = '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\ntags:\n  - php\n---\nBody.\n';

    const result = convertPost(source, NAME);

    assert.ok(result.includes('tags:'));
    assert.ok(result.includes('  - php'));
});

test('removes the raw tags in every spelling', () => {
    const source =
        '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\n' +
        '```php\n{% raw %}\n{{ x }}\n{% endraw %}\n```\n{%raw%}a{%endraw%}\n';

    const result = convertPost(source, NAME);

    assert.ok(!result.includes('raw %}'));
    assert.ok(!result.includes('{%raw%}'));
    assert.ok(result.includes('{{ x }}'));
});

test('removes the excerpt marker on its own line without leaving a blank gap', () => {
    const source =
        '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\nOne.\n\n<!--more-->\n\nTwo.\n';

    const result = convertPost(source, NAME);

    assert.ok(!result.includes('<!--more-->'));
    assert.ok(result.includes('One.\n\nTwo.'));
});

test('removes the excerpt marker when it is inline', () => {
    const source = '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\nOne.<!--more-->\n';

    assert.equal(convertPost(source, NAME).endsWith('One.\n'), true);
});

test('repairs the pho fence typo', () => {
    const source = '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\n```pho\n$a = 1;\n```\n';

    assert.ok(convertPost(source, NAME).includes('```php'));
});

test('turns a kramdown attribute list into a Callout', () => {
    const source =
        '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\n' +
        '> NOTE: something\n{: .alert .alert-danger }\n\nAfter.\n';

    const result = convertPost(source, NAME);

    assert.ok(!result.includes('{:'));
    assert.ok(result.includes('<Callout type="danger">\nNOTE: something\n</Callout>'));
    assert.ok(result.includes('After.'));
});

test('turns a kramdown attribute list with no space before the brace into a Callout', () => {
    const source =
        '---\ntitle: Hello\ndate: 2012-03-07T00:00:00.000Z\n---\nText.\n{: .alert .alert-info}\n';

    const result = convertPost(source, NAME);

    assert.ok(!result.includes('{:'));
    assert.ok(result.includes('<Callout type="info">\nText.\n</Callout>'));
});

test('throws when the frontmatter is missing', () => {
    assert.throws(() => convertPost('No frontmatter here.\n', NAME), /frontmatter/i);
});
