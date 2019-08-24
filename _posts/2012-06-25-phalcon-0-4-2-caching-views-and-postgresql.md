---
layout: post
title: "Phalcon 0.4.1: MySQLi, Cache + Models and more"
tags: [php, framework, phalcon, release, "0.4", postgresql, cache, views, "0.x"]
---

We are excited to announce that Phalcon supports the PostgreSQL RDBMS:

<!--more-->
> PostgreSQL is a powerful, open source relational database system. It
> has more than 15 years of active development and a proven architecture
> that has earned it a strong reputation for reliability, data
> integrity, and correctness.

Implementing the PostgreSQL adapter took a lot longer than expected (about 2 months), but definitely has not been a waste of time. If PostgreSQL is your favorite database you can use it now together with Phalcon!

Another important feature in this version is the ability to cache the entire output of the `Phalcon\View`. This is very useful when you develop dynamic websites but they are not updated very often. (Right now the Phalcon website is using it!) [[more info](https://docs.phalcon.io/latest/en/volt#caching-view-fragments)].

If you need help implementing any of the Phalcon features (new or old), visit our [forum](https://forum.phalcon.io) and discuss your idea there. We would be happy to help.

Check out the full [CHANGELOG](https://github.com/phalcon/cphalcon/blob/master/CHANGELOG.md) for this version.

We are a tiny core team of developers working very hard, so any support the community can offer to the project is more than appreciated!

Thanks again to all your ideas and support making this framework a reality!

<3 Phalcon Team