---
layout: post
title: Testing Testing Testing
image: /assets/files/tests.png
date: 2020-10-15T13:34:57.723Z
tags:
  - phalcon
  - tests
  - phalcon5
---
I have been advocating for testable code for more than a decade now. Admittedly, I have - in numerous cases - ignored tests and proceeded with rapid application development due to time constraints. However, the best code I ever produced was the one that was fully tested or very close to 100% covered by tests. You should always try your best to have your code covered by tests as much as possible.

<!--more-->

> This blog post has been cross posted from the [niden.net](https://niden.net/post/testing-testing-testing/) blog
{.alert .alert-info}

Recently, for the [Phalcon](https://phalcon.io) Framework, we decided to move away from [Zephir](https://zephir-lang.com) and rewrite the framework in PHP. [This](https://blog.phalcon.io/post/the-future-of-phalcon) blog post offers more information regarding this decision.

So we started rewriting every component/namespace in PHP, translating Zephir code. It is a fairly easy task to do and you can have a set of PHP files ready in no time. The fact that Phalcon has some tests already in its testing suite, makes things a lot easier, since all one does is copy the tests from one repository to another and _in theory_ they should run just fine.

For the most part, the above is true and indeed the tests run and one can see clearly the code coverage, the optimizations that can be made etc. With the help of [Scrutinizer](https://scrutinizer-ci.com), [Codacy](https://codacy.com), [Codecov](https://codecov.io) and of course [Codeception](https://codeception.com), we can easily find spots where optimizations are possible, as well as areas of the code that require additional tests to increase the code coverage.

One of the biggest problems we have faced while writing tests is when trying to test native PHP methods. An example can be observed when writing the `Stream` adapter for the `Storage` class. We need to get some data from the disk and in our class we use the [file_get_contents](https://php.net/manual/en/function.file-get-contents.php). As one would expect, we test what we got to ensure that `false` was not returned (failure) and if that happens return an empty array.

```php
<?php

use function fclose;
use function file_get_contents;
use function flock;
use function fopen;

class Stream
{
    // ....
    /**
     * Gets the file contents and returns an array
     * or an error if something went wrong
     *
     * @param string $filepath
     *
     * @return array
     */
    private function getPayload(string $filepath): array
    {
        $payload = false;
        $pointer = fopen($filepath, 'r');

        /**
         * Cannot open file
         */
        if (false === $pointer) {
            return [];
        }

        if (true === flock($pointer, LOCK_SH)) {
            $payload = file_get_contents($filepath);
        }

        fclose($pointer);

        /**
         * No results
         */
        if (false === $payload) {
            return [];
        }

        // ....
        return $payload;
    }
}
```

The private method shown above has three exit points. The two of them occur when a native PHP method fails (`fopen` and `file_get_contents`).

When we cannot open the file, the method needs to return an empty array. We could in theory simulate this code path in a test by creating a file that cannot be opened by `fopen` and thus our method will return an empty array. However the next path is much more difficult, because we need to be able to lock the file (`flock`) and then the `file_get_contents` needs to return `false` so that the method can return the empty array back.

We have tried in the past to achieve the above by creating the file and then marking it as read only or changing its ownership, in order to see if `file_get_contents` returns indeed `false`. All these _hacks_ left the whole testing suite in a big mess, with files being left on the system not owned by anyone, and with no real guarantee that the testing suite will test what is needed to be tested. In short, creating the conditions to cover this part of the code, wasted a lot of time and was not reliable. One should write tests to cover code execution and different execution paths. One should not write tests just to say that they have tests.

So what is the solution to this? `file_get_contents` is just one method and we could potentially hack our way into making it return `false` so that the second branch of the code would execute. What happens when we have different methods such as `ldap_connect`, `apcu_inc`, `unlink` and many more?

There are two approaches that I found:

### Runkit
The [Runkit](https://www.php.net/manual/en/book.runkit7.php) extension is very promising as seen by the link to the PHP manual. It does however require the installation of another extension, just to run our tests. This is not always desirable.

### Proxy method
In this approach, we use a method to wrap the PHP function we want to proxy. The method contains the same parameters as the native PHP function and returns the same data. The benefit is by declaring this new proxy method as `protected` we can now stub it and make it return whatever we want it to return, thus having control of the flow of operation. Reminder: [Codeception](https://codeception.com) offers the `Stub` class, offering easy mocking of objects and methods.

#### Direct
What I call the _direct_ proxy method is nothing more than a method that wraps a native PHP method. It is one for one so if I want to wrap another PHP function, I have to create a new proxy method. For the `fopen` I have the following method in a trait:

```php
<?php

use function fopen;

trait PhpFileTrait
{
    /**
     * @param string   $filename
     * @param string   $mode
     * @param bool     $use_include_path
     * @param resource $context
     *
     * @return resource|false
     *
     * @link https://php.net/manual/en/function.fopen.php
     */
    protected function phpFopen($filename, $mode)
    {
        return fopen($filename, $mode);
    }
}
```

while for `file_get_contents` the trait becomes:

```php
<?php

use function file_get_contents;
use function fopen;

trait PhpFileTrait
{
    /**
     * @param string   $filename
     * @param string   $mode
     * @param bool     $use_include_path
     * @param resource $context
     *
     * @return resource|false
     *
     * @link https://php.net/manual/en/function.fopen.php
     */
    protected function phpFopen($filename, $mode)
    {
        return fopen($filename, $mode);
    }

    /**
     * @param string   $filename
     * @param bool     $use_include_path
     * @param resource $context
     * @param int      $offset
     * @param int      $maxlen
     *
     * @return string|false
     *
     * @link https://php.net/manual/en/function.file-get-contents.php
     */
    protected function phpFileGetContents($filename)
    {
        return file_get_contents($filename);
    }
}
```

These proxy methods have been added in a trait, so that I can easily attach it to the part of the code required. The code snippent above becomes:

```php
<?php

use Phalcon\Support\Traits\PhpFileTrait;

use function fclose;
use function flock;

class Stream
{
    use PhpFileTrait;

    // ....
    /**
     * Gets the file contents and returns an array 
     * or an error if something went wrong
     *
     * @param string $filepath
     *
     * @return array
     */
    private function getPayload(string $filepath): array
    {
        $payload = false;
        $pointer = $this->phpFopen($filepath, 'r');

        /**
         * Cannot open file
         */
        if (false === $pointer) {
            return [];
        }

        if (true === flock($pointer, LOCK_SH)) {
            $payload = $this->phpFileGetContents($filepath);
        }

        fclose($pointer);

        /**
         * No results
         */
        if (false === $payload) {
            return [];
        }

        // ....
        return $payload;
    }
}
```

If I run my tests, they will execute and pass, because this refactoring has not changed the operation or logic of our code. I can now mock the `phpFopen` method to return `false` and thus check if the payload returns an empty array. `getPayload` is used in the `has()` method, so the test will be as follows:

```php
<?php

use Codeception\Util\Stub;
use Phalcon\Storage\Adapter\Stream;
use Phalcon\Storage\SerializerFactory;
use Phalcon\Support\HelperFactory;

use function outputDir;
use function uniqid;

class HasCest
{
    public function storageAdapterStreamHasCannotOpenFile(UnitTester $I)
    {
        $I->wantToTest(
            'Storage\Adapter\Stream - has() - cannot open file'
        );

        $helper     = new HelperFactory();
        $serializer = new SerializerFactory();
        $adapter    = Stub::construct(
            Stream::class,
            [
                $helper,
                $serializer,
                [
                    'storageDir' => outputDir(),
                ],
            ],
            [
                'phpFopen' => false,
            ]
        );

        $key    = uniqid();
        $actual = $adapter->set($key, 'test');
        $I->assertTrue($actual);

        $actual = $adapter->has($key);
        $I->assertFalse($actual);
    }
}
```

Using `Stub` the `Stream` class has been stubbed and the `phpFopen` wired to return `false`. This will force the code to return `false` when calling this method and thus return an empty array.

#### `call_user_func_array`
The _direct_ implementation above works just fine, but requires the creation of one proxy method per native PHP method that needs to be tested or stubbed. A more generic approach can be achieved by creating a proxy class and internally using the powerful [call_user_func_array](https://www.php.net/manual/en/function.call-user-func-array.php). The class is very simple:

```php
<?php

use function call_user_func_array;

class PhpProxy
{
    public function __call($method, $parameters)
    {
        return call_user_func_array($method, $parameters);
    }
}
```

We can inject this class in our component and use it to execute any PHP native code methods. Because we will be injecting it, we can even inject it mocked, controlling the execution of the native PHP methods for our tests.

The `Stream` class will become:

```php
<?php

use Phalcon\Support\PhpProxy;

/**
 * Class Stream
 *
 * @property PhpProxy $proxy
 */
class Stream
{
    protected PhpProxy $proxy;

    public function __construct(
        HelperFactory $helper,
        SerializerFactory $serializer,
        PhpProxy $proxy,
        array $options = []
    ) {
        $this->proxy = $proxy;
        // ....
    }

    // ....
    /**
     * Gets the file contents and returns an array 
     * or an error if something went wrong
     *
     * @param string $filepath
     *
     * @return array
     */
    private function getPayload(string $filepath): array
    {
        $payload = false;
        $pointer = $this->proxy->fopen($filepath, 'r');

        /**
         * Cannot open file
         */
        if (false === $pointer) {
            return [];
        }

        if (true === $this->proxy->flock($pointer, LOCK_SH)) {
            $payload = $this
                ->proxy
                ->file_get_contents($filepath);
        }

        $this->proxy->fclose($pointer);

        /**
         * No results
         */
        if (false === $payload) {
            return [];
        }

        // ....
        return $payload;
    }
}
```

As you can see above, we can use the proxy class for all the calls to native PHP methods. We can now create a mock `PhpProxy` object that will allow testing for the `fopen` failure:

```php
<?php

use Codeception\Util\Stub;
use Phalcon\Storage\Adapter\Stream;
use Phalcon\Storage\SerializerFactory;
use Phalcon\Support\HelperFactory;
use Phalcon\Support\PhpProxy;

use function call_user_func_array;
use function outputDir;
use function uniqid;

class HasCest
{
    public function storageAdapterStreamHasCannotOpenFile(UnitTester $I)
    {
        $I->wantToTest(
            'Storage\Adapter\Stream - has() - cannot open file'
        );

        $helper     = new HelperFactory();
        $serializer = new SerializerFactory();
        $proxy      = Stub::make(
            PhpProxy::class,
            [
                '__call' => function ($method, $parameters) {
                    if ('fopen' === $method) {
                        return false;
                    }

                    return call_user_func_array(
                        $method, 
                        $parameters
                    );
                }
            ]
        );

        $adapter = new Stream(
            $helper,
            $serializer,
            $proxy,
            [
                'storageDir' => outputDir(),
            ]
        );
        $key    = uniqid();
        $actual = $adapter->set($key, 'test');
        $I->assertTrue($actual);

        $actual = $adapter->has($key);
        $I->assertFalse($actual);
    }
}
```
### Conclusion
The methodologies above offer flexibility with mocking native PHP functions. 

You will notice in the code above, that the `file_get_contents` that has been proxied using the direct implementation, only accepts one parameter, where the actual PHP method accepts more. This was intentional, because the usage of that method did not require more parameters to be passed. If in the future we need to add more parameters we could easily change the `phpFileGetContents` method signature in the trait. Naturally the `call_user_func_array` implementation does not suffer from this limitation.

The implementations above come at a cost. You should always be wary of the performance hit you will get when implementing your code this way. Using a proxied method such as `phpFileGetContents` or `call_user_func_array` will always be slower than calling the method directly. It will then depend on the requirements you have and whether you can accept the performance hit or not. A simple benchmarking example by calling `str_replace` natively, using a proxy method or `call_user_func_array` provides the following results:

```
    benchStrReplace..........I99 [μ Mo]/r: 0.248 0.240 (μs) [μSD μRSD]/r: 0.027μs 10.80%
    benchPhpStrReplace.......I99 [μ Mo]/r: 0.362 0.366 (μs) [μSD μRSD]/r: 0.027μs 7.34%
    benchCallUserFuncArray...I99 [μ Mo]/r: 0.437 0.425 (μs) [μSD μRSD]/r: 0.044μs 10.03%

3 subjects, 300 iterations, 3,000 revs, 0 rejects, 0 failures, 0 warnings
(best [mean mode] worst) = 0.226 [0.349 0.343] 0.369 (μs)
⅀T: 104.665μs μSD/r 0.032μs μRSD/r: 9.385%
```

The benchmark above shows as expected, that `str_replace` will be the fastest implementation and the `call_user_func_array` will be around 200 μs slower.

If the area of your code that you use such proxy methods is not very "busy", then you can afford the few extra microseconds. However, if the area of the code you will use these proxy methods is a main component with numerous executions per request, you might want to run some benchmarks and decide whether you want 100% code coverage or the few extra microseconds.

Personally I lean towards the 100% code coverage.

- - -

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.link/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://phalcon.io/brighteon)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team