---
layout: post
title: Did you know....
date: 2019-02-24T20:41:29.572Z
tags:
  - phalcon4
  - docs
  - builtwith
  - blog
  - upgrade
  - search
---
As with any open source project, developers usually don't have the time to keep up with everything that is going on. As such, some things are missed that could potentially help developers. Phalcon is no different, and despite the fact that we have a very "observant" community, we thought we would outline a few things that you might have missed
<!--more-->
### Main Repository

#### NFRs
We had a great number of NFRs that have been sitting in GitHub as issues and never got any attention. In an effort to prioritize our time and allocate resources towards addressing the most requested NFRs, we have an [issue](https://github.com/phalcon/cphalcon/issues/13855) in GitHub open, offering a platform to voice your opinion. Feel free to share your thoughts on which NFRs matter to you most!

#### Queue
`Phalcon\Queue\Beanstalk` is dead, long live `Phalcon\Queue`. As mentioned in our recent hangout, the Queue component has been removed because Beanstalkd is nearly (if not completely) dead as a project. As such we need to offer something to the community for Queue needs. There are some options we can explore, so feel free to check [this issue](https://github.com/phalcon/cphalcon/issues/13851) and give us some feedback.

### Docs
Our docs are constantly being updated with new content for the v4 version.

#### Upgrade
We have a new [upgrade](https://docs.phalcon.io/4.0/en/upgrade) page, aimed to help you upgrade your application from v3 to v4. The upgrade page offers examples, gotchas and tips that will help you upgrade your application.

Also any component that has been modified or rewritten, will have a link `Upgrade Instructions` that will take you to the relevant section of the upgrade page.

#### Search
We have added [Algolia](https://algolia.com) Docsearch to our v4 documentation. The search is language aware so whatever you are searching will respect the language of the documents you are viewing.

#### Comments
Our documentation now allows you to comment on articles. All comments are moderated of course. You can log in using GitHub, Google, Twitter or Gitlab. You can also use markdown if you have code samples you want to share.

### Blog
This blog has been redesigned as most have noticed. 

#### Tags
You can see the tag cloud in the sidebar section below the sponsors. Clicking on a tag will get you to the tags page where all blog posts are categorized accordingly.

#### Search
We have incorporated [Algolia](https://algolia.com) for the search in our blog. You can search for a term or a tag and you will see a list of articles that match the search term

#### Comments
Our blog now allows you to comment on blog posts, same as our v4 documentation.

### BuiltWith
We have a website that you can showcase your Phalcon implementations!! [BuiltWith](https://builtwith.phalcon.io) can showcase your site, with tags, description, authors, repo if open sourced, as well as pictures. You can check the [repository](https://github.com/phalcon/builtwith) for instructions on how to submit your site! BuiltWith also incorporates Algolia search so you can find easily projects based on a tag or other criteria.


<3 Phalcon Team
