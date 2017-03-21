<?php

namespace Kitsune\Controllers;

use Phalcon\Cache\BackendInterface;
use Phalcon\Config;
use Phalcon\Mvc\Controller as PhController;
use Phalcon\Mvc\View\Simple;

/**
 * Class DocsController
 *
 * @package Docs\Controllers
 *
 * @property Config           $config
 * @property BackendInterface $cacheData
 * @property \ParsedownExtra  $parsedown
 * @property BackendInterface $viewCache
 * @property Simple           $viewSimple
 */
class PagesController extends PhController
{
    /**
     * Shows the front page or additional pages after that
     *
     * @param int $page
     *
     * @return \Phalcon\Http\Response|\Phalcon\Http\ResponseInterface
     */
    public function mainAction($page = 1)
    {
        $page         = (0 === $page) ? 1 : $page;
        $viewCacheKey = sprintf('view-page-%s.cache', $page);
        $cacheKey     = sprintf('page-%s.cache', $page);
        $posts        = [];
        $pages        = [
            'previous' => 0,
            'next'     => 0,
        ];

        /**
         * Check the viewCache first
         */
        if ('production' === $this->config->get('app')->get('env') &&
            true === $this->viewCache->exists($viewCacheKey)) {
            $contents = $this->viewCache->get($viewCacheKey);
        } else {
            /**
             * Check if the cache is there
             */
            if (true === $this->cacheData->exists($cacheKey)) {
                $data = $this->cacheData->get($cacheKey);

                foreach ($data as $post) {
                    $cacheKey = sprintf('post-%s.cache', $post['slug']);
                    if (true === $this->cacheData->exists($cacheKey)) {
                        $posts[] = $this->cacheData->get($cacheKey);
                    }
                }
            }

            $contents = $this
                ->viewSimple
                ->cache(
                    [
                        'key' => $viewCacheKey,
                    ]
                )
                ->render(
                'pages/index',
                [
                    'pages'      => $pages,
                    'posts'      => $posts,
                    'showDisqus' => false,
                    'cdnUrl'     => $this->config->get('app')->get('staticUrl'),
                ]
            );
        }

        $this->response->setContent($contents);

        return $this->response;
    }
}
