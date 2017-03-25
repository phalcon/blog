## Phalcon 3.1.1 released!

Hey everyone.

We are releasing a hotfix today 3.1.1 that addresses some urgent issues with the framework. We strongly recommend that you upgrade your Phalcon version to the latest release 3.1.1.

As with any software, we have the `you broke it` scenario here. Thanks to the quick reporting from the community, we managed to fix the issues that came up, and therefore issue the hotfix today.

The release tag can be found here: [3.1.1](https://github.com/phalcon/cphalcon/releases/tag/v3.1.1)

### Undefined indexes in models
After the upgrade to 3.1.0, all models were issuing warnings:

```
Undefined index: keepSnapshots in Users.php on line 61
Undefined index: keepSnapshots in Groups.php on line 57
```

The issue would be rectified after clearing the query cache but still not a perfect solution. We have fixed it with [PR-12737](https://github.com/phalcon/cphalcon/pull/12737).

### `doLowUpdate()` - First argument is not array
After the upgrade we have experienced the following issue:

```php
$robot = Robots::findFirst();

$robot2 = new Robot($robot->toArray(), $di, $modelsManager);
$robot2->setNewValueForField(100);

try {
    $robot2->setDirtyState($robot2::DIRTY_STATE_PERSISTENT); 
    $robot2->save();
} catch (\Exception $exception) {
   echo "ERROR: " . $exception->getMessage();
}
Results in:
ERROR: First argument is not an array
```

It was reported in [#12742](https://github.com/phalcon/cphalcon/issues/12742) and it was fixed with [PR-12739](https://github.com/phalcon/cphalcon/pull/12739).

### Version highlights

- Added `Phalcon\Validation\Validator\Callback`, `Phalcon\Validation::getData`
- Added the ability to truncate database tables
- Added `Phalcon\Mvc\Model\Binder`, class used for binding models to parameters in dispatcher, micro, added `Phalcon\Dispatcher::getBoundModels` and `Phalcon\Mvc\Micro::getBoundModels` to getting bound models, added `Phalcon\Mvc\Micro\Collection\LazyLoader::callMethod`
- Added `afterBinding` event to `Phalcon\Dispatcher` and `Phalcon\Mvc\Micro`, added `Phalcon\Mvc\Micro::afterBinding`
- Added the ability to set custom Resultset class returned by `find()` [#12166](https://github.com/phalcon/cphalcon/issues/12166)

####  Clear appended and prepended title elements (`Phalcon\Tag::appendTitle`, `Phalcon\Tag::prependTitle`) [NEW]
You can now clear and add multiple elements to `appendTitle` and `prependTitle` on the `Phalcon\Tag` component.

```php
A way to clear elements and to add multiple elements at once (why not).
\Phalcon\Tag::setTitleSeparator(' - ');
\Phalcon\Tag::setTitle('Title');

// Somewhere in controller
\Phalcon\Tag::prependTitle('Category');
\Phalcon\Tag::prependTitle('Article');

// Same situation - clear and put just one prepend element (will be faster than clear all values)
\Phalcon\Tag::prependTitle(['Just article']);

// Or other - clear and put a few elements
\Phalcon\Tag::prependTitle(['Other category', 'Other article']);
```

- Added the ability to specify what empty means in the `'allowEmpty'` option of the validators. Now it accepts as well an array specifying what's empty, for example `['', false]`
- Added the ability to use `Phalcon\Validation` with `Phalcon\Mvc\Collection`, deprecated `Phalcon\Mvc\Model\Validator` classes
- Added the value of the object `intanceof` Interface to `Phalcon\Acl\Adapter\Memory`
- Added the ability to get original values from `Phalcon\Mvc\Model\Binder`, added `Phalcon\Mvc\Micro::getModelBinder`, `Phalcon\Dispatcher::getModelBinder`
- Added `prepend` parameter to `Phalcon\Loader::register` to specify autoloader's loading order to top most
- Fixes internal cache saving in `Phalcon\Mvc\Model\Binder` when no cache backend is used
- Fixed `Phalcon\Session\Bag::remove` to initialize the bag before removing a value [#12647](https://github.com/phalcon/cphalcon/pull/12647)
- Fixed `Phalcon\Mvc\Model::getChangedFields` to correct detect changes from `NULL` to Zero [#12628](https://github.com/phalcon/cphalcon/issues/12628)
- Fixed `Phalcon\Mvc\Model` to create/refresh snapshot after create/update/refresh operation [#11007](https://github.com/phalcon/cphalcon/issues/11007), [#11818](https://github.com/phalcon/cphalcon/issues/11818), [#11424](https://github.com/phalcon/cphalcon/issues/11424)
- Fixed `Phalcon\Mvc\Model::validate` to correctly set code message [#12645](https://github.com/phalcon/cphalcon/issues/12645)
- Fixed `Phalcon\Mvc\Model` to correctly add error when try to save empty string value to not null and not default column [#12688](https://github.com/phalcon/cphalcon/issues/12688)
- Fixed `Phalcon\Validation\Validator\Uniqueness` collection persistent condition
- Fixed `Phalcon\Loader::autoLoad` to prevent PHP warning [#12684](https://github.com/phalcon/cphalcon/pull/12684)
- Fixed `Phalcon\Mvc\Model\Query::_executeSelect` to correctly get the column map [#12715](https://github.com/phalcon/cphalcon/issues/12715)
- Fixed params view scope for PHP 5 [#12648](https://github.com/phalcon/cphalcon/issues/12648)
			
##### Please note that Phalcon 3.1 is not compatible with PHP 7.1. If you want to use PHP 7, you will need to compile it with PHP 7.0. Full support for PHP 7.1+ will be introduced in our next version ##### {.alert .alert-danger}

### Community 
Big kudos to our community as always for reporting, suggesting and applying fixes and making our framework better with every release! A big thank you to all our backers and supporters that help us by joining our funding campaign. [https://phalcon.link/fund](https://phalcon.link/fund)

### Team
We are making some changes to our team, bringing more people in to help with the organization, management as well as structure of the project. Our end goals are to produce timely releases with zero or minimal bugs, and to implement new features regularly. This is still work in progress, so once we have everything settled, we will explain everything with a relevant blog post.

### Update/Upgrade

Phalcon 3.1.0 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

##### Linux packages will be available in a couple of hours after the posting of this blog post ##### {.alert .alert-info}



We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team
