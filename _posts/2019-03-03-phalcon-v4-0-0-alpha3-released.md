---
layout: post
title: Phalcon v4.0.0-alpha3 released
date: 2019-03-03T18:47:07.996Z
tags:
  - phalcon
  - phalcon4
  - release
  - alpha
---
The Phalcon Team is happy to announce the release of **v4.0.0 Alpha 3**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.3)
                                                                         
We cannot thank your community enough! By reporting bugs, offering feedback and suggestions, pull requests, being active in discussions about how the framework should move towards the future, you all help us make Phalcon better with every release.
<!--more-->

We are releasing the third alpha version today, a lot of additions as well as bug fixes. You can see our project [here](https://github.com/phalcon/cphalcon/projects/3)

In case you missed it, there are two discussions going on on Github regarding our new [Queue](https://github.com/phalcon/cphalcon/issues/13851) component and the direction to take, as well as voting for [upcoming features](https://github.com/phalcon/cphalcon/issues/13855) priority. We would welcome any input.

### Changelog
#### Added
- Added `view:afterCompile` and `view:beforeCompile` events for the Volt compiler [#2182](https://github.com/phalcon/cphalcon/pull/2182)
- Added array merge support to `Phalcon\Config::merge`
- Added `setBlacklist` in `Phalcon\Debug` to allow the developer to "blacklist" certain variables from the `$_REQUEST` or `$_SERVER` superglobals being displayed on screen [#13687](https://github.com/phalcon/cphalcon/pull/13687)
- Changed view engine service closures to no longer receive the dependency injector as the second parameter. Instead use `$this` for the DI. [#11926](https://github.com/phalcon/cphalcon/issues/11926)

#### Fixed
- Fixed router and controller parameter inconsistencies (camelize etc.) [#13555](https://github.com/phalcon/cphalcon/issues/13555)
- Fixed `invalid opcode` in `phalcon.so` when using docker [#13143](https://github.com/phalcon/cphalcon/issues/13143)
- Fixed storing related model data in `Phalcon\Messages\Message`. The method is now `setMetadata` and can be used to store any metadata from any component that emits messages [#13811](https://github.com/phalcon/cphalcon/issues/13811)
- Fixed Dispatcher calling camelize twice and producing incorrect results [#12829](https://github.com/phalcon/cphalcon/issues/12829)
- Fixed `Phalcon\Mvc\Model:findFirst` to throw an exception when the passed parameter for a primary key is not an array, string or numeric [#13336](https://github.com/phalcon/cphalcon/issues/13336)
- Added `Phalcon\Http\ResponseInterface::isSent`, that was already used. [#13836](https://github.com/phalcon/cphalcon/pull/13836)

#### Changed
- Renamed `Phalcon\Acl\Subject` to `Phalcon\Acl\Component` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\SubjectInterface` to `Phalcon\Acl\ComponentInterface` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\SubjectAware` to `Phalcon\Acl\ComponentAware` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\Operation` to `Phalcon\Acl\Role` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\OperationInterface` to `Phalcon\Acl\RoleInterface` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\OperationAware` to `Phalcon\Acl\RoleAware` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::addOperation` to `Phalcon\Acl\AdapterInterface::addRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::isOperation` to `Phalcon\Acl\AdapterInterface::isRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::isSubject` to `Phalcon\Acl\AdapterInterface::isComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::addSubject` to `Phalcon\Acl\AdapterInterface::addComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::addSubjectAccess` to `Phalcon\Acl\AdapterInterface::addComponentAccess` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::dropSubjectAccess` to `Phalcon\Acl\AdapterInterface::dropComponentAccess` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::getActiveOperation` to `Phalcon\Acl\AdapterInterface::getActiveRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::getActiveSubject` to `Phalcon\Acl\AdapterInterface::getActiveComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::getOperationss` to `Phalcon\Acl\AdapterInterface::getRoles` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\AdapterInterface::getSubjects` to `Phalcon\Acl\AdapterInterface::getComponents` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\Adapter::getActiveOperation` to `Phalcon\Acl\AdapterInterface::getActiveRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\Adapter::getActiveSubject` to `Phalcon\Acl\AdapterInterface::getActiveComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808)
- Renamed `Phalcon\Acl\Adapter\Memory::addOperation` to `Phalcon\Acl\Adapter\Memory::addRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::isOperation` to `Phalcon\Acl\Adapter\Memory::isRole` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::isSubject` to `Phalcon\Acl\Adapter\Memory::isComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::addSubject` to `Phalcon\Acl\Adapter\Memory::addComponent` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::addSubjectAccess` to `Phalcon\Acl\Adapter\Memory::addComponentAccess` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::dropSubjectAccess` to `Phalcon\Acl\Adapter\Memory::dropComponentAccess` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::getOperationss` to `Phalcon\Acl\Adapter\Memory::getRoles` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Acl\Adapter\Memory::getSubjects` to `Phalcon\Acl\Adapter\Memory::getComponents` [#13808](https://github.com/phalcon/cphalcon/issues/13808) 
- Renamed `Phalcon\Mvc\Url` to `Phalcon\Url` [#13742](https://github.com/phalcon/cphalcon/issues/13742)
- Renamed `Phalcon\Mvc\UrlInterface` to `Phalcon\UrlInterface` [#13742](https://github.com/phalcon/cphalcon/issues/13742)
- Renamed `Phalcon\Mvc\Url\Exception` to `Phalcon\Url\Exception` [#13742](https://github.com/phalcon/cphalcon/issues/13742)

#### Removed
- Removed the CSS/JS minifiers. This affects the Assets\Filter classes. For now the classes return the original content. [#13819](https://github.com/phalcon/cphalcon/issues/13819), [#10118](https://github.com/phalcon/cphalcon/issues/10118)
- Removed `Phalcon\Queue` namespace and tests. Beanstalkd is near being abandoned. A new Queue component/adapter will be implemented for queueing needs of the community. [#13364](https://github.com/phalcon/cphalcon/issues/13364)


> Did you know that you can now add comments to our documentation as well as our blog posts?
{: .alert .alert-warning }

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-alpha3. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.3).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalconphp.com/4.0/en/installation).

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
