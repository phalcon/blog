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
        $this->view->posts = $this->finder->getLatest(5);
    }

    public function viewAction($slug)
    {
        vdd($slug);
    }

    public function viewLegacyAction($time, $slug)
    {
        vdd($slug);
    }
}
