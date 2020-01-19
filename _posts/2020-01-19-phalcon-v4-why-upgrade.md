---
layout: post
title: Phalcon v4 - Why Upgrade
date: 2020-01-19T15:15:05.638Z
tags:
  - phalcon4
  - upgrade
  - features
---
To upgrade or not to upgrade. This is the question!

<!-more-->

Recently, questions were asked by the community on our social media, [Discord](https://phalcon.io/discord) and [Forum](https://phalcon.io/forum) regarding v4. The main question was:

> why should I upgrade to v4
{: .alert .alert-info }

As enthusiasts ourselves, the clear answer would be _because it is the latest and greatest_!. But that, for sure would not satisfy everyone as a reason. So here are some reasons why you should put the time and upgrade your application to v4.

### PHP support
v4 removes support for PHP 5. It is about time really. Support for PHP 5.x from the PHP community has stopped in 2017, [3 years ago](https://www.php.net/supported-versions.php). PHP 7 offers a lot more functionality, speed and security enhancements. Upgrading is definitely beneficial to your application.

Also, the minimum PHP version for v4 is 7.2, which right now is supported for [security fixes only](https://www.php.net/supported-versions.php). Phalcon will follow closely PHP with regards to supported versions, so we will not be supporting PHP 7.2 after it reaches its end of life (November 2020).

v4 also came with out of the box support for PHP 7.4. Although this might not seem a big milestone, we made sure not to repeat the fiasco of v3, i.e. not supporting PHP 7 for months after v3 was released.

### Unsupported/Upgraded Code
Code that is not supported was removed. For instance `xcache` cache adapters have been removed since the extension is not supported. This removed chunks of the framework that were not used, reducing the overall memory consumption of Phalcon.

Additionally, several extensions that are internally used by the application (memcached for instance) have been upgraded in terms of code usage, to take advantage of the latest features they have to offer. 

We have also removed (temporarily) MongoDB support, because the particular driver had been deprecated. Not to worry though, support for MongoDB will be reintroduced in a future v4 version, using the latest MongoDB driver. The work is almost done and was nearly done before we released v4 but we wanted to test it more thoroughly, and as a result we opted not to release it with v4.0.0.

### PSR
Full support for PSR would be a question that would appear again and again from the community. With v4 we have added the PSR extension as a requirement. This means that for Phalcon to work, the PSR extension must be present in your system and loaded before Phalcon. 

Using PSR has many benefits, especially if you want to use a package that is PSR compliant, in a particular place in Phalcon as a plug and play. For instance if you do not like the Phalcon Logger, you can easily replace it with Monolog, since both implement the PSR-3 interface. Any PSR-3 compliant logger could be easily used.

We have also introduced additional components that are PSR compliant. The list is (namespace first):

- Logger - PSR-3
- Http\Message - PSR-7
- Container - PSR-11 (proxy for now)
- Http\Link - PSR-13
- Cache - PSR-16
- Http\Message - PSR-17

Although support for PSR-7 and PSR-17 is available in v4, they are not _enabled_. This means that the current HTTP layer that Phalcon exposes does not use the PSR-7 components but the ones available from before (v3). The goal is to change our whole HTTP stack to be fully PSR-7 and PSR-15 (middleware) compatible. That will come in future releases.

PSR-7 components have been introduced to allow developers to start developing applications using these components if they want to.

### Storage
Along the lines of PSR, new classes have been introduced under the `Storage` namespace, which in turn are used by the `Cache` components also. The `Storage` namespace offers components that allow you to connect to different storages such as `Redis`, `Memcached` etc. and perform operations as needed.

### Cache
The cache was completely rewritten to follow PSR-16. You can use this component in different applications that utilize PSR-16 or use a different one (such as Zend Cache) if you prefer, without any problems.

### Sessions
The session manager was also rewritten to implement the [`SessionHandlerInterface`](https://www.php.net/manual/en/class.sessionhandlerinterface.php). This means that you can create your own Session adapter or use an existing one, add it to Phalcon's Session manager and your sessions will work just fine. The same of course applies in reverse, you can use one of Phalcon's Session adapters in an application that implements the [`SessionHandlerInterface`](https://www.php.net/manual/en/class.sessionhandlerinterface.php)

### Factories
Factory classes have been introduced in numerous parts of the extension, (for instance `Logger`, `Cache` etc.) in order to help developers create components easier. This move will also help with dependency injection for components, when we introduce a new PSR-11 Container (future v4 version).

### Stricter Interfaces
PHP 7 offers much stricter interfaces and checks for them. This allows developers to ensure that parameters passed in their methods are of the correct type. This not only makes the code cleaner, it also eliminates endless `if` statements or casting assignments.

Phalcon v4 utilizes this technology and introduced strict types to all interfaces. Additionally, all interfaces and implementing classes have been checked to ensure that they align properly. We did have a lot of misalignments in the past.

We have also renamed a lot of classes to ensure uniformity in the framework. This allows developers to quickly identify components and their locations if need be.

### Interim Release
We mentioned this before numerous times, that v4 is some sort of an _interim_ release. This means that although v4 is a full release with a lot of functionality, it also serves as a building block for future releases. 

The introduction of PSR-7 for instance. Although PSR-7 is not currently used within the HTTP stack, it is there for developers to use. However, in future versions, the whole HTTP stack will be rewritten to use PSR-7 and PSR-15, making Phalcon more flexible and versatile. Since we could not do this work in one release, we split it into smaller chunks of work, releasing functionality as we build it.


























