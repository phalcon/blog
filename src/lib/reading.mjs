/**
 * Reading time, held apart from `text.mjs`.
 *
 * `reading-time` is written for Node: it calls `util.inherits`, which a
 * browser does not have. The search script in the header imports `text.mjs`,
 * so anything that file imports is bundled for the browser too, where this
 * package throws on load and takes the search down with it.
 */
import getReadingTime from 'reading-time';

/** Whole minutes, at least one. Jekyll divided the word count by 200. */
export function readingMinutes(body) {
    return Math.max(1, Math.round(getReadingTime(body ?? '').minutes));
}
