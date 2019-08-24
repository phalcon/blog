---
layout: post
title: "Phalcon 0.4.3 (stable) and 0.5.0 (alpha)"
tags: [php, framework, phalcon, "0.4", "0.5", release, namespaces, roadmap, "0.x"]
---

Following up on the 0.4.2 release a few weeks ago, we have a fresh update to address some issues and minor bugs.

We are also very excited to announce the release of the 0.5.0 alpha 1 version! This new branch offers many improvements and a huge refactoring of the framework. We are happy that the changes we have introduced have increased performance even more.

<!--more-->
The biggest change in this first Alpha release of 0.5.0 is that all classes now have been registered as [namespaces](http://www.php.net/manual/en/language.namespaces.rationale.php). Each component owns its own namespace with a base namespace called `\Phalcon`. This change offers a lot more flexibility for the future, but it will affect existing applications that will need some refactoring to operate with the 0.5.0 version.

Our initial tests indicate that the 0.5.0 Alpha 1 works great. Our [official site](https://github.com/phalcon/website) and sample applications are running on it and all the unit tests are [passing](http://travis-ci.org/#!/phalcon/cphalcon). This version also has added stability improvements on older versions of PHP (< 5.3.4)

If you are interesting in helping with testing, just download the DLL for Windows from the [download page](https://phalcon.io/download), or compile the extension from the dev/ folder (when cloning the repository from [Github](https://github.com/phalcon/cphalcon/))

Feel free to explore and experiment with the code in the [sample application](https://github.com/phalcon/invo). For the most part, you should change the `_` with `\` in the class names.

There is still more to come. The next alpha release (0.5.0 Alpha 2) we are planning on migrating all the database adapters to PDO, while continuing on our normal roadmap.

If you have any problems you can send us your comments via the Phalcon's [forum](https://forum.phalcon.io).

Thanks for your help!

<3 Phalcon Team