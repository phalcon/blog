---
layout: post
title: "Phalcon 1.2.1 Released"
tags: [php, phalcon, "1.2", release, "1.x"]
---
![image](/assets/files/2013-07-24-phalcon-php-logo.png)

We are happy to announce that Phalcon 1.2.1 is available for download/compile for our users.

This new version of Phalcon includes a lot of optimizations, reducing memory while increasing performance (yet again :))

<!--more-->
A few key points are

- Dispatching parameters now can be modified in `beforeExecuteRoute` events
- `beforeException` events can now handle exceptions occurred when executing actions ([140](https://github.com/phalcon/cphalcon/issues/140))
- Added `Phalcon\Dispatcher::getHandlerClass` and `Phalcon\Dispatch::getActionMethod`
- `Phalcon\Form\Element\*` classes now implement `Phalcon\Form\ElementInterface`
- `Phalcon\Config\Adapter\Ini` correctly handles empty sections and INI files without any sections
- `Phalcon\Http\Request` fully supports file arrays
- Added support for various padding schemes (PKCS7, ANSI X.923, ISO 10126, ISO/IEC 7816-4, zero padding, space padding) to `Phalcon\Crypt`
- Added getKey(), getError(), isUploadedFile() methods to `Phalcon\Http\Request\File`

and much more. You can read the full list in our [CHANGELOG](https://github.com/phalcon/cphalcon/blob/phalcon-v1.2.1/CHANGELOG).

Phalcon 1.2.1 is now available on the master branch and DLLs are available for download in our [download](https://www.phalcon.io/download) area. You can also access the latest [documentation](https://docs.phalcon.io/) here.


<3 The Phalcon Team
