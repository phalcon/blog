/**
 * Checks a code theme file: src/code-theme.json, a copy of
 * phalcon/css/code-theme.json in phalcon/assets, is the Shiki theme of the
 * blog (astro.config.mjs). Each color of the theme is a --code-<role>
 * variable, and public/css/newdesign.css maps the variables to the syntax
 * tokens of each tone.
 *
 * The checks of the rules are in phalcon/assets (tests/tokens.php). The blog
 * checks only that it can use a file. Pure functions: they read no files and
 * use no network.
 */

/** The top-level keys of a code theme. Shiki also reads bg, fg and settings, in place of colors and tokenColors. */
const THEME_KEYS = ['colors', 'name', 'tokenColors', 'type'];

/**
 * The problems of a code theme file for this site: it must be a JSON object
 * with a list of rules, the two editor colors and no other top-level key; its
 * colors must be --code-<role> variables of the roles that the site maps, and
 * it can type no color anywhere. An empty list means that the file can replace
 * the committed copy.
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
    const keys = Object.keys(parsed).filter((key) => !THEME_KEYS.includes(key)).map((key) => `${key} is not allowed`);
    // Without the editor colors, Shiki takes typed colors for the block.
    const editor = ['editor.background', 'editor.foreground']
        .filter((key) => parsed.colors?.[key] === undefined)
        .map((key) => `colors.${key} is missing`);
    const colors = [
        ...Object.values(parsed.colors ?? {}),
        ...parsed.tokenColors.map((rule) => rule?.settings?.foreground).filter((color) => color !== undefined),
    ];
    const plain = colors
        .filter((color) => !/^var\(--code-[a-z0-9-]+\)$/.test(String(color)) && !typed.includes(String(color)))
        .map((color) => `${color} is not a --code- variable`);
    // Every --code- role must have a value on this site, wherever the file uses it.
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
    return new Set([...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/--code-([a-z0-9-]+)\s*:/g)].map((match) => match[1]));
}
