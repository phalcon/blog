---
layout: post
title: "Phalcon 3.3.1 released"
tags: [php, phalcon, phalcon3, release, rfc, lts, php7]
---

Hello everyone!

Phalcon [3.3.1](https://github.com/phalcon/cphalcon/releases/tag/v3.3.1) has been released, addressing some bugs. 

The release tag can be found here: [3.3.1](https://github.com/phalcon/cphalcon/releases/tag/v3.3.1)
<!--more-->
#### Changelog
- Fixed a boolean logic error in the CSS minifier and a corresponding unit test so that whitespace is stripped [#13200](https://github.com/phalcon/cphalcon/pull/13200)
- Fixed `default` Volt filter [#13242](https://github.com/phalcon/cphalcon/issues/13242), [#13244](https://github.com/phalcon/cphalcon/issues/13244)
- Fixed `Phalcon\Validation\Validator\Date` to return code in validation message

### Update/Upgrade
Phalcon 3.3.1 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

<h5 class="alert alert-danger">
<strong>NOTE</strong>: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code. 
</div>

<h5 class="alert alert-danger">
<strong>NOTE</strong>: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.3.1) page. 
</div>

We encourage existing Phalcon 3 users to update to this version and as always a big thank you to our contributors!


<3 Phalcon Team

