---
layout: post
title: Phalcon 5.0.0alpha6 Released!
image: /assets/files/2021-09-09-phalcon-5.0.0-alpha.6.png
date: 2021-09-17T14:01:17.693Z
tags:
  - phalcon5
  - release
  - alpha
---
We are very happy to announce the release of Phalcon v5.0.0 Alpha 6!
<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/5.0.0alpha6)

> This release requires PHP 7.4 or PHP 8.0
{: .alert .alert-info }

This release comes a bit earlier than expected but it was necessary. 

As we continuously evaluate our processes and fine tune them, we discovered that uploading a new release to PECL was becoming a bit more difficult. Ruud who was responsible for this has recently had an elevated workload and as such could not attend to the task in a timely manner. We therefore requested a brand new account from PECL to ensure that we have a backup account, in cases such as this one.

The new account has been approved and we had to make a change to the maintainers section of the `package.xml` file (what PECL needs) to ensure that everything is in order.

Additionally, we fixed some bugs yay!

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

NOTE: You can always check our roadmap and the status of our active sprint for v5 in our project page: [https://github.com/orgs/phalcon/projects/4](https://github.com/orgs/phalcon/projects/4)

# Changelog
# [5.0.0alpha6]

## Changed
- Adjusted the constructor for `Phalcon\Storage\Adapter\*` and `Phalcon\Cache\Adapter\*` to allow an empty key prefix to be set if needed. [#15480](https://github.com/phalcon/cphalcon/issues/15480)
- Changed:
    - `Phalcon\Db\Adapter\AdapterInterface:lastInsertId()` to be identical as `Pdo:lastInsertId()`
    - `Phalcon\Db\Adapter\AdapterInterface:close()` now returns `void` instead of `bool`
    - `Phalcon\Db\Adapter\AdapterInterface:connect()` now returns `void` instead of `bool` and 1st argument default value is empty `array` instead of `null` [#15659](https://github.com/phalcon/cphalcon/issues/15659)

## Added
- Added `Phalcon\Security\JWT\Builder::addClaim` for custom JWT claims. [#15656](https://github.com/phalcon/cphalcon/issues/15656)
