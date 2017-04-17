<?php

namespace Kitsune\Controllers;

use Phalcon\Cache\BackendInterface;
use Phalcon\Mvc\Controller as PhController;
use Phalcon\Mvc\View\Simple;

/**
 * Class DocsController
 *
 * @package Docs\Controllers
 *
 * @property BackendInterface $cacheData
 * @property \ParsedownExtra  $parsedown
 * @property Simple           $viewSimple
 */
class TagsController extends PhController
{
    public function mainAction($tag = '')
    {
        $contents = '';
//        $contents = $this
//            ->viewSimple
//            ->render(
//                'pages/index',
//                [
//                    'pages'      => $pages,
//                    'posts'      => $posts,
//                    'showDisqus' => false,
//                    'cdnUrl'     => $this->config->get('app')->get('staticUrl'),
//                ]
//            );

        $this->response->setContent($contents);

        return $this->response;

    }
}
