import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { allPosts, postUrl } from '../lib/posts';
import { excerpt } from '../lib/text.mjs';
import { site } from '../site';

export const GET: APIRoute = async (context) => {
    const posts = await allPosts();

    return rss({
        description: site.description,
        site: context.site ?? site.url,
        title: site.name,
        trailingSlash: false,
        items: posts.map((post) => ({
            categories: post.data.tags,
            description: excerpt(post.body, 400),
            link: postUrl(post),
            pubDate: post.data.date,
            title: post.data.title,
        })),
    });
};
