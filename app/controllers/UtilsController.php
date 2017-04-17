<?php

namespace Kitsune\Controllers;

use Phalcon\Cache\BackendInterface;
use Phalcon\Mvc\Controller as PhController;

/**
 * Class DocsController
 *
 * @package Docs\Controllers
 *
 * @property BackendInterface $cacheData
 * @property \ParsedownExtra  $parsedown
 */
class UtilsController extends PhController
{
    public function rssAction()
    {
        $cacheKey = 'rss.cache';
        if (true === $this->cacheData->exists($cacheKey)) {
            $contents = $this->cacheData->get($cacheKey);
        } else {
            $contents = '';
        }

        return $this->returnXml($contents);
    }

    public function sitemapAction()
    {
        $cacheKey = 'sitemap.cache';
        if (true === $this->cacheData->exists($cacheKey)) {
            $contents = $this->cacheData->get($cacheKey);
        } else {
            $contents = $this->viewSimple->render(
                'pages/sitemap',
                [
                    'posts' => [],
                    'tags'  => [],
                ]
            );
        }

        return $this->returnXml($contents);
    }

    private function returnXml($contents)
    {
        $this->response->setHeader('Content-Type', 'application/xml');
        $this->response->setContent($contents);

        return $this->response;
    }
}
