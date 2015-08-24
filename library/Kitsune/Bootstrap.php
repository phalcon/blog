<?php
/*
 +------------------------------------------------------------------------+
 | Kitsune                                                                |
 +------------------------------------------------------------------------+
 | Copyright (c) 2015 Phalcon Team and contributors                       |
 +------------------------------------------------------------------------+
 | This source file is subject to the New BSD License that is bundled     |
 | with this package in the file docs/LICENSE.txt.                        |
 |                                                                        |
 | If you did not receive a copy of the license and are unable to         |
 | obtain it through the world-wide-web, please send an email             |
 | to license@phalconphp.com so we can send you a copy immediately.       |
 +------------------------------------------------------------------------+
*/

/**
 * Bootstrap.php
 * \Kitsune\Bootstrap
 *
 * Bootstraps the application
 */
namespace Kitsune;

use Phalcon\DiInterface;
use Phalcon\Di\FactoryDefault as PhDI;
use Phalcon\Config;
use Phalcon\Loader;
use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as LoggerFile;
use Phalcon\Logger\Formatter\Line as LoggerFormatter;

use Phalcon\Mvc\Application;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\View;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;
use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Events\Manager as EventsManager;

use Ciconia\Ciconia;
use Ciconia\Extension\Gfm\FencedCodeBlockExtension;
use Ciconia\Extension\Gfm\TaskListExtension;
use Ciconia\Extension\Gfm\InlineStyleExtension;
use Ciconia\Extension\Gfm\WhiteSpaceExtension;
use Ciconia\Extension\Gfm\TableExtension;
use Ciconia\Extension\Gfm\UrlAutoLinkExtension;

use Kitsune\PostFinder;
use Kitsune\Plugins\NotFoundPlugin;
use Kitsune\Markdown\Github\MentionExtension;
use Kitsune\Markdown\Github\IssueExtension;
use Kitsune\Markdown\Github\PullRequestExtension;
use Kitsune\Utils;

/**
 * Class Bootstrap
 */
class Bootstrap
{
    public static function run(DiInterface $di, array $options = [])
    {
        $memoryUsage = memory_get_usage();
        $currentTime = microtime(true);

        /**
         * The app path
         */
        if (!defined('K_PATH')) {
            define('K_PATH', dirname(dirname(dirname(__FILE__))));
        }

        /**
         * We will need the Utils class
         */
        require_once K_PATH . '/library/Kitsune/Utils.php';

        /**
         * Utils class
         */
        $utils = new Utils();
        $di->set('utils', $utils, true);

        /**
         * Check if this is a CLI app or not
         */
        $cli   = $utils->fetch($options, 'cli', false);
        if (!defined('K_CLI')) {
            define('K_CLI', $cli);
        }

        $tests = $utils->fetch($options, 'tests', false);
        if (!defined('K_TESTS')) {
            define('K_TESTS', $tests);
        }

        /**
         * The configuration is split into two different files. The first one
         * is the base configuration. The second one is machine/installation
         * specific.
         */
        if (!file_exists(K_PATH . '/var/config/base.php')) {
            throw new \Exception('Base configuration files are missing');
        }

        if (!file_exists(K_PATH . '/var/config/config.php')) {
            throw new \Exception('Configuration files are missing');
        }

        /**
         * Get the config files and merge them
         */
        $base     = require(K_PATH . '/var/config/base.php');
        $specific = require(K_PATH . '/var/config/config.php');
        $combined = array_replace_recursive($base, $specific);

        $config = new Config($combined);
        $di->set('config', $config, true);

        $config = $di->get('config');

        /**
         * Check if we are in debug/dev mode
         */
        if (!defined('K_DEBUG')) {
            $debugMode = boolval($utils->fetch($config, 'debugMode', false));
            define('K_DEBUG', $debugMode);
        }

        /**
         * Access to the debug/dev helper functions
         */
        if (K_DEBUG) {
            require_once K_PATH . '/library/Kitsune/Debug.php';
        }

        /**
         * We're a registering a set of directories taken from the
         * configuration file
         */
        $loader = new Loader();
        $loader->registerNamespaces($config->namespaces->toArray());
        $loader->register();

        require K_PATH . '/vendor/autoload.php';

        /**
         * LOGGER
         *
         * The essential logging service
         */
        $format    = '[%date%][%type%] %message%';
        $name      = K_PATH . '/var/log/' . date('Y-m-d') . '-kitsune.log';
        $logger    = new LoggerFile($name);
        $formatter = new LoggerFormatter($format);
        $logger->setFormatter($formatter);
        $di->set('logger', $logger, true);

        /**
         * ERROR HANDLING
         */
        ini_set('display_errors', boolval(K_DEBUG));

        error_reporting(E_ALL);

        set_error_handler(
            function ($exception) use ($logger) {
                if ($exception instanceof \Exception) {
                    $logger->error($exception->__toString());
                } else {
                    $logger->error(json_encode(debug_backtrace()));
                }
            }
        );

        set_exception_handler(
            function (\Exception $exception) use ($logger) {
                $logger->error($exception->getMessage());
            }
        );

        register_shutdown_function(
            function () use ($logger, $memoryUsage, $currentTime) {
                $memoryUsed = number_format(
                    (memory_get_usage() - $memoryUsage) / 1024,
                    3
                );
                $executionTime = number_format(
                    (microtime(true) - $currentTime),
                    4
                );
                if (K_DEBUG) {
                    $logger->info(
                        'Shutdown completed [Memory: ' . $memoryUsed . 'Kb] ' .
                        '[Execution: ' . $executionTime .']'
                    );
                }
            }
        );

        $timezone = $config->get('app_timezone', 'US/Eastern');
        date_default_timezone_set($timezone);

        /**
         * Routes
         */
        if (!K_CLI) {
            $di->set(
                'router',
                function () use ($config) {
                    $router = new Router(false);
                    $router->removeExtraSlashes(true);
                    $routes = $config->routes->toArray();
                    foreach ($routes as $pattern => $options) {
                        $router->add($pattern, $options);
                    }

                    return $router;
                },
                true
            );
        }

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
            function () use ($config) {
                $url = new UrlProvider();
                $url->setBaseUri($config->baseUri);
                return $url;
            }
        );

