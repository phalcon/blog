---
layout: post
title: Phalcon v5.0.0RC1 Released!
image: /assets/files/2022-05-31-phalcon-5.0.0-rc.1.png
date: 2022-05-31T16:59:41.105Z
tags:
  - phalcon5
  - release
  - rc
---
We are happy to announce that Phalcon v5.0.0RC1 has been released!!
<!--more-->
A long journey is coming to an end! Today have released [v5.0.0RC1](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0RC1). The new release enjoys some functionality, bug fixes and more importantly support for PHP 8.1.

Getting support for PHP 8.1 has not been an easy task but thanks to the efforts of [@Jeckerson](https://github.com/Jeckerson) we can now use Phalcon with PHP 8.1.

We already started working to enable Phalcon to compile under PHP 8.2. In the meantime, other than some minor bugs that we might try to fix, our focus is on documentation and getting ready for the stable release!

As always, a huge thank you to our community for testing, reporting bugs, enhancing the framework in any way possible!

The changelog for this release ([v5.0.0RC1](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0RC1)) is as follows:

### Changed
- Changed `Phalcon\Session\Bag::__construct()` to accept a `Phalcon\Session\Manager` as the first parameter and `name` as the second one [#15904](https://github.com/phalcon/cphalcon/issues/15904)
- Changed `Phalcon\Logger\Logger` to no longer depend on PSR interfaces [#15925](https://github.com/phalcon/cphalcon/issues/15925)
- Changed `Phalcon\Cache\Cache` to no longer depend on PSR interfaces [#15927](https://github.com/phalcon/cphalcon/issues/15927)
- Changed `Phalcon\Html\Link` to no longer depend on PSR interfaces [#15930](https://github.com/phalcon/cphalcon/issues/15930)

### Fixed
- Fixed `Phalcon\Html\Helper\Input\Numeric` to produce correct elements [#15896](https://github.com/phalcon/cphalcon/issues/15896)
- Fixed `Phalcon\Storage\Adapter\*` to correctly store `null` values [#15904](https://github.com/phalcon/cphalcon/issues/15904)

### Added
- Added `Phalcon\Encryption\Crypt::isValidDecryptLength($input)` to allow checking for the length of the decryption string [#15879](https://github.com/phalcon/cphalcon/issues/15879)
- Added `Phalcon\Di\InitializationAwareInterface` to allow auto calling the `initialize` method when accessing service through DIC [#15916](https://github.com/phalcon/cphalcon/pull/15916)
- Added
    - `Phalcon\Storage\Serializer\MemcachedIgbinary`
    - `Phalcon\Storage\Serializer\MemcachedJson`
    - `Phalcon\Storage\Serializer\MemcachedPhp`
    - `Phalcon\Storage\Serializer\RedisIgbinary`
    - `Phalcon\Storage\Serializer\RedisJson`
    - `Phalcon\Storage\Serializer\RedisMsgpack`
    - `Phalcon\Storage\Serializer\RedisNone`
    - `Phalcon\Storage\Serializer\RedisPhp` to be used if adapter serialization is required [#15904](https://github.com/phalcon/cphalcon/issues/15904)
- Added
  - `Phalcon\Logger\LoggerInterface`
  - `Phalcon\Logger\AbstractLogger` to be used in the logger class but also the proxy-psr3 repo [#15925](https://github.com/phalcon/cphalcon/issues/15925)
- Added
  - `Phalcon\Cache\CacheInterface`
  - `Phalcon\Cache\AbstractCache` to be used in the cache class but also the proxy-psr16 repo [#15927](https://github.com/phalcon/cphalcon/issues/15927)
- Added
  - EvolvableLinkInterface.zep
  - `Phalcon\Html\Link\Interfaces\EvolvableLinkProviderInterface`
  - `Phalcon\Html\Link\Interfaces\LinkInterface`
  - `Phalcon\Html\Link\Interfaces\LinkProviderInterface`
  - `Phalcon\Html\Link\AbstractLink`
  - `Phalcon\Html\Link\AbstractLinkProvider` to be used in the link class but also the proxy-psr13 repo [#15930](https://github.com/phalcon/cphalcon/issues/15930)
- Added `Phalcon\Translate\Adapter\Csv::toArray()` and `Phalcon\Translate\Adapter\NativeArray::toArray()` to return the translation array back  [#15902](https://github.com/phalcon/cphalcon/issues/15902)

### Removed
- Removed `Phalcon\Container\Container` and moved its contents to the `proxy-psr11` repo [#15928](https://github.com/phalcon/cphalcon/issues/15928)
- Removed `Phalcon\Http\Message\*` and `Phalcon\Http\Server\*` classes. This removes PSR from Phalcon. PSR-7 available in v6 [#15929](https://github.com/phalcon/cphalcon/issues/15929)
