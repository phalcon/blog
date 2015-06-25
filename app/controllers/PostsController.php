<?php

namespace Kitsune\Controllers;

use FeedWriter\RSS2;
use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class PostsController extends Controller
{
    public function initialize()
    {
        $this->view->setTemplateAfter('main');
    }

    public function indexAction()
    {
        $this->view->showDisqus = false;
        $this->view->posts      = $this->finder->getLatest(5);
    }

    public function rssAction()
    {
        $feed = new RSS2();
        $feed->setEncoding('UTF-8');
        $feed->setTitle('Phalcon Framework Blog');
        $feed->setDescription('We are an open source web framework for PHP delivered as a C extension offering high performance and lower resource consumption');
        $feed->setLink($this->getFullUrl());


        foreach ($this->finder->getLatest(10) as $post) {
            $feedItem = new \FeedWriter\Item();
            $feedItem->setTitle($post->title);
            $feedItem->setLink($this->getFullUrl('/post/'.$post->slug));
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
    }

    public function viewLegacyAction($time, $slug)
    {
        vdd('hereL');

//        $this->dispatcher->forward(
//            [
//                'controller' => 'errors',
//                'action'     => 'show404'
//            ]
//        );
    }

    protected function getFullUrl($uri = '/')
    {
        return $this->request->getScheme() . '://' . $this->request->getServerName() . $uri;
    }
}
