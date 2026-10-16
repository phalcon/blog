/**
 * Refreshes the committed copies of the shared design files of a Phalcon site
 * from assets.phalcon.io. phalcon/assets serves this file at
 * https://assets.phalcon.io/phalcon/tools/design-refresh.mjs. Each site keeps
 * a copy in src/lib/, and its deploy gets the file again first. Do not change
 * a copy: change phalcon/tools/design-refresh.mjs in phalcon/assets.
 *
 * A site lists its files in scripts/update-tokens.mjs: the name of the file,
 * the committed copy, and the check that a new file must pass (see
 * design-checks.mjs). An image (an icon) has `binary: true`: the tool reads,
 * compares and writes its bytes as they are. A file that cannot be read, that
 * has a problem, or whose check fails with an error, keeps its committed copy
 * and prints a GitHub Actions warning. Each file is checked alone. Nothing is committed: the committed
 * copies are the default.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

/**
 * A shared file of text (a stylesheet, a JSON file).
 *
 * @typedef {object} TextFile
 * @property {false} [binary]
 * @property {string} copy the committed copy, relative to the current folder or absolute
 * @property {string} name the name of the file under the source (or under the folder `from`)
 * @property {(text: string) => string[]} problems the problems of a new file; an empty list means that it can replace the copy
 */

/**
 * A shared file of bytes (an image): the tool reads, compares and writes it as it is.
 *
 * @typedef {object} BinaryFile
 * @property {true} binary
 * @property {string} copy the committed copy, relative to the current folder or absolute
 * @property {string} name the name of the file under the source (or under the folder `from`)
 * @property {(bytes: Buffer) => string[]} problems the problems of a new file; an empty list means that it can replace the copy
 */

/** @typedef {TextFile | BinaryFile} DesignFile */

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

    for (const { binary = false, copy, name, problems: check } of files) {
        const loaded = await load(name, from, source, binary);
        const problems = 'problem' in loaded ? [loaded.problem] : checked(check, loaded.content);
        /** @type {'changed' | 'kept' | 'missing' | 'same'} */
        let result = 'kept';

        if (problems.length > 0) {
            problems.forEach((problem) => log(`::warning title=Design tokens::${name}: ${problem}`));
            // With no committed copy, there is nothing to keep.
            result = existsSync(copy) ? 'kept' : 'missing';
        } else if ('content' in loaded && existsSync(copy) && sameAsCopy(copy, loaded.content)) {
            result = 'same';
        } else if ('content' in loaded) {
            writeFileSync(copy, loaded.content);
            result = 'changed';
        }

        log(`${result.padEnd(14)}${copy}`);
        results.push({ copy, problems, result });
    }

    return results;
}

/**
 * The problems that the check finds in the new file. An error of the check is
 * a problem too, so that one wrong entry does not stop the other files.
 *
 * @param {(content: any) => string[]} check
 * @param {string | Buffer} content
 * @returns {string[]}
 */
function checked(check, content) {
    try {
        return check(content);
    } catch (error) {
        return [`the check failed: ${error instanceof Error ? error.message : String(error)}`];
    }
}

/**
 * One new file, as { content } or { problem }: its text, or its bytes when
 * binary is true.
 *
 * @param {string} name
 * @param {string | null} from
 * @param {string} source
 * @param {boolean} binary
 * @returns {Promise<{ content: string | Buffer } | { problem: string }>}
 */
async function load(name, from, source, binary) {
    try {
        if (from) {
            return { content: binary ? readFileSync(`${from}/${name}`) : readFileSync(`${from}/${name}`, 'utf8') };
        }

        const response = await fetch(`${source}/${name}`, { signal: AbortSignal.timeout(30000) });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return { content: binary ? Buffer.from(await response.arrayBuffer()) : await response.text() };
    } catch (error) {
        return { problem: `cannot read the file: ${error instanceof Error ? error.message : String(error)}` };
    }
}

/**
 * True when the committed copy has this content: the same text, or the same
 * bytes.
 *
 * @param {string} copy
 * @param {string | Buffer} content
 * @returns {boolean}
 */
function sameAsCopy(copy, content) {
    return typeof content === 'string' ? readFileSync(copy, 'utf8') === content : readFileSync(copy).equals(content);
}
