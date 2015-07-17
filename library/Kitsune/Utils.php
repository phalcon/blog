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
 * Utils.php
 * \Kitsune\Utils
 *
 * Offers utility functions (static)
 */
namespace Kitsune;

use Phalcon\Di\Injectable as PhDiInjectable;

class Utils extends PhDiInjectable
{
    /**
     * Gets an element from an array or an object. If the element exists it is
     * returned, otherwise the default parameter is returned. Useful in checking
     * whether an element exists or not. If the object passed is not an object
     * or an array, the default value is returned
     *
     * @param   object|array    $object     The object
     * @param   string          %element    The element to be returned
     * @param   mixed           $default    The default value
     *
     * @return  mixed
     */
    public function fetch($object, $element, $default)
    {
        if (is_array($object)) {
            $return = (isset($object[$element])) ? $object[$element] : $default;
        } elseif (is_object($object)) {
            $return = (isset($object->$element)) ? $object->$element : $default;
        } else {
            $return = $default;
        }
        return $return;
    }

    /**
     * This is used as a proxy to the cache. If the K_DEBUG is defined it
     * always returns an empty array so that when developing the cache does
     * not affect results
     *
     * @param string $key
     *
     * @return mixed
     */
    public function cacheGet($key)
    {
        $results = null;
        if (!K_DEBUG) {
            $results = $this->cache->get($key);
        }

        return $results;
    }

    /**
     * Checks if a numeric value is within the lower and upper limit parameters
     *
     * @param int $value The value to check
     * @param int $upper The lower limit
     * @param int $lower The upper limit
     *
     * @return bool
     */
    public function between($value, $lower, $upper)
    {
        return boolval($value >= $lower && $value <= $upper);
    }

    /**
     * Shuffles an array preserving its keys
     *
     * @param array $input The input array
     *
     * @return array
     */
    public function shuffle($input)
    {
        $output = [];
        $keys   = array_keys($input);

        shuffle($keys);

        foreach ($keys as $key) {
            $output[$key] = $input[$key];
        }

        return $output;
    }
}
