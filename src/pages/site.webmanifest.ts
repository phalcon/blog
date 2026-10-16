/*
 * The web app manifest of the blog: its name, and the icons of public/
 * (copies of phalcon/favicons/ in phalcon/assets) for a home screen. The short
 * name is the site part only, so that a home screen does not cut it: the icon
 * shows the brand. A home screen icon opens the blog in the browser (display:
 * browser): it is a web site, not an app. The colors come from the design
 * tokens, as in Meta.astro.
 */
import type { APIRoute } from 'astro';

import tokens from '../../public/css/tokens.css?raw';
import { resolveToken } from '../lib/design-checks.mjs';
import { site } from '../site';

export const GET: APIRoute = () => {
    const color = resolveToken(tokens, '--ph-dark-bg');
    const manifest = {
        name: site.name,
        short_name: 'Blog',
        description: site.description,
        start_url: '/',
        display: 'browser',
        background_color: color,
        theme_color: color,
        icons: [
            { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    };

    return new Response(`${JSON.stringify(manifest, null, 4)}\n`, { headers: { 'Content-Type': 'application/manifest+json' } });
};
