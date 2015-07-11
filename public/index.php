<?php

use \Phalcon\DI\FactoryDefault as PhDI;
use \Kitsune\Bootstrap;

error_reporting(E_ALL);

try {
    require_once '../library/Kitsune/Bootstrap.php';
    $di = new PhDI();
    echo Bootstrap::run($di, []);

} catch (\Exception $e) {
    $logger = $di->getShared('logger');
    $logger->error($e->getMessage());
    $logger->error('<pre>' . $e->getTraceAsString() . '</pre>');
}
