---
layout: post
title: "Sample Application: PHP Alternative site"
tags: [php, framework, phalcon, roadmap, sample, application, "0.x"]
---
![Alternate site](/assets/files/2012-06-07-php-site-1.png)

Today, we're launching another sample application for Phalcon. This time, we wanted to create an alternative version of the [PHP site](https://php.net) powered by the C-extension framework. This is the greatest example we have done until now, implementing many of the main framework features, especially the newly added: [Multilingual Support](https://docs.phalcon.io/latest/en/api/Phalcon_Translate_Adapter_NativeArray) and [Complex Routing](https://docs.phalcon.io/latest/en/routing).

<!--more-->
You will find some of the main content such as news and some other sections. Note, that we have no intention that this site offer the official PHP's content is just one example that is familiar to us all.

**Multilingual Support**
Using the translation component recently added to Phalcon, the site offers content in English and partially in Spanish. We did not translate the whole site to Spanish, but we believe that it is enough of a sample to understand the translation concepts. In the page footer is possible to change the current language:

![Alternate site](/assets/files/2012-06-07-php-site-2.png)

**Complex Routing**
Helping to improve the website [SEO](http://en.wikipedia.org/wiki/Search_engine_optimization), we added some routes like https://php.phalcon.io/news/2012/05/php-543-and-php-5313-released, this kind of URLs are now possible thanks to the new routing system present in most frameworks.

If you've been thinking about creating a blog, or news site with Phalcon, it is possible that this application will help you so much. 

Enjoy!

PS: There may be some broken links or bad translations, all intentional :P
