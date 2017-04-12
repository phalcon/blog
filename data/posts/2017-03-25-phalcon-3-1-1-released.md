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

### Expanding on 3.1.0 Version highlights
- #### Added `Phalcon\Validation\Validator\Callback`, `Phalcon\Validation::getData` [NEW]
We added new validator `Phalcon\Validation\Validator\Callback` where you can execute any logic you want. It should return `true`, `false` or new Validator which should be used to validate your field.
  
```php
<?php

use Phalcon\Validation;
use Phalcon\Validation\Validator\Callback;
use Phalcon\Validation\Validator\PresenceOf;

$validation = new Validation();
$validation->add(
  "amount",
  new Callback(
      [
          'callback' => function($data) {
              return $data['amount'] % 2 == 0;
          },
          'message'  => 'Only even number of products are accepted',
      ]
  )
);

$messages = $validation->validate(['amount' => 1]); // will return a message from first validator
```

For more information read [our documentation](https://docs.phalconphp.com/en/latest/reference/validation.html#callback-validator)

- #### Added `Phalcon\Mvc\Model\Binder`, class used for binding models to parameters in dispatcher, micro
- #### Added `Phalcon\Dispatcher::getBoundModels` and `Phalcon\Mvc\Micro::getBoundModels` to getting bound models
- #### Added `Phalcon\Mvc\Micro\Collection\LazyLoader::callMethod`
In Phalcon 3 we introduced binding model instances in controller actions. In Phalcon 3.1 we decided to move the code controlling this to a separated class, optimize it a bit and offer a way to use the same functionality in `Phalcon\Mvc\Micro` as well. Since it's using Reflection API we also added way to cache it. In addition to this `Phalcon\Dispatcher::setModelBinding()` is now deprecated and will be removed in Phalcon 4. From Phalcon 3.2 usage of this method will trigger `E_DEPRECATED`

```php
<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Model\Binder;

$di = new FactoryDefault();
$di->set(
    'dispatcher', 
    function() {
        $dispatcher = new Dispatcher();
        $dispatcher->setModelBinder(new Binder(), 'cache');
  
        return $dispatcher;
    }
);
```

And you can type-hint your action parameters with class names. For more information read docs: [using in micro](https://docs.phalconphp.com/en/latest/reference/micro.html#inject-model-instances), [using in dispatcher](https://docs.phalconphp.com/en/latest/reference/dispatching.html#inject-model-instances)

- #### Added `afterBinding` event to `Phalcon\Dispatcher` and `Phalcon\Mvc\Micro`, added `Phalcon\Mvc\Micro::afterBinding` [NEW]
We added new event to the dispatcher and micro application. `afterBinding` event (or middleware in micro) will trigger after binding model instances done by the `Phalcon\Mvc\Model\Binder` component but before executing an action.

- #### Added the ability to set custom Resultset class returned by `find()` [#12166](https://github.com/phalcon/cphalcon/issues/12166) [NEW]
By using this feature you can have your own custom Resultset classes with your own logic.

```php
<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple;

class AgeStats extends Model
{
  public function getSource()
  {
      return 'stats';
  }
  
  public function getResultsetClass()
  {
      return 'MyResultset';
  }
}

class MyResultset extends Simple 
{
 // implement your custom logic here
}

$stats = AgeStats::find(); // it will return MyResultset instance
```
- #### Clear appended and prepended title elements (`Phalcon\Tag::appendTitle`, `Phalcon\Tag::prependTitle`) [NEW]
You can now clear and add multiple elements to `appendTitle` and `prependTitle` on the `Phalcon\Tag` component.

```php
<?php

\Phalcon\Tag::setTitleSeparator(' - ');
\Phalcon\Tag::setTitle('Title');

// Somewhere in controller
\Phalcon\Tag::prependTitle('Category');
\Phalcon\Tag::prependTitle('Article');

// Same situation - clear and put just one prepend element
// (will be faster than clear all values)
\Phalcon\Tag::prependTitle(['Just article']);

// Or other - clear and put a few elements
\Phalcon\Tag::prependTitle(['Other category', 'Other article']);
```

- #### Added the ability to specify what empty means in the `'allowEmpty'` option of the validators. It now accepts also an array specifying what is considered `empty`, i.e. `['', false]` [NEW]
Previously `allowEmpty` option in validators would accept only true value, meaning it allows empty values. Right now you can provide an array with the values that are considered as `empty` for your validator.

```php
<?php

use Phalcon\Validation;
use Phalcon\Validation\Validator\PresenceOf;

$validation = new Validation();
$validation->add(
    'description', 
    new PresenceOf(
        [
            'message'    => 'Description is required',
            'allowEmpty' => [null],
        ]
    )
);

$messages = $validation->validate(['description' => null]); // empty messages
$messages = $validation->validate(['description' => '']);   // will return message from validator
```

- #### Added the ability to use `Phalcon\Validation` with `Phalcon\Mvc\Collection`, deprecated `Phalcon\Mvc\Model\Validator` classes [NEW]
In Phalcon 3 we made changes to model validators so as to use the same classes as form validators. The same functionality was missing from the `Phalcon\Mvc\Collection`. We have addressed that issue and you can now use the `Phalcon\Validation` component for Mongo Collections. The required changes were also made in [phlacon/incubator](https://github.com/phalcon/incubator) and PHP7 related classes. We encourage you to switch to the new validation as soon as you can, since in Phalcon 4 we will remove old `Phalcon\Mvc\Model\Validator` namespace. From Phalcon 3.2, usage of old classes will trigger `E_DEPRECATED`

```php
<?php

use Phalcon\Mvc\Collection;
use Phalcon\Validation;
use Phalcon\Validation\Validator\PresenceOf;

class Robots extends Collection
{
  public function validation()
  {
      $validation = new Validation();
      $validation->add('name', new PresenceOf());
      
      return $this->validate($validation);
  }
}

$robots = new Robots();
$robots->create(); // returns false
$robots->name = 'Some Robot';
$robots->create(); // returns true
```
  
  More information can be found in our documentation: [validating collections](https://docs.phalconphp.com/pl/latest/reference/odm.html#validating-data-integrity), [validation](https://docs.phalconphp.com/en/latest/reference/validation.html)

##### Please note that Phalcon 3.1 is not compatible with PHP 7.1. If you want to use PHP 7, you will need to compile it with PHP 7.0. Full support for PHP 7.1+ will be introduced in our next version ##### {.alert .alert-danger}

### Community 
Again big kudos to our community for finding the bugs addressed in this hotfix and [@jurigag](https://github.com/jurigag) for the help with this blog post.

### Update/Upgrade

Phalcon 3.1.1 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).


We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

