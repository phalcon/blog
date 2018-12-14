---
layout: post
title: "Q1 goals update"
tags: [php, phalcon, 3.0.x, phalcon3, q1, update]
---

Hello everyone!

We would like to give you a quick update on the work done so far, trying to meet our Q1 goals.

<!--more-->
### Github
We have converted the [Phalcon Github](https://github.com/phalcon) account to an organization. This move offers much better flexibility and organization for the project. Several contributors/members of the core team have been added to it, and more will follow soon. 

We also started creating different groups in the organization, that will allow for a much better and streamlined process of assigning bugs and issues, merging pull requests, maintaining documentation etc. We are also investigating viable options for NFRs, where we can get a feel of which NFRs are mostly requested so that we can address them first.

We believe that this move will allow us to maintain a proper workflow, something that Phalcon and our community deserve.

We have also started moving some of the satellite repositories into the organization (such as [link](https://github.com/phalcon/link), [phalcon-compose](https://github.com/phalcon/phalcon-compose) etc.) to help with resources and the organization of the project.

### PHP 7.1
Work is continuing on fixing some PHP 7.1 blocking bugs with Phalcon and Zephir. We have managed so far to compile Phalcon with PHP 7.1 but it is not ready yet for release.

Additionally we reached out to some very talented members of the community with advanced C knowledge to help with this process. As things stand, we are still on track to have PHP 7.1 support by the end of Q1, most likely earlier.

### Documentation
Admittedly our documentation needs a big revamp, adding more examples, tutorials, proper explanations for each component and keeping consistency throughout.

We have already started the effort with rewriting some of the documentation, which will be in the form of `.md` files using Markdown for the formatting. Everyone is welcome to join our effort in our [Slack](https://slack.phalconphp.com) channel, where we discuss and collaborate on the content.


### Sites
We started refactoring all the sites with different implementations. In recent blog posts, we explained how we refactored our website using a Micro application and middleware. The blog posts (links below) will become part of our documentation in an effort to bring real life examples to the community.

The next site to be revamped will be the `builtwith`. 

### Survey
We recently asked the community to take a short survey, so that we can assess why developers use Phalcon, if it is used in production and also asked for any additional input they want to give us. 
 
If you have not taken the survey yet, feel free to visit [this form](https://docs.google.com/a/phalconphp.com/forms/d/1bf-o_ta6MqsXk2kL9IxiJR8j9SENBD4iWTYz_WwyMks)

We will post the results of the survey in a week or so, when we get more replies. So far we have over 100 replies. Thank you all for your valuable input!!!

### Thank you

Once more a big thank you to our amazing community! You guys rock!


<3 Phalcon Team

### References
- [Forum](https://phalcon.link/forum)
- [Slack](https://phalcon.link/slack)
- [Github](https://phalcon.link/github)
- [Website Implementation #1](/post/building-the-new-phalcon-website-implementation-part-1)
- [Website Implementation #2](/post/building-the-new-phalcon-website-bootstrap-part-2) 
- [Website Implementation #3](/post/building-the-new-phalcon-website-middleware-part-3)
