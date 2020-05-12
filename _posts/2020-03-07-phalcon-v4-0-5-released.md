---
layout: post
title: Phalcon v4.0.5 released
image: /assets/files/2020-03-07-phalcon-4.0.5.png
date: 2020-03-07T19:21:51.906Z
tags:
  - phalcon
  - phalcon4
  - release
---
We are very happy to announce the release of Phalcon **v4.0.5**, a maintenance release. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.5)

This release focused mostly on bug fixes reported by the community, as our testing suite and release tasks.

We have also started refactoring all our database ensuring that there are no skipped tests. Also [Jérémy PASTOURET - @jenovateurs](https://github.com/jenovateurs) has been submitting invaluable contributions towards enabling our database testing suite to run with PostgreSQL.

Finally, we worked a bit more on [v4.1](https://github.com/phalcon/cphalcon/blob/4.1.x/CHANGELOG-4.1.md), adding more components as per our roadmap. The work was mostly focused on the Data Mapper implementation coming in later versions of v4. The bulk of the work being done in v4.1 comes from the [NFR list](https://docs.phalcon.io/4.0/en/new-feature-request-list) that the community has voted on.

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

> **NOTE**: You can always check our roadmap and the status of our active sprint in our project page: <https://github.com/orgs/phalcon/projects/4>  
{: .alert .alert-info }

<iframe src='https://www.brighteon.com/embed/8f4a4ff1-233e-472a-84df-b55e5de56838' width='560' height='315' frameborder='0' allowfullscreen></iframe>

## Changelog

Supported PHP Versions: 7.2, 7.3, 7.4

## Added

## Changed

## Fixed
- Fixed `Phalcon\Db::fetchAll` to correctly return data when `Enum::FETCH_COLUMN` is supplied. [#13321](https://github.com/phalcon/cphalcon/issues/13321)
- Fixed Postgres NULL values to not be required during model update. [#14862](https://github.com/phalcon/cphalcon/issues/14862)
- Fixed MySQL alter column when default value contains not only CURRENT_TIMESTAMP [#14880](https://github.com/phalcon/cphalcon/issues/14880)
- Fixed MySQL default value with ON UPDATE expression [#14887](https://github.com/phalcon/cphalcon/pull/14887)
- Fixed `Str::dirFromFile()` to replace `.` with `-` to avoid issues with Windows environments [#14858](https://github.com/phalcon/cphalcon/issues/14858)

## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.5. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.5).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published. 
{: .alert .alert-info }

### Thank you

Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.io/discord) or our [Forum](https://phalcon.io/forum).

<hr>

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
