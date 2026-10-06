/**
 * The checks of the shared design files of the Phalcon sites: the design
 * tokens (phalcon/css/tokens.css) and the code theme
 * (phalcon/css/code-theme.json). phalcon/assets serves this file at
 * https://assets.phalcon.io/phalcon/tools/design-checks.mjs. Each site keeps a
 * copy in src/lib/, and its deploy gets the file again first. Do not change a
 * copy: change phalcon/tools/design-checks.mjs in phalcon/assets.
 *
 * phalcon/assets checks the content of the files (tests/tokens.php). A site
 * checks only that it can use a file. Pure functions: they read no files and
 * use no network.
 */

/** The top-level keys of a code theme. Shiki also reads bg, fg and settings, in place of colors and tokenColors. */
const THEME_KEYS = ['colors', 'name', 'tokenColors', 'type'];

/** The values that a token can have: a hex color, an RGB color function, var(--ph-…) or a font stack. */
const TOKEN_VALUES = [
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,
    /^rgba?\([\d\s.,/%]+\)$/,
    /^var\(--ph-[a-z0-9-]+\)$/,
    /^(?:"[\w -]+"|[a-z][\w-]*)(?:\s*,\s*(?:"[\w -]+"|[a-z][\w-]*))*$/i,
];

/** True when a declaration is a --ph- token with a value of TOKEN_VALUES. */
const isToken = (declaration) => {
    const match = /^--ph-[a-z0-9-]+\s*:\s*([\s\S]+)$/.exec(declaration);

    return match !== null && TOKEN_VALUES.some((value) => value.test(match[1].replace(/\s+/g, ' ')));
};

/** The text with its CSS comments removed. */
const withoutComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');

/**
 * The problems of a code theme file for a site: it must be a JSON object with
 * a list of rules, the two editor colors and no other top-level key; its colors
 * must be --code-<role> variables of the roles that the site maps, and it can
 * type no color anywhere. An empty list means that the file can replace the
 * committed copy.
 *
 * @param {string} json
 * @param {Iterable<string>} roles the roles that the site maps (see definedCodeRoles)
 * @returns {string[]}
 */
export function codeThemeProblems(json, roles) {
    let parsed;

    try {
        parsed = JSON.parse(json);
    } catch {
        return ['the file is not JSON'];
    }

    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return ['the file is not a JSON object'];
    }

    if (!Array.isArray(parsed.tokenColors) || parsed.tokenColors.length === 0) {
        return ['the file has no list of rules'];
    }

    // A typed color anywhere in the file (also in a key that Shiki reads, such as colorReplacements) does not come
    // from the tokens.
    const typed = json.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/gi) ?? [];
    const mapped = new Set(roles);
    const keys = Object.keys(parsed)
        .filter((key) => !THEME_KEYS.includes(key))
        .map((key) => `${key} is not allowed`);
    // Without the editor colors, Shiki takes typed colors for the block.
    const editor = ['editor.background', 'editor.foreground']
        .filter((key) => parsed.colors?.[key] === undefined)
        .map((key) => `colors.${key} is missing`);
    // Shiki writes the foreground and the background of a rule on the token. The other settings (fontStyle) are not
    // colors.
    const colors = [
        ...Object.values(parsed.colors ?? {}),
        ...parsed.tokenColors
            .flatMap((rule) => [rule?.settings?.foreground, rule?.settings?.background])
            .filter((color) => color !== undefined),
    ];
    const plain = colors
        .filter((color) => !/^var\(--code-[a-z0-9-]+\)$/.test(String(color)) && !typed.includes(String(color)))
        .map((color) => `${color} is not a --code- variable`);
    // Every --code- role must have a value on the site, wherever the file uses it.
    const unmapped = [...json.matchAll(/var\(--code-([a-z0-9-]+)\)/g)]
        .filter((match) => !mapped.has(match[1]))
        .map((match) => `--code-${match[1]} has no value on this site`);
    const named = typed.map((color) => `${color} is a typed color`);

    return [...new Set([...keys, ...editor, ...named, ...plain, ...unmapped])].sort();
}

/**
 * The --code- roles that a stylesheet gives a value to. Comments do not count.
 *
 * @param {string} css
 * @returns {Set<string>}
 */
export function definedCodeRoles(css) {
    return new Set([...withoutComments(css).matchAll(/--code-([a-z0-9-]+)\s*:/g)].map((match) => match[1]));
}

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
        [...withoutComments(css).matchAll(/(--ph-[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
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
 * The problems of a tokens file for a site: it must be a single :root rule of
 * --ph- tokens, each with a color, a var() or a font stack (the file goes into
 * every page, so it can bring no other rule, no import rule and no url()); it must
 * define every token that the site uses and every token that it refers to, and
 * give a value to every token that the site uses. An empty list means that the
 * file can replace the committed copy.
 *
 * @param {string} css
 * @param {Iterable<string>} used
 * @returns {string[]}
 */
export function tokensProblems(css, used) {
    const text = withoutComments(css).trim();

    if (!/:root\s*\{/.test(text)) {
        return ['the file has no :root rule'];
    }

    const rule = /^:root\s*\{([^{}]*)\}$/.exec(text);

    if (!rule) {
        return ['the file is not a single :root rule'];
    }

    const shape = rule[1]
        .split(';')
        .map((declaration) => declaration.trim())
        .filter((declaration) => declaration !== '' && !isToken(declaration))
        .map((declaration) => `${declaration.replace(/\s+/g, ' ')} is not a token with a color, a var() or a font stack`);
    const names = [...new Set(used)];
    const missing = missingTokens(css, [...names, ...usedTokens(css)]);
    const empty = names.filter((name) => !missing.includes(name) && resolveToken(css, name) === null);

    return [...shape, ...missing.map((name) => `${name} is missing`), ...empty.map((name) => `${name} has no value`)];
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
