---
layout: post
title: The Future of Phalcon
image: /assets/files/2020-08-11-phalcon-hangout-update.png
date: 2020-08-19T17:01:19.865Z
tags:
  - phalcon
  - phalcon4
  - phalcon5
  - update
---
Unfortunately we're unable to finish the hangout last friday due to technichal issue. So as promised a summary of the hangout including the point we missed.

**Summer Progress**

Like last year summer is slow moving and with covid, the team had to focus on work/family even more. 
Nikos had 2 weeks of vacation, the first vacation he had in the last 5 years. well deserved, and really nice to spend time with the family. Ruud and Serghei also had vacations and Anton is getting ready for some time off.

\
Our current progress can be tracked here:

**Team changes**
Serghei is stepping down and cannot commit time to the project. He needs to concentrate on work and family of course. He was very nice to tell us that he will no longer be able to help - not fooling anyone. Huge thank you to him for all the work he has done. v3 support solo. Team remains dedicated for the project as time permits. 

**Zephir**

Now that Serghei has stepped down we have an issue with Zephir since we don't not have any active maintainers that could take lead. Zephir was invented for contributions, not many wanted to help with it so the language became stagnant, difficult to maintain with a lot of bugs that cannot be fixed unless Zephir is redesigned.

With no other options available we will put active development on hold and not expecting to be compatible with php 8. Maintainers are more than welcome the step in.

**Phalcon**

Without Zephir we're are unable to maintain Phalcon. This give us 2 options. Give up on Phalcon or take a brave step to move forward by switching to native PHP. The team decided to switch to native PHP for Phalcon 5. We will try to support Phalcon 4 as much as possible and try to release Phalcon 4.1. We will use our funds to fix some critical Zephir issues that are blocking Phalcon.

**Phalcon 5**
- Pure PHP implementation\
- Installable as composer package
- Trying to be as backwards compatible as much as possible.\
- Support PHP 7.4 + PHP 8 (Currently in Beta)
- We will not change our current phalcon goals (performance, low overhead, ease of use)
- Nidens side project Cardo can be used as starting point\
- adr pattern as scheduled around v4
- will aim for 100% code coverage and tests
- Opens up the possiblity for async (future)

we do not know how easy or difficult the task to rewrite the parsers is. It will be try and see.

Timeline
August:
v4 bugs, v5 requirements, v5 design, what we will reuse and what not
September
v5 design presentation
repo setup, ci, performance tests
backlog grooming
November
v5 alpha
December
Devtools, sample apps

- - -

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.link/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://phalcon.io/brighteon)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team