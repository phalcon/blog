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
Unfortunately we were unable to finish the hangout last Friday, due to technical issues. So as promised, here is a summary of the hangout discussion including points we missed.
<!--more-->

### Summer Progress
Similar to last year, summer is always slow moving and with the added Covid, the team had to focus on work/family even more. 

Nikos had 2 weeks of vacation, the first vacation he had in the last 5 years. well deserved, and really nice to spend time with the family. Ruud and Serghei also had vacations and Anton is getting ready for some time off.

### Team changes
Serghei is stepping down and cannot commit time to the project. He needs to concentrate on work and family of course. He was very nice to tell us that he will no longer be able to help - not fooling anyone or offering promises that he might not be able to keep. 

A huge thank you to Serghei. He has learned C/Zephir on his own, trying to help the project as much as possible. He maintained both Phalcon and Zephir during the v3 latter versions, up until the end of 2018, when Nikos stepped up to help with Phalcon.

The team remains dedicated for the project as time permits. 

### Zephir
Now that Serghei has stepped down, we have an issue with Zephir. We no longer have any active maintainers for the project to assume the lead and help with development/bugs etc.

Zephir was invented to help with contributions for Phalcon - a much simpler language, similar to JS/PHP, that anyone can learn easily and contribute. Unfortunately, the language did not gain popularity, and therefore not many people wanted to contribute. The language became stagnant and difficult to maintain. A lot of bugs were discovered and ended up being very difficult to fix unless the whole language was redesigned.

With no other options available, we will put active development of Zephir on hold, and we do not expect it to be compatible with PHP 8. Maintainers are always welcome to step up and help with Zephir.

### Phalcon

Without Zephirm we are not going to be able to properly maintain and enhance Phalcon. This leaves us with two options:
- abandon Phalcon or 
- take the brave step to move forward by switching to native PHP. 

The team decided to switch to native PHP for Phalcon 5. We will try to support Phalcon 4 as much as possible and try to release Phalcon 4.1. We will use our funds to fix some critical Zephir issues that are blocking Phalcon.

### Phalcon 5
- Pure PHP implementation
- Installable as `composer` package
- Backwards compatible as much as possible (it will depend on how easy we can translate the current C parsers for Volt, PHQL and Annotations)
- Support PHP 7.4 + PHP 8 (Currently in Beta)
- Phalcon goals and philosophy remain unchanged (performance, low overhead, ease of use)
- Cardoe (side project by niden) can be used as starting point
- ADR (Action Domain Responder) pattern as scheduled around v4
- Will aim for 100% code coverage and tests
- Opens up the possibility for async (future)

### Timeline
**August**
- v4 bugs
- v5 requirements
- v5 design
- what we will reuse and what not

**September**
- v5 design presentation
- repo setup 
- ci
- performance tests
- backlog grooming

**November**
- v5 alpha

**December**
- Devtools
- Sample apps

### Conclusion
This is not a decision we wanted to make but we have to be realists. We cannot abandon the community and we do believe that Phalcon is a great project that adds value to the PHP community.

Although we will lose some of the performance that we had been accustomed to by using Phalcon, PHP 7 and (hopefully) PHP 8 managed to bridge the performance gap that we saw when using PHP 5.x and Phalcon. 

Our main focus will always be to keep the framework as fast as possible. By switching to PHP, the community can now be more actively involved with the project and also help with addons, incubator and much more.

Thank you to all and looking forward to the new challenges that v5 will present us with.

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