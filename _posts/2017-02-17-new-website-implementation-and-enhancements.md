---
layout: post
title: "New website implementation and enhancements"
tags: [php, phalcon, phalcon3, website, implementation]
---
Hello everyone

Today we have released a brand new implementation of our website.

Apart from some minor changes to the layout and addition of content, the website looks the same as before.

<!--more-->
### Implementation

In our previous application serving our website, we had used the [full stack](https://docs.phalcon.io/latest/en/applications) application that Phalcon offers.

In order to offer a wider variety of implementation to our community, we opted for using the `\Phalcon\Mvc\Micro` [application](https://docs.phalcon.io/latest/en/micro), as well as [Middleware events](https://docs.phalcon.io/latest/en/micro#middleware-events) in order to showcase the power of Phalcon, even when not using the full stack application.

The implementation of our site can be found in our [Github](https://github.com/phalcon/website) repository, where you can clone and investigate the implementation.

In the very near future, we will create additional blog posts as tutorials for this implementation, in an effort to bolster our documentation but also offer a different implementation methodology. 


### Translations

We use Transifex to handle the translations to our main website. In our previous website we had some orphaned strings and some text that was not translated at all.

We have reviewed the whole site and ensured that all translation strings are where they are supposed to be.

If you wish to translate our website to any language other than English, you can join our team in Transifex and either join an existing language or request a new one.

All of the translations occur in Transifex and we regularly pull down translated strings in their respective languages so as to update our site.
 
_Please note that we only accept top level languages (2 character slug i.e. /en /es /it etc.)._
			
### Funding

Our funding campaign is moving along nicely! A big thank you to all of our sponsors! We are utilizing the currently collected funds to meet our Q1 goals, starting with a thorough investigation of PHP 7.1.x changes and how they affect Zephir and Phalcon. 

If you wish to join our backers, feel free to visit [https://phalcon.link/fund](https://phalcon.link/fund)

### Conclusion

A big thank you to our community as well as our generous supporters!


<3 Phalcon Team
