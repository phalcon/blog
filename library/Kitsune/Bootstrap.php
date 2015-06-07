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

/**
 * Bootstrap.php
 * \Kitsune\Bootstrap
 *
 */
namespace Kitsune;

use Phalcon\Di\FactoryDefault as PhDI;
use Phalcon\Config as PhConfig;
use Phalcon\Loader as PhLoader;
use Phalcon\Session\Adapter\Files as PhSession;
use Phalcon\Logger\Adapter\File as PhLogger;
use Phalcon\Logger\Formatter\Line as PhLoggerFormatter;
use Phalcon\Cli\Router as PhRouter;
use Phalcon\Mvc\Dispatcher as PhDispatcher;
use Phalcon\Events\Manager as PhEventsManager;
use Phalcon\Mvc\Url as PhUrl;
use Phalcon\Mvc\View as PhView;
use Phalcon\Mvc\View\Engine\Volt as PhVolt;
use Phalcon\Cache\Backend\Libmemcached as PhCache;
use Phalcon\Mvc\Application as PhApplication;

use Ciconia\Ciconia as CiBase;
use Ciconia\Extension\Gfm\FencedCodeBlockExtension as CiException;

use Kitsune\Utils as KUtils;
use Kitsune\Plugins\NotFoundPlugin as KPluginNotFound;
use Kitsune\Exceptions\Exception as KException;

