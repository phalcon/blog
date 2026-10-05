/**
 * Asserts that the build produced the URL map the migration promised.
 * Run after `npm run build`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';

import { missingTokens, resolveToken, usedTokens } from '../src/lib/tokens.mjs';

/* Expected counts for the build. Update these when content is added or removed. */
const EXPECTED = {
    /* Every file under dist/assets, in all folders. A silent drift here is how
       a broken image reaches production unnoticed. */
    assets: 212,
    feedItems: 320,
    paginationPages: 31,
    postPages: 320,
    /* Rule lines, comments excluded. `wc -l` reports one more, because the
       file ends with a blank line. */
    redirectRules: 59,
    tagPages: 215,
};

const checks = [];

const count = (label, actual, expected) =>
    checks.push({ actual, expected, label, ok: actual === expected });

const present = (label, path) =>
    checks.push({ actual: existsSync(path), expected: true, label, ok: existsSync(path) });

/** Runs a measurement, turning a throw into a reported failure. */
const measure = (fn) => {
    try {
        return fn();
    } catch (error) {
        return `error: ${error.code ?? error.message}`;
    }
};

/** Lists files under `root`, skipping dist, node_modules and any dotfile directory. */
const listFiles = (root) => {
    const files = [];

    for (const entry of readdirSync(root, { withFileTypes: true })) {
        if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name.startsWith('.')) {
            continue;
        }

        const path = `${root}/${entry.name}`;

        if (entry.isDirectory()) {
            files.push(...listFiles(path));
        } else if (entry.isFile()) {
            files.push(path);
        }
    }

    return files;
};

/** The file with the newest mtime among the given paths (files or directory trees). */
const newestOf = (paths) => {
    const files = paths.flatMap((path) => (statSync(path).isDirectory() ? listFiles(path) : path));

    let newest = { mtimeMs: -Infinity, path: 'none' };

    for (const file of files) {
        const mtimeMs = statSync(file).mtimeMs;

        if (mtimeMs > newest.mtimeMs) {
            newest = { mtimeMs, path: file };
        }
    }

    return newest;
};

/*
 * `dist/` carries no memory of the source it was built from, so a failed
 * rebuild that leaves an old `dist/` in place looks identical to a good one.
 * This must run before any count below, or a stale `dist/` can still report
 * a full pass.
 */
count(
    'dist is current',
    measure(() => {
        const source = newestOf(['src', 'astro.config.mjs', 'package.json', 'scripts']);
        const dist = newestOf(['dist']);

        return source.mtimeMs > dist.mtimeMs
            ? `${source.path} (${new Date(source.mtimeMs).toISOString()}) is newer than dist (${new Date(dist.mtimeMs).toISOString()})`
            : 'ok';
    }),
    'ok'
);

count(
    'post pages',
    measure(() => readdirSync('dist/post').filter((f) => f.endsWith('.html')).length),
    EXPECTED.postPages
);
/* The tag index may land inside this folder; it is not a tag page. */
count(
    'tag pages',
    measure(() => readdirSync('dist/tag').filter((f) => f.endsWith('.html') && f !== 'index.html').length),
    EXPECTED.tagPages
);
count(
    'pagination pages',
    measure(() => readdirSync('dist').filter((f) => /^page-\d+\.html$/.test(f)).length),
    EXPECTED.paginationPages
);
count(
    'feed items',
    measure(() => (readFileSync('dist/feed.xml', 'utf8').match(/<item>/g) ?? []).length),
    EXPECTED.feedItems
);
count(
    'asset files',
    measure(() => listFiles('dist/assets').length),
    EXPECTED.assets
);
count(
    'redirect rules',
    measure(
        () =>
            readFileSync('dist/_redirects', 'utf8')
                .split('\n')
                .filter((line) => line.trim() !== '' && !line.trim().startsWith('#')).length
    ),
    EXPECTED.redirectRules
);

/*
 * Every /post/ redirect target must resolve to a built page. The one
 * expected exception is a target that is itself a redirect source, which
 * chains in two hops.
 */
const CHAINED = 'phosphorum-the-phalcons-forum';

const unresolvedTargets = measure(() => {
    const lines = readFileSync('dist/_redirects', 'utf8').split('\n');
    const targets = new Set();

    for (const line of lines) {
        const parts = line.trim().split(/\s+/);

        if (parts.length < 2 || line.trim().startsWith('#')) {
            continue;
        }

        const target = parts[1].replace(/^\/post\//, '').replace(/\/embed$/, '');

        if (parts[1].startsWith('/post/') && target !== '' && !target.startsWith(':')) {
            targets.add(target);
        }
    }

    return [...targets].filter(
        (slug) => slug !== CHAINED && !existsSync(`dist/post/${slug}.html`)
    ).length;
});

count('unresolved redirect targets', unresolvedTargets, 0);

/* Either output shape is fine; Task 10 recorded which one this build uses. */
checks.push({
    actual: existsSync('dist/tag.html') || existsSync('dist/tag/index.html'),
    expected: true,
    label: 'tag index',
    ok: existsSync('dist/tag.html') || existsSync('dist/tag/index.html'),
});

/*
 * Design tokens. Every page loads tokens.css and then newdesign.css, and no
 * other stylesheet. The stylesheet uses only tokens that tokens.css defines,
 * and the browser bar takes its color from the tokens.
 */
count(
    'pages that do not load exactly tokens.css and then newdesign.css',
    measure(
        () =>
            listFiles('dist')
                .filter((file) => file.endsWith('.html') && !file.startsWith('dist/pagefind/'))
                .filter((file) => {
                    const links = [...readFileSync(file, 'utf8').matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)]
                        .map((match) => /href="([^"]*)"/.exec(match[0])?.[1]);

                    return links.join(' ') !== '/css/tokens.css /css/newdesign.css';
                }).length
    ),
    0
);
count(
    'tokens that newdesign.css uses and tokens.css does not define',
    measure(
        () =>
            missingTokens(
                readFileSync('dist/css/tokens.css', 'utf8'),
                usedTokens(readFileSync('dist/css/newdesign.css', 'utf8'))
            ).join(', ') || 'none'
    ),
    'none'
);
count(
    'browser bar color',
    measure(() => /<meta name="theme-color" content="([^"]*)"/.exec(readFileSync('dist/index.html', 'utf8'))?.[1] ?? 'none'),
    resolveToken(readFileSync('public/css/tokens.css', 'utf8'), '--ph-slate-900')
);

for (const path of [
    'dist/index.html',
    'dist/tags.html',
    'dist/404.html',
    'dist/sitemap-index.xml',
    'dist/robots.txt',
    'dist/humans.txt',
    'dist/css/newdesign.css',
    'dist/css/tokens.css',
    'dist/post/phalcon-0-3-1-released.html',
    'dist/pagefind/pagefind.js',
]) {
    present(path.replace('dist/', ''), path);
}

for (const check of checks) {
    console.log(`${check.ok ? 'ok  ' : 'FAIL'}  ${check.label}: ${check.actual} (want ${check.expected})`);
}

const failed = checks.filter((check) => !check.ok).length;

console.log(`\n${checks.length - failed} of ${checks.length} checks passed`);
process.exit(failed === 0 ? 0 : 1);
