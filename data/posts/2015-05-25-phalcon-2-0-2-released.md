Phalcon 2.0.2 released
======================

The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find [Zephir](http://zephir-lang.com/) very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:

- Added `stats()` methods to Beanstalk
- Fixed segfault when a docblock does not have annotations [10301](https://github.com/phalcon/cphalcon/issues/10301)
- Fixed wrong number of parameters passed when triggering an event in `Mvc\Collection`
- Now Mvc\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL
- Re-added `Http\Request::hasPut()` [10283](https://github.com/phalcon/cphalcon/issue/10283)
- Phalcon\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes
- `Phalcon\Text`: Added method `concat()` - Concatenates strings using the separator only once without duplication in places concatenation
- Added conditional on Session adapter `start()` to check if the session has already been started
- Added `status()` function in Session adapter to return the status of the session (disabled/none/started)
- Implementation of subqueries as expressions in PHQL
- Performance improvements focused on PHP 5.6

### Subqueries

One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:

```sql
    $phql = "SELECT c.* FROM Shop\Cars c
    WHERE c.brandId IN (SELECT id FROM Shop\Brands)
    ORDER BY c.name";
    $cars = $this->modelsManager->executeQuery($phql);
```
Models must belong to the same database in order to be used as source in a subquery.

### Default Database Values

Now in the case that a column has a ‘default' value declared in the field of the mapped table, this 'default' value will be used instead of inserting `NULL`:

```php
    $robots = new Robots();
    $robots->save(); // use all `default` values
```

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/ext
sudo ./install
```

The standard installation method also works:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/guide-upgrading-to-phalcon-2) for more information about upgrading to Phalcon 2.0.x from 1.3.x.

### Coming soon

In the future 2.0.x series, we will be concentrating our efforts on requests from the community:

- Eager-Loading in PHQL
- Optional string empty values in the ORM
- PHQL custom functions
- Case Statements in PHQL
- Aliases for namespaces in PHQL

Later on, we will be planning the features to include in Phalcon 2.1, for now:

- Complete deprecation of PHP 5.3
- Unification of `Phalcon\Mvc\Model\Validation` and `Phalcon\Validation`

### Thanks

Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!


<3 Phalcon Team
