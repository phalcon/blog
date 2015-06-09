<?php
/*
 +------------------------------------------------------------------------+
 | Kitsune                                                                |
 +------------------------------------------------------------------------+
 | Copyright (c) 2015-2015 Phalcon Team and contributors                  |
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
 * Debug.php
 * \Kitsune\Debug
 *
 * Offers shortcuts to functions for easier debugging
 */
if (!function_exists('vd')) {
    /**
     * Short version of var_dump()
     *
     * @param   string  $string
     */
    function vd($string)
    {
        _phDebugPre();
        _phDebugCaller();
        var_dump($string);
        _phDebugPost();
    }
}
if (!function_exists('pr')) {
    /**
     * Short version of print_r()
     *
     * @param   string  $string
     */
    function pr($string)
    {
        _phDebugPre();
        _phDebugCaller();
        print_r($string);
        _phDebugPost();
    }
}
if (!function_exists('vdd')) {
    /**
     * Short version of var_dump(); die();
     *
     * @param   string  $string
     */
    function vdd($string)
    {
        _phDebugPre();
        _phDebugCaller();
        var_dump($string);
        _phDebugPost();
        exit();
    }
}
if (!function_exists('prd')) {
    /**
     * Short version of print_r(); die();
     *
     * @param   string  $string
     */
    function prd($string)
    {
        _phDebugPre();
        _phDebugCaller();
        print_r($string);
        _phDebugPost();
        exit();
    }
}
if (!function_exists('gcm')) {
    /**
     * Short version of get_class_methods()
     *
     * @param   string  $class
     *
     * @return  array
     */
    function gcm($class)
    {
        _phDebugPre();
        _phDebugCaller();
        _phDebugPost();
        return get_class_methods($class);
    }
}
if (!function_exists('e')) {
    /**
     * Short version of echo()
     *
     * @param   string  $string
     */
    function e($string)
    {
        _phDebugPre();
        _phDebugCaller();
        print($string);
        _phDebugPost();
    }
}
if (!function_exists('d')) {
    /**
     * Short version of die();
     *
     * @param null $string
     */
    function d($string = null)
    {
        _phDebugPre();
        _phDebugCaller();
        _phDebugPost();
        die($string);
    }
}
if (!function_exists('_phDebugPre')) {
    function _phDebugPre()
    {
        echo (_phDebugCli()) ?
            ' '             :
            "<pre style='overflow: auto;' class='code-dump'>";
    }
}
if (!function_exists('_phDebugPost')) {
    function _phDebugPost()
    {
        echo (_phDebugCli()) ? ' ' : "</pre>";
    }
}
if (!function_exists('_phDebugCli')) {
    function _phDebugCli()
    {
        return boolval(empty($_SERVER['REQUEST_METHOD']));
    }
}
if (!function_exists('_phDebugCaller')) {
    function _phDebugCaller()
    {
        $trace = debug_backtrace();
        echo sprintf(
            'Called From: %s:%d %s',
            $trace[1]['file'],
            $trace[1]['line'],
            PHP_EOL
        );
    }
}
