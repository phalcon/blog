---
layout: post
title: "Phalcon 2.1.0 RC1 released"
tags: [php, phalcon, "2.1", phalcon2, release]
---
We are excited to announce the immediate availability of Phalcon 2.1 RC 1!

This version is our first [LTS](https://en.wikipedia.org/wiki/Long-term_support) version and it will be supported 3 years from its final release date. Also, this will be our last release candidate before the final version of Phalcon 2.1.

Phalcon 2.1 introduces a great number of improvements, striving to make Phalcon even a better framework. Final version will be available in two weeks.

<!--more-->
**NOTE**: Some of these changes will break existing Phalcon 2.x applications. Please ensure that you have tested your application sufficiently before migrating your application to 2.1 for production purposes.

### Changes in Phalcon 2.1

- PHP 5.3 is no longer supported
- `Phalcon\Mvc\Model\Validation` is now deprecated in favor of `Phalcon\Validation`
- The default encrypt mode in `Phalcon\Crypt` is now changed to `MCRYPT_MODE_CFB`
- Changed default hash algorithm in `Phalcon\Security` to `CRYPT_BLOWFISH_Y`
- Changed constructor of `Phalcon\Mvc\Model` allowing you to pass an array of initialization data
- Removed support for prefixes strategy in `Phalcon\Loader`
- `Phalcon\Mvc\View` now supports many views directories
- An absolute path can now be used for `Mvc\View::setLayoutsDir`
- Fixed odd view behavior [1933](https://github.com/phalcon/cphalcon/issues/1933) related to `setLayout()` and `pick()`
- `Phalcon\Di` is now bound to service closures allowing use `Phalcon\Di` as `$this` to access services within the closures
- If an object is returned after firing the event `beforeServiceResolve` in `Phalcon\Di` it overrides the default service localization process
- Placeholders `:controller` and `:action` in `Mvc\Router` now default to `/([\\w0-9\\_\\-]+)` instead of `/([\\a-zA-Z0-9\\_\\-]+)`
- Modifier `#u` (`PCRE_UTF8`) is now the default in regex based routes in `Mvc\Router`
- Return `false` from an action disables the view component (same as `$this->view->disable()`)
- Return a string from an action takes it as the body of the response (same as return `$this->response->setContent('Hello world')`)
- Return a string from an `Mvc\Micro` handler takes it as the body of the response
- `Mvc\Router\Route` now escapes characters such as `.` or `+` to avoid unexpected behaviors
- Closures used as handlers in` Mvc\Micro` are now bound to the `$app` instance
- Routes now can have an associated callback that can override the default dispatcher and view behavior
- `Phalcon\Mvc\Model` now implements `JsonSerializable` making easy serialize model instances
- When destructing a `Mvc\Model\Manager` PHQL cache is cleared
- Method `isSetOption` in `Phalcon\Validation\ValidatorInterface` marked as deprecated. You can now use `hasOption` instead
- Added internal check `allowEmpty` before calling a validator. If it option is true and the value of empty, the validator is skipped
- Added default header: `Content-Type: "application/json; charset=UTF-8"` in method `Phalcon\Http\Response::setJsonContent`
- `Phalcon\Events\Event` now implements `Phalcon\Events\EventInterface`
- `Phalcon\Events\Event::getCancelable` renamed to `Phalcon\Events\Event::isCancelable`
- Removed `Phalcon\Events\Manager::dettachAll` in favor of `Phalcon\Events\Manager::detachAll`
- `Phalcon\Mvc\Model\Criteria::getOrder` is renamed to `Phalcon\Mvc\Model\Criteria::getOrderBy`
- Added method `getOption()` in `Phalcon\Mvc\Model\RelationInterface`
- Added ability to spoof the HTTP request method
- Added `FULLTEXT` index type to `Phalcon\Db\Adapter\Pdo\Mysql`
- Fixed the use of the annotation router with namespaced controllers
- Added `Phalcon\Acl\RoleAware` and `Phalcon\Acl\ResourceAware` Interfaces. You can now pass objects to `Phalcon\Acl\AdapterInterface::isAllowed` as `roleName` and `resourceName`, which will be automatically passed to the function defined in `Phalcon\Acl\AdapterInterface::allow` or `Phalcon\Acl\AdapterInterface::deny` by type
- `Phalcon\Acl\AdapterInterface::allow` and `Phalcon\Acl\AdapterInterface::deny` have now a 4th argument - `function`, which will be called when using `Phalcon\Acl\AdapterInterface::isAllowed`
- `Phalcon\Acl\AdapterInterface::isAllowed` has now a 4th argument - `parameters`; You can pass arguments for `function` defined in `Phalcon\Acl\AdapterInterface:allow` or `Phalcon\Acl\AdapterInterface::deny` as associative array where `key` is the argument name
- Added method `getActionSuffix()` in `Phalcon\DispatcherInterface`
- CLI parameters are now handled consistently
- Added `Phalcon\Mvc\Controller\BindModelInterface` and associated model type hint loading through dispatcher.
- Added `Phalcon\Dispatcher::hasParam()`
- `Phalcon\Cli\Console` and `Phalcon\Mvc\Application` now inherit `Phalcon\Application`.
- Fixed `afterFetch` event not being sent to behaviors
- Fixed issue with radio not being checked when default value is 0 [11358](https://github.com/phalcon/cphalcon/issues/11358)
- Fixed issue with `Model::__set` that was bypassing setters [11286](https://github.com/phalcon/cphalcon/issues/11286)
- Fixed issue with `Model::__set` that was setting hidden attributes directly when setters are not declared [11286](https://github.com/phalcon/cphalcon/issues/11286)
- Added `Phalcon\Cli\DispatcherInterface`, `Phalcon\Cli\TaskInterface`, `Phalcon\Cli\RouterInterface` and `Phalcon\Cli\Router\RouteInterface`.
- Added `Phalcon\Mvc\Collection::update`, `Phalcon\Mvc\Collection::create` and `Phalcon\Mvc\Collection::createIfNotExist`
- Removed `__construct` from all interfaces [11410](https://github.com/phalcon/cphalcon/issues/11410)
- Fire the `dispatch:beforeException` event when there is an exception during dispatching [11458](https://github.com/phalcon/cphalcon/issues/11458)
- Added `OR` operator for `Phalcon\Mvc\Model\Query\Builder` methods: `betweenWhere`, `notBetweenWhere`, `inWhere` and `notInWhere`
- Fixed bug of `destroy` method of `Phalcon\Session\Adapter\Libmemcached`
- Added `Phalcon\Cache\Backend\Memcache::addServers` to enable pool of servers for memcache
- Added `setLastModified` method to `Phalcon\Http\Response`
- Added `Phalcon\Validation\Validator\Date`
- `Mcrypt` is replaced with openssl in `Phalcon\Crypt`
- Removed methods `setMode()`, `getMode()`, `getAvailableModes()` in `Phalcon\CryptInterface`
- Added `Phalcon\Assets\Manager::exists()` to check if collection exists

### PHP 7 support

Phalcon 2.1.x has beta PHP7 support, we expect to fix any blocking bug in the next two weeks before the final release. You can try Phalcon running on PHP7 by compiling from the 2.1.x branch using Zephir:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.1.x
zephir build --backend=ZendEngine3
```

After this, you only have to add `extension=phalcon.so` to your `php.ini` file.

### New Package Infrastructure

We would like to share with you, our community, our plans for moving forward with regards to packaging and distributing Phalcon.

We have been researching many options to make the whole process easy, transparent and automated as possible. Our goal is to be able to use a continuous delivery system that will compile and package Phalcon immediately after each release. To achieve this, we chose to use the [Packagecloud](https://packagecloud.io/) service to distribute Phalcon binaries.

This move will increase the availability of Phalcon in more Linux operating systems than currently available, and users will be able to use any built-in package manager of their operating system to install the framework. The available operating systems will be:

* Debian
* CentOS
* RedHat
* Amazon Linux
* Fedora
* LinuxMint
* Oracle Linux
* Raspbian
* Scientific Linux
* Ubuntu
* elementary OS

In addition to the above, automation will reduce the human interaction currently needed to create each Phalcon distribution.

For the time being, each distribution will be manually compiled by the Phalcon Team. Our goal is not to change the framework and the way it works for the community, but rather the way it is distributed. For that we will ensure that the new delivery mechanism is tested sufficiently, before we fully switch to [Packagecloud](https://packagecloud.io/) and deprecate our Launchpad repository.

This move will make Phalcon available to a much wider variety of Linux based operating systems and reduce the time needed to produce those packages.

We will announce in our blog when this change will happen, so for the time being you can keep getting new versions as you have been in the past.

### Update/Upgrade

Phalcon 2.1 RC1 can be installed from the 2.1.x branch, if you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon/build
git checkout 2.1.x
sudo ./install
```

If you have Zephir installed:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.1.x
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalcon.io/en/download/windows).

As always, many thanks to everyone involved in this release and thanks for choosing Phalcon!
