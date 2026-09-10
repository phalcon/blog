import { getCollection, type CollectionEntry } from 'astro:content';

import { tagSlug } from './text.mjs';

export type Post = CollectionEntry<'posts'>;

export interface TagCount {
    count: number;
    slug: string;
    tag: string;
}

/** Jekyll permalink shape: `/post/:title`, with no trailing slash. */
export function postUrl(post: Post): string {
    return `/post/${post.id}`;
}

export function tagUrl(tag: string): string {
    return `/tag/${tagSlug(tag)}`;
}

/** Every post, newest first. */
export async function allPosts(): Promise<Post[]> {
    const posts = await getCollection('posts');

    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Every tag with its post count, most used first, then alphabetical. */
export function tagCounts(posts: Post[]): TagCount[] {
    /*
     * Keyed by slug, not by the raw tag. The tag pages build one route per
     * entry, so tags differing only in case, punctuation or surrounding
     * whitespace must collapse into one entry. The posts carry both "update"
     * and "update ". The first spelling seen supplies the label.
     */
    const counts = new Map<string, { count: number; tag: string }>();

    for (const post of posts) {
        for (const tag of post.data.tags) {
            const name = tag.trim();
            const slug = tagSlug(name);
            const seen = counts.get(slug);

            counts.set(slug, { count: (seen?.count ?? 0) + 1, tag: seen?.tag ?? name });
        }
    }

    return [...counts.entries()]
        .map(([slug, { count, tag }]) => ({ count, slug, tag }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** The posts carrying one tag, newest first. `posts` must already be sorted. */
export function postsByTag(posts: Post[], slug: string): Post[] {
    return posts.filter((post) => post.data.tags.some((tag) => tagSlug(tag) === slug));
}
