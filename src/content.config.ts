import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Post file names keep the Jekyll shape `YYYY-MM-DD-slug.mdx`. Posts sit in a
 * folder per year, and `entry` carries that folder (`2026/2026-12-25-slug.mdx`).
 * The folder is for us, not for the reader: it is dropped here with the date,
 * so `/post/<slug>` stays what it is today.
 */
const stripDatePrefix = ({ entry }: { entry: string }): string =>
    entry
        .replace(/^.*\//, '')
        .replace(/\.[^.]+$/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '');

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
