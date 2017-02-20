Phalcon 3.0.4 released!
=======================

Hello everyone!

We are really excited to announce Phalcon's latest release: 3.0.4!

This is another maintenance release in the 3.0.x series which addresses several issues.

The release tag can be found here: [3.0.4](https://github.com/phalcon/cphalcon/releases/tag/v3.0.4)

#### Roadmap

- This is going to be the last release for the 3.0.x series
- We will continue our focus on v3 as part of our LTS
- The next release will be 3.1.0

#### Github Branches

Prior to this release

- 3.0.x - This branch was used only for bugfixes
- 3.1.x - This branch was only used for new features that were not breaking backward compatibility
- 4.0.x - This branch is used for the new version features but also certain changes will not be backwards compatible

After 3.0.4 release

• 3.1.x - This branch is used only for bug fixes
• 3.2.x - This branch was only used for new features that were not breaking backward compatibility
- 4.0.x - This branch is used for the new version features but also certain changes will not be backwards compatible

The appropriate branches will be prepared shortly.

#### Highlights

- Fixed Isnull check is not correct when the model field defaults to an empty string. [GI:12507]
- Fixed `Phalcon\Forms\Element::label` to accept 0 as label instead of validating it as empty. [GI:12148]
- Fixed `Phalcon\Crypt::getAvailableCiphers`, `Phalcon\Crypt::decrypt`, `Phalcon\Crypt::encrypt` by getting missed aliases for ciphers [GI:12539]
- Fixed `Phalcon\Mvc\Model` by adding missed `use` statement for `ResultsetInterface` [GI:12574]
- Fixed adding role after setting default action [GI:12573]
- Fixed except option in `Phalcon\Validation\Validator\Uniquenss` to allow using except fields other than unique fields
- Cleaned `Phalcon\Translate\Adapter\Gettext::query` and removed ability to pass custom domain [GI:12598], [GI:12606]
- Fixed `Phalcon\Validation\Message\Group::offsetUnset` to correct unsetting a message by index [GI:12455]
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

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

We encourage existing Phalcon 3 users to update to this maintenance version.

<3 Phalcon Team
