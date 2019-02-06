---
layout: post
title: Living on the edge with Phalcon
date: 2019-02-06T22:04:31.755Z
tags:
  - phalcon
  - v4
  - phalcon4
  - compiling
  - php
  - zephir
---
Phalcon is a framework that differs from the rest. Developers cannot update the framework using tools like composer with one command. Instead the extension needs to be recompiled with each new update. Some people find this a problem and a nuisance. Others, like us, find it entertaining!
<!--more-->
We have just launched a new version ([4.0.0-alpha.2](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.2)). In this new version we have addressed several bugs (some found in the previous alpha version), but also introduced a large number of improvements. As with any release, especially alpha ones, we may find bugs or defects. Traditionally alpha versions are not as stable, so bugs are expected. Bugs are usually fixed and pushed in the currently working branch, and are available with the next release. Some of us like living on the edge so to speak. We really cannot wait for the next release and always want to work with the latest and greatest version! To achieve this, we will need to either compile Phalcon from Zephir or download the latest build from the working branch.

To get the latest version of Phalcon go to [Phalcon's GitHub page](https://github.com/phalcon/cphalcon), switch to the relevant branch (currently `4.0.x`) and download it. You can also clone the repository and switch to the `4.0.x` branch.

```bash
https://github.com/phalcon/cphalcon/tree/4.0.x
```

Now you have 2 options: building or recompiling. In this article we focus on building Phalcon.

## Building
Download the latest version either via git or direct download

```bash
$ wget https://github.com/phalcon/cphalcon/archive/4.0.x.zip
$ unzip 4.0.x.zip
$ cd cphalcon-4.0.x/
```

List everything on the folder

```bash
$ ls -1
appveyor.yml
backers
BACKERS.md
build
CHANGELOG-4.0.md
CHANGELOG.md
codeception.yml
CODE_OF_CONDUCT.md
composer.json
config.json
CONTRIBUTING.md
ext
LICENSE-PHP.txt
LICENSE.txt
LICENSE-ZEND.txt
optimizers
phalcon
phpcs.xml
README.md
resources
tests
```

We can see 2 folders: `build` and `ext`. If we are installing the latest stable version we normally go with the folder `build`; but since we are going to install the _latest unstable_ version we need to got to the folder `ext`.

```bash
$ cd ext
```

Now we need to compile the new version. Simply run the install command

```bash
# Note, this command may require sudo privileges
$ ./install
```

That’s it, restart PHP-FPM or Apache. 

```bash
$ /etc/init.d/php-fpm restart
```

Welcome to the living on the edge with Phalcon. ;)

Enjoy! If you find bugs please report them on [GitHub](https://github.com/phalcon/cphalcon/issues).

<3 Phalcon Team
