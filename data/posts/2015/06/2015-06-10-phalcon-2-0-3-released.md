Phalcon 2.0.3 released
======================

As part of our regular release schedule, we are happy to announce that 
Phalcon 2.0.3 has been released!

This version contains many bug fixes (thank you contributors!!) as well as new 
functionality that derived from community NFRs.

### Changes

 - Implemented Namespace aliases in PHQL
 - Ability to define if a virtual foreign key must ignore `null` values or not
 - Added support for Behaviors in `Phalcon\Mvc\Collection`
 - Added `SoftDelete` and `Timestampable` behaviors to Collections
 - Fixed bug that added two ? in `Mvc\Url::get` when using query parameters 
   [#10421](https://github.com/phalcon/cphalcon/issues/10421)
 - String attributes in models can be marked to allow empty string values 
   [#440](https://github.com/phalcon/cphalcon/issues/440)
 - Added an option to return the SQL to be generated from a `Mvc\Model\Query` 
   instance [#1908](https://github.com/phalcon/cphalcon/issues/1908)
 - Fix doesn't correct column domain in `Phalcon\Db\Dialect::select()` 
   [#10439](https://github.com/phalcon/cphalcon/issues/10439)
 - Added support for DOUBLE type in MySQL
 - `Phalcon\Tag\Select` now handles array values as strings avoiding that zero 
   will be handled as empty string 
   [#2921](https://github.com/phalcon/cphalcon/issues/2921)
 - PHQL now supports CASE/WHEN/ELSE expressions 
   [#651](https://github.com/phalcon/cphalcon/issues/651)
 - Fixed bug that passes non-string values to `Phalcon\Crypt::encrypt` from 
   `Phalcon\Http\Cookies`
 - Fixed bug that didn't pass the schema name in the sequence name (PostgreSQL)
 - Attribute persistent is now removed from the DNS attributes in PDO 
   connections to avoid errors in PostgreSQL 
   [#10484](https://github.com/phalcon/cphalcon/issues/10484)

### Update/Upgrade

This version can be installed from the master branch, if you don’t have Zephir 
installed follow these instructions:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    cd ext
    sudo ./install
```

The standard installation method also works:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    cd build
    sudo ./install
```

If you have Zephir installed:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    zephir fullclean
    zephir build
```

Note that running the installation script will replace any version of Phalcon 
installed before.

Windows DLLs are available in the [download page](http://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/guide-upgrading-to-phalcon-2) 
for more information about upgrading to Phalcon 2.0.x from 1.3.x.

### Thanks

Thanks to everyone involved in making this version as well to the community for 
their continuous input and feedback!

<3 Phalcon Team