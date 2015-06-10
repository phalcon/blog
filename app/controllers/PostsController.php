<?php

namespace Kitsune\Controllers;

use Phalcon\Mvc\Controller;

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
        $this->dispatcher->forward(
            [
                'controller' => 'errors',
                'action'     => 'show404'
            ]
        );
    }
}
