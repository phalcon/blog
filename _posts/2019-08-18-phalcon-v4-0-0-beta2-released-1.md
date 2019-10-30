---
layout: post
title: Phalcon v4.0.0-beta.2 released
date: 2019-08-18T18:05:37.616Z
tags:
  - phalcon
  - phalcon4
  - release
  - beta
---
The Phalcon Team is happy to announce the release of **v4.0.0 Beta 2**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-beta.2). 

We might sound like a broken record with every blog post but we cannot stress enough how thankful we are to our community. The contributions, testing, documentation updates and questions really help push Phalcon forward and make us offer the best possible framework for all to use! Thank you again!
<!--more-->

We would like to also welcome [Ruud Boon](https://github.com/ruudboon) who is joining the core team today. We thank him for his contributions and advice so far and looking forward to more in the future.

Phalcon v4 Beta 2 addresses several bugs that have been reported from the community, primarily focused on interface changes. As one would expect, through testing we found more issues that we need to address so our cards _to do_ increased from the previous release.

You can see the remaining cards for v4 in our [project](https://github.com/phalcon/cphalcon/projects/3) page. 

Work is slowly moving ahead also in our documentation. We have completed checking a few more documents, This effort can be tracked in this issue. 

[https://github.com/phalcon/docs/issues/2322](https://github.com/phalcon/docs/issues/2322)

Thank you again to everyone that has engaged us through social media, as well as our [Discord](https://phalcon.link/discord) server. Our community is the drive that makes Phalcon better with every release.

### Changelog
### Fixed
- Fixed missing imports in `Phalcon\Db\Adapter\AbstractAdapter`, `Phalcon\Db\Adapter\AdapterInterface`, `Phalcon\Db\Result\Pdo`, `Phalcon\Html\Tag` and `Phalcon\Tag\Select`. [#14249](https://github.com/phalcon/cphalcon/issues/14249)
- Fixed `isSerializable` in `Phalcon\Storage\Serializer\AbstractSerializer` to return true when the data is seriazable and false when it's not.
- Fixed `Phalcon\Storage\Adapter\Redis::delete()` and `Phalcon\Storage\Adapter\Redis::getKeys()` deprecated warning from php-redis [#14281](https://github.com/phalcon/cphalcon/issues/14281)
- Fixed `Phalcon\Mvc\Model\ResultSet::Update()` to return correct status [#14291](https://github.com/phalcon/cphalcon/issues/14291)
- `Phalcon\Mvc\Collection::cancelOperation()` now returns `true` on success.
- Fixed `Phalcon\Application\AbstractApplication` interfaces for `registerModules()`, `setDefaultModule()` and `setEventsManager()` [#14293](https://github.com/phalcon/cphalcon/issues/14293)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder` to throw exception on incorrect parameter [#14299](https://github.com/phalcon/cphalcon/issues/14299)

### Removed
- Removed dead libsodium-related code. It was never called in PHP >= 7.0.

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-beta2. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-beta.2).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published.
{: .alert .alert-info }

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
