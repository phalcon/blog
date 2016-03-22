Phalcon 2.1.0 RC1 released
==========================

We are excited to announce the immediate availability of Phalcon 2.1 RC 1.
This version is our first [LTS](https://en.wikipedia.org/wiki/Long-term_support) version
and it will be supported 3 years from its final release date. Also, this will be our latest release candidate
before the final version of Phalcon 2.1.

Phalcon 2.1 introduces many great improvements to make Phalcon even a better framework.
Some of these changes will break existing Phalcon 2.x applications. Make sure you
upgrade your applications in a testing environment before using Phalcon 2.1 in production.

### Changes in Phalcon 2.1

- PHP 5.3 is now fully deprecated
- `Phalcon\Mvc\Model\Validation` is now deprecated in favor of `Phalcon\Validation`
- Default encrypt mode in `Phalcon\Crypt` is now changed to `MCRYPT_MODE_CFB`
- Changed default hash algorithm in `Phalcon\Security` to `CRYPT_BLOWFISH_Y`
- Changed constructor of `Phalcon\Mvc\Model` to allow pass an array of initialization data
- Removed support for prefixes strategy in `Phalcon\Loader`
- Now `Phalcon\Mvc\View` supports many views directories at the same time
- An absolute path can now be used to `Mvc\View::setLayoutsDir`
- Fixed odd view behavior[#1933](https://github.com/phalcon/cphalcon/issues/1933) related to setLayout() and pick()
- `Phalcon\Di` is now bound to services closures allowing use `Phalcon\Di` as $this to access services within them
- If an object is returned after firing the event `beforeServiceResolve` in `Phalcon\Di` this overrides the
  default service localization process
- Placeholders `:controller` and `:action` in `Mvc\Router` now defaults to `/([\\w0-9\\_\\-]+)` instead of `/([\\a-zA-Z0-9\\_\\-]+)`
- Modifier `#u` (PCRE_UTF8) is now default in regex based routes in `Mvc\Router`
- Return 'false' from an action disables the view component (same as `$this->view->disable()`)
- Return a string from an action takes it as the body of the response (same as return `$this->response->setContent('Hello world')`)
- Return a string from an `Mvc\Micro` handler takes it as the body of the response
- `Mvc\Router\Route` now escapes characters such as . or + to avoid unexpected behaviors
- Closures used as handlers in` Mvc\Micro` are now bound to the $app instance
- Routes now can have an associated callback that can override the default dispatcher + view behavior
- `Phalcon\Mvc\Model` now implements `JsonSerializable` making easy serialize model instances
- When destructing a `Mvc\Model\Manager` PHQL cache is clean
- Method `isSetOption` in `Phalcon\Validation\ValidatorInterface` marked as deprecated, please use `hasOption`
- Added internal check "allowEmpty" before calling a validator. If it option is true and the value of empty, the validator is skipped
- Added default header: `Content-Type: "application/json; charset=UTF-8"` in method `Phalcon\Http\Response::setJsonContent`
- Now `Phalcon\Events\Event` implements `Phalcon\Events\EventInterface`
- `Phalcon\Events\Event::getCancelable` renamed to `Phalcon\Events\Event::isCancelable`
- Removed `Phalcon\Events\Manager::dettachAll` in favor of `Phalcon\Events\Manager::detachAll`
- `Phalcon\Mvc\Model\Criteria::getOrder` renamed to `Phalcon\Mvc\Model\Criteria::getOrderBy`
- Added method `getOption()` in `Phalcon\Mvc\Model\RelationInterface`
- Added ability to spoof HTTP request method
- Added FULLTEXT index type to `Phalcon\Db\Adapter\Pdo\Mysql`
- Fixed the use of the annotation router with namespaced controllers
- Added `Phalcon\Acl\RoleAware` and `Phalcon\Acl\ResourceAware` Interfaces, Now you can pass objects to `Phalcon\Acl\AdapterInterface::isAllowed` as `roleName` and `resourceName`, also they will be automatically passed to function defined in `Phalcon\Acl\AdapterInterface::allow` or `Phalcon\Acl\AdapterInterface::deny` by type
- `Phalcon\Acl\AdapterInterface::allow` and `Phalcon\Acl\AdapterInterface::deny` have 4th argument - function, which will be called when using `Phalcon\Acl\AdapterInterface::isAllowed`
- `Phalcon\Acl\AdapterInterface::isAllowed` have 4th argument - parameters, you can pass arguments for function defined in `Phalcon\Acl\AdapterInterface:allow` or `Phalcon\Acl\AdapterInterface::deny` as associative array where key is argument name
- Added method `getActionSuffix()` in `Phalcon\DispatcherInterface`
- CLI parameters are now handled consistently.
- Added `Phalcon\Mvc\Controller\BindModelInterface` and associated model type hint loading through dispatcher.
- Added `Phalcon\Dispatcher::hasParam()`.
- `Phalcon\Cli\Console` and `Phalcon\Mvc\Application` now inherit `Phalcon\Application`.
- Fixed `afterFetch` event not being sent to behaviors
- Fixed issue with radio not being checked when default value is 0 [#11358](https://github.com/phalcon/cphalcon/issues/11358)
- Fixed issue with `Model::__set` that was bypassing setters [#11286](https://github.com/phalcon/cphalcon/issues/11286)
- Fixed issue with `Model::__set` that was setting hidden attributes directly when setters are not declared [#11286](https://github.com/phalcon/cphalcon/issues/11286)
- Added `Phalcon\Cli\DispatcherInterface`, `Phalcon\Cli\TaskInterface`, `Phalcon\Cli\RouterInterface` and `Phalcon\Cli\Router\RouteInterface`.
- Added `Phalcon\Mvc\Collection::update`, `Phalcon\Mvc\Collection::create` and `Phalcon\Mvc\Collection::createIfNotExist`
- Removed `__construct` from all interfaces [#11410](https://github.com/phalcon/cphalcon/issues/11410)
- Fires the `dispatch:beforeException` event when there is any exception during dispatching [#11458](https://github.com/phalcon/cphalcon/issues/11458)
- Added `OR` operator for `Phalcon\Mvc\Model\Query\Builder` methods: `betweenWhere`, `notBetweenWhere`, `inWhere` and `notInWhere`
- Fixed bug of `destroy` method of `Phalcon\Session\Adapter\Libmemcached`
- Added `Phalcon\Cache\Backend\Memcache::addServers` to enable pool of servers for memcache
- Added `setLastModified` method to `Phalcon\Http\Response`
- Added `Phalcon\Validation\Validator\Date`
- Mcrypt is replaced with openssl in `Phalcon\Crypt`
- Removed methods setMode(), getMode(), getAvailableModes() in `Phalcon\CryptInterface`
- Added `Phalcon\Assets\Manager::exists()` to check if collection exists

### PHP 7 support

### New Package Infrastructure

We’d like to tell you something about our current binary distribution plans. At the moment, we're carrying out research in this field and try to work out a strategy that we will use in future. The aim of this strategy involves continuous delivery of every new version immediately after its release. We are going to use the [Packagecloud](https://packagecloud.io/) service to distribute Phalcon binaries. It will enlarge the list of operating systems where the users can install Phalcon by using any built-in package manager. What follows is the list of operating systems which users will install Phalcon without compilation:
​
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
​
Beyond that we'll try to automate this process reducing human errors. We're doing our best to minimize the role of a particular man in forming a release for a specific operating system in future. But initial step on the road to implementing automatiс releases is the manual creating of each of them. You should not worry that Phalcon can work wrong or unpredictably for you. What will be changed is only the way of distribution. After we will have tested this approach sufficiently we will announce officially that we deprecate our Launchpad repo. In actual fact we took this step in an effort to make Phalcon more accessible to great masses of users, as well as more effortless for us.
​
We will announce in our blog when this will happen, so right now you can keep getting new versions in a way usual for you.

### Update/Upgrade

Phalcon 2.1 RC1 can be installed from the 2.1.x branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
git checkout 2.1.x
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.1.x
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

Thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
