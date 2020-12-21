---
layout: post
title: "Moving towards Phalcon 0.5.x"
tags: [php, framework, phalcon, "0.5", roadmap, namespaces, "0.x"]
---
Our main goal is to make Phalcon a great framework that everyone can benefit from.

With that in mind, the 0.4.x branch was a great step forward and we are preparing for 0.5.x which will be a big redesign. The new branch will require some refactoring which we want to discuss with you. New changes will be introduced, big but necessary, which will affect the functionality of current applications.

<!--more-->
**Use of [namespaces](http://php.net/manual/en/language.namespaces.php) in class names**. 
This feature was built into PHP 5.3 and will allow us to organize classes in packages.

Most of the latest generation frameworks have been or are being rewritten to use namespaces. For example a class called today `Phalcon_Controller_Front` would be called `\Phalcon\Controller\Front`.

We believe that this change has to be implemented now, before the framework grows to a point that will require a complete rewrite.

**Use of [PDO](http://www.php.net/manual/en/book.pdo.php) for database connections.** 
Another important change is to replace the current database adapters with PDO. This would allow us to be [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself) and maintain less code using a common interface for different database systems. 

**HMVC**.
The last change is to implement Phalcon as a pure [HMVC](http://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller) framework. This change has taken longer than expected but is essential for future developments as well as design.

These are the first few changes we thought of, some of them suggested by the community. At this moment, we would like to hear your comments and recommendations. Tell us what you think either as comments on this blog post or by visiting our [forum](https://forum.phalcon.io).
