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
 * Post.php
 * \Kitsune\PostFinder
 *
 * Represents a post
 */
namespace Kitsune;

class Post extends Phalcon\DI\Injectable
{
    public $content  = '';
    public $raw      = '';
    public $date     = '';
    public $year     = '';
    public $month    = '';
    public $link     = '';
    public $tags     = [];
    public $file     = '';

    public function __construct($post)
    {
        $dateParts     = explode("-", $post['date']);
        $this->year    = $dateParts[0];
        $this->month   = $dateParts[1];
        $this->slug    = $post['slug'];
        $this->link    = $post['link'];
        $this->content = $this->markdown->render($post['content']);
        $this->raw     = $post['content'];
        $this->date    = $post['date'];
        $this->file    = sprintf(
            '%s/%s/%s-%s',
            $dateParts[0],
            $dateParts[1],
            $this->date,
            $this->slug
        );

        $tags = explode(',', $post['tags']);
        foreach ($tags as $tag) {
            $this->tags[] = trim($tag);
        }
    }
}
