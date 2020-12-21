---
layout: post
title: "Status update (Phalcon / Zephir)"
date: 2018-10-24T16:23:19.160Z
tags: 
  - php
  - phalcon
  - status
  - update
  - zephir
  - documentation
---
Just a status update for all of our followers and contributors! As usual, a big thank you to everyone that helps us making Phalcon better!

We always championed transparency, so this blog post is to inform everyone where we are and what decisions we took moving forward - call it a mini roadmap.
<!--more-->
### Moving woes
It has been a very interesting and busy summer. Without even coordinating with each other, both Serghei and Nikos moved houses at the same time. These life events impacted the project and our responsiveness to bugs, issues, pull requests and discussions in Discord. Luckily we have both fully moved to our new homes, with Internet access and can now devote time to the project and address issues, questions etc.

### Zephir - PHP 7.3
We have been thrown a curve ball, as we say here in the US, with PHP 7.3. There have been several items that changed internally for PHP 7.3 that caused a lot of headaches and delays. Serghei has been working tirelessly to figure out what is going on, why a particular piece of code does not compile properly or why an expected returned value is not of the correct type. One particular issue kept Serghei occupied for more than two weeks, which luckily did not drive him crazy :).

PHP has never been extremely good in documenting their internal API and unless one has worked with the language before, certain things are a mystery. The community is great, the documentation... not so much.

### Workload
We have decided to split the work between Zephir and Phalcon. Since our team is very small, we need to allocate our time and resources in a manner that would benefit the project.

For now, Serghei will distance himself from Phalcon and solely concentrate on Zephir. His focus will ensure that all the major bugs in Zephir are addressed and that we have full support for 7.+ PHP versions. As always, we investigate new methods and implementations to make the framework faster, so that these enhancements trickle down to Phalcon as well as your custom extensions.

We have also reached out to some C developers for help. We intend on using some of the funds that we have in OpenCollective to address some major issues. A full list of what has been spent and what for can be seen in our [OpenCollective](https://opencollective.com/phalcon) page.

Nikos will be working solely on Phalcon. This covers the extension, website, documentation and the rest of our repositories. Work is underway to review and address all the pull requests in our repository. Sadly some have been unseen for quite a long time (a couple of them are for v2.0 of Phalcon), so Nikos is trying to sort everything out. Additionally, any issues that are pressing and can be introduced to a future 3.x version are addressed first, while the bulk of the work is going to the v4.x branch.

### Structure
We have discussed in Discord and among us, the direction to start splitting Phalcon in smaller components. There is also a discussion issue here:  [#13526](https://github.com/phalcon/cphalcon/issues/13526).

We thought long and hard on whether this is feasible. In the ideal world that would be the best thing to happen but immediately it will introduce a lot of problems so we both leaned against the idea of splitting the framework into different extensions.

The maintenance of all the Phalcon packages will become a real nightmare. Additionally, changes to one package/extension will almost always have a cascade effect to other related components and as such we will introduce showstoppers for people that wish to upgrade a particular extension to take advantage of new functionality.

We might revisit this approach in the future if/when our team grows and we can properly support all of them but for now, one extension to rule them all!

### v4
Due to the above, we will have to delay releasing v4. In v4, we wanted to introduce the Data Mapper pattern but that would pretty much force all developers to significantly refactor their applications should they want to upgrade, since there is no backwards compatibility from v4 to v3. 

For the moment we are leaning towards not releasing Data Mapper for the initial v4 version and aim for a subversion of 4. The Data Mapper functionality will have to be in its own namespace and for some time we will have to maintain both Active Record (old) and Data Mapper (new) patterns. More on this in future blog posts.

### PSR
Phalcon v4 will implement PSR interfaces wherever possible. For now work is underway for:
- [PSR-3 - Logger](https://github.com/phalcon/cphalcon/issues/13438)
- [PSR-6 - Caching](https://github.com/phalcon/cphalcon/issues/13439)
- [PSR-11 - Container](https://github.com/phalcon/cphalcon/issues/12295)

Also we are refactoring the `Session` adapters to implement PHP's `SessionHandlerInterface` so as to offer more flexibility.

We also want to implement PSR-7 (HTTP Message Interface) but that will entail a significant refactor of the HTTP stack since Middleware is currently supported only in the `Micro` application and not the full one. Realistically speaking, this will be introduced in a subversion of v4.

### Help
As usual, we always welcome help from our community. All criticism is good (even the bad one) because it gives us a different point of view and allows Phalcon to mature even more.

We have heard numerous times the argument _well I do not know C, so I cannot help_ in the past. However a reminder that Phalcon is written in Zephir, a PHP/JS style language that makes things a lot easier. If anyone wants to contribute to the framework, we would welcome it! If programming is not your thing, then you can always contribute towards the documentation or with translating our sites to your native tongue.

Some links of interest:
- Become a backer of the project: [OpenCollective](https://opencollective.com/phalcon)
- Swag: [Phalcon Store](https://store.phalcon.io/)
- Help with translating the documentation:
    - [Phalcon Documentation - Crowdin](https://crowdin.com/project/phalcon-documentation)
    - [Phalcon Website - Crowdin](https://crowdin.com/project/phalcon-website)
    - [Zephir Documentation - Crowdin](https://crowdin.com/project/zephir-documentation)
    - [Zephir Website - Crowdin](https://crowdin.com/project/phalcon-website)

Any help is always appreciated.

### Outreach
We have submitted papers for a couple of conferences coming in 2019. If we get accepted as speakers, we will definitely let the community know. We would love to meet some of you in person.

Additionally, we will start having hangouts for an hour or two online, to meet and talk to all of you. We are thinking of once a month for now, and increase the frequency if we need to. More on that in a future blog post.

Enjoy!!
