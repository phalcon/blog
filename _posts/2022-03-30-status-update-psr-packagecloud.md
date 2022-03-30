---
layout: post
title: Status Update - PSR - Packagecloud
image: /assets/files/2022-03-30-status-update.png
date: 2022-03-30T13:01:30.425Z
tags:
  - phalcon5
  - status
  - update
---
It has been a while since we last posted an update for the community. We have been busy with more stuff that came up before our v5 release.
<!--more-->
v5 is proving to be a bit more tricky than we anticipated. We of course have a lot of things planned, but for the v5 release we wanted to ensure that we can support PHP 7.4+ and fix all the interfaces so that there are no issues later on. (Reminder: changing an interface will require us to bump the major version of the next release).

### PSR
After a few discussions, we decided to remove PSR from Phalcon as a dependency. Although we spent countless hours adjusting Zephir and the Zephir Parser to support PSR, the recent changes in the package are starting to cause significant problems with versions as well as interfaces. We came across an instance where, in order to support PSR for PHP 7.4, 8.0 and 8.1 we had to conditionally generate code in Zephir (based on the PHP version) which was not ideal and wasted a lot of our time.

As such, we have been working to remove PSR from Phalcon (and you will not need to load the PSR extension before Phalcon) and offer a solution from the PHP userland for those that need the interfaces.

Our steps are:
- Create Phalcon interfaces that mirror the PSR ones but with stricter types.
- Remove PSR references from the code
- Adjust any tests, ensure that everything is fine.
- Release the next version
- Create `psr-proxy-*` repositories available in composer, that use the PSR interfaces but proxy to Phalcon's classes/methods
- Maintain each repository accordingly, tagging it based on how PSR versions evolve.

The above approach will allow developers to choose what they want to use and simply installation of Phalcon. For users that need PSR, all they will have to do is run a `composer require ...` with the appropriate proxy package and then use the proxy Phalcon classes in their code. There will be a minor performance hit but it is negligible, since the core code will be in the extension.

We have already removed the `Logger`, `Cache` and `Container` dependencies and currently working on `Http` (Message in particular).

### Packagecloud
We have used Packagecloud for a number of years now, as an option for developers to install Phalcon. This was driven by the fact that we did not have at the time a PECL account and could not distribute Phalcon from there.

Since then we have successfully published versions in PECL, thus simplifying the installation process.

We are going to stop supporting Packagecloud from v5 onward, and our main method of installation will be PECL. This will remove yet another task from our long maintenance list and thus free a bit more of our time for other stuff.

### Thank you
As always a huge thank you to the community that has been supporting us with thoughts, ideas, discussion etc.