import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

import { footerProblems, missingTokens, sidebarProblems } from '../src/lib/design-checks.mjs';
import { cphalconStars } from '../src/lib/stars.mjs';
import { sourceFiles, tokensIn, usedBySite } from './token-sources.mjs';

const root = new URL('../', import.meta.url);

// The rules of a stylesheet, in their order: `<context><selector>` for each member of each selector list. A context is
// the at-rules around a rule. An at-rule with no block (@import …;) is not a rule. A combinator (>, +, ~) has one
// space on each side, so that a>b and a > b give the same key.
const ruleKeys = (css) => {
    const keys = [];
    // The members of a selector list: a comma inside parentheses (:where(a, b)) does not split it.
    const members = (head) => {
        const list = [''];
        let depth = 0;

        for (const char of head) {
            depth += char === '(' ? 1 : char === ')' ? -1 : 0;

            if (char === ',' && depth === 0) {
                list.push('');
            } else {
                list[list.length - 1] += char;
            }
        }

        return list.map((selector) => selector.trim());
    };
    const walk = (text, context) => {
        let depth = 0;
        let start = 0;
        let head = '';

        for (let index = 0; index < text.length; index += 1) {
            if (text[index] === ';' && depth === 0) {
                start = index + 1;
            } else if (text[index] === '{') {
                if (depth === 0) {
                    head = text.slice(start, index).trim().replace(/\s+/g, ' ');
                    start = index + 1;
                }

                depth += 1;
            } else if (text[index] === '}') {
                depth -= 1;

                if (depth === 0) {
                    if (head.startsWith('@')) {
                        walk(text.slice(start, index), `${context}${head} `);
                    } else {
                        members(head).forEach((selector) => keys.push(`${context}${selector.replace(/\s*([>+~])\s*/g, ' $1 ')}`));
                    }

                    start = index + 1;
                }
            }
        }
    };

    walk(css.replace(/\/\*[\s\S]*?\*\//g, ''), '');

    return keys;
};

// The pairs of site.css rules that have the same weight and match the same elements: the first rule must come first.
const CASCADE = [
    ['.page__main a', '.post-card__title a'],
    ['.page__main a:hover', '.post-card__title a:hover'],
    ['html.dark .page__main a:hover', 'html.dark .post-card__title a:hover'],
    ['.prose p', '.alert p'],
    ['@media (max-width: 1439px) .page__side', '@media (max-width: 1023px) .page__side'],
    ['.post-card__title a', '.prose a'],
    ['@media (min-width: 768px) .page__inner', '@media (min-width: 1024px) .page__inner'],
    ['@media (min-width: 1024px) .page__inner', '@media (min-width: 1280px) .page__inner'],
];

// The pairs of CASCADE that the keys (of ruleKeys) do not have in the correct order. A missing rule is a problem too.
const cascadeProblems = (keys) => CASCADE
    .filter(([first, second]) => !(keys.includes(first) && keys.includes(second) && keys.lastIndexOf(first) < keys.indexOf(second)))
    .map(([first, second]) => `${first} before ${second}`);

// The rules of a stylesheet that remove the focus ring of the browser: the selector of each rule that sets outline,
// outline-style or outline-width to 0 (with or without a unit) or none.
const outlineRemovals = (css) => [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter((match) => /\boutline(?:-style|-width)?\s*:\s*(?:0[a-z]*|none)(?![\w.%-])/.test(match[2]))
    .map((match) => match[1].trim());

test('the source scan covers the stylesheet, components, layout and pages, not tests, posts or the tokens file', () => {
    // A token that only a component uses must count as used.
    const files = sourceFiles();

    for (const file of ['public/css/site.css', 'src/components/Header.astro', 'src/components/Meta.astro', 'src/layouts/Base.astro', 'src/pages/404.astro']) {
        assert.ok(files.includes(file), file);
    }
    assert.ok(files.includes('public/css/common.css'), 'the tokens of the shared nav and footer count as used');
    assert.ok(files.includes('public/css/sidebar.css'), 'the tokens of the shared sidebar count as used');

    assert.ok(!files.includes('public/css/tokens.css'));
    assert.ok(!files.some((file) => file.endsWith('.test.mjs') || file.startsWith('src/content/')));
});

test('the blog stylesheet is public/css/site.css, and no file names the old name', () => {
    // Each Phalcon site calls its own stylesheet site.css (the sites roadmap, Open Item 2).
    const files = [
        ...sourceFiles(),
        'README.md',
        'astro.config.mjs',
        'scripts/update-tokens.mjs',
        'scripts/verify-build.mjs',
        'src/lib/code-theme.test.mjs',
    ];

    assert.ok(existsSync(new URL('public/css/site.css', root)), 'public/css/site.css');
    assert.deepEqual(files.filter((file) => readFileSync(new URL(file, root), 'utf8').includes('newdesign')), []);
});

test('no source types a color', () => {
    // Colors come from public/css/tokens.css (phalcon/assets), so a palette change is made once. The copies of
    // common.css and of sidebar.css are not this site's source: phalcon/assets checks their colors, and their
    // comments can name colors. A data URI hides a hex color as %23…, and an SVG paint attribute can type one
    // (fill="white").
    const color = /#[0-9a-fA-F]{3,8}\b|rgba?\(|%23[0-9a-fA-F]{3,8}\b|\b(?:fill|stroke|stop-color|flood-color|lighting-color)=["'](?!currentColor|none|var\(|url\(|inherit|transparent)[^"']+["']/g;
    const typed = sourceFiles().filter((file) => !['public/css/common.css', 'public/css/sidebar.css'].includes(file)).flatMap((file) =>
        readFileSync(new URL(file, root), 'utf8')
            .split('\n')
            .flatMap((line, index) => [...line.matchAll(color)].map((match) => `${file}:${index + 1} ${match[0]}`))
    );

    assert.deepEqual(typed, []);
});

test('the tokens file defines every token that the blog uses', () => {
    const tokens = readFileSync(new URL('public/css/tokens.css', root), 'utf8');

    assert.deepEqual(missingTokens(tokens, usedBySite()), []);
});

test('the source scan counts a token that a component reads by name', () => {
    // Meta.astro and site.webmanifest.ts give --ph-dark-bg to resolveToken(), for the browser bar. A text with a token
    // only in quotes shows that the scan counts a name.
    assert.deepEqual([...tokensIn("resolveToken(tokens, '--ph-only-named'); color: var(--ph-in-var);")].sort(), ['--ph-in-var', '--ph-only-named']);
    assert.ok(usedBySite().has('--ph-dark-bg'), '--ph-dark-bg');
});

test('the CI workflow gets the design files before the tests', () => {
    // The tests and the build must see the files that the deploy publishes.
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');
    const step = workflow.indexOf('run: node scripts/update-tokens.mjs');

    assert.ok(step > 0, 'the step is missing');
    assert.ok(step < workflow.indexOf('run: npm test'), 'the step must come before the tests');
});

test('the CI workflow and the refresh script read phalcon/assets from assets.phalcon.io', () => {
    // assets.phalcon.io is the CDN of the Phalcon sites. Cloudflare answers a
    // .html URL with a 308 to the URL without .html, so curl must follow it (-L).
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');
    const script = readFileSync(new URL('scripts/update-tokens.mjs', root), 'utf8');

    assert.doesNotMatch(workflow, /raw\.githubusercontent\.com/, 'main.yml');
    assert.doesNotMatch(script, /raw\.githubusercontent\.com/, 'update-tokens.mjs');
    assert.match(script, /const SOURCE = 'https:\/\/assets\.phalcon\.io\/phalcon';/);
    assert.match(workflow, /curl -fsSL -o src\/fanart\.html \\\n\s+https:\/\/assets\.phalcon\.io\/phalcon\/fanart-fragment\.html/);
    assert.match(workflow, /curl -fsSL -o src\/sponsors\.json \\\n\s+https:\/\/assets\.phalcon\.io\/phalcon\/sponsors\.json/);
});

test('the CI workflow gets the design tools first, and keeps the committed copy when a file is not valid', () => {
    // The tools come from assets.phalcon.io. The design files and the tests must use the tools that the build uses.
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');
    const step = workflow.indexOf('https://assets.phalcon.io/phalcon/tools/$file');

    assert.ok(step > 0, 'the step is missing');
    assert.ok(step < workflow.indexOf('run: node scripts/update-tokens.mjs'), 'the step must come before the design files');
    assert.match(workflow, /for file in design-checks\.mjs design-refresh\.mjs stars\.mjs; do/);
    assert.match(workflow, /new="src\/lib\/\$\{file%\.mjs\}\.new\.mjs"/);
    assert.match(workflow, /curl -fsSL --max-time 30 -o "\$new" "https:\/\/assets\.phalcon\.io\/phalcon\/tools\/\$file" && node --check "\$new"/);
});

test('the refresh script copies the shared files and checks each one', () => {
    const script = readFileSync(new URL('scripts/update-tokens.mjs', root), 'utf8');
    const entries = [
        ['public/css/tokens.css', 'css/tokens.css'],
        ['src/code-theme.json', 'css/code-theme.json'],
        ['public/css/common.css', 'css/common.css'],
        ['public/css/sidebar.css', 'css/sidebar.css'],
        ['src/sidebar.json', 'sidebar.json'],
        ['src/footer.json', 'footer.json'],
        ['src/repositories.json', 'repositories.json'],
    ];

    for (const [copy, name] of entries) {
        const entry = `copy: '${copy}',\n            name: '${name}',`;

        assert.ok(script.includes(entry), copy);
    }

    assert.ok(script.includes("problems: (text) => commonCssProblems(text, readFileSync('public/css/tokens.css', 'utf8')),"));
    assert.ok(script.includes('problems: footerProblems,'));
    assert.ok(script.includes("problems: (text) => sidebarCssProblems(text, readFileSync('public/css/tokens.css', 'utf8')),"));
    assert.ok(script.includes('problems: sidebarProblems,'));
    // The tokens come first: the checks of common.css and sidebar.css must read the new tokens copy.
    assert.ok(
        script.indexOf("copy: 'public/css/tokens.css'")
            < Math.min(script.indexOf("copy: 'public/css/common.css'"), script.indexOf("copy: 'public/css/sidebar.css'")),
        'the tokens must come before common.css and sidebar.css',
    );
});

test('the refresh script copies the icons of phalcon/assets as bytes, and checks each one', () => {
    // An icon is an image: refresh() must read, compare and write its bytes (binary: true). The copies are at the root
    // of the site, where browsers and other clients ask for /favicon.ico.
    const script = readFileSync(new URL('scripts/update-tokens.mjs', root), 'utf8');
    const entries = [
        ['public/favicon.ico', 'favicons/favicon.ico', 'icoProblems'],
        ['public/favicon.svg', 'favicons/favicon.svg', 'svgProblems'],
        ['public/apple-touch-icon.png', 'favicons/apple-touch-icon.png', '(bytes) => pngProblems(bytes, 180)'],
        ['public/android-chrome-192x192.png', 'favicons/android-chrome-192x192.png', '(bytes) => pngProblems(bytes, 192)'],
        ['public/android-chrome-512x512.png', 'favicons/android-chrome-512x512.png', '(bytes) => pngProblems(bytes, 512)'],
    ];

    for (const [copy, name, check] of entries) {
        assert.ok(script.includes(`binary: true,\n            copy: '${copy}',\n            name: '${name}',\n            problems: ${check},`), copy);
    }
});

test('the committed footer.json has no problems', () => {
    // Footer.astro reads this copy at build time.
    assert.deepEqual(footerProblems(readFileSync(new URL('src/footer.json', root), 'utf8')), []);
});

test('the committed sidebar.json has no problems', () => {
    // Sidebar.astro reads this copy at build time.
    assert.deepEqual(sidebarProblems(readFileSync(new URL('src/sidebar.json', root), 'utf8')), []);
});

test('sidebar.css has a rule for every ph-side class that the sidebar uses', () => {
    // A class that phalcon/assets renames would leave the sidebar with no style. The tests run after the refresh.
    // The tags box of the blog is on the shared box too.
    const css = readFileSync(new URL('public/css/sidebar.css', root), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const used = ['src/components/Sidebar.astro', 'src/components/Sponsors.astro', 'src/components/SidebarTags.astro']
        .flatMap((file) => [...readFileSync(new URL(file, root), 'utf8').matchAll(/class="([^"]*)"/g)])
        .flatMap((match) => match[1].split(/\s+/))
        .filter((name) => name.startsWith('ph-side'));
    const missing = [...new Set(used)].filter((name) => !new RegExp(`\\.${name}(?![\\w-])`).test(css));

    assert.ok(used.length >= 10, 'the sidebar uses the shared classes');
    assert.deepEqual(missing, []);
});

test('no source names a class of the old shared sheet (phalcon-blog)', () => {
    // The page classes have neutral names, as on the license site, and the sidebar has the shared classes (the
    // sites roadmap, Open Item 15). The copies from phalcon/assets are not this site's source: the CI workflow gets
    // them again before the tests, and a comment in one of them must not stop the deploy.
    const copies = [
        'public/css/common.css',
        'public/css/sidebar.css',
        'src/lib/design-checks.mjs',
        'src/lib/design-refresh.mjs',
        'src/lib/stars.mjs',
    ];
    const named = sourceFiles()
        .filter((file) => !copies.includes(file))
        .filter((file) => readFileSync(new URL(file, root), 'utf8').includes('phalcon-blog'));

    assert.deepEqual(named, []);
});

test('site.css has one rule for each selector in each context', () => {
    // The sites roadmap, Open Item 12: each element of a component has one rule, then its states and its width rules,
    // so that a change to it is made in one place.
    const counts = new Map();

    ruleKeys(readFileSync(new URL('public/css/site.css', root), 'utf8')).forEach((key) => counts.set(key, (counts.get(key) ?? 0) + 1));
    assert.ok(counts.size > 100, 'the walk finds the rules');
    assert.deepEqual([...counts].filter(([, count]) => count > 1).map(([key]) => key), []);
});

test('the rule walk skips an at-rule with no block', () => {
    assert.deepEqual(ruleKeys('@import url("a.css");\n.a { color: red; }'), ['.a']);
});

test('the rule walk gives one key for a selector with or without spaces around a combinator', () => {
    assert.deepEqual(ruleKeys('a>b {} a > b {} a+b {} a ~ b {}'), ['a > b', 'a > b', 'a + b', 'a ~ b']);
});

test('the rule walk counts a tone selector that is in a list with its light selector', () => {
    assert.deepEqual(ruleKeys('.x, html.dark .x {} html.dark .x {}'), ['.x', 'html.dark .x', 'html.dark .x']);
});

test('site.css keeps the order of the rules whose order sets the look', () => {
    // A later rule wins over an earlier rule of the same weight (the header comment of site.css).
    assert.deepEqual(cascadeProblems(ruleKeys(readFileSync(new URL('public/css/site.css', root), 'utf8'))), []);
});

test('the cascade order check finds a missing rule and a pair in the wrong order', () => {
    const keys = CASCADE.flat();

    assert.deepEqual(cascadeProblems(keys), []);
    assert.deepEqual(cascadeProblems(keys.filter((key) => key !== '.alert p')), ['.prose p before .alert p']);
    assert.deepEqual(cascadeProblems([...keys.filter((key) => key !== '.prose p'), '.prose p']), ['.prose p before .alert p']);
});

test('the cascade order check knows the post card titles in the post text and the widths of the page', () => {
    // On the tag pages the post cards are in .prose, so .prose a sets their title links. The min-width rules of
    // .page__inner come in the order of their widths.
    const keys = ruleKeys(readFileSync(new URL('public/css/site.css', root), 'utf8'));
    const swap = (one, two) => keys.map((key) => (key === one ? two : key === two ? one : key));
    const widths = ['@media (min-width: 768px) .page__inner', '@media (min-width: 1024px) .page__inner', '@media (min-width: 1280px) .page__inner'];

    assert.deepEqual(cascadeProblems(swap('.post-card__title a', '.prose a')), ['.post-card__title a before .prose a']);
    assert.deepEqual(cascadeProblems(swap(widths[0], widths[1])), [`${widths[0]} before ${widths[1]}`]);
    assert.deepEqual(cascadeProblems(swap(widths[1], widths[2])), [`${widths[1]} before ${widths[2]}`]);
});

test('common.css has a rule for every ph- class that the nav and the footer use', () => {
    // A class that phalcon/assets renames would leave an element with no style. The tests run after the refresh,
    // so the deploy stops before it publishes.
    const css = readFileSync(new URL('public/css/common.css', root), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const used = ['src/components/Header.astro', 'src/components/Footer.astro']
        .flatMap((file) => [...readFileSync(new URL(file, root), 'utf8').matchAll(/class="([^"]*)"/g)])
        .flatMap((match) => match[1].split(/\s+/))
        .filter((name) => name.startsWith('ph-'));
    const missing = [...new Set(used)].filter((name) => !new RegExp(`\\.${name}(?![\\w-])`).test(css));

    assert.ok(used.length > 30, 'the nav and the footer use the shared classes');
    assert.deepEqual(missing, []);
});

test('the nav has the links of phalcon.io, with absolute addresses', () => {
    // The blog is not on phalcon.io: a relative link of phalcon.io (/download) would point into the blog. The
    // scripts come after the markup; the search script writes links to the blog's own pages.
    const header = readFileSync(new URL('src/components/Header.astro', root), 'utf8').split('<script')[0];
    const links = [...header.matchAll(/href: '([^']*)'|href="([^"]*)"/g)].map((match) => match[1] ?? match[2]);

    assert.ok(links.length >= 15, `${links.length} links`);
    assert.deepEqual(links.filter((href) => !href.startsWith('https://') && href !== '/'), []);
});

test('the theme switcher shows a ring for the keyboard focus', () => {
    // WCAG 2.4.7: a keyboard user sees where the focus is. A mouse click shows no ring (:focus-visible).
    const css = readFileSync(new URL('public/css/site.css', root), 'utf8');

    assert.doesNotMatch(/\.switcher button \{[^}]*\}/.exec(css)?.[0] ?? '', /outline:\s*none/);
    assert.match(css, /\.switcher button:focus-visible \{\s*outline: 2px solid var\(--ph-white\);\s*outline-offset: 2px;\s*\}/);
});

test('the page keeps the focus ring of the browser', () => {
    // WCAG 2.4.7: a keyboard user sees which element has the focus (a link, a code block). The browser shows its ring
    // for the keyboard focus only (:focus-visible). Only the search box removes the ring: it has its own focus sign
    // (a white background).
    assert.deepEqual(outlineRemovals(readFileSync(new URL('public/css/site.css', root), 'utf8')), ['input:focus']);
});

test('the focus ring check finds each way to remove the ring', () => {
    const css = [
        'a { outline: 0; }',
        'b { outline: none }',
        'c { outline: 0px; }',
        'd { outline-style: none; }',
        'e { outline-width: 0; }',
        'f { outline: none !important; }',
        '@media (min-width: 1px) { g { outline: 0; } }',
        'h { outline: 2px solid red; }',
        'i { outline-offset: 0; }',
        'j { outline: 0.5px solid red; }',
    ].join('\n');

    assert.deepEqual(outlineRemovals(css), ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
});

test('the CI workflow runs one deploy at a time on each branch, as phalcon.io does', () => {
    // Two pushes close together must not let the older build publish last.
    // A group keeps only one waiting run, so a pull request run must not cancel a waiting master run.
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');

    assert.match(workflow, /\nconcurrency:\n {2}group: deploy-\$\{\{ github\.ref \}\}\n {2}cancel-in-progress: false\n/);
});

test('the CI workflow keeps the committed design tools when a new file lacks one of their exports', () => {
    // The site imports the functions by name: a new file with an export less would stop the refresh.
    const workflow = readFileSync(new URL('.github/workflows/main.yml', root), 'utf8');

    assert.match(workflow, /node --check "\$new" \\\n\s+&& node --input-type=module -e "\$EXPORTS" "\$new" "src\/lib\/\$file"; then/);
    assert.match(workflow, /Object\.keys\(last\)\.every\(\(name\) => name in next\)/);
});

test('the committed repositories.json has a star count for cphalcon', () => {
    // The nav reads this copy at build time. The refresh replaces it only with a file that has a count.
    const json = readFileSync(new URL('src/repositories.json', root), 'utf8');

    assert.notEqual(cphalconStars(json), null);
});

test('the nav has the Discord icon in the end group of common.css, after the links', () => {
    // The Discord icon of roadmap Phase 9. On the blog it does not show below 640px and from 1024px to 1200px
    // (site.css): there the search button needs the room. The link has a name for screen readers; the SVG has none.
    // The order of the end group: the links, the icon, the search button, the theme switcher, the burger.
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');
    const order = ['class="ph-nav__end"', 'class="ph-nav__links"', 'class="ph-nav__discord"', 'class="header__search-toggle"', 'class="switcher"', 'class="ph-nav__burger"']
        .map((part) => nav.indexOf(part));
    const glyph = /class="ph-nav__discord"[^>]*>\s*<svg[^>]*>\s*<path fill="currentColor" d="([^"]+)"\/>/.exec(nav)?.[1] ?? '';

    assert.ok(order.every((at, index) => at > (order[index - 1] ?? -1)), `the places: ${order.join(', ')}`);
    // The burger is the last item of the end group, and the end group is the last item of the bar. The search row
    // comes after the bar.
    assert.match(nav, /<span class="ph-nav__burger-line"><\/span>\s*<\/button>\s*<\/div>\s*<\/div>\s*<div id="header-search-row"/);
    assert.match(nav, /<a href="https:\/\/phalcon\.io\/discord" class="ph-nav__discord" aria-label="Discord">\s*<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">/);
    // The Discord glyph of Simple Icons 16.32.0 (CC0-1.0), the same on every site.
    assert.equal(createHash('sha256').update(glyph).digest('hex'), '6806ec0e2319eb7f7d9f5d02636a197d42903ff8f8e9bab0c267c8fabc1b03fe');
});

test('the nav uses the end group of common.css, not one of its own', () => {
    // .nav-end was the end group of the blog before common.css had .ph-nav__end.
    const files = ['src/components/Header.astro', 'public/css/site.css'];

    assert.deepEqual(files.filter((file) => readFileSync(new URL(file, root), 'utf8').includes('nav-end')), []);
});

test('the nav has the GitHub icon and the star count as the last item of the links, left of the Discord icon', () => {
    // The end of the bar: the links (the search box, then the GitHub icon and the star count), then the Discord icon
    // (roadmap Phase 9). The link has a name for screen readers; the SVG has none.
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');
    const github = /<a href=\{github\} class="ph-nav__github" aria-label=\{`GitHub, \$\{stars\} stars`\}>\s*<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">\s*<path fill="currentColor" d="([^"]+)"\/>\s*<\/svg>\s*<span class="ph-nav__stars">★ \{stars\}<\/span>\s*<\/a>\s*<\/div>\s*<a href="https:\/\/phalcon\.io\/discord"/.exec(nav);

    assert.ok(github, 'the GitHub link, with its icon and the star count, is the last item of the links');
    assert.ok(nav.indexOf('class="ph-nav__cta"') < nav.indexOf('class="header__search-wrapper"'), 'the search box comes after "Get Phalcon"');
    assert.ok(nav.indexOf('class="header__search-wrapper"') < nav.indexOf('class="ph-nav__github"'), 'the GitHub link comes after the search box');
    // The GitHub glyph of Simple Icons 16.32.0 (CC0-1.0), the same on every site.
    assert.equal(createHash('sha256').update(github?.[1] ?? '').digest('hex'), 'd82e21f6c9bfbfd889fed4b8d8604121be1d364ef75b7fe42cc9c0b8737ae529');
});

test('the nav has a search button and a search row for the widths up to 1200px', () => {
    // The search button opens the search row below the bar, and the row has its own field. The page has one results
    // panel: the script puts it below the field in use, so no id is on two elements.
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');

    assert.match(nav, /<button\s+id="header-search-toggle"\s+class="header__search-toggle"\s+aria-label="Search"\s+aria-expanded="false"\s+aria-controls="header-search-row"\s*>\s*<svg [^>]*aria-hidden="true" focusable="false">/);
    assert.match(nav, /<\/div>\s*<div id="header-search-row" hidden class="header__search-row">\s*<input\s+type="text"\s+id="header-search-row-input"\s+class="header__search"\s+placeholder="Search\.\.\."\s+aria-label="Search"\s+autocomplete="off"\s*>\s*<\/div>\s*<div id="nav-mobile"/);
    assert.equal(nav.match(/id="header-search-results"/g)?.length, 1);
    assert.equal(nav.match(/id="articles"/g)?.length, 1);
});

test('site.css shows the search button and the search row up to 1200px, and hides the Discord icon where the bar has little room', () => {
    // Up to 1200px the search button and the search row show in place of the search box. The Discord icon does not
    // show below 640px and from 1024px to 1200px. common.css keeps the icon at every width for the other sites.
    const css = readFileSync(new URL('public/css/site.css', root), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

    assert.match(css, /\n\.header__search-toggle \{[^}]*\sdisplay: none;/);
    assert.match(css, /@media screen and \(max-width: 1200px\) \{\s*\.header__search-wrapper \{\s*display: none;\s*\}\s*\.header__search-toggle \{\s*display: flex;\s*\}\s*\}/);
    assert.match(css, /@media screen and \(min-width: 1201px\) \{\s*\.header__search-row \{\s*display: none;\s*\}\s*\}/);
    assert.match(css, /@media \(max-width: 639px\), \(min-width: 1024px\) and \(max-width: 1200px\) \{\s*\.ph-nav__discord \{\s*display: none;\s*\}\s*\}/);
    assert.deepEqual(ruleKeys(css).filter((key) => key.endsWith('.ph-nav__discord')), ['@media (max-width: 639px), (min-width: 1024px) and (max-width: 1200px) .ph-nav__discord']);
});

test('the field of the search row has 16px text, so that iOS does not zoom the page', () => {
    // iOS Safari zooms the page when a field with text under 16px gets the focus, and the search button puts the focus
    // in the field of the row. The search box of the links (above 1200px) keeps its 12px text.
    const css = readFileSync(new URL('public/css/site.css', root), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

    assert.match(css, /\n\.header__search-row \.header__search \{[^}]*\sfont-size: 16px;/);
    assert.match(css, /\n\.header__search \{[^}]*\sfont-size: 12px;/);
});

test('the search script listens on the two fields and puts the one results panel below the field in use', () => {
    // The browser checks of the dry run (tools/behavior.mjs) run outside the CI. These tests keep each part of the
    // script that the checks found correct.
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');

    assert.match(nav, /const fields = \['header-search-input', 'header-search-row-input'\]/);
    assert.match(nav, /input\.addEventListener\('input', \(\) => \{[^}]*?input\.after\(panel\);/);
    assert.match(nav, /if \(!panel\.contains\(event\.target\) && !fields\.some\(\(field\) => field === event\.target\)\) \{\s*panel\.hidden = true;/);
});

test('the search button opens and closes the search row, and closes the mobile menu', () => {
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');

    ['header-search-toggle', 'header-search-row', 'header-search-row-input', 'nav-burger', 'nav-mobile']
        .forEach((id) => assert.match(nav, new RegExp(`document\\.getElementById\\('${id}'\\)`), id));
    assert.match(nav, /const show = \(open: boolean\): void => \{\s*row\.hidden = !open;\s*toggle\.setAttribute\('aria-expanded', String\(open\)\);\s*\};/);
    assert.match(nav, /toggle\.addEventListener\('click', \(\) => \{\s*const open = row\.hidden !== false;\s*show\(open\);\s*if \(open\) \{\s*menu\.hidden = true;\s*burger\.setAttribute\('aria-expanded', 'false'\);\s*rowInput\.focus\(\);\s*\}\s*\}\);/);
});

test('the burger and Escape close the search row, and Escape puts the focus on the search button', () => {
    const nav = readFileSync(new URL('src/components/Header.astro', root), 'utf8');
    const escape = /rowInput\.addEventListener\('keydown', \(event\) => \{\s*if \(event\.key === 'Escape'\) \{\s*show\(false\);\s*toggle\.focus\(\);/;

    assert.match(nav, /burger\.addEventListener\('click', \(\) => \{\s*show\(false\);\s*\}\);/);
    assert.match(nav, escape);
    // The Escape handler of the fields puts the focus in the field. The handler of the row must come after it.
    assert.ok(nav.indexOf("input.addEventListener('keydown'") > -1, 'the fields have an Escape handler');
    assert.ok(nav.indexOf("input.addEventListener('keydown'") < nav.search(escape), 'the Escape handler of the row comes after the one of the fields');
});

test('the social card address has a version, so that platforms fetch a new card', () => {
    // A platform (Discord, X, LinkedIn) keeps a preview image by its address. Change the version when the card changes.
    const meta = readFileSync(new URL('src/components/Meta.astro', root), 'utf8');

    assert.equal(meta.match(/"https:\/\/assets\.phalcon\.io\/phalcon\/social\/github\.phalcon\.blog\.png\?v=2"/g)?.length, 3);
    assert.doesNotMatch(meta, /github\.phalcon\.blog\.png"/);
});

test('Built with Phalcon links to the page on phalcon.io', () => {
    // The page replaces builtwith.phalcon.io (2026-10-14). src/footer.json is the committed copy of phalcon/footer.json.
    for (const file of ['src/components/Header.astro', 'src/footer.json']) {
        const source = readFileSync(new URL(file, root), 'utf8');

        assert.match(source, /["']Built with Phalcon["'], ["']?href["']?: ["']https:\/\/phalcon\.io\/built-with["']/, file);
        assert.doesNotMatch(source, /builtwith\.phalcon\.io/, file);
    }
});
