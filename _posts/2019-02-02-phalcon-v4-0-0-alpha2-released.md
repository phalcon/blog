---
layout: post
title: Phalcon v4.0.0-alpha2 released
date: 2019-02-02T17:18:06.203Z
tags:
  - phalcon
  - phalcon4
  - release
  - alpha
---
The Phalcon Team is happy to announce the release of **v4.0.0 Alpha 2**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.2)
                                                                         
We cannot thank your community enough! By reporting bugs, offering feedback and suggestions, pull requests, being active in discussions about how the framework should move towards the future, you all help us make Phalcon better with every release.
<!--more-->

As mentioned before, we took a different approach with our releases, with v4. The goal is to release often and release small. This way we allow the community to catch up, find bugs, provide feedback etc. 

We are releasing the second alpha version today, which has a lot of bug fixes from the first alpha as well as completing work already commissioned for the v4 series. You can see our project [here](https://github.com/phalcon/cphalcon/projects/3)

### Changelog
#### Added
- Added `notFound()` method in `Phalcon\Translate\Adapter\NativeArray` which returns the key requested if not found. The method can be overriden when extending the class, returning what the developer needs [#13007](https://github.com/phalcon/cphalcon/pull/13007)
- Added `Phalcon\Service\Locator`, `Phalcon\Service\LocatorInterface` and `Phalcon\Service\LocatorFactoryInterface` to allow for the creation of service locators and factories throughout the application [#13771](https://github.com/phalcon/cphalcon/pull/13771)
- Added `Phalcon\Http\Request::setParameterFilters`. It allows you to preset filters for specific input (i.e. `id`, `name` etc.). You can then retrieve the automatcally sanitized values using `Phalcon\Http\Request::getFilteredQuery`, `Phalcon\Http\Request::getFilteredPost` and `Phalcon\Http\Request::getFilteredPut` [#13488](https://github.com/phalcon/cphalcon/issues/13488)

#### Fixed
- Fixed `Phalcon\Mvc\Micro::handle` to properly return a response object [#13712](https://github.com/phalcon/cphalcon/issues/13712)
- Fixed `Phalcon\Cache\Backend\Libmemcached` returning "empty" values being as `null` when they could be `0`, `false` or empty `string`. [#13497](https://github.com/phalcon/cphalcon/issues/13497)
- Fixed session adapters to properly implement [`SessionHandlerInterface::write`](http://php.net/manual/en/sessionhandlerinterface.write.php)
- Fixed `Phalcon\Session\Manager` to not interact with `$_SESSION` variable if the session has not been started [#13718](https://github.com/phalcon/cphalcon/issues/13718), [#13520](https://github.com/phalcon/cphalcon/issues/13520)
- Fixed `Phalcon\Cli\Console` class not found error if handling the same module twice [#13724](https://github.com/phalcon/cphalcon/issues/13724)
- Fixed `Phalcon\Cache\Backend\Libmemcached` returning "empty" values being as `null` when they could be `0`, `false` or empty `string`. [#13497](https://github.com/phalcon/cphalcon/issues/13497)
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler::functionCall` building the incorrect code for the following tags; `select`, and `select_static` [#13459](https://github.com/phalcon/cphalcon/issues/13459)
- Fixed `Phalcon\Tag\Select` not rendering without any options.
 
#### Changed
- Changed the `Phalcon\Tag::renderTitle()` parameters such as `Phalcon\Tag::getTitle()` [#13706](https://github.com/phalcon/cphalcon/pull/13706)
- Changed the `Phalcon\Html\Tag::renderTitle()` parameters such as `Phalcon\Html\Tag::getTitle()` [#13706](https://github.com/phalcon/cphalcon/pull/13706)
- Changed the `Phalcon\Version::get()` to follow [semantic versioning](https://semver.org/) [#13720](https://github.com/phalcon/cphalcon/pull/13720)
- Changed the `Phalcon\Translate\Adapter\NativeArray` to accept a new parameter in the constructor `triggerError`. This will trigger an error if the key is not found [#13007](https://github.com/phalcon/cphalcon/pull/13007)
- Changed the default action of `Phalcon\Acl\Memory`to be `Acl::DENY` instead of `Acl::ALLOW` [#13758](https://github.com/phalcon/cphalcon/pull/13758)
- Changed `Phalcon\Mvc\User\Plugin` to `Phalcon\Plugin` [#13749](https://github.com/phalcon/cphalcon/issues/13749)
- Changed `Phalcon\Exception` to implement `\Throwable` interface.[#13750](https://github.com/phalcon/cphalcon/issues/13758)
- Changed `Phalcon\Http\Cookie`. The `httpOnly` property is no longer initialised with a value [#13464](https://github.com/phalcon/cphalcon/issues/13464)
- Changed the default action for no arguments of `Phalcon\Acl\Memory`to be `Acl::DENY` instead of `Acl::ALLOW` [#13769](https://github.com/phalcon/cphalcon/issues/13769)
- Changed the implementation of `Phalcon\Filter`. It uses a service locator and a service locator factory now. It has more sanitizers now. [#13060](https://github.com/phalcon/cphalcon/issues/13060)

### Documentation
We have been working in parallel to enhance our documentation and rewrite all the articles (or at least check them for accuracy) for v4. The progress is slow but steady and it will continue until we finalize all the documentation. 

Several contributors have jumped in and are helping with all the documents, rewriting, proof reading and offering corrections. The documentation repository is located [here](https://github.com/phalcon/docs), and our docs application [here](https://github.com/phalcon/docs-app). Others have also visited our project on [Crowdin](https://crowdin.com/project/phalcon-documentation), and are helping with translating our documents to their native tongue. The list of already refactored/rewritten documents can be found in our [project for v4](https://github.com/phalcon/docs/projects/1) in the `docs` repository.

> Please note that we will accept changes to the [docs](https://github.com/phalcon/docs) repository only for the English language (`en` folder). All other languages are handled by [Crowdin](https://crowdin.com).
{: .alert .alert-info }

> Did you know that you can now add comments to our documentation pages? (same as with our blog).
{: .alert .alert-warning }

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-alpha2. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.2).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalconphp.com/4.0/en/installation).

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues] (https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
