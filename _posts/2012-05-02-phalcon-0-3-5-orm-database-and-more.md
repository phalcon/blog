---
layout: post
title: "Phalcon 0.3.5: ORM, Database and more"
tags: [phalcon, php, programming, framework, orm, "0.3", "0.x"]
---

Since rolling out version 0.3.4 a few days ago, we've been hard at work on the next installment of Phalcon. In addition to a few bug fixes and minor tweaks, this release focuses on the [ORM](https://docs.phalconphp.com/latest/en/db-models) component and its partner [Phalcon\Db](https://docs.phalconphp.com/latest/en/api/Phalcon_Db).

It may not sound all that exciting at first, but trust us on this one. Thanks to this release will come one of the most highly requested features in Phalcon. 

The following changes can be expected in this version:

<!--more-->
- Most of throwing exception process has been rewritten to use less instructions
- Super global initialization is now slightly faster
- Fixed bug in `Phalcon\Db::close`
- Added logging capabilities to `Phalcon\Db` [more info](https://docs.phalconphp.com/latest/en/db-models#logging-low-level-sql-statements)
- Added `Phalcon\Model\Metadata::getIdentityField` returning the identity (auto_increment) field
- Added [DDL](http://en.wikipedia.org/wiki/Data_Definition_Language) and [DML](http://en.wikipedia.org/wiki/Data_Manipulation_Language) methods to `Phalcon\Db` 
  [more info](https://docs.phalconphp.com/latest/en/db#creating-altering-dropping-tables)
- Added `Phalcon\Db\Column` to define table columns
- Added `Phalcon\Db\Index` to define table indexes
- Added `Phalcon\Db\Reference` to define table references (foreign keys)

Our next development branch will be 0.4.0. We are very excited about the upcoming changes and enhancements. We expect to add huge improvements to the framework, while at the same time, keep backwards compatibility, so that you don't have to change a single line of code when upgrading.

Don't forget to follow [@phalconphp](https://twitter.com/#/phalconphp) on Twitter for news, feature announcements and other goodies! 

Tell your friends about Phalcon and as always, stay tuned for more!


<3 Phalcon Team
