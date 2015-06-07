<?php

error_reporting(E_ALL);

use Phalcon\Mvc\Application;

try {

	define('K_PATH', dirname(dirname(__FILE__)));

	/**
	 * Config, auto-loader, environment configuration
	 */
	require K_PATH . '/var/config/loader.php';

	/**
	 * Load application services
	 */
	require K_PATH . '/var/config/services.php';

	$application = new Application($di);

	echo $application->handle()->getContent();

} catch (\Exception $e) {
	echo $e->getMessage();
}
