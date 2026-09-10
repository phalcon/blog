// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeMermaid } from './src/lib/rehype-mermaid';

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
        rehypePlugins: [rehypeMermaid],
        /* Mermaid fences are rendered by the Mermaid component, not Shiki.
           `excludeLangs` lives under `syntaxHighlight`, not `shikiConfig`. */
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['mermaid'],
        },
        shikiConfig: {
            themes: {
                dark: 'github-dark-default',
                light: 'github-light-default',
            },
            wrap: false,
        },
    },
    server: {
        host: true,
        port: 4321,
    },
    vite: {
        optimizeDeps: {
            /*
             * Without this, Vite re-optimizes mermaid mid dev session and the
             * page holds a stale import hash, so the request answers 504.
             */
            include: ['mermaid'],
        },
    },
});
