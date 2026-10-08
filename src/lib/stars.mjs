/**
 * The GitHub stars of cphalcon, which the shared nav of the Phalcon sites
 * shows next to "GitHub". A shared tool of phalcon/assets
 * (phalcon/tools/stars.mjs): each site gets it again before every build, as
 * it gets the design tools. The count comes from phalcon/repositories.json,
 * which a scheduled workflow of phalcon/assets updates.
 */

/** The repository whose stars the nav shows. */
const REPOSITORY = 'phalcon/cphalcon';

/**
 * The star count of cphalcon in the text of a repositories.json file, or null
 * when the text does not have a whole count of zero or more for it.
 *
 * @param {string} json
 * @returns {number | null}
 */
export function cphalconStars(json) {
    let feed;

    try {
        feed = JSON.parse(json);
    } catch {
        return null;
    }

    const stars = Array.isArray(feed?.repositories)
        ? feed.repositories.find((repository) => repository?.id === REPOSITORY)?.stars
        : undefined;

    return Number.isInteger(stars) && stars >= 0 ? stars : null;
}

/**
 * A star count as phalcon.io shows it: 249, 1k, 10.8k. Thousands keep one
 * decimal, cut and not rounded up.
 *
 * @param {number | null} count
 * @returns {string}
 */
export function formatStars(count) {
    if (!Number.isInteger(count) || count < 0) {
        throw new Error(`${count} is not a star count`);
    }

    return count < 1000 ? String(count) : `${Math.floor(count / 100) / 10}k`;
}
