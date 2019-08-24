---
layout: post
title: "Phalcon 2.0.5 released!"
tags: [php, phalcon, "2.0", phalcon2, release, "2.x"]
---

We are happy to announce that Phalcon 2.0.5 is released. 

This version contains bug fixes and small improvements to the 2.0.x series.

<!--more-->
### Changes

- Fixed a bug that makes that attaching an events manager to a `Mvc\Application` causes `view->render()` not being called
- Fixed bug that makes generated SQL statements using `FOR UPDATE` not being parsed correctly
- The email filter now no longer removes the ' character [10603](https://github.com/phalcon/cphalcon/pull/10603)
- When an array is bound the cached representation in PHQL makes the SQL being incorrectly generated the second time.
- Added `Mvc\Model\MetaData\Memcache` and `Mvc\Model\MetaData\Libmemcached` adapters
- Fixed a bug that makes macro can't be called recursively in Volt

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalcon.io/en/download/windows).

See the [upgrading guide](https://blog.phalcon.io/post/guide-upgrading-to-phalcon-2) for more information about upgrading to Phalcon 2.0.x from 1.3.x.

* [Documentation](https://docs.phalcon.io)
* [API](https://phalcon.link/api)


<3 Phalcon Team
