<?php

namespace Kitsune;

use Phalcon\Mvc\Controller as PhController;

class Controller extends PhController
{
    public function initialize()
    {
        $this->view->setTemplateAfter('main');
        $this->view->cdn_url = $this->config->cdnUrl;
    }
}
