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

use \Phalcon\DI\Injectable as PhInjectable;

class Post extends PhInjectable
{
    public $content  = '';
    public $raw      = '';
    public $date     = '';
    public $year     = '';
    public $month    = '';
    public $link     = '';
    public $tags     = [];
    public $file     = '';
    public $uid      = '';

    public function __construct($post)
    {
        $dateParts      = explode("-", $post['date']);
        $this->year     = $dateParts[0];
        $this->month    = $dateParts[1];
        $this->slug     = $post['slug'];
        $this->link     = $post['link'];
        $this->date     = $post['date'];

        /**
         * Old Tumblr posts have a link so we need the unique identifier
         * from them to be able to link to disqus
         */
        if (!$this->link) {
            $this->uniqueId = $post['date'] . '-' . $post['slug'];
        } else {
            $linkParts = explode('/', $this->link);
            $this->uniqueId = 'post/' . $linkParts[0];
        }

        $this->file     = sprintf(
            '%s/%s/%s-%s.md',
            $dateParts[0],
            $dateParts[1],
            $this->date,
            $this->slug
        );

        $tags = explode(',', $post['tags']);
        foreach ($tags as $tag) {
            $this->tags[] = trim($tag);
        }

        /**
         * Get the post itself
         */
        $fileName = K_PATH . '/data/posts/' . $this->file;
        if (file_exists($fileName)) {
            $this->raw = file_get_contents($fileName);
            $this->content = $this->markdown->render($this->raw);
        }
    }
}
