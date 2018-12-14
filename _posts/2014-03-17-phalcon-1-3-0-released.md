---
layout: post
title: "Phalcon 1.3.0 Released"
tags: [php, phalcon, 1.3, release, 1.x]
---

Right after our [2 year celebration](https://blog.phalconphp.com/post/3acec916ae9c026594fe0562ef3013be2cf47247) and several months of development, more than 1,500 commits and a lot of improvements and fixes, **Phalcon 1.3 is finally released**!

Many important internal aspects of Phalcon have been rewritten and enhanced without breaking compatibility with older versions.

Phalcon 1.3 consolidates the research, testing and implementation of new ways to improve the performance in the Phalcon kernel, which is also the heart of the extensions created by [Zephir](http://blog.zephir-lang.com/) in Phalcon 2.0.

<!--more-->
The [CHANGELOG](https://github.com/phalcon/cphalcon/blob/master/CHANGELOG) for this version is huge. Some key improvements are:

### Disabling Literals

Literals can be disabled in [PHQL](https://docs.phalconphp.com/en/latest/reference/phql.html), this means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. In Phalcon 1.3 this option has been improved and now works with most query builders, finders and PHQL generators.

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

Phalcon\\Logger now implements the [PSR-3](http://www.php-fig.org/psr/psr-3/) standard for loggers which allows this component interpolate with other frameworks that also implement this standard.

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

[![phalcon](https://avatars.githubusercontent.com/u/1221505?s=48)](https://github.com/phalcon "phalcon")
[![andresgutierrez](https://avatars.githubusercontent.com/u/213590?s=48)](https://github.com/andresgutierrez "andresgutierrez")
[![niden](https://avatars.githubusercontent.com/u/1073784?s=48)](https://github.com/niden "niden")
[![skinks](https://1.gravatar.com/avatar/f267e1bd107e7a9a8ed60b40493d69b6?d=https%3A%2F%2Fidenticons.github.com%2F687df531e2219852e1c9576ff9010958.png&r=x&s=48)](https://github.com/sjinks "sjinks")
[![xboston](https://avatars.githubusercontent.com/u/201306?s=48)](https://github.com/xboston "xboston")
[![ovr](https://avatars.githubusercontent.com/u/572096?s=48)](https://github.com/ovr "ovr")
[![carvajaldiazeduar](https://avatars.githubusercontent.com/u/1197509?s=48)](https://github.com/carvajaldiazeduar "carvajaldiazeduar")
[![kenjikobe](https://avatars.githubusercontent.com/u/2137523?s=48)](https://github.com/kenjikobe "kenjikobe")
[![dreamsxin](https://avatars.githubusercontent.com/u/314295?s=48)](https://github.com/dreamsxin "dreamsxin")
[![JimmDiGrizli](https://avatars.githubusercontent.com/u/5743712?s=48)](https://github.com/JimmDiGrizli "JimmDiGrizli")
[![racklin](https://avatars.githubusercontent.com/u/21985?s=48)](https://github.com/racklin "racklin")
[![nkt](https://avatars.githubusercontent.com/u/3505878?s=48)](https://github.com/nkt "nkt")
[![endeveit](https://avatars.githubusercontent.com/u/197781?s=48)](https://github.com/endeveit "endeveit")
[![marciopaiva](https://avatars.githubusercontent.com/u/1004306?s=48)](https://github.com/marciopaiva "marciopaiva")
[![digitronac](https://avatars.githubusercontent.com/u/4385803?s=48)](https://github.com/digitronac "digitronac")
<a href="https://github.com/netstu"><img src="https://avatars.githubusercontent.com/u/1104194?" title="netsu" style="height: 48px; width: 48px;" /></a>
[![Cinderella-Man](https://avatars.githubusercontent.com/u/1019893?s=48)](https://github.com/Cinderella-Man "Cinderella-Man")
<a href="https://github.com/mobli"><img src="https://avatars.githubusercontent.com/u/1165083?" title="mobli" style="height: 48px; width: 48px;" /></a>
[![jerejones](https://avatars.githubusercontent.com/u/1229385?s=48)](https://github.com/jerejones "jerejones")
[![inouet](https://avatars.githubusercontent.com/u/2936687?s=48)](https://github.com/inouet "inouet")
[![SneakyBobito](https://avatars.githubusercontent.com/u/3215399?s=48)](https://github.com/SneakyBobito "SneakyBobito")
[![tmihalik](https://avatars.githubusercontent.com/u/440762?s=48)](https://github.com/tmihalik "tmihalik")
[![Chameleon-m](https://avatars.githubusercontent.com/u/3199615?s=48)](https://github.com/Chameleon-m "Chameleon-m")
<a href="https://github.com/wenchen"><img src="https://avatars.githubusercontent.com/u/959457?" title="wenchen" style="height: 48px; width: 48px;" /></a>
[![g3dut1s](https://avatars.githubusercontent.com/u/1171173?s=48)](https://github.com/g3dut1s "g3dut1s")
[![richmulhern](https://avatars.githubusercontent.com/u/1664673?s=48)](https://github.com/richmulhern "richmulhern")
[![relort](https://avatars.githubusercontent.com/u/200741?s=48)](https://github.com/relort "relort")
[![thecodeassassin](https://avatars.githubusercontent.com/u/939775?s=48)](https://github.com/thecodeassassin "thecodeassassin")
[![lantian](https://avatars.githubusercontent.com/u/535545?s=48)](https://github.com/lantian "lantian")
[![golovanov](https://avatars.githubusercontent.com/u/363810?s=48)](https://github.com/golovanov "golovanov")
[![theDisco](https://avatars.githubusercontent.com/u/199368?s=48)](https://github.com/theDisco "theDisco")
<a href="https://github.com/odiel"><img src="https://avatars.githubusercontent.com/u/1323583?" title="odiel" style="height: 48px; width: 48px;" /></a>
[![hdogan](https://avatars.githubusercontent.com/u/777820?s=48)](https://github.com/hdogan "hdogan")
[![nexik](https://avatars.githubusercontent.com/u/70645?s=48)](https://github.com/nexik "nexik")
[![quasipickle](https://avatars.githubusercontent.com/u/1377105?s=48)](https://github.com/quasipickle "quasipickle")
[![dario1985](https://avatars.githubusercontent.com/u/495006?s=48)](https://github.com/dario1985 "dario1985")
[![vguardiola](https://avatars.githubusercontent.com/u/572270?s=48)](https://github.com/vguardiola "vguardiola")
[![sescobb27](https://avatars.githubusercontent.com/u/1157892?s=48)](https://github.com/sescobb27 "sescobb27")
[![kuzmichus](https://avatars.githubusercontent.com/u/430747?s=48)](https://github.com/kuzmichus "kuzmichus")
[![unisys12](https://avatars.githubusercontent.com/u/2092931?s=48)](https://github.com/unisys12 "unisys12")
[![Theader](https://avatars.githubusercontent.com/u/3450760?s=48)](https://github.com/Theader "Theader")
[![sirian](https://avatars.githubusercontent.com/u/897643?s=48)](https://github.com/sirian "sirian")
[![WooDzu](https://avatars.githubusercontent.com/u/2228236?s=48)](https://github.com/WooDzu "WooDzu")
[![ilyk](https://avatars.githubusercontent.com/u/797411?s=48)](https://github.com/ilyk "ilyk")
[![RodrigoEmygdio](https://avatars.githubusercontent.com/u/231096?s=48)](https://github.com/RodrigoEmygdio "RodrigoEmygdio")
[![obayesshelton](https://avatars.githubusercontent.com/u/628720?s=48)](https://github.com/obayesshelton "obayesshelton")
[![nazwa](https://avatars.githubusercontent.com/u/4353913?s=48)](https://github.com/nazwa "nazwa")
[![ricejasonf](https://avatars.githubusercontent.com/u/2257044?s=48)](https://github.com/ricejasonf "ricejasonf")
[![maxgalbu](https://avatars.githubusercontent.com/u/1782571?s=48)](https://github.com/maxgalbu "maxgalbu")
[![kjdev](https://avatars.githubusercontent.com/u/465132?s=48)](https://github.com/kjdev "kjdev")
[![chiefGui](https://avatars.githubusercontent.com/u/1330257?s=48)](https://github.com/chiefGui "chiefGui")
[![tugrul](https://avatars.githubusercontent.com/u/163442?s=48)](https://github.com/tugrul "tugrul")
[![n0nag0n](https://avatars.githubusercontent.com/u/2322095?s=48)](https://github.com/n0nag0n "n0nag0n")
[![moderndeveloperllc](https://avatars.githubusercontent.com/u/1920405?s=48)](https://github.com/moderndeveloperllc "moderndeveloperllc")
[![ogarbe](https://avatars.githubusercontent.com/u/1395245?s=48)](https://github.com/ogarbe "ogarbe")
[![aquilax](https://avatars.githubusercontent.com/u/328067?s=48)](https://github.com/aquilax "aquilax")
[![netkiller](https://avatars.githubusercontent.com/u/245179?s=48)](https://github.com/netkiller "netkiller")
[![dedalozzo](https://avatars.githubusercontent.com/u/311248?s=48)](https://github.com/dedalozzo "dedalozzo")
[![brikou](https://avatars.githubusercontent.com/u/383212?s=48)](https://github.com/brikou "brikou")
[![alantonilopez](https://avatars.githubusercontent.com/u/2019783?s=48)](https://github.com/alantonilopez "alantonilopez")
[![Red54](https://avatars.githubusercontent.com/u/2240638?s=48)](https://github.com/Red54 "Red54")
[![dyster](https://avatars.githubusercontent.com/u/828219?s=48)](https://github.com/dyster "dyster")
[![niterain](https://avatars.githubusercontent.com/u/16836?s=48)](https://github.com/niterain "niterain")
[![tapankumar](https://avatars.githubusercontent.com/u/734522?s=48)](https://github.com/tapankumar "tapankumar")
[![guweigang](https://avatars.githubusercontent.com/u/178500?s=48)](https://github.com/guweigang "guweigang")
[![PyYoshi](https://avatars.githubusercontent.com/u/467255?s=48)](https://github.com/PyYoshi "PyYoshi")
[![ianbytchek](https://avatars.githubusercontent.com/u/1086845?s=48)](https://github.com/ianbytchek "ianbytchek")
[![nini](https://avatars.githubusercontent.com/u/184490?s=48)](https://github.com/nini "nini")
[![charnad](https://avatars.githubusercontent.com/u/458014?s=48)](https://github.com/charnad "charnad")
[![AlexDRiVER](https://avatars.githubusercontent.com/u/837355?s=48)](https://github.com/AlexDRiVER "AlexDRiVER")
[![fabfuel](https://avatars.githubusercontent.com/u/1582291?s=48)](https://github.com/fabfuel "fabfuel")
[![bicouy0](https://avatars.githubusercontent.com/u/174636?s=48)](https://github.com/bicouy0 "bicouy0")
[![jymboche](https://avatars.githubusercontent.com/u/241406?s=48)](https://github.com/jymboche "jymboche")
[![klaussilveira](https://avatars.githubusercontent.com/u/467729?s=48)](https://github.com/klaussilveira "klaussilveira")
[![tiraeth](https://avatars.githubusercontent.com/u/52669?s=48)](https://github.com/tiraeth "tiraeth")
<a href="https://github.com/oikyn"><img src="https://avatars.githubusercontent.com/u/1610541?" title="oikyn" style="height: 48px; width: 48px;" /></a>
[![anggiaj](https://avatars.githubusercontent.com/u/367079?s=48)](https://github.com/anggiaj "anggiaj")
[![mibamur](https://avatars.githubusercontent.com/u/2369894?s=48)](https://github.com/mibamur "mibamur")
[![marshalys](https://avatars.githubusercontent.com/u/344530?s=48)](https://github.com/marshalys "marshalys")
[![eristoddle](https://avatars.githubusercontent.com/u/1260650?s=48)](https://github.com/eristoddle "eristoddle")
[![romcart](https://avatars.githubusercontent.com/u/225970?s=48)](https://github.com/romcart "romcart")
<a href="https://github.com/Xrymz"><img src="https://avatars.githubusercontent.com/u/309405?" title="Xrymz" style="height: 48px; width: 48px;" /></a>
[![kbsali](https://avatars.githubusercontent.com/u/53676?s=48)](https://github.com/kbsali "kbsali")
<a href="https://github.com/bohdan4ik"><img src="https://avatars.githubusercontent.com/u/533048?" title="bohdan4ik" style="height: 48px; width: 48px;" /></a>
[![suxxes](https://avatars.githubusercontent.com/u/141334?s=48)](https://github.com/suxxes "suxxes")
[![w5m](https://avatars.githubusercontent.com/u/3670388?s=48)](https://github.com/w5m "w5m")
[![yvmarques](https://avatars.githubusercontent.com/u/176204?s=48)](https://github.com/yvmarques "yvmarques")
<a href="https://github.com/oleg578"><img src="https://avatars.githubusercontent.com/u/2156733?" title="oleg578" style="height: 48px; width: 48px;" /></a>
[![homburg](https://avatars.githubusercontent.com/u/235886?s=48)](https://github.com/homburg "homburg")
[![SamHennessy](https://avatars.githubusercontent.com/u/119867?s=48)](https://github.com/SamHennessy "SamHennessy")
[![romanoaugusto88](https://avatars.githubusercontent.com/u/996810?s=48)](https://github.com/romanoaugusto88 "romanoaugusto88")
[![mattpavelle](https://avatars.githubusercontent.com/u/867516?s=48)](https://github.com/mattpavelle "mattpavelle")
[![omissis](https://avatars.githubusercontent.com/u/197604?s=48)](https://github.com/omissis "omissis")
[![kolypto](https://avatars.githubusercontent.com/u/2234216?s=48)](https://github.com/kolypto "kolypto")
[![jdfreeman](https://avatars.githubusercontent.com/u/2651238?s=48)](https://github.com/jdfreeman "jdfreeman")
[![11mariom](https://avatars.githubusercontent.com/u/552506?s=48)](https://github.com/11mariom "11mariom")

### Conclusion

We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on [Phosphorum](https://forum.phalconphp.com/).

Enjoy and thanks for using Phalcon!


<3 Phalcon Team
