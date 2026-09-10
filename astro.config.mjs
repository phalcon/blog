// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.phalcon.io',
    /*
     * Jekyll wrote `post/slug.html`, so the live URL is `/post/slug` with no
     * trailing slash. `file` plus `never` reproduces that exactly. Changing
     * either one moves every post.
     */
    build: {
        format: 'file',
    },
    trailingSlash: 'never',
    integrations: [mdx(), sitemap()],
    markdown: {
        shikiConfig: {
            /* Replaced in task 9 after a side-by-side check against Rouge. */
            theme: 'nord',
            wrap: false,
        },
    },
    server: {
        host: true,
        port: 4321,
    },
});
