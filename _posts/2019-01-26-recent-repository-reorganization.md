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
---
We had a wonderful hangout [today](https://www.youtube.com/watch?v=OAN7W2zVRaI), in which we talked about a lot of things. One of them was the actual size of our team and the obvious lack of time to address everything.

### More reorganization
In an effort to reduce the workload and support, we started a few months ago, deprecating and deleting repositories that were under the Phalcon organization but were never used or maintained. However even after that "cleanup" effort, we still had close to 20 repositories hosting applications written in Phalcon. Those applications were more or less identical to one another, in terms of implementation, and thus were offering little value to the community as examples of implementing applications with Phalcon.

As mentioned in our hangout, we are a small team and just updating all of our applications would be a lengthy task which will take time from development towards the framework. Those repositories represented some of our sites, such as this blog, the [main website](https://phalconphp.com), the [Zephir blog](https://blog.zephir-lang.com), [Zephir website](https://zephir-lang.com), the [BuiltWith](https://builtwith.phalconphp.com) site etc.

The biggest site of all is our [documentation](https://docs.phalconphp.com) site, which required quite a bit of love so as to remove broken links, offer a better and more accurate search as well as an archive of older content for developers that are using older versions of Phalcon.

### Jekyll
The solution came from [Jekyll](https://jekyllrb.com), a generator of static websites. Jekyll parses files, which in turn use the liquid template (a templating engine designed for Shopify) and generates static HTML pages. Those pages end up producing the content of the website itself.

### Netlify
We also utilized the services of [Netlify](https://netlify.com) which offers a free hosting platform for JAMStack sites (such as the ones produced by Jekyll) and can deploy a site every time code is pushed to a particular GitHub repository. 

We cannot thank the [Netlify](https://netlify.com) team enough for offering this service for free, and also for their invaluable advice and support to optimize our sites as much as possible and to make this process seamless and easy to use.

### Websites
There repositories and subsequent sites that were ported to [Netlify](https://netlify.com) are:

* [Phalcon Blog](https://blog.phalconphp.com)
* [Phalcon Link](https://phalcon.link)
* [Zephir Website](https://zephir-lang.com)
* [Zephir Documentation](docs.zephir-lang.com)
* [Built With Phalcon](https://builtwith.phalconphp.com)
* [Zephir Blog](https://blog.zephir-lang.com)
* [Phalcon License](https://license.phalconphp.com)
* [Phalcon Old Documentation v2](https://olddocs.phalconphp.com)
* [Phalcon Documentation](https://docs.phalconphp.com)

### Documentation
The Phalcon documentation site was the most challenging to address. This is because the documentation is created by combining two repositories. One that handles the application (redirects, languages, versions etc.) and one that has the actual content, each version in its own branch and each language in its own folder. This is where [Crowdin](https://crowdin.com) and 







