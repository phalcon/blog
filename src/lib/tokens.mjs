/**
 * Reads the design tokens: public/css/tokens.css, a copy of
 * phalcon/css/tokens.css in phalcon/assets. Pure functions: they read no
 * files and use no network.
 */

/** The text with its CSS comments removed. */
const withoutComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');

/**
 * The --ph- custom properties that a stylesheet defines.
 *
 * @param {string} css
 * @returns {Set<string>}
 */
export function definedTokens(css) {
    return new Set([...withoutComments(css).matchAll(/(--ph-[a-z0-9-]+)\s*:/g)].map((match) => match[1]));
}

/**
 * The used names that the stylesheet does not define, sorted.
 *
 * @param {string} css
 * @param {Iterable<string>} used
 * @returns {string[]}
 */
export function missingTokens(css, used) {
    const defined = definedTokens(css);

    return [...new Set(used)].filter((name) => !defined.has(name)).sort();
}

/**
 * The value of a token, with var() references followed. Null when a name is
 * not defined, or when the references make a loop.
 *
 * @param {string} css
 * @param {string} name
 * @returns {string | null}
 */
export function resolveToken(css, name) {
    const values = new Map(
        [...withoutComments(css).matchAll(/(--ph-[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()])
    );
    const seen = new Set();
    let current = name;

    while (values.has(current) && !seen.has(current)) {
        seen.add(current);

        const value = values.get(current);
        const reference = /^var\((--ph-[a-z0-9-]+)\)$/.exec(value);

        if (!reference) {
            return value;
        }

        current = reference[1];
    }

    return null;
}

/**
 * The problems of a tokens file for this site: it must have a :root rule,
 * define every token that the site uses and every token that it refers to,
 * and give a value to every token that the site uses. An empty list means
 * that the file can replace the committed copy.
 *
 * @param {string} css
 * @param {Iterable<string>} used
 * @returns {string[]}
 */
export function tokensProblems(css, used) {
    if (!/:root\s*\{/.test(withoutComments(css))) {
        return ['the file has no :root rule'];
    }

    const names = [...new Set(used)];
    const missing = missingTokens(css, [...names, ...usedTokens(css)]);
    const empty = names.filter((name) => !missing.includes(name) && resolveToken(css, name) === null);

    return [...missing.map((name) => `${name} is missing`), ...empty.map((name) => `${name} has no value`)];
}

/**
 * The --ph- custom properties that a text uses in var().
 *
 * @param {string} text
 * @returns {Set<string>}
 */
export function usedTokens(text) {
    return new Set([...withoutComments(text).matchAll(/var\(\s*(--ph-[a-z0-9-]+)/g)].map((match) => match[1]));
}
