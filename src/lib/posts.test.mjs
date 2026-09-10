import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { tagSlug } from './text.mjs';

/** Mirrors the tagCounts reducer. Kept in step with posts.ts by hand. */
function countTags(postTagLists) {
    const counts = new Map();

    for (const tags of postTagLists) {
        for (const tag of tags) {
            const name = tag.trim();
            const slug = tagSlug(name);
            const seen = counts.get(slug);

            counts.set(slug, { count: (seen?.count ?? 0) + 1, tag: seen?.tag ?? name });
        }
    }

    return [...counts.entries()].map(([slug, { count, tag }]) => ({ count, slug, tag }));
}

test('a tag differing only by whitespace does not create a second slug', () => {
    const result = countTags([['update'], ['update '], ['status']]);
    const slugs = result.map((item) => item.slug);

    assert.equal(new Set(slugs).size, slugs.length, 'slugs must be unique');
    assert.equal(result.find((item) => item.slug === 'update').count, 2);
});

test('tags differing only by case collapse into one slug', () => {
    const result = countTags([['PHP'], ['php'], ['Php']]);

    assert.equal(result.length, 1);
    assert.equal(result[0].slug, 'php');
    assert.equal(result[0].count, 3);
    assert.equal(result[0].tag, 'PHP', 'the first spelling seen supplies the label');
});
