import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Post file names keep the Jekyll shape `YYYY-MM-DD-slug.mdx`. Only the slug
 * part becomes the URL, so `/post/<slug>` stays what it is today.
 */
const stripDatePrefix = ({ entry }: { entry: string }): string =>
    entry.replace(/\.[^.]+$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

const posts = defineCollection({
    loader: glob({
        base: './src/content/posts',
        pattern: '**/*.{md,mdx}',
        generateId: stripDatePrefix,
    }),
    schema: z.object({
        date: z.coerce.date(),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
        title: z.string(),
    }),
});

export const collections = { posts };
