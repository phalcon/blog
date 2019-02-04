---
layout: post
title: "Phalcon 2 released!"
tags: [php, phalcon, "2.0", phalcon2, release, zephir, "2.x"]
---

The wait is over! Phalcon 2.0 is here!

After more than a year of development, we're extremely excited to announce the release of Phalcon 2.0 (final).

Those that have been following the project closely, know that this has not been a small feat.

<!--more-->
- We had to create a brand new language [Zephir](http://www.zephir-lang.com) which allows developers to write PHP extensions easily.
- We had to completely rewrite most of Phalcon 1.3.x, offering the same functionality as before so as to ensure that upgrading will be very easy.
- Zephir had to be adjusted and enhanced as we moved through the rewrite, offering more functions and options to developers.
- Additional features were implemented for 2.0, mostly thanks to our contributors!

The results are something that we are very proud of:

- Phalcon 2.0, offering compatible functionality (and more) as before
- [Zephir](http://www.zephir-lang.com), allowing developers to write their own extensions easily without the need to know C.

### Installation

This version can be installed from the master branch, if you don't have [Zephir](http://www.zephir-lang.com) installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/ext
sudo ./install
```

The standard installation method also works:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have [Zephir](http://www.zephir-lang.com) installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/guide-upgrading-to-phalcon-2) for more information about installing and updating to Phalcon 2.

### What's next

Our release schedule will be every one or two months (unless we need to issue a security fix, which will be near instant). The target will be the most requested features by the community, although with [Zephir](http://www.zephir-lang.com), contributing to Phalcon will be a breeze. We can't wait to see those pull requests coming in :)

Smaller changes and fixes that can be bundled in a minor version will be released as soon as we can. We will also be working on a LTS (Long Term Support) model for our community.

Finally we are going to start the research on PHP 7, so that we can adjust [Zephir](http://www.zephir-lang.com) accordingly and of course Phalcon. This task will require a lot of preparation and work but we have our targets set on it due to the new functionality and features it offers.

### Conclusion and acknowledgments

We are super excited about this release and are looking forward to the future. A big thank you to all the contributors and donors! We could not have done this without you. And of course, we would like to thank everyone that tested the alpha, betas and release candidates and finding, filing issues and providing feedback. We really hope you enjoy this release.

We would like to express our deep gratitude for tremendous efforts migrating and testing the code in this version, specially to:

- [Andres Gutierrez](https://github.com/andresgutierrez)
- [Nikolaos Dimopoulos](https://github.com/niden)
- [Vladimir Kolesnikov](https://github.com/sjinks)
- [Eduar Carvajal](https://github.com/carvajaldiazeduar)
- [Dreamszhu](https://github.com/dreamsxin)
- [Dmitry Patsura](https://github.com/ovr)
- [Vladimir Khramov](https://github.com/quantum13)
- [Piotr Gasiorowski](https://github.com/WooDzu)
- [Olivier Monaco](https://github.com/olivier-monaco)
- [Sid Roberts](https://github.com/SidRoberts)
- [Ivan Zubok](https://github.com/akaNightmare)
- [Max Galbusera](https://github.com/maxgalbu)
- [Yvan Taviaud](https://github.com/dugwood)
- [Rian Orie](https://github.com/rianorie)
- [Brainformatik GmbH](https://github.com/brainformatik)
- [Mariusz Łączak](https://github.com/mruz)
- [Nikolay Kirsh](https://github.com/xboston)
- [Kamil Skowron](https://github.com/Cinderella-Man)
- [Serghei Iakovlev](https://github.com/sergeyklay)
- [Richard Laffers](https://github.com/rlaffers)
- [Nikita Vershinin](https://github.com/endeveit)
- [Olivier Garbé](https://github.com/ogarbe)
- [Robert Smolarek](https://github.com/fogcity)
- [Simon Karberg](https://github.com/zyxep)
- [Soufiane Ghzal](https://github.com/gsouf)
- [Kenji Suzuki](https://github.com/kenjis)
- [Vladimir Metelitsa](https://github.com/Green-Cat)
- Carlos Guimaraes

Thanks again to all!

Enjoy Phalcon 2


<3 Phalcon Team
