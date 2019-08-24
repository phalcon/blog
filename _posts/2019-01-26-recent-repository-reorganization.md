---
layout: post
title: Recent repository reorganization
date: 2019-01-27T01:47:24.444Z
tags:
  - repository
  - reorganization
  - github
  - jekyll
  - static sites
  - crowdin
  - netlify
---
We had a wonderful hangout [today](https://www.youtube.com/watch?v=OAN7W2zVRaI), in which we talked about a lot of things. One of them was the actual size of our team and the obvious lack of time to address everything.
<!--more-->

### More reorganization

In an effort to reduce the workload and support, we started a few months ago, deprecating and deleting repositories that were under the Phalcon organization but were never used or maintained. However even after that "cleanup" effort, we still had close to 20 repositories hosting applications written in Phalcon. Those applications were more or less identical to one another, in terms of implementation, and thus were offering little value to the community as examples of implementing applications with Phalcon.

As mentioned in our hangout, we are a small team and just updating all of our applications would be a lengthy task which will take time from development towards the framework. Those repositories represented some of our sites, such as this blog, the [main website](https://phalcon.io), the [Zephir blog](https://blog.zephir-lang.com), [Zephir website](https://zephir-lang.com), the [BuiltWith](https://builtwith.phalcon.io) site etc.

The biggest site of all is our [documentation](https://docs.phalcon.io) site, which required quite a bit of love so as to remove broken links, offer a better and more accurate search as well as an archive of older content for developers that are using older versions of Phalcon.

### Jekyll

The solution came from [Jekyll](https://jekyllrb.com), a generator of static websites. Jekyll parses files, which in turn use the liquid template (a templating engine designed for Shopify) and generates static HTML pages. Those pages end up producing the content of the website itself.

### Netlify

![Netlify](/assets/files/full-logo-light.svg)

We also utilized the services of [Netlify](https://netlify.com) which offers a free hosting platform for JAMStack sites (such as the ones produced by Jekyll) and can deploy a site every time code is pushed to a particular GitHub repository. 

We cannot thank the [Netlify](https://netlify.com) team enough for offering this service for free, and also for their invaluable advice and support to optimize our sites as much as possible and to make this process seamless and easy to use.

### Websites

There repositories and subsequent sites that were ported to [Netlify](https://netlify.com) are:

* [Phalcon Blog](https://blog.phalcon.io)
* [Phalcon Link](https://phalcon.link)
* [Zephir Website](https://zephir-lang.com)
* [Zephir Documentation](https://docs.zephir-lang.com)
* [Built With Phalcon](https://builtwith.phalcon.io)
* [Zephir Blog](https://blog.zephir-lang.com)
* [Phalcon License](https://license.phalcon.io)
* [Phalcon Old Documentation v2](https://olddocs.phalcon.io)
* [Phalcon Documentation](https://docs.phalcon.io)

### Documentation

The Phalcon documentation site was the most challenging to address. This is because the documentation is created by combining two repositories. One that handles the [application](https://github.com/phalcon/docs-app) (redirects, languages, versions etc.) and one that has the [actual content](https://github.com/phalcon/docs), each version in its own branch and each language in its own folder.

![Crowdin](/assets/files/crowdin-logo.png)

Our friends at [Crowdin](https://crowdin.com) have offered us a wonderful and extremely easy platform to be able to translate our documentation. All the translated documents end up in our [docs](https://github.com/phalcon/docs) repository with a pull request. We can then merge that PR and the translations end up in our repository permanently.

After this, all we have to do is switch to the repository that handles the docs [application](https://github.com/phalcon/docs-app) and update the submodules (the link to the `docs` repository - version = branch).

A `git push` is all that is needed after that and Netlify starts building the new documents automatically. Once the build is completed successfully, the site is updated.

We will expand more in future posts on exactly how all this works and what challenges we had moving to these solutions.

### Conclusion
We ended with roughly 10 sites and applications that we no longer have to maintain (it's actually 9 for now, the main website will be moved in the next week or so). This frees up a bit more time to concentrate on the framework as well as building solid examples/applications/tutorials that demonstrate all the features that Phalcon has to offer.

If you see anything that is not correct, feel free to open a pull request in the respective repository or let us know in our [Discord Server](https://phalcon.link/discord)

<3 Phalcon Team
