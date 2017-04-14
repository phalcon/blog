<?php

namespace Kitsune\Cli\Tasks;

use Phalcon\CLI\Task as PhTask;

use FeedWriter\RSS2;
use FeedWriter\Item;
use Dariuszp\CliProgressBar as CliProgressBar;

/**
 * RegeneratePostsTask
 *
 * @property \ParsedownExtra $parsedown
 */
class RegeneratePostsTask extends PhTask
{
    private $posts = [];

    /**
     * This provides the main menu of commands if an command is not entered
     */
    public function mainAction()
    {
        $this->getPosts();
        $this->generatePostsCache();
        $this->generatePagesCache();
        $this->generateTagsCache();
        $this->generateSitemap();
        $this->generateRss();
    }

    /**
     * Iterates through the posts folder and gets the data we need
     */
    private function getPosts()
    {
        echo 'Collecting posts' . PHP_EOL;

        $fileName = APP_PATH . '/data/posts.json';
        $posts    = file_get_contents($fileName);
        $posts    = json_decode($posts, true);
        foreach ($posts as $post) {
            $this->posts[$post['date']] = $post;
        }

        krsort($this->posts);
    }

    /**
     * Generates the md -> html cache
     */
    private function generatePostsCache()
    {
        echo 'Generating Post HTML...' . PHP_EOL;

        $steps = count($this->posts);
        $bar   = new CliProgressBar($steps);
        $bar
            ->setColorToGreen()
            ->display();

        /**
         * Iterate through the posts and create the markdown->html cache
         */
        foreach ($this->posts as $post) {
            $bar->progress();
            $fileName = sprintf('%s-%s', $post['date'], $post['slug']);
            $file     = sprintf('%s/data/posts/%s.md', APP_PATH, $fileName);
            $cacheKey = 'post-' . $post['slug'] . '.cache';
            if (true === file_exists($file)) {
                $data = file_get_contents($file);
                $data = str_replace(
                    '{{ cdnUrl }}',
                    $this->config->get('app')->get('staticUrl'),
                    $data
                );
                $data = $this->parsedown->text($data);

                $post['content'] = $data;

                $this->cacheData->save($cacheKey, $post);
            }
        }
        $bar->end();
    }

    /**
     * Generates pages cache
     */
    private function generatePagesCache()
    {
        echo 'Generating Page cache...' . PHP_EOL;

        $chunks = array_chunk($this->posts, 10);
        $steps  = count($chunks);
        $bar    = new CliProgressBar($steps);
        $bar
            ->setColorToGreen()
            ->display();

        $counter = 1;
        foreach ($chunks as $chunk) {
            $page     = [];
            $cacheKey = sprintf('page-%s.cache', $counter);
            foreach ($chunk as $post) {
                $page[$post['date']] = $post;
            }

            $this->cacheData->save($cacheKey, $page);
            $counter++;
        }
        $bar->end();
    }

    /**
     * Generates tags cache
     */
    private function generateTagsCache()
    {
        echo 'Collecting tag information...' . PHP_EOL;

        $tags  = [];
        $steps = count($this->posts);
        $bar   = new CliProgressBar($steps);
        $bar
            ->setColorToGreen()
            ->display();

        foreach ($this->posts as $post) {
            $bar->progress();
            $postTags = explode(',', $post['tags']);
            foreach ($postTags as $tag) {
                $tagKey          = trim($tag);
                $tags[$tagKey][] = $post;
            }
        }
        $bar->end();

        echo 'Generating tag cache...' . PHP_EOL;
        $steps = count($tags);
        $bar   = new CliProgressBar($steps);
        $bar
            ->setColorToGreen()
            ->display();

        foreach ($tags as $tag => $posts) {
            $bar->progress();
            $cacheKey = sprintf(
                'tag-%s.cache',
                str_replace(' ', '_', $tag)
            );

            $this->cacheData->save($cacheKey, $posts);
        }

        $bar->end();
    }

    /**
     * Generates the sitemap
     */
    private function generateSitemap()
    {
        echo 'Generating Sitemap...' . PHP_EOL;

        $contents = $this->viewSimple->render(
            'pages/sitemap',
            [
                'posts' => $this->posts,
                'tags'  => [],
            ]
        );
        $cacheKey = 'sitemap.cache';

        $this->cacheData->save($cacheKey, $contents);
    }

    /**
     * Generates the RSS feed
     */
    private function generateRss()
    {
        echo 'Generating RSS...' . PHP_EOL;

        $url         = $this->config->get('app')->get('url');
        $title       = 'Phalcon Framework Blog';
        $description = 'We are an open source web framework for PHP '
                     . 'delivered as a C extension offering high '
                     . 'performance and lower resource consumption';


        $feed = new RSS2();
        $feed->setEncoding('UTF-8');
        $feed->setTitle($title);
        $feed->setDescription($description);
        $feed->setLink($url);

        $posts = $this->cacheData->get('page-1.cache');
        foreach ($posts as $post) {
            $cacheKey = sprintf('post-%s.cache', $post['slug']);
            if (true === $this->cacheData->exists($cacheKey)) {
                $data = $this->cacheData->get($cacheKey);

                $feedItem = new Item();
                $feedItem->setTitle($data['title']);
                $feedItem->setLink($url . '/post/' . $data['slug']);
                $feedItem->setDescription($data['content']);
                $feedItem->setDate($data['date']);

                $feed->addItem($feedItem);
            }
        }

        $contents = $feed->generateFeed();
        $cacheKey = 'rss.cache';

        $this->cacheData->save($cacheKey, $contents);
    }
}
