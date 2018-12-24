---
layout: post
title: "Phalcon 2 (beta 3) released"
tags: [php, phalcon, "2.0", phalcon2, release, zephir, "2.x"]
---

Today we're very excited to announce the release of the third beta (and possibly last one) of Phalcon 2!

Phalcon 2 is almost fully functional and stable as Phalcon 1.x, virtually all tests in 1.x [are now passing](https://travis-ci.org/phalcon/cphalcon/builds/38007986) 2.0. If you haven't tried Phalcon 2 out, it's time to give it a shot!

### Preparing your migration to Phalcon 2

#### Interfaces and type checkings

Thanks to [Zephir](http://www.zephir-lang.org), Phalcon 2 performs a greater number of type and class checks, and as a result this make the whole framework more stable and consistent. If a wrong type or class is passed to a method you'll see the relevant exception with a verbose message. If you have created user adapters or extended framework components and they do not implement the necessary interfaces and/or types you may need to fix them.

```php
Catchable fatal error: Argument 2 passed to Phalcon\Mvc\Model\Query::__construct() must implement
interface Phalcon\DiInterface, instance of stdClass given in /home/scott/test.php on line 17
```

#### Better debug information

[Zephir](http://zephir-lang.com/) provides the exact place where an exception was thrown and it will provide more information as to where the error occurred.

```php
Exception: The static method 'someMethod' doesn't exist on model 'Robots'
File=phalcon/mvc/model.zep Line=4042
#0 /home/scott/test.php(64): Phalcon\Mvc\Model::__callStatic('someMethod', Array)
#1 /home/scott/test.php(64): Robots::someMethod()
#2 {main}
```

This could help you to find solutions for your problems by just looking at the framework source.

#### Error Handling

Phalcon 2 provides better facilities to handle exceptions, for instance, in micro applications you can use the new error handler which will allow you to do something like this:

```php
use Phalcon\Mvc\Micro;
use Phalcon\Http\Response;

$app = new Micro();

$app->map(
    '/say/{name}',
    function ($name) {
        throw new \Exception("An exception has occurred");
    }
);

$app->error(
    function ($e) {
        return new Response('Internal error');
    }
);
```

These facilities were easily implemented thanks to the low-level exception system provided by Zephir.

#### Performance Improvements

Zephir/Phalcon 2 takes advantage of the [improved way to return values](http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56) in PHP 5.6. This optimization greatly reduces the number of unnecessary copies improving the performance.

### Phalcon 2 new look

Our community have contributed 4 amazing proposals for the new design in the Phalcon 2 era. Contribute by voting your favorite design [here](http://survey.phalconphp.com).

### Want to contribute?

From the beginning, Phalcon has been a different framework than any other framework out there, providing developers with many components and functionality in a single PHP extension. If you want to contribute in Phalcon 2, being a part of something unique and amazing, the simplest way is to look through the [issue tracker](https://github.com/phalcon/cphalcon) for issues, bugs or features to implement. Help us to make Phalcon the greatest framework for PHP ever! Your contributions are very valuable.

### Codeception

An important work has been done migrating and simplifying tests for Phalcon 2 into a single test-suite powered by [CodeCeption](http://codeception.com/). See the migrated tests [here](https://github.com/phalcon/cphalcon/tree/2.0.0/tests).

### Help with Testing

This version can be installed from the 2.0.0 branch. If you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
git checkout 2.0.0
cd cphalcon/ext
sudo ./install
```

If you have Zephir installed:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.0.0
zephir build
```

We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on [Phosphorum](https://forum.phalconphp.com/).


<3 Phalcon Team
