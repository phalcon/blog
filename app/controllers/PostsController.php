<?php

namespace Kitsune\Controllers;

use FeedWriter\RSS2;
use FeedWriter\Item;
use Phalcon\Http\Response;
use Kitsune\Controller;

class PostsController extends Controller
{
    public function indexAction()
    {
        $this->view->showDisqus = false;
        $this->view->posts      = $this->finder->getLatest(5);
    }

    public function rssAction()
    {
        $feed = new RSS2();
        $feed->setEncoding('UTF-8');
        $feed->setTitle($this->config->rss->title);
        $feed->setDescription($this->config->rss->description);
        $feed->setLink($this->getFullUrl());

        foreach ($this->finder->getLatest(20) as $post) {
            $feedItem = new Item();
            $feedItem->setTitle($post->title);
            $feedItem->setLink($this->getFullUrl('/post/' . $post->slug));
            $feedItem->setDescription($post->content);
            $feedItem->setDate($post->date);

            $feed->addItem($feedItem);
        }

        $response = new Response();
        $response->setHeader('Content-Type', 'application/xml');
        $response->setContent($feed->generateFeed());

        return $response;
    }

    public function viewAction($slug)
    {
        $post = $this->finder->get($slug);

        if (is_null($post)) {
            $this->dispatcher->forward(
                [
                    'controller' => 'errors',
                    'action'     => 'show404'
                ]
            );
        }

        $this->view->showDisqus = true;
        $this->view->post       = $post;
        $this->view->title      = $post->title;
    }

    public function viewLegacyBySlugAction($time, $slug)
    {
        $this->dispatcher->forward(
            [
                'controller' => 'errors',
                'action'     => 'show404'
            ]
        );
    }

    public function viewLegacyByTimeAction($time, $slug)
    {
        $this->dispatcher->forward(
            [
                'controller' => 'errors',
                'action'     => 'show404'
            ]
        );
    }

    protected function getFullUrl($uri = '/')
    {
        return $this->request->getScheme() . '://' . $this->request->getServerName() . $uri;
    }
}
