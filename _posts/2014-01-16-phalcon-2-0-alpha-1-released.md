---
layout: post
title: "Phalcon 2.0 alpha 1 released!"
tags: [php, phalcon, "2.0", zephir, alpha, "2.x"]
---

![image](/assets/files/2014-01-16-website.jpg)

We're very excited to announce the release of **Phalcon 2.0 Alpha 1**!

This release showcases yet another huge step forward in Phalcon releases.

Unlike previous versions of Phalcon, most of this version is written in [Zephir](http://zephir-lang.com/index.html). Zephir is a new language that we have been developing for several months now, which is specifically intended to ease the creation of extensions for PHP.

To demonstrate the progress we have made in this release, we are running our official site with it. You can see this [here](http://two.phalconphp.com/website).

### What's missing?

As any alpha version you may expect bugs and missing features, however outreach this point is very important to us, since it allows for the community to get involved in with it.

- A large number of components and classes have been migrated to Phalcon 2 from the 1.x branches. You can see the progress [here](https://github.com/phalcon/cphalcon/wiki/Progress-2.0).
- Phalcon 1.3 has important optimizations and improvements that need to be migrated and integrated into Phalcon 2.
- Phalcon 2.0 is passing a large number of unit tests. However, more work is needed to ensure that implemented functionality is compatible with 1.x prior to introducing any major changes.

### Zephir

Zephir is a high-level compiled language that we're creating to replace development with C in most parts of Phalcon. It's fully open sourced under the [MIT license](http://opensource.org/licenses/MIT).

Thanks to the help and contributions from the community, we have made huge progress in the development of this new language. To all of you thanks!. There is still a lot of room for improvement and that is what we hope to do in the coming months.

Here are some links that may interest you if want to learn more:

- [Introductory Screencast](http://vimeo.com/84180223)
- [Tutorial](http://zephir-lang.com/tutorial.html)
- [Documentation](http://zephir-lang.com/)
- [Blog](http://blog.zephir-lang.com/)
- [Github](https://github.com/phalcon/zephir)

### Help with Testing

This version can be installed from the 2.0.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install-test
```

We welcome your comments regarding this new release. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on [Github](https://github.com/phalcon/cphalcon).

Thanks!


<3 The Phalcon Team
