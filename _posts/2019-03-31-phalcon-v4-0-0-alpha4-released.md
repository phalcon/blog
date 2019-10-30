---
layout: post
title: Phalcon v4.0.0-alpha4 released
date: 2019-03-31T17:12:54.791Z
tags:
  - phalcon
  - phalcon4
  - release
  - alpha
---
The Phalcon Team is happy to announce the release of **v4.0.0 Alpha 4**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.4). We also made a mistake yesterday in our hangout, PSR-7/PSR-17 related components were not released with alpha.3; the PR was actually merged after that release. Therefore we are releasing alpha.4 today!

As always, we cannot thank your community enough! As mentioned in yesterday's [hangout](https://www.youtube.com/watch?v=UHhAhujXr4U), our community rocks! We have more and more people joining our Discord server, contributors are helping with minor and major issues on all repositories. Our community is the drive that makes Phalcon better with every release.
<!--more-->

We are releasing the fourth alpha version today, a lot of additions as well as bug fixes. You can see our project [here](https://github.com/phalcon/cphalcon/projects/3)

The biggest addition in this release is the PSR-7/PSR-17 compatible components under the `Phalcon\Http\Message` namespace. 

Most likely, this will be the last alpha release, but it will depend primarily on the progress of the PSR-16 (Cache) implementation.

### Changelog
#### Added
- Added `delimiter` and `enclosure` options to `Phalcon\Translate\Adapter\Csv` constructor
- Added `Phalcon\Http\Message\*` namespace implementing PSR-7 and PSR-17. Introducing:
    - `Phalcon\Http\Message\Request`
    - `Phalcon\Http\Message\RequestFactory`
    - `Phalcon\Http\Message\Response`
    - `Phalcon\Http\Message\ResponseFactory`
    - `Phalcon\Http\Message\ServerRequest` 
    - `Phalcon\Http\Message\ServerRequestFactory`
    - `Phalcon\Http\Message\Stream`
    - `Phalcon\Http\Message\StreamFactory`
    - `Phalcon\Http\Message\UploadedFile`
    - `Phalcon\Http\Message\UploadedFileFactory`
    - `Phalcon\Http\Message\Uri`
    - `Phalcon\Http\Message\UriFactory`
    - `Phalcon\Http\Message\Stream\Input`
    - `Phalcon\Http\Message\Stream\Memory`
    - `Phalcon\Http\Message\Stream\Temp`
The implementation offers PSR-7/PSR-17 compatible components in a different namespace to allow usage of both `Request` and `Response` implementations for this version. [#11789](https://github.com/phalcon/cphalcon/pull/11789)
- Added `Phalcon\Helper\*` namespace, offering easy manipulations for arrays, numbers etc..
    - `Phalcon\Helper\Arr`
    - `Phalcon\Helper\Number`
[#13889](https://github.com/phalcon/cphalcon/pull/13889)
- Added `Phalcon\Collection`, an object implementing `ArrayAccess`, `Countable`, `IteratorAggregate`, `JsonSerializable`, `Serializable`, offering an easy way to handle collections of data such as arrays, superglobals etc. [#13886](https://github.com/phalcon/cphalcon/issues/13886)
- Added `Phalcon\Collection`, in `Phalcon\Http\Message\Request` and `Phalcon\Http\Message\ServerRequest` to handle the headers [#13907](https://github.com/phalcon/cphalcon/issues/13907)

#### Fixed
- Fixed `Phalcon\Image\Adapter\Imagick::_watermark`, `setImageAlpha()` fills the alpha channel with black before execution (replaced by `evaluateImage()`). Improved imagick compatibility. [#13911](https://github.com/phalcon/cphalcon/pull/13911)
- Fixed Assets Manager hard reference to \Phalcon\Tag, should use DI [#12261](https://github.com/phalcon/cphalcon/issues/12261)

#### Changed
- Refactored `Phalcon\Registry` to use the `Phalcon\Collection` class [#13893](https://github.com/phalcon/cphalcon/issues/13893)
- Refactored `Phalcon\Session\Bag` to use the `Phalcon\Collection` class [#13893](https://github.com/phalcon/cphalcon/issues/13893)
- Refactored almost all files of the project to abide by the new coding standard for Phalcon. Certain files have been intentionally left untouched because they will be relaced later on. [#13915](https://github.com/phalcon/cphalcon/issues/13915)

#### Removed
- Removed `Phalcon\Session\BagInterface` [#13893](https://github.com/phalcon/cphalcon/issues/13893)

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-alpha4. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.4).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