        $di->set(
            'view',
            function () use ($config) {

                $view = new View();
                $view->setViewsDir(K_PATH . '/app/views/');
                $view->registerEngines([".volt" => 'volt']);
                return $view;
            }
        );

        /**
         * Setting up volt
         */
        $di->set(
            'volt',
            function ($view, $di) {

                $volt = new VoltEngine($view, $di);
                $volt->setOptions(
                    [
                        "compiledPath"  => K_PATH . '/var/cache/volt/',
                        'stat'          => K_DEBUG,
                        'compileAlways' => K_DEBUG,
                    ]
                );
                return $volt;
            },
            true
        );

        /**
         * Start the session the first time some component request the session
         * service
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
         * Cache
         */
        $frontConfig = $config->cache_data->front->toArray();
        $backConfig  = $config->cache_data->back->toArray();
        $class       = '\Phalcon\Cache\Frontend\\' . $frontConfig['adapter'];
        $frontCache  = new $class($frontConfig['params']);
        $class       = '\Phalcon\Cache\Backend\\' . $backConfig['adapter'];
        $cache       = new $class($frontCache, $backConfig['params']);
        $di->set('cache', $cache, true);

        /**
         * viewCache
         */
        $di->set(
            'viewCache',
            function () use ($config) {
                $frontConfig = $config->cache_view->front->toArray();
                $backConfig  = $config->cache_view->back->toArray();
                $class       = '\Phalcon\Cache\Frontend\\' . $frontConfig['adapter'];
                $frontCache  = new $class($frontConfig['params']);
                $class       = '\Phalcon\Cache\Backend\\' . $backConfig['adapter'];
                $cache       = new $class($frontCache, $backConfig['params']);
                return $cache;
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
                $ciconia->addExtension(new TaskListExtension());
                $ciconia->addExtension(new InlineStyleExtension());
                $ciconia->addExtension(new WhiteSpaceExtension());
                $ciconia->addExtension(new TableExtension());
                $ciconia->addExtension(new UrlAutoLinkExtension());
                $ciconia->addExtension(new MentionExtension());

                $extension = new IssueExtension();
                $extension->setIssueUrl(
                    '[#%s](https://github.com/phalcon/cphalcon/issues/%s)'
                );
                $ciconia->addExtension($extension);

                $extension = new PullRequestExtension();
                $extension->setIssueUrl(
                    '[#%s](https://github.com/phalcon/cphalcon/pull/%s)'
                );
                $ciconia->addExtension($extension);
                return $ciconia;
            },
            true
        );

        /**
         * Posts Finder
         */
        $di->set(
            'finder',
            function () use ($utils, $cache) {
                $key        = 'post.finder.cache';
                $postFinder = $utils->cacheGet($key);
                if (null === $postFinder) {
                    $postFinder = new PostFinder();
                    $cache->save($key, $postFinder);
                }
                return $postFinder;
            },
            true
        );

        /**
         * For CLI I only need the dependency injector
         */
        if (K_CLI) {
            return $di;
        } else {
            $application = new Application($di);

            if (K_TESTS) {
                return $application;
            } else {
                return $application->handle()->getContent();
            }
        }
    }
}
