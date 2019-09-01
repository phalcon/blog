---
layout: post
title: 'Phalcon 2.0 : Differences with Phalcon 1.3 and why you should upgrade.'
date: 2015-06-09T20:26:00.000Z
tags:
  - phalcon2
  - upgrade
---
Phalcon 2.0 was launched a month ago. It is the new version of the fastest PHP framework, PhalconPHP. Now that some time has passed we’d like to talk about the differences between both versions, why you should upgrade to Phalcon 2.0, and why you should consider it as a development framework.

PhalconPHP is a PHP framework much like Laravel, Symfony, CakePHP, and Codeigniter (to name a few). Even though there are many frameworks Phalcon has a huge advantage over the rest: it’s source code is written in C and it runs as a PHP extension. That is the advantage it possesses. Since it’s written in C and compiled as an extension Phalcon does not have to be interpreted for each request. Instead it works like a component of PHP. It could be argued as if PHP had its own native framework since you do not have to include files or libraries to call its components. This gives Phalcon a huge boost in both speed and performance.

Example of code using Phalcon:

```php
use Phalcon\Mvc\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        echo "Hello! Phalcon v2";
    }
}
```

However, being a framework written in C is both Phalcon’s greatest strength and weakness. Most PHP developers do not have knowledge of C as a programming language. This has greatly limited the amount of contributors Phalcon has had; slowing the rate at which it can grow and mature.

### Enter Zephir to the rescue.

```php
namespace Utils;

// Zephir Code
class Filter
{
    public function alpha(string str)
    {
        char ch;

        for ch in str {
            echo ch, "\n";
        }
    }
}
```

Running your code on PHP

```php
$f = new Utils\Filter();
$f->alpha("hello");
```

Phalcon's creators have been conscious of this big hurdle, and they have been working hard on a solution that could very well impact the PHP community at a grander scale. Zephir was created exclusively for the development of PHP extensions and is the core for Phalcon 2.0. Zephir is a new language with similar structure to PHP that will allow the PHP community to actually participate in Phalcon's development, and in turn help Phalcon evolve and mature quicker, offering a wider variety of options and components.

That’s right. Phalcon 2.0 was written in Zephir. That is the main difference between both versions. While Phalcon1 was written in C and compiled as an extension, Phalcon 2.0 is written in Zephir, which is in turn compiled into a PHP extension in C. At its core, Phalcon 2.0 is simply Phalcon 1.3 rewritten in Zephir. This was done to prove two things: that Zephir is reliable and that extensions for PHP can now be developed more easily.

### Why upgrade to Phalcon 2.0?

It is a simple matter of code integration and security. It is never a good idea to work off of old frameworks versions. The main force behind the advice for upgrading is simple: Phalcon 2.0 is Phalcon 1.3. Upgrading to the latest version (2.0.2 at the moment of this article) shouldn't be a problem. Backwards compatibility is guaranteed.

This new version of Phalcon guarantees several things for the community:

It will allow the framework to grow quicker because more people will be able to contribute.

There is a new programming language with the ability of allowing everyone to write PHP extensions with ease.

At its core Phalcon 2.0 is still Phalcon 1.3, but written in Zephir.

### Why should you consider PhalconPHP?

You should consider it not only for it's speed and performance, but also because it's unshackled. You can organize your project in any way you want, following the latest tendencies the PHP community is adapting.

- Dependency Injection (DI)
- Command Line Interface (CLI)
- Access Control List (ACL)
- Micro API
- Object Relational Mapping (ORM)
- Template Managers (Volt)
- Memcache Drivers
- Beanstalked Drivers
- Security (OAUTH, HMAC)
- And many other things...

If you still have any doubts feel free to comment on them and we will answer your questions or concerns. Feel free to consult the cheat sheet or the PhalconPHP forums first to see if what you need is already answered there.

### Resources
Zephir - [https://zephir-lang.com][https://zephir-lang.com]
PhalconPHP - [https://phalcon.io][https://phalcon.io]
