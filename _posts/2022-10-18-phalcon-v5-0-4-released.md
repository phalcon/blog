---
layout: post
title: Phalcon v5.0.4 Released
image: /assets/files/2022-10-17-phalcon-5.0.4-release.png
date: 2022-10-18T13:40:06.869Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.0.4 has been released!

<!--more-->

This release contains a few bug fixes.

A big thank you to our community for identifying these issues and helping fixing them.

## Changelog
### Fixed
- Fixed `Phalcon\Encryption\Security` to take into account the `workFactor` in the cost calculation [#16153](https://github.com/phalcon/cphalcon/issues/16153)
- Removed double unserializing during Model caching [#16035](https://github.com/phalcon/cphalcon/issues/16035), [#16131](https://github.com/phalcon/cphalcon/issues/16131)
- Fixed `Phalcon\Db\Adapter\Pdo\Mysql::describeIndexes` to assign an empty string in the index type of `null` and remove warnings [#16157](https://github.com/phalcon/cphalcon/issues/16157)
- Fixed `Phalcon\Db\Adapter\Pdo\Sqlite::describeIndexes` to assign an empty string in the index type of `null` and remove warnings [#16157](https://github.com/phalcon/cphalcon/issues/16157)
- Fixed `Phalcon\Mvc\Model\Manager::notifyEvent` to return `true` instead of `null` on success [#16161](https://github.com/phalcon/cphalcon/issues/16161)
- Fixed `Phalcon\Encryption\Security\JWT\Validator::validateExpiration` to correctly validate the `exp` claim [#16166](https://github.com/phalcon/cphalcon/issues/16166)

