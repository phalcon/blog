---
layout: post
title: "Guide: Upgrading to Phalcon 2"
tags: [php, phalcon, "2.0", phalcon2, guide, zephir, "2.x"]
---
Phalcon 2 is the a major upgrade to the framework and will be released **April 17th, 2015**. This new version is a rewriting of about 85% total code from C to a high-level language we have created called [Zephir](https://zephir-lang.com/).

Upgrading to the latest version has several benefits:

<!--more-->
- New features and improvements are added and bugs are fixed
- Upgrading to the latest release available makes future upgrades less painful by keeping your code base up to date
- Older version of Phalcon will eventually no longer receive bugs, security or feature updates

If you're upgrading an existing application, it's a great idea to have good test coverage before going in. You should also first upgrade to Phalcon 1.3.4 in case you haven't and make sure your application still runs as expected before attempting an update to Phalcon 2.

Most of the development of Phalcon 2 has been focused on maintaining backwards compatibility with 1.3 and thus make the upgrade as easy as possible. However being a different version with many internal changes, existing applications may require some minor changes. Here are some things to consider to help make your upgrade process as smooth as possible.

**Interfaces and parameter types**
Phalcon 1.3 sometimes does not validate data types and interfaces compliance in parameters with the rigorousness as Phalcon 2 does. In many cases this should not be a problem. If you're implementing your own adapters or components based on Phalcon's interfaces then will be necessary to update the method prototypes:

```php
use Phalcon\Di\InjectionAwareInterface;

class MyComponent implements InjectionAwareInterface
{
    public function setDi($di)
    {

    }
}
```

Must be changed to:

```php
use Phalcon\DiInterface;
use Phalcon\Di\InjectionAwareInterface;

class MyComponent implements InjectionAwareInterface
{
    public function setDi(DiInterface $di)
    {

    }
}
```

If for any reason, a wrong type is passed to methods that are not suppose to, you will probably have to change it:

```php
// Passing a number as route ???
$app->add(100, function () {
    // ...  
})
```

Must be changed to:

```php
// Passing a number as route ???
$app->add("100", function () {
    // ...      
})
```

**Protected methods**
To improve performance some protected methods have been marked as final. It is a good practice not to override these methods as these might change in this or future versions and break applications.

**Dependencies**
In most cases it will be necessary to upgrade to the latest version of your dependencies as well. If the Phalcon version was recently released or if some of your dependencies are not well-maintained, some of your dependencies may not yet support the new Phalcon version. In these cases you may have to wait until new versions of your dependencies are released.

**PHP compatibility**
Like Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we will no longer deliver Windows DLLs for 5.3.x as it is considered an outdated and obsolete version. Additionally, you should know that many performance improvements have been particularly focused on PHP 5.6, so if you want to get the best performance we recommend to use this version.

**Installation**

This version can be installed from the 2.0.0 branch, if you don't have [Zephir](https://zephir-lang.com) installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install
```

The standard installation method also works:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd build
sudo ./install
```

If you have [Zephir](https://zephir-lang.com) installed:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalcon.io/en/download/windows).

**Deployment**
When you are sufficiently confident your application is working with Phalcon 2, you're ready to go ahead and deploy your upgraded Phalcon project.

Happy Upgrading!


<3 Phalcon Team
