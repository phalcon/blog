Phalcon 2.1.0 beta 1 released
=============================

We're excited to announce the first beta release of Phalcon 2.1.
New 2.1.x series are designed to be supported for a longer than normal period
and therefore it's marked as our first Long Term Support [LTS](https://en.wikipedia.org/wiki/Long-term_support) release.

In Phalcon 2.0.x many features and bug fixes were included but mostly keeping backwards compatibility with Phalcon 1.3.x encouraging developers to update to this latest version. Phalcon 2.1 introduces new features some of them
incompatible with previous released versions.

Deprecation for PHP 5.3
-----------------------
Phalcon 2.0.x is the latest series of releases supporting PHP 5.3 (>= 5.3.21).
Because of this, in the past, we weren't in the ability to include some features in Phalcon.
We encourage you to upgrade to at least PHP 5.4 in order to use Phalcon 2.1.

Phalcon\Mvc\Model\Validation is now deprecated
----------------------------------------------
[Phalcon\Mvc\Model\Validation]() is now deprecated in favor of [Phalcon\\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html).
We expect to merge the functionality duplicated between both components improving
the understanding of the validation system in Phalcon applications.

Previously validations were implemented as follows:

```php
<?php

namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $this->validate(new EmailValidator(array(
            'field' => 'email'
        )));

        $this->validate(new UniquenessValidator(array(
            'field' => 'username',
            'message' => 'Sorry, That username is already taken'
        )));

        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
}
```

Employing [Phalcon\\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html), it must be changed to:

```php
<?php

namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Email as EmailValidator;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $validator = new Validation();

        $validator->add('email', new EmailValidator());

        $validator->add('username', new UniquenessValidator(array(
            'message' => 'Sorry, That username is already taken'
        ));

        return $this->validate();
    }
}
```
