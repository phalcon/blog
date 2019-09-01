---
layout: post
title: Living on the edge of PhalconPHP
date: 2015-09-07T21:04:00.000Z
tags:
  - phalcon
  - upgrade
---
Phalcon is a framework that differs from the rest. We can't update the source code from composer like other frameworks, we have to recompile the extension with each new update. Some can find this as a problem. Others, like us, find it entertaining.

Phalcon recently launched its new version (2.0). With this new version we’ve seen a large number of improvements, but as with every software we’ve also got some new bugs. However some of us can't wait for the new release to get the bug fix, we need the latest and greatest version. This is where we need to either compile Phalcon from Zephir or download the latest build.

To get the latest version of Phalcon go to PhalconPHP’s GIT and get the version of the branch you are using.  (For this article let got with 2.1.x.)

[https://github.com/phalcon/cphalcon/tree/2.1.x][https://web.archive.org/web/20160322143039/https://github.com/phalcon/cphalcon/tree/2.1.x]

Now you have 2 options, the build way or the recompile way. On this article we will focus on the build way.

### The Build Way
1. Download the latest version either via GIT or direct download

```bash
 [root@server ~] wget https://github.com/phalcon/cphalcon/archive/2.1.x.zip

 [root@server ~] unzip 2.1.x.zip

 [root@server ~] cd cphalcon-2.1.x/
```

List everything on the folder

```bash
[root@server cphalcon-2.1.x] ls
build  CHANGELOG.md  codeception.yml  codecept.phar  composer.json  config.json  CONTRIBUTING.md  docs  ext  optimizers  phalcon  php-tests  README.md  run-tests.sh  tests  unit-tests
```

We can see 2 folders: build and ext. If we are installing the latest stable version we normally go with the folder build; but since we are going to install the latest unstable version we need to got to the folder ext

```bash
[root@server cphalcon-2.1.x]  cd ext
```

Now we need to compile the new version. Simply run the install command

```bash
[root@server cphalcon-2.1.x] ./install
```

That’s it, restart PHP-FPM or Apache. Welcome to the edge of Phalcon. ;)

```bash
[root@server ext] /etc/init.d/php-fpm restart
```

Enjoy. If you find bugs please report them on github.
