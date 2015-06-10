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

class Utils
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
    public static function fetch($object, $element, $default)
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
}
