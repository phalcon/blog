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

use Kitsune\Exceptions\Exception as KException;

class PostFinder
{
    private $data  = [];
    private $tags  = [];
    private $links = [];
    private $dates = [];

    public function __construct()
    {
        $sourceFile = K_PATH . '/var/config/posts.json';

        if (!file_exists($sourceFile)) {
            throw new KException('Posts JSON file cannot be located');
        }

        $contents = file_get_contents($sourceFile);
        $data     = json_decode($contents, true);

        if (false === $data) {
            throw new KException('Posts JSON file is potentially corrupted');
        }

        /**
         * First all the data will go in a master array
         */
        foreach ($data as $post) {
            $slug = $post['slug'];
            $link = $post['link'];
            $date = $post['date'];
            $dateParts = explode("-", $date);

            /**
             * Add the post in the master array
             */
            $this->data[$slug] = $post;

            /**
             * Tags
             */
            $tags = explode(',', $post['tags']);
            foreach ($tags as $tag) {
                $this->tags[trim($tag)][] = $slug;
            }

            /**
             * Links
             */
            $this->links[$link] = $slug;

            /**
             * Dates (sorting)
             */
            $this->dates[$date] = $dateParts[0] . '/' . $dateParts[1] . '/' . $date . '-' . $slug;
        }

        /**
         * Sort the dates array
         */
        krsort($this->dates);
    }

    public function getLatest($number)
    {
        $posts = [];
        foreach (array_slice($this->dates, 0, $number) as $post) {
            $posts[] = K_PATH . '/data/posts/' . $post . '.md';
        }
        return $posts;
    }
}
