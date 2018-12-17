---
layout: post
title: "Status update and new development environment"
tags: [php, phalcon, status, update, zephir, tests, development]
---

Hello everyone!!

We have been working hard to ensure that bugs are fixed and v4 is getting close to a release state. As always we would like to thank all of our [contributors](https://github.com/phalcon/cphalcon/graphs/contributors) who have been helping in this effort, as well as everyone on our community sites [forum](https://phalcon.link/forum), [discord](https://phalcon.link/discord) etc.) for engaging in conversations, sharing criticism and ideas! We couldn't have made it this far without this input.

<!--more-->
### v4
Phalcon v4 is moving closer and closer to a release date. We have started using Github Projects to keep track on what needs to be done, what is in progress and what has been done. The project for v4 is located [here](https://github.com/phalcon/cphalcon/projects/3). As you can see there is a bit of work to be completed still prior to the release. The great news though is that more than 100 cards have been `Done` both from the team's work as well as pull requests from you, the community!

There are some cards that will not make it to the `Done` column for v4, for instance [Refactor Unit Tests - Add more tests](https://github.com/phalcon/cphalcon/issues/13655) and [Refactor CLI Tests - Add more tests](https://github.com/phalcon/cphalcon/issues/13654). We do not expect to write all these tests before v4 is released. More on the testing suite below.

### New Testing Environment
We have released a new testing environment for Phalcon. The environment utilizes [docker](https://www.docker.com) and [nanobox.io](https://nanobox.io) to set up the whole environment for Phalcon, allowing you to develop on your local machine as well as run the testing suite, without having to worry about any dependencies. In our next blog post we will explain in detail on how to set up the environment on your machine and run the tests, so stay tuned!

### Backers - OpenCollective
As usual, we would like to give a shoutout to all of our backers and supporters who help us financially. We use [OpenCollective](https://opencollective.com/phalcon) to handle the financial support for our project, where anyone can become a backer of our project. [OpenCollective](https://opencollective.com/phalcon) also maintains the list of expenses that have been requested and paid, including receipts. This of course ensures full transparency allowing anyone to see where the funds are spent. Admittedly we have been very 'stingy' in spending these funds and only use it whenever we have items that we cannot deal ourselves. In 2019 there is a discussion of a Phalcon meeting (still in the works) at a conference, so we might be using some of that money for transportation. We will discuss this further in our [discord](https://phalcon.link/discord) server.

### Github Pages - Blog - BuiltWith
We have started utilizing [Github Pages](https://pages.github.com) to host this blog as well as the [BuiltWith](https://builtwith.phalconphp.com) site. The reason behind this is really time. As you know we are a small team, and we have day jobs, so there is very little time to work on all of our sites in regards to maintenance and new features for those projects. We want to end up with a small number of projects that are maintained regularly and showcase the power of Phalcon.  Having more than 40 repositories, around half of them being applications does not help :)

#### Builtwith
The builtwith site has been initially created in 2014 and never received any love after that. It has always been another `@todo` but we never got around to refactor it, upgrading it to the latest features of Phalcon. It was built with the help of [@oaass](https://github.com/oaass) using Phalcon [v1.2.6](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v1.2.6). Although the implementation was very simple, it has been working without any changes through all the upgrades to Phalcon we had since them!

The site is now using [Github Pages](https://pages.github.com) which in turn uses [Jekyll](https://jekyllrb.com/) in the backend to serve the content. There is a bit of work to be done still for the site as one can see in the [issues](https://github.com/phalcon/builtwith/issues) page. Some of the tasks include porting the old content/sites to the new format, adding pagination and making some needed CSS/JS enhancements. As always we welcome PRs!

#### Blog
We also ported our blog to [Github Pages](https://pages.github.com). Again the reason was maintenance. The old blog implementation written in Phalcon can be easily found [here](https://github.com/phalcon/blog/releases/tag/v3.0.4p). We have also implemented the tags functionality and pagination, things that were missing from our blog. You can also subscribe to the [RSS Feed](https://blog.phalconphp.com/feed.xml) to get updates from our blog!

### Outreach
As discussed in a previous blog post, we will start having hangouts for an hour or two, once a month. These will start in the new year.(probably). These will start in 2019. We will announce the starting date in a future blog post.


As always, a huge thanks to our community!!



<3 Phalcon Team
