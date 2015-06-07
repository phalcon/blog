<?php

/*
 +------------------------------------------------------------------------+
 | Kitsune                                                                |
 +------------------------------------------------------------------------+
 | Copyright (c) 2013-2015 Phalcon Team and contributors                  |
 +------------------------------------------------------------------------+
 | This source file is subject to the New BSD License that is bundled     |
 | with this package in the file docs/LICENSE.txt.                        |
 |                                                                        |
 | If you did not receive a copy of the license and are unable to         |
 | obtain it through the world-wide-web, please send an email             |
 | to license@phalconphp.com so we can send you a copy immediately.       |
 +------------------------------------------------------------------------+
*/

use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\View;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Session\Adapter\Files as SessionAdapter;

use Ciconia\Ciconia;
use Kitsune\Plugins\NotFoundPlugin;
use Ciconia\Extension\Gfm\FencedCodeBlockExtension;

/**
 * We register the events manager
 */
$di->set(
    'dispatcher',
    function () use ($di) {

        $eventsManager = new EventsManager;

        /**
         * Handle exceptions and not-found exceptions using NotFoundPlugin
         */
        $eventsManager->attach('dispatch:beforeException', new NotFoundPlugin);

        $dispatcher = new Dispatcher;
        $dispatcher->setEventsManager($eventsManager);

        $dispatcher->setDefaultNamespace('Kitsune\Controllers');

        return $dispatcher;
    }
);

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->set(
    'url',
    function () use ($config){
        $url = new UrlProvider();
        $url->setBaseUri($config->baseUri);
        return $url;
    }
);


$di->set(
    'view',
    function () use ($config) {

        $view = new View();

        $view->setViewsDir(K_PATH . '/app/views');
        $view->registerEngines([".volt" => 'volt']);

        return $view;
    }
);

/**
 * Setting up volt
 */
$di->set(
    'volt',
    function($view, $di) {

        $volt = new VoltEngine($view, $di);

        $volt->setOptions(["compiledPath" => K_PATH . '/var/cache/volt']);

        return $volt;
    },
true
);

/**
 * Start the session the first time some component request the session service
 */
$di->set(
    'session',
    function () {
        $session = new SessionAdapter();
        $session->start();
        return $session;
    }
);

/**
 * Markdown renderer
 */
$di->set(
    'markdown',
    function () {
        $ciconia = new Ciconia();
        $ciconia->addExtension(new FencedCodeBlockExtension());
        return $ciconia;
    },
    true
);

/**
 * Routes
 */
$router = new Router(false);
$routes = $config->routes->toArray();
pr($routes);
foreach ($routes as $pattern => $options) {
    $router->add($pattern, $options);
}
