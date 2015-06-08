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
        $this->view->something = $this->markdown->render(
            file_get_contents(
                K_PATH . '/data/posts/2015-05-26-phalcon-2.0.2-released.md'
            )
        );
    }
}
