---
layout: post
title: "Phalcon 1.3.0 Released"
tags: 
  - php
  - phalcon
  - "1.3"
  - release
  - "1.x"
---
Right after our [2 year celebration](https://blog.phalcon.io/post/3acec916ae9c026594fe0562ef3013be2cf47247) and several months of development, more than 1,500 commits and a lot of improvements and fixes, **Phalcon 1.3 is finally released**!

Many important internal aspects of Phalcon have been rewritten and enhanced without breaking compatibility with older versions.

Phalcon 1.3 consolidates the research, testing and implementation of new ways to improve the performance in the Phalcon kernel, which is also the heart of the extensions created by [Zephir](https://blog.zephir-lang.com/) in Phalcon 2.0.

<!--more-->
The [CHANGELOG](https://github.com/phalcon/cphalcon/blob/master/CHANGELOG.md) for this version is huge. Some key improvements are:

### Disabling Literals

Literals can be disabled in [PHQL](https://docs.phalcon.io/latest/en/phql.html), this means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. In Phalcon 1.3 this option has been improved and now works with most query builders, finders and PHQL generators.

```php
Phalcon\Mvc\Model::setup(['phqlLiterals' => false]);

$phql = "SELECT Robots.* FROM Robots WHERE Robots.type = :type: LIMIT :limit:";

$result = $this->modelsManager->executeQuery(
    $phql,
    [
        'type'  => $this->request->getPost('name'),
        'limit' => $this->request->getPost('limit'),
    ]
);
```

### Registry

A widely requested by the community component, `Phalcon\\Registry` is introduced in this version. This component implements the Registry pattern, allowing the developer to store and retrieve all kinds of values using simple keys.

```php
$registry = new \Phalcon\Registry();

// Store a simple value
$registry->mydata = "hello";

// Store a complex resultset
$registry->robots = Robots::find();
```

Registries can be iterated as arrays:

```php
foreach ($registry as $key => $value) {
    var_dump($key);
    var_dump($value);
}
```

And can be accessed as objects or arrays:

```php
echo $registry->key;
echo $registry['some key'];
echo $registry[$key];
echo $registry->{$key};
echo $registry[0];
echo $registry->{0};
```

### Ini Settings

Phalcon 1.3 introduces php.ini settings to alter the global behavior of the extension:

```ini
; Enables/Disables globally the internal events
phalcon.orm.events = On

; Enables/Disables virtual foreign keys
phalcon.orm.virtual_foreign_keys = On

; Enables/Disables column renaming
phalcon.orm.column_renaming = On

; Enables/Disables automatic NOT NULL validation
phalcon.orm.not_null_validations = On

; Enables/Disables throwing an exception if save fails
phalcon.orm.exception_on_failed_save = On

; Enables/Disables literals in PHQL
phalcon.orm.enable_literals = On

; Enables/Disables auttomatic escape
phalcon.db.escape_identifiers = On
```

### PSR-3 Logger Implementation

Phalcon\\Logger now implements the [PSR-3](https://www.php-fig.org/psr/psr-3/) standard for loggers which allows this component interpolate with other frameworks that also implement this standard.

In addition to this, Phalcon optionally provides C implementations of the interfaces and traits required by this standard as part of the extension:

- `Psr\Log\LoggerInterface`,
- `Psr\Log\LoggerAwareInterface`,
- `Psr\Log\LogLevel`,
- `Psr\Log\LoggerAwareTrait` and
- `Psr\Log\LoggerTrait`.

You can enable/disable them via the following php.ini directive:

```ini
phalcon.register_psr3_classes = On;
```

This also would allow other components implement and use these interfaces directly where Phalcon is installed.

### Image Manipulation Component

A component that was conceived and implemented by our wonderful contributors `Phalcon\Image` is available for developers that need to manipulate images using GD or Imagemagick. A unified interface is provided to manipulate images using either library.

```php
use Phalcon\Image\Adapter\GD as GdAdapter;
use Phalcon\Image\Adapter\Imagick as ImagickAdapter;

$image = new GdAdapter('my-logo.jpg');

$image
    ->crop(200, 200)
    ->resize(70, 50)
    ->save('new-logo.jpg');
```

For now only the most commonly used functions have been unified and implemented since both libraries provide different functionality.

### Performance Improvements

**TLDR:** Phalcon is now faster!

The following performance improvements have been implemented in this version, they are a bit technical, you can skip them if you want:

**Polymorphic Function/Method cache**
Functions and methods are called directly by Phalcon using C calls taking advantage that compilers know their address/location at compile time, however, others only exist temporarily at runtime and must be resolved by Phalcon in the PHP userland. Version 1.3 has introduced a cache that remembers (when possible) the location of these very dynamic functions and methods and reuse those locations in subsequent calls to the same method/function in order to improve performance.

**Global constants**
Some simple and constant values such as: null, false, true, 1, 0 and others, are often used by Phalcon throughout its execution cycle. Previously, these values were (in some cases) allocated or duplicated unnecessarily. Phalcon 1.3 just made one allocation per request for these values and then they are shared everywhere where they are used reducing overall memory usage.

**Memory Management**
A global memory tracker is used by Phalcon to track every segment of memory allocated by the framework in order to accordingly release and free that memory when required. Earlier versions of Phalcon needed to request additional memory to track those memory segment. Phalcon 1.3 does not need to do this in most execution cycles, thus improving performance.

**Internal Properties**
Many of the properties previously implemented classes were Phalcon PHP userland properties. Now many of them have been rewritten to take advantage of internal properties that have a much lower overhead when reading and writing. For example, Phalcon does not need to check whether the visibility of these properties is public, protected or private, the framework knows exactly whether they can be read or updated.

**Hidden Symbols**
Most of the symbols and names of internal functions and structures are not exported publicly anymore allowing the compiler to perform more aggressive optimizations by knowing in advance the address of functions and knowing that those will not be overridden externally.

### Acknowledgments

Big kudos to main contributors on this version: [Vladimir Kolesnikov](https://github.com/sjinks), [Dreamszhu](https://github.com/dreamsxin), [Piotr Gasiorowski](https://github.com/WooDzu) and all the army of developers behind this project that make Phalcon possible:

* [phalcon](https://github.com/phalcon)
* [andresgutierrez](https://github.com/andresgutierrez)
* [niden](https://github.com/niden)
* [skinks](https://github.com/sjinks)
* [xboston](https://github.com/xboston)
* [ovr](https://github.com/ovr)
* [carvajaldiazeduar](https://github.com/carvajaldiazeduar)
* [kenjikobe](https://github.com/kenjikobe)
* [dreamsxin](https://github.com/dreamsxin)
* [JimmDiGrizli](https://github.com/JimmDiGrizli)
* [racklin](https://github.com/racklin)
* [nkt](https://github.com/nkt)
* [endeveit](https://github.com/endeveit)
* [marciopaiva](https://github.com/marciopaiva)
* [netstu](https://github.com/netstu)
* [Cinderella-Man](https://github.com/Cinderella-Man)
* [mobli](https://github.com/mobli)
* [jerejones](https://github.com/jerejones)
* [inouet](https://github.com/inouet)
* SneakyBobito
* [tmihalik](https://github.com/tmihalik)
* [Chameleon-m](https://github.com/Chameleon-m)
* [wenchen](https://github.com/wenchen)
* g3dut1s
* [richmulhern](https://github.com/richmulhern)
* [relort](https://github.com/relort)
* [thecodeassassin](https://github.com/thecodeassassin)
* [lantian](https://github.com/lantian)
* [golovanov](https://github.com/golovanov)
* [theDisco](https://github.com/theDisco)
* [odiel](https://github.com/odiel)
* [hdogan](https://github.com/hdogan)
* [nexik](https://github.com/nexik)
* [quasipickle](https://github.com/quasipickle)
* [dario1985](https://github.com/dario1985)
* [vguardiola](https://github.com/vguardiola)
* [sescobb27](https://github.com/sescobb27)
* [kuzmichus](https://github.com/kuzmichus)
* [unisys12](https://github.com/unisys12)
* [Theader](https://github.com/Theader)
* [sirian](https://github.com/sirian)
* [WooDzu](https://github.com/WooDzu)
* [ilyk](https://github.com/ilyk)
* [RodrigoEmygdio](https://github.com/RodrigoEmygdio)
* [obayesshelton](https://github.com/obayesshelton)
* [nazwa](https://github.com/nazwa)
* [ricejasonf](https://github.com/ricejasonf)
* [maxgalbu](https://github.com/maxgalbu)
* [kjdev](https://github.com/kjdev)
* [chiefGui](https://github.com/chiefGui)
* [tugrul](https://github.com/tugrul)
* [n0nag0n](https://github.com/n0nag0n)
* [moderndeveloperllc](https://github.com/moderndeveloperllc)
* [ogarbe](https://github.com/ogarbe)
* [aquilax](https://github.com/aquilax)
* [netkiller](https://github.com/netkiller)
* [dedalozzo](https://github.com/dedalozzo)
* [brikou](https://github.com/brikou)
* [alantonilopez](https://github.com/alantonilopez)
* [Red54](https://github.com/Red54)
* [dyster](https://github.com/dyster)
* [niterain](https://github.com/niterain)
* [tapankumar](https://github.com/tapankumar)
* [guweigang](https://github.com/guweigang)
* [PyYoshi](https://github.com/PyYoshi)
* [ianbytchek](https://github.com/ianbytchek)
* [nini](https://github.com/nini)
* charnad
* [AlexDRiVER](https://github.com/AlexDRiVER)
* [fabfuel](https://github.com/fabfuel)
* [bicouy0](https://github.com/bicouy0)
* [jymboche](https://github.com/jymboche)
* [klaussilveira](https://github.com/klaussilveira)
* [tiraeth](https://github.com/tiraeth)
* [oikyn](https://github.com/anggiaj)
* [anggiaj](https://github.com/anggiaj)
* [mibamur](https://github.com/mibamur)
* [marshalys](https://github.com/marshalys)
* [eristoddle](https://github.com/eristoddle)
* [romcart](https://github.com/romcart)
* [Xrymz](https://github.com/Xrymz)
* [kbsali](https://github.com/kbsali)
* bohdan4ik
* [suxxes](https://github.com/suxxes)
* [w5m](https://github.com/w5m)
* [yvmarques](https://github.com/yvmarques)
* [oleg578](https://github.com/oleg578)
* [homburg](https://github.com/homburg)
* [SamHennessy](https://github.com/SamHennessy)
* [romanoaugusto88](https://github.com/romanoaugusto88)
* [mattpavelle](https://github.com/mattpavelle)
* [omissis](https://github.com/omissis)
* [kolypto](https://github.com/kolypto)
* jdfreeman
* [11mariom](https://github.com/11mariom)

### Conclusion

We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on [Phosphorum](https://forum.phalcon.io/).

Enjoy and thanks for using Phalcon!


<3 Phalcon Team
