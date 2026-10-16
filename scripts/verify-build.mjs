/**
 * Asserts that the build produced the URL map the migration promised.
 * Run after `npm run build`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';

import { missingTokens, resolveToken, usedTokens } from '../src/lib/design-checks.mjs';
import { cphalconStars, formatStars } from '../src/lib/stars.mjs';

/* Expected counts for the build. Update these when content is added or removed. */
const EXPECTED = {
    /* Every file under dist/assets, in all folders. A silent drift here is how
       a broken image reaches production unnoticed. */
    assets: 214,
    feedItems: 322,
    paginationPages: 32,
    postPages: 322,
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
 * Design tokens. Every page loads tokens.css, common.css, sidebar.css and
 * then site.css, and no other stylesheet. The stylesheets use only tokens that
 * tokens.css defines, and the browser bar takes its color from the tokens.
 */
count(
    'pages that do not load exactly tokens.css, common.css, sidebar.css and then site.css',
    measure(
        () =>
            listFiles('dist')
                .filter((file) => file.endsWith('.html') && !file.startsWith('dist/pagefind/'))
                .filter((file) => {
                    const links = [...readFileSync(file, 'utf8').matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)]
                        .map((match) => /href="([^"]*)"/.exec(match[0])?.[1]);

                    return links.join(' ') !== '/css/tokens.css /css/common.css /css/sidebar.css /css/site.css';
                }).length
    ),
    0
);
count(
    'tokens that site.css, common.css and sidebar.css use and tokens.css does not define',
    measure(
        () =>
            missingTokens(readFileSync('dist/css/tokens.css', 'utf8'), [
                ...usedTokens(readFileSync('dist/css/site.css', 'utf8')),
                ...usedTokens(readFileSync('dist/css/common.css', 'utf8')),
                ...usedTokens(readFileSync('dist/css/sidebar.css', 'utf8')),
            ]).join(', ') || 'none'
    ),
    'none'
);
count(
    'browser bar color',
    measure(() => /<meta name="theme-color" content="([^"]*)"/.exec(readFileSync('dist/index.html', 'utf8'))?.[1] ?? 'none'),
    resolveToken(readFileSync('public/css/tokens.css', 'utf8'), '--ph-dark-bg')
);

/*
 * The shared nav and footer (common.css, the classes of phalcon.io). Every
 * page has them, with the blog's search box, theme switcher and mobile menu
 * script, and no part of the old header and footer. Header.astro has a scoped
 * style, so its elements carry a data-astro-cid attribute. The nav shows the
 * stars of src/repositories.json, and the footer every link of src/footer.json.
 */
const pages = listFiles('dist').filter((file) => file.endsWith('.html') && !file.startsWith('dist/pagefind/'));
const without = (...parts) =>
    pages.filter((file) => {
        const html = readFileSync(file, 'utf8');

        return parts.some((part) => !part.test(html));
    }).length;

count('pages without the shared nav and footer', measure(() => without(/<nav class="ph-nav"[\s>]/, /<footer class="ph-footer"[\s>]/)), 0);
count('pages without the search box and the theme switcher', measure(() => without(/id="header-search-input"/, /<div class="switcher"[\s>]/)), 0);
count(
    'pages without the search button and the search row',
    measure(() => without(/<button id="header-search-toggle"[^>]*aria-controls="header-search-row"/, /<div id="header-search-row" hidden[^>]*><input[^>]*id="header-search-row-input"/)),
    0
);
count('pages without the mobile menu script', measure(() => without(/<script[^>]*src="\/js\/nav\.js"/)), 0);
count(
    'pages with the old header or footer',
    measure(() => pages.filter((file) => /class="(?:header|footer|header-nav|footer-nav)"/.test(readFileSync(file, 'utf8'))).length),
    0
);
/* An id names one element of a page. Astro gives each heading of a post an id
   from its text, so a heading can take an id of the page (post, post__date, …). */
