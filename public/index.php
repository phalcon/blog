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

use \Phalcon\Di\FactoryDefault as PhDI;
use \Kitsune\Bootstrap;

error_reporting(E_ALL);

try {
    require_once '../library/Kitsune/Bootstrap.php';
    $di = new PhDI();
    echo Bootstrap::run($di, []);
} catch (\Exception $e) {
    if ($di->has('logger')) {
        $logger = $di->getShared('logger');
        $logger->error($e->getMessage());
        $logger->error('<pre>' . $e->getTraceAsString() . '</pre>');
    }
}
