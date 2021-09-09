---
layout: post
title: Phalcon 5.0.0alpha5 Released!
image: /assets/files/2021-09-09-phalcon-5.0.0-alpha.5.png
date: 2021-09-09T15:07:41.301Z
tags:
  - phalcon5
  - release
---
We are very happy to announce the release of Phalcon v5.0.0 Alpha 5!
<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/5.0.0alpha5)

> This release requires PHP 7.4 or PHP 8.0
{: .alert .alert-info }

> The PECL package will be uploaded within the next few days (we are working to speed that process up also). Packagecloud packages will be available later on tonight.
{: .alert .alert-warning }

There was a potential security issue discovered from one of the members of the community and therefore we rushed to release `v5.0.0alpha4`. However, during that release, we accidentally generated the source files with the wrong Zephir version. As such, if the community would compile and use `alpha4` would end up with the dreaded `PSR Symbols not defined` (or something similar).

[Jeckerson](https://github.com/Jeckerson) and [AlexNDRmac](https://github.com/AlexNDRmac) worked to better adjust our build process to merge all the architectures in one folder  (instead of three in the past). They also fixed the GitHub Action that would automatically attach the PECL package as well as the DLLs in the release page when we tag the `master` branch with a new release. 

The process is working as expected (tested it with the latest release). This alone has saved a lot of work for the team, since we are no longer waiting for hours for AppVeyor to build the DLLs, nor do we have to manually download them and attach them to the release.

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

NOTE: You can always check our roadmap and the status of our active sprint for v5 in our project page: [https://github.com/orgs/phalcon/projects/4](https://github.com/orgs/phalcon/projects/4)

# Changelog

# [5.0.0alpha5](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0alpha5) (2021-09-09)
## Changed
- Merged all architectures (`build/phalcon/32bits`, `build/phalcon/64bits` and `build/phalcon/safe`) into single universal inside `build/phalcon` [#15647](https://github.com/phalcon/cphalcon/issues/15647)

## Fixed
- Fixed C code in `build/` directory [#15647](https://github.com/phalcon/cphalcon/issues/15647)

# [5.0.0alpha4](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0alpha4) (2021-09-05)

## Changed
- Changed `composer.json` to use PSR 1.1.x [#15504](https://github.com/phalcon/cphalcon/issues/15504)
- Changed `Phalcon\Di\Injectable:getDI()` to set default DI when no DI is set [#15629](https://github.com/phalcon/cphalcon/pull/15629)

## Added
- Added `Phalcon\Flash\Direct::setCssIconClasses` and `Phalcon\Flash\Session::setCssIconClasses` to allow setting icons in the flash messages (bootstrap related) [#15292](https://github.com/phalcon/cphalcon/issues/15292)
- Added `Phalcon\Http\Message\RequestMethodInterface` and `Phalcon\Http\Message\ResponseStatusCodeInterface` that contain constants to be used for any HTTP implementations (see PHP-FIG) [#15615](https://github.com/phalcon/cphalcon/issues/15615)

