---
layout: post
title: "Phalcon 3.0.4 released"
tags: [php, phalcon, 3.0.x, phalcon3, release, rfc, lts]
---

Hello everyone!

We are really excited to announce Phalcon's latest release: 3.0.4!

This is another maintenance release for the 3.0.x series which addresses several issues.

The release tag can be found here: [3.0.4](https://github.com/phalcon/cphalcon/releases/tag/v3.0.4)

<!--more-->
#### Roadmap

- This is going to be the last release for the 3.0.x series
- We will continue our focus on v3 as part of our LTS
- The next release will be 3.1.0

#### Github Branches

Prior to this release

- 3.0.x - Only bug fixes
- 3.1.x - Only for new features that were not breaking backward compatibility
- 4.0.x - New version features but also certain changes will not be backwards compatible

After 3.0.4 release

- 3.1.x - Only bug fixes
- 3.2.x - Only for new features that were not breaking backward compatibility
- 4.0.x - New version features but also certain changes will not be backwards compatible

The appropriate branches will be prepared shortly.

#### Highlights

- Fixed Isnull check is not correct when the model field defaults to an empty string. [12507](https://github.com/phalcon/cphalcon/issues/12507)
- Fixed `Phalcon\Forms\Element::label` to accept 0 as label instead of validating it as empty. [12148](https://github.com/phalcon/cphalcon/issues/12148)
- Fixed `Phalcon\Crypt::getAvailableCiphers`, `Phalcon\Crypt::decrypt`, `Phalcon\Crypt::encrypt` by getting missed aliases for ciphers [12539](https://github.com/phalcon/cphalcon/issues/12539)
- Fixed `Phalcon\Mvc\Model` by adding missed `use` statement for `ResultsetInterface` [12574](https://github.com/phalcon/cphalcon/issues/12574)
- Fixed adding role after setting default action [12573](https://github.com/phalcon/cphalcon/issues/12573)
- Fixed except option in `Phalcon\Validation\Validator\Uniquenss` to allow using except fields other than unique fields
- Cleaned `Phalcon\Translate\Adapter\Gettext::query` and removed ability to pass custom domain [12598](https://github.com/phalcon/cphalcon/issues/12598), [12606](https://github.com/phalcon/cphalcon/issues/12606)
- Fixed `Phalcon\Validation\Message\Group::offsetUnset` to correct unsetting a message by index [12455](https://github.com/phalcon/cphalcon/issues/12455)
- Fix using `Phalcon\Acl\Role` and `Phalcon\Acl\Resource` as parameters for `Phalcon\Acl\Adapter\Memory::isAllowed`
			
### PHP 7.1 and Zephir

We are still working on identifying all the changes that PHP 7.1 has and how it affects Zephir. 

A big thank you to all our backers and supporters that help us by joining our funding campaign. [https://phalcon.link/fund](https://phalcon.link/fund)

### Update/Upgrade

Phalcon 3.0.4 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

We encourage existing Phalcon 3 users to update to this maintenance version.

<3 Phalcon Team
