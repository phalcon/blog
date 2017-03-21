<?php

namespace Kitsune\Controllers;

use Phalcon\Cache\BackendInterface;
use Phalcon\Config;
use Phalcon\Mvc\Controller as PhController;
use Phalcon\Mvc\View\Simple;
use Phalcon\Text;

/**
 * Class PostsController
 *
 * @package Kitsune\Controllers
 *
 * @property BackendInterface $cacheData
 * @property \ParsedownExtra  $parsedown
 * @property Config           $config
 * @property Simple           $viewSimple
 */
class PostsController extends PhController
{
    /**
     * Displays a post
     *
     * @param string $slug
     *
     * @return \Phalcon\Http\Response|\Phalcon\Http\ResponseInterface
     */
    public function mainAction($slug = '')
    {
        $viewCacheKey = sprintf('view-post-%s.cache', $slug);
        $cacheKey     = sprintf('post-%s.cache', $slug);

        if (true === empty($slug) || true !== $this->cacheData->exists($cacheKey)) {
            return $this->response->redirect('/');
        }

        /**
         * Check the viewCache first
         */
        if ('production' === $this->config->get('app')->get('env') &&
            true === $this->viewCache->exists($viewCacheKey)) {
            $contents = $this->viewCache->get($viewCacheKey);
        } else {
            $post     = $this->cacheData->get($cacheKey);
            $contents = $this
                ->viewSimple
                ->cache(
                    [
                        'key' => $viewCacheKey,
                    ]
                )
                ->render(
                    'pages/view',
                    [
                        'showDisqus' => true,
                        'post'       => $post,
                        'title'      => $post['title'],
                        'cdnUrl'     => $this->config->get('app')->get('staticUrl'),
                        'canonical'  => Text::reduceSlashes(
                            sprintf(
                                '%s/post/%s',
                                $this->config->get('app')->get('url'),
                                $post['slug']
                            )
                        ),
                    ]
                );
        }

        $this->response->setContent($contents);

        return $this->response;

    }
}
