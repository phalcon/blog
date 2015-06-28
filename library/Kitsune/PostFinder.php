<?php
/*
 +------------------------------------------------------------------------+
 | Kitsune                                                                |
 +------------------------------------------------------------------------+
 | Copyright (c) 2015-2015 Phalcon Team and contributors                  |
 +------------------------------------------------------------------------+
 | This source file is subject to the New BSD License that is bundled     |
 | with this package in the file docs/LICENSE.txt.                        |
 |                                                                        |
 | If you did not receive a copy of the license and are unable to         |
 | obtain it through the world-wide-web, please send an email             |
 | to license@phalconphp.com so we can send you a copy immediately.       |
 +------------------------------------------------------------------------+
*/

/**
 * PostFinder.php
 * \Kitsune\PostFinder
 *
 * Allows faster searching of blog posts
 */
namespace Kitsune;

use Phalcon\Di\Injectable as PhDiInjectable;
use Kitsune\Exceptions\Exception as KException;

class PostFinder extends PhDiInjectable
{
    private $data        = [];
    private $tags        = [];
    private $links       = [];
    private $link_number = [];
    private $dates       = [];

    public function __construct()
    {
        $sourceFile = K_PATH . '/data/posts.json';

        if (!file_exists($sourceFile)) {
            throw new KException('Posts JSON file cannot be located');
        }

        $contents = file_get_contents($sourceFile);
        $data     = json_decode($contents, true);
        $dates    = [];

        if (false === $data) {
            throw new KException('Posts JSON file is potentially corrupted');
        }

        /**
         * First all the data will go in a master array
         */
        foreach ($data as $item) {
            $post = new Post($item);

            /**
             * Add the element in the master array
             */
            $this->data[$post->slug] = $post;

            /**
             * Tags
             */
            foreach ($post->tags as $tag) {
                $this->tags[trim($tag)][] = $post->slug;
            }

            /**
             * Links
             */
            $this->links[$post->link] = $post->slug;

            /**
             * Check if the link is a tumblr one and get its number
             */
            $position = strpos($post->link, '/');
            if (false !== $position) {
                $link_number = substr($post->link, 0, $position);
                $this->link_number[$link_number] = $post->slug;
            }

            /**
             * Dates (sorting)
             */
            $dates[$post->date] = $post->slug;
        }

        /**
         * Sort the dates array
         */
        krsort($dates);
        $this->dates = $dates;
    }

    public function getLatest($number)
    {
        $posts   = [];
        $counter = 1;

        foreach ($this->dates as $key) {
            $posts[] = $this->data[$key];
            $counter = $counter + 1;

            if ($counter > $number) {
                break;
            }
        }

        return $posts;
    }

    public function get($slug)
    {
        if (is_numeric($slug)) {
            if (array_key_exists($slug, $this->link_number)) {
                $slug = $this->link_number[$slug];
                $this->response->redirect('/post/' . $slug, false, 301);
            }
        }

        return (array_key_exists($slug, $this->data)) ?
                $this->data[$slug]                    :
                null;
    }
}
