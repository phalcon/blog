Announcing the release of Phalcon 0.6.0
=======================================

![image]({{ cdnUrl }}/files/2012-11-01-phalcon-attack.jpg)

We are pleased to announce the release of Phalcon 0.6.0.

This version marks two milestones in Phalcon's maturity and features such as support for [MongoDb](http://www.mongodb.org/) and Volt.

As noted in our previous blog post, Phalcon is now offering a templating engine called [Volt](https://docs.phalconphp.com/en/latest/reference/volt.html), inspired by Twig. Volt is the only templating engine for PHP written completely in C. It is part of the framework so it shares the same performance optimizations as the rest of the framework and it is also rich in features. We have also completed our support for MongoDb and [ODM (Object Document Mappers](https://docs.phalconphp.com/en/latest/reference/odm.html)). This opens a lot of possibilities for future features regarding ODMs.

Our main concern is always ease of use and performance. We are always trying to find ways to make the framework as fast as it can become. To that effect, a significant amount of performance enhancements have been implemented in this version, to ensure that performance is kept at high levels.

Several components have now additional features. The most notable is the [Phalcon\\Tag](https://docs.phalconphp.com/en/latest/reference/tags.html#document-type-of-content) which generates elements based on a doctype and [Phalcon\\Mvc\\Model](https://docs.phalconphp.com/en/latest/reference/models.html), which now allows for manual definition of meta data on the model. Feedback from the community also drove the implementation of [skipAttributes](https://docs.phalconphp.com/en/latest/reference/models.html#skipping-columns) which allows a group of attributes in a model to be skipped when performing inserts or updates.

In this release, we concentrated on the community and its needs. A long awaited templating engine as well as support for MongoDb were the two largest areas of work. The remaining issues addressed can be found in our [CHANGELOG](https://github.com/phalcon/cphalcon/blob/0.6.0/CHANGELOG) and the vast majority of them were requests and discussions from the community or contributions to the project.

- [Documentation](https://docs.phalconphp.com/en/latest/)
- [Download](https://phalconphp.com/download)

A big thank you all.

We will begin working in 0.7.0 mid next week. The 0.7.0 version will introduce interfaces for most components) to allow users to extend the framework or replace parts of it with their own implementations.

Thank you for making Phalcon better!


<3 The Phalcon Team
