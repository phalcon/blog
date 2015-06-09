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

use Phalcon\Config;
use Phalcon\Loader;
use Phalcon\Di\FactoryDefault;
use Phalcon\Logger\Adapter\File as Logger;
use Phalcon\Logger\Formatter\Line as LoggerFormatter;

use Kitsune\Utils;
use Kitsune\Exceptions\Exception as KException;

$memoryUsage = memory_get_usage();
$currentTime = microtime(true);

/**
 * The FactoryDefault Dependency Injector automatically register the right
 * services providing a full stack framework
 */
$di = new FactoryDefault();

/**
 * Include the utils - we need access to fetch();
 */
require_once K_PATH . '/library/Kitsune/Utils.php';

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
$config = new Config($mergedConfig);
$di->set('config', $config);

/**
 * Check if we are in debug/dev mode
 */
if (!defined('K_DEBUG')) {
    $debugMode = boolval(
        Utils::fetch($config, 'debugMode', false)
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
 * We're a registering a set of directories taken from the configuration file
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
$di->set(
    'logger',
    function () use ($config, $di) {
        $format = '[%date%][%type%] %message%';
        $name   = K_PATH
                . '/var/log/'
                . date('Y-m-d') . '-kitsune.log';
        $logger = new Logger($name);
        $formatter = new LoggerFormatter($format);
        $logger->setFormatter($formatter);
        return $logger;
    },
    true
);
$logger = $di->get('logger');

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
