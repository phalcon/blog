/**
 * Refreshes the committed copies of the shared design files of a Phalcon site
 * from assets.phalcon.io. phalcon/assets serves this file at
 * https://assets.phalcon.io/phalcon/tools/design-refresh.mjs. Each site keeps
 * a copy in src/lib/, and its deploy gets the file again first. Do not change
 * a copy: change phalcon/tools/design-refresh.mjs in phalcon/assets.
 *
 * A site lists its files in scripts/update-tokens.mjs: the name of the file,
 * the committed copy, and the check that a new file must pass (see
 * design-checks.mjs). A file that cannot be read, or that has a problem, keeps
 * its committed copy and prints a GitHub Actions warning. Each file is checked
 * alone. Nothing is committed: the committed copies are the default.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

/**
 * @typedef {object} DesignFile
 * @property {string} copy the committed copy, relative to the current folder or absolute
 * @property {string} name the name of the file under the source (or under the folder `from`)
 * @property {(text: string) => string[]} problems the problems of a new file; an empty list means that it can replace the copy
 */

/**
 * @typedef {object} RefreshResult
 * @property {string} copy
 * @property {string[]} problems
 * @property {'changed' | 'kept' | 'missing' | 'same'} result
 */

/**
 * The folder after --from in the command arguments, or null.
 *
 * @param {string[]} args
 * @returns {string | null}
 */
export function fromArgument(args) {
    const index = args.indexOf('--from');

    return index === -1 ? null : args[index + 1] ?? null;
}

/**
 * Refreshes each file: the new file replaces the committed copy when it has no
 * problem and is different. The new files come from the folder `from` when it
 * is given, and from `source` on the network when it is not.
 *
 * @param {{ files: DesignFile[], from?: string | null, log?: (line: string) => void, source: string }} options
 * @returns {Promise<RefreshResult[]>}
 */
export async function refresh({ files, from = null, log = console.log, source }) {
    /** @type {RefreshResult[]} */
    const results = [];

    for (const { copy, name, problems: check } of files) {
        const loaded = await load(name, from, source);
        const problems = 'problem' in loaded ? [loaded.problem] : check(loaded.text);
        /** @type {'changed' | 'kept' | 'missing' | 'same'} */
        let result = 'kept';

        if (problems.length > 0) {
            problems.forEach((problem) => log(`::warning title=Design tokens::${name}: ${problem}`));
            // With no committed copy, there is nothing to keep.
            result = existsSync(copy) ? 'kept' : 'missing';
        } else if ('text' in loaded && existsSync(copy) && readFileSync(copy, 'utf8') === loaded.text) {
            result = 'same';
        } else if ('text' in loaded) {
            writeFileSync(copy, loaded.text);
            result = 'changed';
        }

        log(`${result.padEnd(14)}${copy}`);
        results.push({ copy, problems, result });
    }

    return results;
}

/**
 * One new file, as { text } or { problem }.
 *
 * @param {string} name
 * @param {string | null} from
 * @param {string} source
 * @returns {Promise<{ text: string } | { problem: string }>}
 */
async function load(name, from, source) {
    try {
        if (from) {
            return { text: readFileSync(`${from}/${name}`, 'utf8') };
        }

        const response = await fetch(`${source}/${name}`, { signal: AbortSignal.timeout(30000) });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return { text: await response.text() };
    } catch (error) {
        return { problem: `cannot read the file: ${error instanceof Error ? error.message : String(error)}` };
    }
}
