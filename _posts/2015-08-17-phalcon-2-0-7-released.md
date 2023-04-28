---
layout: post
title: "Phalcon 2.0.7 released!"
tags: [php, phalcon, "2.0", phalcon2, release, "2.x"]
---
We are excited to announce the release of Phalcon 2.0.7!
This is our seventh release in the 2.0.x series and it contains bug fixes and new features for your enjoyment!

<!--more-->
### Changes

- `Image\Adapter\Gd::save()` no longer fails if the method or the instance is created with a filename without an extension
- Fixed segfault and implementation of `Image\Adapter\Imagick::text()`
- Exceptions thrown in Volt compiler are now `Phalcon\Mvc\View\Engine\Exception`
- Now you can import macros from other files using `{% raw %}{% include "file.volt" %}{% endraw %}`
- Undefined function calls fall back to macro calls in Volt templates
- Automatic bound parameters in `Mvc\Model\Criteria` now uses a different prefix
than `Mvc\Model\Query\Builder` to avoid collisions
- Added `Cache\Multiple::flush()` to flush the cache backends added to the multiple system
- Fixed `Session\Bag::remove()`
- `Session\Bag::destroy()` eliminates any temporary data in the variables bag
- `afterCreate`/`afterUpdate` are only called if saving related records was successful
- Added an optional parameter removeData to `Session\Adapter::remove()` to remove any data in `$_SESSION` that belongs to the uniqueId or the whole session data
- Now session variables making use of unique prefixes use `#` as internal separator
- Added parameter that changes the default operator for conditions in method `Mvc\Model\Criteria::fromImput()` [10749](https://github.com/phalcon/cphalcon/issues/10749)
- Added `\Phalcon\Queue\Beanstalk::listTubes()` to get list of a tubes
- Added a fix to avoid that a table present in many sub-queries causes invalid SQL generation
- Add `CookieInterface`, update `Cookie` and `Cookies` to use this interface - Decoupling `Cookies` and `Cookie` - Check `Session` state before using it in `Cookie`. [10789](https://github.com/phalcon/cphalcon/issues/10789)
- Fixed merge of two `Phalcon\Config` instances that contains object values different than `Phalcon\Config` compatible instances
- When creating tables in Postgres, inline PRIMARY keys are now escaped properly [10797](https://github.com/phalcon/cphalcon/issues/10797)
- Fixed incorrect generation of `SELECT COUNT(*)` causing unexpected exceptions when `phqlLiterals` is disabled
- Added `Phalcon\Security\Random` - secure random number generator class. Provides secure random number generator which is suitable for generating session key in HTTP cookies, etc

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have Zephir installed:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalcon.io/en/download/windows).

* [Documentation](https://docs.phalcon.io)

Thanks to everyone involved in this release and thanks for choosing Phalcon!

