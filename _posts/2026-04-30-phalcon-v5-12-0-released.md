---
layout: post
title: Phalcon v5.12.0 Released
image: /assets/files/2026-04-30-phalcon-5.12.0-release.png
date: 2026-04-30T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon [v5.12.0][5_12_0] has been released!

<!--more-->

... and so was [5.11.0][5_11_0] and [5.11.1][5_11_1]. All we can do is apologize for the lack of blog posts. 

This is going to be a long blog post

> TLDR: We fixed a lot of stuff, v6 alpha coming out in the next week or so
{: .alert .alert-info }

It has been a year since 5.9.2 has been released and a lot has happened since then especially in our personal lives. In most cases, those events were the primary reason that the project has not been moving as fast as it should. Hopefully we will have a lot more time in the future to move the project forward.

So what has happened since our last blog post, which was our 5.10.0 Christmas release. We released 5.11.0 which addressed 17 issues and 5.11.1 which addressed another 4. This release (5.12.0) addresses 65 issues, one of our biggest releases ever. I do believe though that there was one release back in v1.3 that had over 100, so that record still remains! You can check the changelog entries at the bottom of this post.

## v5

A lot has happened in v5.

### Zephir

Significant work in Zephir allowed us to produce a much cleaner compilation process. The dreaded warnings about incompatible pointers are nearly gone - we just need a small cleanup, and the extension compiles fine in PHP 8.5.
 
### ORM / Model Layer / Database

The most heavily worked area across all three releases. Numerous long-standing issues were resolved, such as relation caching, snapshots, `COUNT`, CRUD operations, PHQL, Hydration, `RawValue` and a lot of Postgres fixes.

### Pagination

Fixed the `paginate()` to understand `DISTINCT` and return proper counts, as well as `GROUP BY` for multi columns.

### Forms & Validation

Fixes in the `Alpha` validator to work better with `allowEmpty`, filters with validators, whitelist for entity binding, mutli field messages and a new `Validation::fails()` convenience method for standalone validation checks.

### HTML, Assets & Image

`Breadcrumbs` now honor sub directories (URL or set), `Assets\Manager` also uses the URL when available, PNG transparency, GD crop, new helpers `FriendlyTitle` and `Preload` for `TagFactory` and new `Select::fromData()` added to populate select options from a `SelectDataInterface` provider, with optgroup support. This mimics the `Tag::Select` with `using`

### Cache & Storage

New `RedisCluster` adapter, new `deleteMultiple`, corrected key prefix calculation, additional corrections with the serializers and options

### Security & Encryption

Added `Encryption\Security\Uuid` factory with versioned adapters (v1–v7), JWT: `Validator::validateClaim()` for custom JWT claim validation, JWT: `Builder::setPassphrase()` is more strict now, `computeHmac` now catches exceptions better, `Random: base()` now defaults to 16 bits.

### Dependency Injection

Introduced named aliases for registered services, minor correction to exception text

### Logger

Log levels are now reported in lowercasem, improved performance for `Stream`

### Dispatcher / MVC

Corrected `Dispatcher::dispatch()` to refresh the events manager where needed, made `Mvc\Controller` and `View\Engine\AbstractEngine` events-aware.

### HTTP Request

Fixes to `getPostData()` when type is missing from the headers, `getPost()` correctly returns JSON, `getClientAddress()` fixed for trusted forwarded proxy header handling.

### Infrastructure

- PIE support: Added PHP Installer for Extensions (PIE) support and removed PECL references (since it is deprecated)
- Added `Phalcon\Support\Settings` New centralized class replacing `globals_get`/`globals_set` throughout the framework for managing INI-style settings.
- PHQL parser memory leak: Fixed a memory leak in `phql_internal_parse_phql()` during repeated query execution.
- Checked compatibility with PHP 8.1-8.5 for types and warnings.
- We changed the testing suite to use phpunit. This allows us to do a direct comparison of the code between v5 and v6, after all the same test has to pass both versions, ensuring that we have alignment. That was a huge task with a lot of hiccups.
- Introduced a nore verbose and faster CI runs, testing the extension installation as well as tests. Also enabled all the database tests including Sqlite and Postgresql. The latter was a bit tough, because there were a lot of issues with the tests. However, doing so, helped us identify a few key bugs with the Posgresql adapter and those have been fixed.

## v6

The code is fully aligned with v5 and the testing suites are (nearly) identical. Tests pass on both projects.

We have ported the PHQL and Volt parsers in its own PHP implenentations. Those are separate library repositories and are dependencies for v6. A bit more work in terms of propagating changes from v5 to these two repositories, when a change is needed to the parsers, but so far so good.

Migrated one of our sample applications to v6 and thus far no issues. More testing required of course.

An alpha version will be released in the next week or so.

## AI

We have been leveraging AI to identify bugs in the framework. Thus far, the results have been promising, because bugs lingering for years have now been addressed. We are planning on using it for complex tasks and deep analysis in the future. Our approach is trust but verify, so AI will never produce code that has not been vetted by us (and tested).

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! We also thank you for your patience since some of these bugs and pull requests have been open for a few years (yes, years :/).

## Changelog

### Fixed

- Fixed `Phalcon\Translate\Adapter\Csv` the `escape` argument is explicitly required in PHP 8.4  [#16733](https://github.com/phalcon/cphalcon/issues/16733)
- Fixed `Phalcon\Mvc\Model\Query` to use the cacheOptions lifetime over the "cache" service lifetime


## Upgrade
Developers can upgrade using PECL

```bash
pie install phalcon/cphalcon-5.12.0
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.12/installation
[5_10_0]: https://github.com/phalcon/cphalcon/releases/tag/5.10.0
[5_11_0]: https://github.com/phalcon/cphalcon/releases/tag/5.11.0
[5_11_1]: https://github.com/phalcon/cphalcon/releases/tag/5.11.1
[5_12_0]: https://github.com/phalcon/cphalcon/releases/tag/5.12.0