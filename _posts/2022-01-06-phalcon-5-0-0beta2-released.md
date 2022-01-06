---
layout: post
title: Phalcon 5.0.0beta2 Released
image: /assets/files/2022-01-06-phalcon-5.0.0-beta.2.png
date: 2022-01-06T11:00:04.800Z
tags:
  - phalcon
  - phalcon5
  - beta
  - release
---
Phalcon v5.0.0beta2 has been released!
<!--more-->

This release has some additions in `Phalcon\Support\Helper` classes and several bug fixes that the community identified.

> A huge thank you to all of our contributors and the community!!
{: .alert .alert-warning }

The release tag can be found here: [v5.0.0beta2](https://github.com/phalcon/cphalcon/releases/tag/5.0.0beta2). 

We are getting very close to the stable release! A few more issues to be addressed and we are there! The project page that we keep the status of the work we have done and need to do can be found [here](https://github.com/phalcon/cphalcon/projects/3). 

#### Changelog

## Fixed
- `Phalcon\Mvc\View\Engine\Volt\Compiler::functionCall()` to check for container presence before checking the `tag` service [#15842](https://github.com/phalcon/cphalcon/issues/15842)
- `Phalcon\Di\FactoryDefault()` to set `assets` and `tag` as shared services [#15847](https://github.com/phalcon/cphalcon/issues/15847)
- `Phalcon\Forms\Element\AbstractElement::getLocalTagFactory()` to return the tagFactory from itself, the form, the DI or a new instance [#15847](https://github.com/phalcon/cphalcon/issues/15847)
- Changed references to `sha1` with `hash("sha256", $data)` to ensure that there are no collisions from the hashing algorithm  [#15844](https://github.com/phalcon/cphalcon/issues/15844)
- Changed `Phalcon\Support\Helper\Str\Camelize` to accept a third boolean parameter indicating whether the result will have the first letter capitalized or not [#15850](https://github.com/phalcon/cphalcon/issues/15850)

## Added
- Added `Phalcon\Support\Helper\Str\KebabCase`, `Phalcon\Support\Helper\Str\PascalCase` and `Phalcon\Support\Helper\Str\SnakeCase` helpers [#15850](https://github.com/phalcon/cphalcon/issues/15850)
