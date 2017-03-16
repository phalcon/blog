## Phalcon 2 beta 2 available

It's been a while since we last communicated with our community. Rest assured our resolve and determination towards the project remains the same :)

We're in the process putting the final touches on the second major release of Phalcon in its two years of life. Phalcon 2 is powered by [Zephir](http://zephir-lang.com/) a brand new high-level language that makes the development more enjoyable and easier.

Phalcon 2 now implements most of the functionality that Phalcon 1.x offers and [it's now passing](https://travis-ci.org/phalcon/cphalcon/builds/33532701) an important number of tests in Travis. Yay!

### Phalcon 2 new look

We're looking for a enthusiast graphic designer/company who want to contribute a new look for Phalcon when releasing Phalcon 2. Check [this forum thread](https://forum.phalconphp.com/discussion/3246/contribute-to-phalcon-s-new-look) for more information.

### Want to contribute?

The simplest way is to look through the [issue tracker](https://github.com/phalcon/cphalcon/issues) for issues or features to implement. Also fixing the necessary code to make some unit-tests pass on Phalcon 2 would help a lot.

### Codeception

With 2.0 we are moving our whole test suite to [Codeception](http://codeception.com/). Initial work has been done and we will start pushing the base structure upstream while "moving" existing tests to the new Codeception powered suite. We will need a lot of help to get that task completed so if you want to contribute, keep an eye out in our forum in the very near future for the relevant announcement.

### Help with Testing

This version can be installed from the 2.0.0 branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
zephir build
```

We rely on the feedback from everyone in the community to flush out bugs and upgrade issues ahead of a big release like this. So please give Phalcon 2 a try on your app, and if you're starting a new app today, you should also probably try the beta2 for that, if you're just the least bit savvy with Phalcon.


<3 Phalcon Team

