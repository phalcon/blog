---
layout: post
title: Phalcon v5.0.0 Alpha 1 Released!
image: /assets/files/2021-03-21-phalcon-5.0.0-alpha.1.png
date: 2021-03-31T18:21:15.911Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are very happy to announce the release of Phalcon v5.0.0 Alpha 1!
<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0-alpha.1)

This is the first release in the v5 series. Although there is still a lot of work to be done until we reach the stable release, we are releasing this version now to get as much feedback from the community as possible.

> This release requires PHP 7.4 or PHP 8.0
{: .alert .alert-info }

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

NOTE: You can always check our roadmap and the status of our active sprint for v5 in our project page: [https://github.com/orgs/phalcon/projects/4](https://github.com/orgs/phalcon/projects/4)

# Changelog

## Fixed
- Support for PHP 7.4 and PHP 8.0
- Fixed `Logger\Log::log()` `log` to recognize all log levels [#15214](https://github.com/phalcon/cphalcon/issues/15214)
- Changed `setClaims` to be protected so that the `Phalcon\Security\JWT\Builder` class can be properly extended. [#15322](https://github.com/phalcon/cphalcon/issues/15322)
- Fixed `Phalcon\Mvc\Model::average()` to return `float` value when is `string` [#15287](https://github.com/phalcon/cphalcon/pull/15287)
- Fixed `Phalcon\Storage\Serializer\Igbinary` to store `is_numeric` and `bool` values properly [#15240](https://github.com/phalcon/cphalcon/pull/15240)
- Fixed `Phalcon\Validation\Validator\Confirmation` was failing to compare cases such as 000123 = 123 [#15347](https://github.com/phalcon/cphalcon/pull/15347)
- Fixed `Phalcon\Storage\Adapter` failing to retrieve empty like stored data (such as [], 0, false) [15125](https://github.com/phalcon/cphalcon/issues/15125) 
- Fixed declarations for `function getEventsManager()` to allow null return [15010](https://github.com/phalcon/cphalcon/issues/15010)
- Removed underscore from method names (starting) to abide with PSR-12 [15345](https://github.com/phalcon/cphalcon/issues/15345)
- Fixed `Phalcon\Flash\Session::has()` to properly check if any messages are existing [15204](https://github.com/phalcon/cphalcon/issues/15204)
