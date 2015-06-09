<?php

namespace Kitsune\Controllers;

use Phalcon\Mvc\Controller;

class ErrorsController extends Controller
{
    public function initialize()
    {
        $this->view->setTemplateAfter('main');
    }

    public function show404Action()
    {

    }

    public function show500Action()
    {

    }
}
