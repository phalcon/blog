<?php

use \Phalcon\DI\FactoryDefault as PhDI;
use \Kitsune\Bootstrap;

error_reporting(E_ALL);
try {
    /**
     * Including the bootstrap file explicitly here. The app will be initialized
     * in that file. All services, routes etc.
     */
    require_once '../library/Kitsune/Bootstrap.php';

    $depInjector = new PhDI();

    echo Bootstrap::run($depInjector);

} catch (\Exception $e) {
    $logger = $depInjector->get('logger');
    $logger->error($e->getMessage());
    if (defined('K_DEBUG') && K_DEBUG) {
        $logger->error('<pre>' . $e->getTraceAsString() . '</pre>');
    }
}