count(
    'pages with an id on two elements',
    measure(() => pages.filter((file) => {
        const ids = [...readFileSync(file, 'utf8').matchAll(/\sid="([^"]*)"/g)].map((match) => match[1]);

        return new Set(ids).size !== ids.length;
    }).length),
    0
);
count(
    'stars in the nav',
    measure(() => /class="ph-nav__stars"[^>]*>★ ([^<]*)</.exec(readFileSync('dist/index.html', 'utf8'))?.[1] ?? 'none'),
    measure(() => formatStars(cphalconStars(readFileSync('src/repositories.json', 'utf8'))))
);
count(
    'footer links',
    measure(() => (readFileSync('dist/index.html', 'utf8').match(/class="ph-footer__link"/g) ?? []).length),
    measure(() => JSON.parse(readFileSync('src/footer.json', 'utf8')).columns.flatMap((column) => column.links).length)
);

/*
 * The shared sidebar (sidebar.css): the box of the supporters, the box of the
 * projects text with every link of the text of src/sidebar.json, and the tags
 * box of the blog on the shared box.
 */
count('sidebar boxes', measure(() => (readFileSync('dist/index.html', 'utf8').match(/<div class="ph-side__box">/g) ?? []).length), 3);
count(
    'links of the projects text',
    measure(() => (/<div class="ph-side__text">([\s\S]*?)<\/div>/.exec(readFileSync('dist/index.html', 'utf8'))?.[1].match(/<a /g) ?? []).length),
    measure(() => JSON.parse(readFileSync('src/sidebar.json', 'utf8')).projects.text.filter((part) => typeof part === 'object').length)
);

/*
 * The icons, the same set as on the other Phalcon sites. Every page links the
 * copies in public/ of phalcon/favicons/ (phalcon/assets) and the manifest, and
 * no tag of the old set. The manifest has the name of the site, a short name of
 * the site part only (the icon shows the brand), the description of the pages,
 * the color of the browser bar, and the two icons of a home screen, which are
 * in dist/. A home screen icon opens the home page in the browser.
 */
const ICON_TAGS = [
    '<link rel="icon" href="/favicon.ico" sizes="32x32">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
].join(' ');
const manifest = measure(() => JSON.parse(readFileSync('dist/site.webmanifest', 'utf8')));
const darkBg = resolveToken(readFileSync('public/css/tokens.css', 'utf8'), '--ph-dark-bg');

count(
    'pages without exactly the icon tags',
    measure(() => pages.filter((file) => [...readFileSync(file, 'utf8').matchAll(/<link[^>]*rel="(?:apple-touch-icon|icon|manifest|mask-icon|shortcut icon)"[^>]*>/g)]
        .map((match) => match[0])
        .join(' ') !== ICON_TAGS).length),
    0
);
count('pages with a tag of the Windows tiles', measure(() => pages.filter((file) => /name="msapplication-/.test(readFileSync(file, 'utf8'))).length), 0);
count('manifest name', measure(() => manifest.name), 'Phalcon Blog');
count('manifest short name', measure(() => manifest.short_name), 'Blog');
count(
    'manifest description',
    measure(() => manifest.description),
    measure(() => /<meta name="description" content="([^"]*)"/.exec(readFileSync('dist/index.html', 'utf8'))?.[1] ?? 'none')
);
count('manifest display and start URL', measure(() => `${manifest.display} ${manifest.start_url}`), 'browser /');
count('manifest colors', measure(() => `${manifest.background_color} ${manifest.theme_color}`), `${darkBg} ${darkBg}`);
count('manifest icon sizes', measure(() => manifest.icons.map((icon) => icon.sizes).join(' ')), '192x192 512x512');
count(
    'manifest icons that are not in dist',
    measure(() => manifest.icons.filter((icon) => !existsSync(`dist${icon.src}`)).map((icon) => icon.src).join(', ') || 'none'),
    'none'
);

for (const path of [
    'dist/index.html',
    'dist/tags.html',
    'dist/404.html',
    'dist/sitemap-index.xml',
    'dist/robots.txt',
    'dist/humans.txt',
    'dist/css/site.css',
    'dist/css/common.css',
    'dist/css/sidebar.css',
    'dist/css/tokens.css',
    'dist/js/nav.js',
    'dist/favicon.ico',
    'dist/favicon.svg',
    'dist/apple-touch-icon.png',
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
