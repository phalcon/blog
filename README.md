### Phalcon Blog

<p align="center"><a href="https://docs.phalcon.io" target="_blank">
    <img src="https://assets.phalcon.io/phalcon/images/svg/phalcon-logo-transparent-black.svg" height="100" alt="Phalcon"/>
</a></p>

Phalcon PHP is a web framework delivered as a C extension providing high performance and lower resource consumption.

This is the official Phalcon Blog. You are more than welcome to download the blog and adapt the template to your needs. If you find any typos, we would welcome your feedback and pull requests.

Thanks.

#### Development

This site is built with Astro. To run it locally, start the container:

```bash
./serve -d
```

The site is then available at `http://localhost:4321`.

To build the static site:

```bash
npm run build
```

The master branch holds the site source. Cloudflare Pages serves the built
site from the `production` branch, which the CI workflow publishes on every
push to master.

#### Colors and fonts

The colors and the fonts come from `phalcon/css/tokens.css` in [phalcon/assets](https://github.com/phalcon/assets): the design tokens that every Phalcon site uses. The code theme comes from `phalcon/css/code-theme.json` there. `public/css/tokens.css` and `src/code-theme.json` are copies. Every CI run downloads the two files again before the tests and the build. When a download fails, or when a file is not correct (for example, a token that the blog uses is missing or has no value, or the theme uses a code role that `newdesign.css` does not map), the run keeps that committed copy and shows a warning.

- To change a color, change `tokens.css` in phalcon/assets. The blog gets it on its next CI run.
- To get the new files now, for a local preview or to commit them: `docker run --rm -v "$PWD:/app" -w /app node:22-alpine node scripts/update-tokens.mjs`.
- The checks and the refresh are the shared design tools of phalcon/assets: `src/lib/design-checks.mjs` and `src/lib/design-refresh.mjs` are copies of `phalcon/tools/` there, and every CI run gets them again first. Change them in phalcon/assets, not here.
- `public/css/newdesign.css` is the only stylesheet. Use a color through the tokens: `var(--nd-…)` or `var(--ph-…)`. `npm test` fails on a typed color (`#…` or `rgb(…)`) in `public/css/` and `src/`.
- Code blocks use the code theme (`src/code-theme.json`, set in `astro.config.mjs`): the rules of GitHub's dark theme with `--code-<role>` variables. `.astro-code` in `newdesign.css` maps them to the syntax tokens of each tone.

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/phalcon#sponsor)]

<a href="https://opencollective.com/phalcon/#contributors">
<img src="https://opencollective.com/phalcon/tiers/sponsors.svg?avatarHeight=48&width=800">
</a>

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/phalcon#backer)]

<a href="https://opencollective.com/phalcon/#contributors">
<img src="https://opencollective.com/phalcon/tiers/backers.svg?avatarHeight=48&width=800&height=200">
</a>

#### License

Phalcon Blog is open-sourced software licensed under the [New BSD License][6]. © Phalcon Framework Team and contributors

[6]: https://github.com/phalcon/blog/blob/master/docs/LICENSE.md
