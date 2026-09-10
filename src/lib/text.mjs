/**
 * Text helpers shared by the pages and the build scripts.
 *
 * Plain `.mjs` with no Astro import, so `node --test` can load it directly.
 * Anything that needs `astro:content` belongs in `posts.ts` instead.
 *
 * This file must import nothing. The search script in the header takes
 * `servedPath` from here, which puts the whole module in the browser bundle,
 * and a package written for Node breaks there. `readingMinutes` moved to
 * `reading.mjs` for that reason.
 */

/** "chit chat" -> "chit-chat". Matches the Jekyll `slugify` filter. */
export function tagSlug(tag) {
    return tag
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/** "Aug 28, 2026". The Jekyll templates used `%b %d, %Y`. */
export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        timeZone: 'UTC',
        year: 'numeric',
    }).format(date);
}

/** "2026-08-28". Used by the `content` attribute on the date elements. */
export function formatIsoDate(date) {
    return date.toISOString().slice(0, 10);
}

/**
 * Turns an output file path into the URL the site serves. `build.format:
 * 'file'` means paths arrive ending in `.html`, and the site is configured
 * `trailingSlash: 'never'`. The separator before `index.html` is required:
 * without it a slug ending in `-index` would be truncated.
 */
export function servedPath(path) {
    return path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
}

/**
 * The first real paragraph, stripped of markdown and capped at `limit`.
 *
 * Leading headings, images and HTML-only lines are skipped, so a post that
 * opens with a banner image still gets a sentence.
 */
export function excerpt(body, limit = 320) {
    const text = (body ?? '')
        .replace(/^---[\s\S]*?---\s*/, '')
        .replace(/^\s*(?:#{1,6}\s.*|\[?!\[[^\]]*\]\([^)]*\)\]?(?:\([^)]*\))?|<\/?[a-zA-Z][^>]*>)\s*$/gm, '')
        .trim();

    const paragraph = text.split(/\n\s*\n/).find((block) => block.trim().length > 0) ?? '';

    const plain = paragraph
        .replace(/^(?:>\s?)+/gm, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
        .replace(/<\/?[a-zA-Z][^>]*>/g, '')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    return plain.length > limit ? `${plain.slice(0, limit).trimEnd()}…` : plain;
}