class Bootstrap
{
    /**
     * Gathers all the necessary requirements for the application (config,
     * services setup, routes etc), sets them up and runs the application.
     * It is used either on the full application or on CLI mode.
     *
     * @param   mixed   $depInjector
     * @param   array   $options
     *
     * @return string
     * @throws KException
     */
    public static function run($depInjector, array $options = [])
    {
        $memoryUsage = memory_get_usage();
        $currentTime = microtime(true);

        /**
         * Include the utils - we need access to fetch();
         */
        require_once 'Utils.php';

        /**
         * Check the environment variables
         */
        if (!defined('K_PATH')) {
            define('K_PATH', dirname(dirname(dirname(__FILE__))));
        }

        if (!defined('K_CLI')) {
            $cli = KUtils::fetch($options, 'cli', false);
            define('K_CLI', $cli);
        }

        if (!defined('K_TESTS')) {
            $tests = KUtils::fetch($options, 'tests', false);
            define('K_TESTS', $tests);
        }

        /**
         * Check the config files
         */
        if (!file_exists(K_PATH . '/var/config/config.php')) {
            throw new KException('The configuration file is missing');
        }

        $baseConfig   = require(K_PATH . '/var/config/base.php');
        $customConfig = require(K_PATH . '/var/config/config.php');
        $mergedConfig = $customConfig + $baseConfig;

        /**
         * Set the config service
         */
        $depInjector->set(
            'config',
            function () use ($mergedConfig) {
                return new PhConfig($mergedConfig);
            }
        );

        /**
         * We will need this further down
         */
        $config = $depInjector->get('config');

        /**
         * Check if we are in debug/dev mode
         */
        if (!defined('K_DEBUG')) {
            $debugMode = boolval(
                KUtils::fetch($config, 'debugMode', false)
            );
            define('K_DEBUG', $debugMode);
        }

        /**
         * Access to the debug/dev helper functions
         */
        if (K_DEBUG) {
            require_once K_PATH . '/library/Kitsune/Debug.php';
        }

        /**
         * LOGGER
         *
         * The essential logging service
         */
        $depInjector->set(
            'logger',
            function () use ($config, $depInjector) {
                $format = '[%date%][%type%] %message%';
                $name   = $config->paths->logsDir
                        . '/'
                        . date('Y-m-d') . '-kitsune.log';
                $logger = new PhLogger($name);
                $formatter = new PhLoggerFormatter($format);
                $logger->setFormatter($formatter);
                return $logger;
            },
            true
        );
        $logger = $depInjector->get('logger');

        /**
         * ERROR HANDLING
         */
        ini_set('display_errors', boolval(K_DEBUG && !K_CLI));
        error_reporting(E_ALL);
        set_error_handler(
            function ($exception) use ($logger) {
                if ($exception instanceof \Exception) {
                    $logger->error($exception->__toString());
                } else {
                    $function = 'error';
                    switch ($exception) {
                        case E_NOTICE:
                        case E_USER_NOTICE:
                            $function = 'notice';
                            break;
                        case E_CORE_WARNING:
                        case E_COMPILE_WARNING:
                        case E_USER_WARNING:
                            $function = 'warning';
                            break;
                        case E_ERROR:
                        case E_CORE_ERROR:
                        case E_COMPILE_ERROR:
                        case E_USER_ERROR:
                        case E_WARNING:
                        case E_PARSE:
                        case E_STRICT:
                        case E_RECOVERABLE_ERROR:
                        case E_DEPRECATED:
                        case E_USER_DEPRECATED:
                            $function = 'error';
                            break;
                    }
                    $logger->$function(json_encode(debug_backtrace()));
                }
            }
        );
        set_exception_handler(
            function ($exception) use ($logger) {
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
        
        /**
         * LOADER
         *
         * Namespaces/Dirs defined in the configuration file
         */
        $loader = new PhLoader();
        $namespaces = $config->loader->namespaces->toArray();
        $loader->registerNamespaces($namespaces);
        $loader->register();

        /**
         * Composer
         */
        require_once K_PATH . '/vendor/autoload.php';

        /**
         * SESSION
         *
         * Start the session the first time a component requests the service
         */
        $depInjector->set(
            'session',
            function () {
                $session = new PhSession();
                if (session_status() !== PHP_SESSION_ACTIVE) {
                    $session->start();
                }
                return $session;
            }
        );

        /**
         * ROUTER
         *
         * Routes for the app. Not needed in CLI
         */
        if (!K_CLI) {
            $depInjector->set(
                'router',
                function () use ($config) {
                    $router = new PhRouter();
                    $routes = $config->routes->toArray();
                    foreach ($routes as $route => $params) {
                        $router->add($route, $params);
                    }
                },
                true
            );
        }

        /**
         * EVENTS MANAGER
         *
         * Allows us to have a 404 page
         */
        $depInjector->set(
            'dispatcher',
            function () use ($depInjector) {

                $eventsManager = new PhEventsManager();

                /**
                 * Handle exceptions and not-found exceptions using
                 * NotFoundPlugin
                 */
                $eventsManager->attach(
                    'dispatch:beforeException',
                    new KPluginNotFound()
                );

                $dispatcher = new PhDispatcher();
                $dispatcher->setEventsManager($eventsManager);

                $dispatcher->setDefaultNamespace('Kitsune\Controllers');

                return $dispatcher;
            }
        );

        /**
         * URL
         *
         * The URL component is used to generate all kind of urls in the
         * application. Defined in the config
         */
        $depInjector->set(
            'url',
            function () use ($config) {
                $url = new PhUrl();
                $url->setBaseUri($config->application->baseUri);
                return $url;
            }
        );

        /**
         * VIEW
         *
         * View service
         */
        $depInjector->set(
            'view',
            function () use ($config) {

                $view = new PhView();

                $view->setViewsDir(K_PATH . $config->paths->viewsDir);
                $view->registerEngines(
                    [
                        ".volt" => 'volt'
                    ]
                );

                return $view;
            }
        );

        /**
         * VOLT
         *
         * Setting up volt
         */
        $depInjector->set(
            'volt',
            function ($view, $di) {

                $volt = new PhVolt($view, $di);
                $volt->setOptions(
                    [
                        "compiledPath" => K_PATH . '/var/cache/volt/'
                    ]
                );

                return $volt;
            },
            true
        );

        /**
         * MARKDOWN
         */
        $depInjector->set(
            'markdown',
            function () {
                $ciconia = new CiBase();
                $ciconia->addExtension(new CiException());

                return $ciconia;
            },
            true
        );

        /**
         * CACHE
         *
         * The backend uses Libmemcached
         */
        $depInjector->set(
            'cache',
            function () use ($config) {
                $frontConfig = $config->cache->data->front->toArray();
                $backConfig  = $config->cache->data->back->toArray();
                $class       = '\Phalcon\Cache\Frontend\\'
                             . $frontConfig['adapter'];
                $frontCache  = new $class($frontConfig['options']);
                $cache       = new PhCache($frontCache, $backConfig);

                return $cache;
            },
            true
        );

        /**
         * VIEW CACHE
         */
        $depInjector->set(
            'viewCache',
            function () use ($config) {
                $frontConfig = $config->cache->view->front->toArray();
                $backConfig  = $config->cache->view->back->toArray();
                $class       = '\Phalcon\Cache\Frontend\\'
                             . $frontConfig['adapter'];
                $frontCache  = new $class($frontConfig['options']);
                $cache       = new PhCache($frontCache, $backConfig);

                return $cache;
            }
        );

        /**
         * APP
         *
         * Set the dependency injector and run the app according to the
         * environment
         */
        PhDI::setDefault($depInjector);

        /**
         * CLI needs to be handled differently
         */
        if (K_CLI) {
            /**
             * @todo Differentiate between main app and CLI tasks
             */
        } else {
            $application = new PhApplication($depInjector);
            echo $application->handle()->getContent();
        }
    }
}
