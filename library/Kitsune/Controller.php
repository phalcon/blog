<?php

namespace Kitsune;

use Phalcon\Mvc\Controller as PhController;

/**
 * Kitsune\Controller
 *
 * @property \Kitsune\PostFinder $finder
 * @property \Phalcon\Config $config
 *
 * @package Kitsune
 */
class Controller extends PhController
{
    public function initialize()
    {
        $this->view->setTemplateAfter('main');
        $this->view->setVar('cdnUrl', $this->config->cdnUrl);
        $this->view->setVar('tagCloud', $this->finder->getTagCloud());
        $this->view->setVar('version', $this->config->version);
    }
}
