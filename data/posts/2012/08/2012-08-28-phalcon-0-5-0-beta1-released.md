Phalcon 0.5.0 beta1 released!
=============================

![]({{ cdnUrl }}/files/2012-08-28-working.jpg)

It has been a really busy month and a half. We concentrated all of our efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of core parts of the framework. We increased flexibility, extensibility and added more features while still keeping performance high.

Most of the examples and features present in previous versions work - however there might be some unexpected behavior (bugs) lurking around. All the tests are passing in our [Travis CI server](http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188) and the [official site](https://phalconphp.com) has been running on 0.5.0b1 for a few days now with no problems.

We are now concentrating in writing documentation, fixing bugs and attending to areas that still need a bit of work.

We would like to invite the community to install and test the new features of 0.5.0b1.

**To install 0.5.0b1:**
Follow the same instructions as installing the stable version. The only difference is that the files are located in the dev/ folder (instead of "cd release" issue "cd dev").

Checkout the following steps to compile the extension for a Linux/Mac platform:

```sh
git clone git://github.com/phalcon/cphalcon.git
cd cphalcon/dev
export CFLAGS="-O2 -fno-delete-null-pointer-checks"
phpize
./configure --enable-phalcon 
make 
sudo make install 
```

Windows users please download a DLL from the [download page](https://phalconphp.com/download)

**To report a bug:** 
Please open an issue in [Github](https://github.com/phalcon/cphalcon/issues?state=open). We highly recommend that you make tests using the latest versions of PHP 5.3 (\>=5.3.11).

**To ask for help:** 
Use our [forum](https://forum.phalconphp.com)

Looking forward to hearing from you! :)

<3 Phalcon Team