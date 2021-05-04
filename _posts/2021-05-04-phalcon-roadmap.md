---
layout: post
title: Phalcon Roadmap
image: /assets/files/2021-05-04-phalcon-roadmap.png
date: 2021-05-04T14:12:37.166Z
tags:
  - phalcon4
  - phalcon5
  - phalcon6
  - update
  - status
  - roadmap
---
There is a lot of confusion in the community as to what the future holds for Phalcon and what the versions are. In this blog post, we will try to clear the confusion, and have it as a reference for the community.
<!--more-->
In the post [The Future of Phalcon](/post/the-future-of-phalcon) we outlined the issues we were facing as well as some decisions we made moving forward. Certainly, things have changed since then, so here is the latest update on where we stand and where we are moving toward.

## Team
A quick reminder: Last year Serghei who was the core maintainer of Zephir, could no longer contribute to the project. Since Phalcon relies on Zephir, we were left with not that many options. As a result we decided to _convert_ Phalcon to a native PHP framework, which has of course advantages and disadvantages.

In the meantime [Anton](https://github.com/jeckerson) started learning C and the inner workings of Zend Engine (as much as possible), and with the help of [Alexander](https://github.com/AlexNDRmac), managed to correct issues in Zephir that have been lingering for years. This is a huge win for the project since we were able to speed up internal processes, get a bit more performance and of course, generate better stubs (more on this below).

> Well over 100 issues were reviewed and fixed in Zephir these past 4+ months
{: .alert .alert-info }

We have also reorganized the team as far as the GitHub organization is concerned. Several members stepped down because, hey life happens so we all get busy, and we also had some new ones step in.

## Support

| Phalcon Version | Supported PHP versions                      | Support status |
| :-------------: | ------------------------------------------- | :------------: |
| `v3.4`          | `5.5`, `5.6`, `7.0`, `7.1`, `7.2` and `7.3` | Unsupported    |
| `v4.0`          | `7.2`, `7.3` and `7.4`                      | Unsupported    |
| `v4.1`          | `7.2`, `7.3` and `7.4`                      | Supported      |
| `v5.0`          | `7.4` and `8.0`                             | Supported      |
| `v6.0`          | `7.4` and `8.0`                             | Supported      |

## v4
Phalcon v4 is alive and well. We will continue providing support but somewhat minimal because v5 is currently in alpha (more on that below). 

We have released [v4.1.2](https://github.com/phalcon/cphalcon/releases/tag/v4.1.2) this week which contained a few minor issues and as explained in the relevant [post](/post/phalcon-v4-1-2-released), we made a mistake in PECL so instead of 4.1.1 we ended up skipping one version and we have 4.1.2.

Phalcon v4 is a PHP extension and you can install it as such - nothing has changed.

## v5
Phalcon v5 is again a PHP extension written in Zephir. We had to increase the major version by one and still offer the extension, because we found out a few more interface misalignments. If you recall, one of the biggest things we did in v4 was to ensure that all interfaces and classes implementing them were aligned properly. 

Unfortunately we missed some. Zephir does not enjoy static analysis tools such as [psalm](https://psalm.dev/) so we had to rely on the ide stubs generation and then run psalm on that. We were successful in identifying a lot of misalignments and those were indeed fixed in v4. However the stubs generator had a couple of bugs and therefore some areas were missed, primarily in the `Phalcon\Db` namespace.

Due to improvements in Zephir, the misalignments with interfaces are now detected while the code is generated and/or compiled.


We have released [v5.0.0-alpha-1](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0-alpha.1) and this week we will be releasing v5.0.0-alpha-2. We are following a rolling release schedule (until stable is out), where we are fixing issues as we go along and ensuring that no new issues are created - or if they do we can fix them before moving forward.

v5 will be around for quite some time, by our modest estimations 2 years and more.

## v6
This is the old v5 version. This version will be the native PHP based one, where a developer can just install it with `composer require phalcon/phalcon` (you can already do this but it will not work since v6 is work in progress currently). Work on this version has been halted in order to push v5 stable out.

There is always the worry that by switching to a native PHP implementation, the framework will lose performance. This is both true and false at the same time. 

An extension is definitely faster that native PHP. However, PHP has come a long way since the days of PHP 5. The latest versions, 7.4 and 8.0 have bridged the gap of performance especially when using `opcache`. Therefore, in many instances, whether one has the native PHP code or the extension, they will not see a performance boost.

However, v6 will be a _hybrid_ release. We are slowly introducing benchmarks to the framework, in order to identify long running processes or blocks of code or even slow ones. With that data we will be able to create an extension (we are thinking of `phalcon-ext` but the name is not agreed upon yet) and allow developers to use that extension in parallel with the native PHP code.

When an extension is present with the same namespaces, it takes precedent so your code will execute from there.

So in short, our vision for v6 is:

`composer require phalcon/phalcon`

if more performance needed:

`pecl install phalcon-ext`

Note that this particular technique has been used by our friends at [RubixML](https://github.com/RubixML/Tensor) and it works just fine.

## Support/Help
As always we welcome all criticism, especially the bad, in order to improve the framework. There have been many members of the community that engaged with us either on [Discord](https://phalcon.io/discord) or by reporting issues and sometimes creating pull requests with fixes. We thank you all and keep it coming!!

We also employed a couple of developers, who are helping with the smaller repositories (mainly incubator). Their job is to upgrade those repositories to v4 and v5, write tests etc.

We are still a small team and we have been very frugal with our funds to ensure that we use them in situations like these (upgrades etc.) We do however need more help and looking for developers to help in the following areas:

- PHP/Zephir developers
- Docker masters

If interested, please ping @Jeckerson on our Discord server.

We will expand on the above more in our hangout tomorrow. Hope to see you there!

(https://youtu.be/tZHM9lRmbRI)[https://youtu.be/tZHM9lRmbRI]










