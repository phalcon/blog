---
layout: post
title: PhalconPHP and PHP7
date: 2016-03-07T21:56:00.000Z
tags:
  - phalcon
  - php7
---
PHP7 was released on the 3rd of December, 2015. This new version brought forward a large number of new and exiting features ([http://php.net/manual/en/migration70.new-features.php](http://php.net/manual/en/migration70.new-features.php)) to PHP. Perhaps one of the biggest of the new features is a new Zend Engine (the engine that powers PHP).

This new engine, code named PHPNG, will give some of your applications double the performance speed.

Some benchmarks that have been run so far:

- Wordpress 3.6 – 20.0% gain (253 vs 211 req/sec)
- Drupal 6.1 – 11.7% gain (1770 vs 1585 req/sec)
- Qdig – 15.3% gain (555 vs 482 req/sec)
- ZF test app – 30.5% gain (217 vs 166 req/sec)

It is only natural that once it came out the PhalconPHP community was dying to know when we would get a chance to work with PhalconPHP and PHP7.

### The Problem
We all know that PhalconPHP is written in Zephir starting with version 2.0, and that this language compiles its code into a C PHP Extension. Because of PHP7's new engine the extension had to be rewritten and adapted to the new specifications.

### The Solution
Knowing this, the PhalconPHP team started working since last year on an updated version of Zephir to make the compiled code work with PHP7.

After a few months we are finally delivered PhalconPHP 2.1 and Zephir 0.9.x which brings PHP7 support.

### Installing PhalconPHP with PHP7
You will need to install PHP7+ and Zephir 0.9.2a-dev (or its latest branch). After you have them installed go to PhalconPHP 2.1.0+ branch and download the source code.

Installation example:

```
root@localhost:~$ cd cphalcon-2.1.x/
root@localhost:~/cphalcon-2.1.x$ zephir build —backend=ZendEngine3
```

If you get these warnings ignore them:

```
Warning: Variable "_SESSION" assigned but not used in Phalcon\Session\Adapter::remove in /root/cphalcon-2.1.x/phalcon/session/adapter.zep on 204 [unused-variable]

     }
    -^

Warning: Variable "beforeLine" assigned but not used in Phalcon\Debug::showTraceItem in /root/cphalcon-2.1.x/phalcon/debug.zep on 339 [unused-variable]

       beforeLine, firstLine, afterLine, lastLine, i, linePosition, currentLine;
    -------------^

Warning: Variable "possibleSetter" declared but not used in Phalcon\Mvc\Model::assign in /root/cphalcon-2.1.x/phalcon/mvc/model.zep on 440 [unused-variable]

      var key, keyMapped, value, attribute, attributeField, possibleSetter, metaData, columnMap, dataMapped;
    ----------------------------------------------------------------------^

Warning: Function "\\sodium\\randombytes_buf" does not exist at compile time in /root/cphalcon-2.1.x/phalcon/security/random.zep on 119 [nonexistent-function]

       return \\Sodium\\randombytes_buf(len);
    ----------------------------------------^

Warning: Function "\\sodium\\randombytes_uniform" does not exist at compile time in /root/cphalcon-2.1.x/phalcon/security/random.zep on 310 [nonexistent-function]

       return \\Sodium\\randombytes_uniform(len);
    --------------------------------------------^

Compiling...
Installing...
Extension installed!
Don't forget to restart your web server

root@localhost:~/cphalcon-2.1.x$  service php-fpm restart
```

That's it!

You now have PhalconPHP and PHP7 working.

Can you expect PhalconPHP to be even faster? No, but you can expect to see your your app be much faster since your PHP code will run better with the new engine. Plus, you won't have any overhead since PhalconPHP is a extension. The best part of all this is that you get all the new features that PHP7 brings to the table.

Do take into account that PHP7 is still rather new, and most of the commonly used extensions like memcache, memcached, and redis are available in Dev/Beta branches, so you need to reinstall them.

**Best of luck to all and enjoy PhalconPHP + PHP7.**
