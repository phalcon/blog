import { strict as assert } from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

import { footerProblems, missingTokens } from '../src/lib/design-checks.mjs';
import { sourceFiles, usedBySite } from './token-sources.mjs';

const root = new URL('../', import.meta.url);

test('the source scan covers the stylesheet, components, layout and pages, not tests, posts or the tokens file', () => {
    // A token that only a component uses must count as used.
    const files = sourceFiles();

    for (const file of ['public/css/site.css', 'src/components/Header.astro', 'src/components/Meta.astro', 'src/layouts/Base.astro', 'src/pages/404.astro']) {
        assert.ok(files.includes(file), file);
    }
    assert.ok(files.includes('public/css/common.css'), 'the tokens of the shared nav and footer count as used');

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
    // Colors come from public/css/tokens.css (phalcon/assets), so a palette change is made once. The copy of
    // common.css is not this site's source: phalcon/assets checks its colors, and its comments can name colors. A
    // data URI hides a hex color as %23…, and an SVG paint attribute can type one (fill="white").
    const color = /#[0-9a-fA-F]{3,8}\b|rgba?\(|%23[0-9a-fA-F]{3,8}\b|\b(?:fill|stroke|stop-color|flood-color|lighting-color)=["'](?!currentColor|none|var\(|url\(|inherit|transparent)[^"']+["']/g;
    const typed = sourceFiles().filter((file) => file !== 'public/css/common.css').flatMap((file) =>
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
    // Meta.astro gives --ph-brand-400 and --ph-dark-bg to resolveToken(), for the browser colors. No stylesheet uses
    // --ph-brand-400, so it shows that the scan counts a name in quotes.
    const used = usedBySite();

    assert.ok(used.has('--ph-brand-400'), '--ph-brand-400');
    assert.ok(used.has('--ph-dark-bg'), '--ph-dark-bg');
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
    assert.match(workflow, /for file in design-checks\.mjs design-refresh\.mjs; do/);
    assert.match(workflow, /new="src\/lib\/\$\{file%\.mjs\}\.new\.mjs"/);
    assert.match(workflow, /curl -fsSL --max-time 30 -o "\$new" "https:\/\/assets\.phalcon\.io\/phalcon\/tools\/\$file" && node --check "\$new"; then/);
});

test('the refresh script copies the shared files and checks each one', () => {
    const script = readFileSync(new URL('scripts/update-tokens.mjs', root), 'utf8');
    const entries = [
        ['public/css/tokens.css', 'css/tokens.css'],
        ['src/code-theme.json', 'css/code-theme.json'],
        ['public/css/common.css', 'css/common.css'],
        ['src/footer.json', 'footer.json'],
        ['src/repositories.json', 'repositories.json'],
    ];

    for (const [copy, name] of entries) {
        const entry = `copy: '${copy}',\n            name: '${name}',`;

        assert.ok(script.includes(entry), copy);
    }

    assert.ok(script.includes("problems: (text) => commonCssProblems(text, readFileSync('public/css/tokens.css', 'utf8')),"));
    assert.ok(script.includes('problems: footerProblems,'));
    // The tokens come first: the check of common.css must read the new tokens copy.
    assert.ok(
        script.indexOf("copy: 'public/css/tokens.css'") < script.indexOf("copy: 'public/css/common.css'"),
        'the tokens must come before common.css',
    );
});

test('the committed footer.json has no problems', () => {
    // Footer.astro reads this copy at build time.
    assert.deepEqual(footerProblems(readFileSync(new URL('src/footer.json', root), 'utf8')), []);
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
