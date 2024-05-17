---
layout: post
title: Phalcon v5.7.0 Released
image: /assets/files/2024-05-17-phalcon-5.7.0-release.png
date: 2024-03-14T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.7.0 has been released!

<!--more-->

This release fixes a new setting for php.in, some changes and fixes to bugs.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed
 
- Changed `Phalcon\Support\HelperFactory` to use the internal mapper for better memory management [#16571](https://github.com/phalcon/cphalcon/issues/16571)

### Added

- New ini setting `phalcon.form.strict_entity_property_check` for `Phalcon\Forms\Form` to enable strict entity property checking. [#16567](https://github.com/phalcon/cphalcon/issues/16567)
 
### Fixed

- Fixed `Phalcon\Mvc\Cli\Router` to extend the `Phalcon\Mvc\Cli\RouterInterface` [#16551](https://github.com/phalcon/cphalcon/issues/16551)
- Fixed `Phalcon\Filter\Validation\Validator\StringLength::validate()` to correctly use the `include` parameter [#16560](https://github.com/phalcon/cphalcon/issues/16560)
- Fixed `Phalcon\Db\Column::TYPE_BINARY` and `Phalcon\Db\Column::TYPE_TINYINTEGER` to have unique values [#16532](https://github.com/phalcon/cphalcon/issues/16532)
- Fixed `Phalcon\Forms\Form` to bind only existing properties on entities, based on `phalcon.form.strict_entity_property_check` setting. [#16567](https://github.com/phalcon/cphalcon/issues/16567)
- Fixed `Phalcon\Filter\Sanitize\BoolVal` to correctly handle integers. [#16582](https://github.com/phalcon/cphalcon/issues/16582)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.7.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.7/installation)
