---
layout: post
title: 'PHP 8 goodies'
date: 2020-02-04T20:39:00.000Z
tags:
  - phalcon
  - php
  - php8
image: /assets/files/20200204-php-8.png
---
2020 is the year when PHP will change versions. The latest and greatest will no longer be 7 but 8.

<!--more-->

It is sad (kinda) since we will no longer be using a prime number as the latest version of PHP, which has additional significance as a number (here I am showing my nerdiness). There are 7 oceans, 7 continents, 7 layers of skin (2 outer and 5 inner), ocean waves roll in sevens, the rainbow has 7 colors, sound has 7 notes, etc. etc. Instead, we will be using 8, infinity rotated by 90 degrees.

PHP 8 is expected to be released at the end of 2020. For those that have been following the RFC process as well as the project itself, there are some really exciting new goodies coming with the new version!

PHP 7 has been a great change towards a direction that could _separate the men from the boys_. The strict types was the best thing that could happen for PHP, since not only it helps us write better and more robust applications, it forces us - as developers - to evolve and grow, by thoroughly thinking our code and how the data flow needs to be performed in our applications. PHP 8 builds on that and expands with new features.

## Backwards compatibility
It will not be as bad as one might think. Usually PHP is very thorough in documenting the breaking changes and as such, upgrading will not be that difficult. There is always the [upgrading document](https://github.com/php/php-src/blob/master/UPGRADING#L20) that can serve as a good guide for that task. I am sure that [PHPStorm](https://phpstorm.jetbrains.com) will also offer upgrade tips and hints (when it starts supporting PHP 8) allowing for a smooter upgrade.

## New features
### JIT
A new JIT (Just In Time) compiler is introduced. It is a promising feature that _should_ increase performance. The RFC was initially opened by [Dmitry Stogov](https://wiki.php.net/rfc/jit) and it was approved for PHP 8, so we will get it. Although PHP is an interpreted language and not a compiled one, as C for instance, I personally do not see a good use for this feature. It is early days however, and I am sure that the benefits will be realized after its release. It is a promising addition to the language and I am wondering if it can be used in conjunction with [Phalcon](https://phalcon.io) or even better [Zephir](https://zephir-lang.com) to generate extensions on the fly. 

Years ago Andres Gutierrez was working on a JIT compiler for Zephir, allowing Zephir code to be compiled on the fly and printing results back to the user, without having to compile the whole extension. The video can be found [here](https://player.vimeo.com/video/91588214). It showed a lot of promise, for at least simple extensions. Compiling Phalcon for instance would probably not be something I would want to do because it is a big extension. However, the project never took off and sadly Andres decided not to pursue it so I am only left with the memories...

### Union types
For those that have used [Zephir](https://zephir-lang.com), you have seen union types support there. For instance we can have something like this:

```zephir
public function generate() -> bool | array
```
PHP has been lacking this feature. The only thing we can do right now with PHP 7 is to define a type and/or `null` like so:

```php
public function generate(): ?array
```
PHP 8  will allow [union types](https://wiki.php.net/rfc/union_types_v2), so I could easily write something like this:
```php
public function generate(): bool | array
public function populate(Item|null $item): bool
```
Of course the `?` notation (signifying `null`) will still be supported and in the above example we can use `?Item` as the type of the parameter of `populate`

### `::class` on objects
We can now use `Invoices::class` and get the name of the class. However for objects, we had to use the alternative `get_class()` method. It did seem a bit weird but it worked just fine. PHP 8 brings the `::class` for [objects](https://wiki.php.net/rfc/class_name_literal_on_object) as well. It offers the same functionality as `get_class()` but makes things a bit nicer (at least for readability).

```php
$invoice = new Invoices();

echo $invoice::class; // Invoices
```

### DateTime objects from interface
For those that have not been using [Carbon](https://carbon.nesbot.com/docs/) and instead opted to use the `DateTime` 
object, you would have noticed that it is easy to create a `DateTime` object from a `DateTimeImmutable` object using:

```php
$dateTime = DateTime::createFromImmutable($immutable);
```
The reverse was difficult to achieve. PHP 8 to the rescue!. We now have an easy way to mutate or convert 
`DateTime` objects to `DateTimeImmutable` ones and the reverse by using the interface itself.

```php
DateTime::createFromInterface(DateTimeInterface $dateTime);
DateTimeImmutable::createFromInterface(DateTimeInterface $dateTime);
```

### Weak maps
PHP 7.4 introduced [weakrefs](https://wiki.php.net/rfc/weakrefs). 

> Weak References allow the programmer to retain a reference to an object which does not prevent the object from being destroyed; They are useful for implementing cache like structures.
{: .alert .alert-info }

[WeakMaps](https://wiki.php.net/rfc/weak_maps) expand on that:

> Weak maps allow creating a map from objects to arbitrary values (similar to SplObjectStorage) without preventing the objects that are used as keys from being garbage collected. If an object key is garbage collected, it will simply be removed from the map.
{: .alert .alert-info }

I can see numerous applications with this. ORM caching comes to mind, which would hugely benefit from this feature. 
Implementing weak references and maps cache for the referenced entity objects that an ORM requires, would ensure that 
PHP garbage collects those entity objects when nothing references them anymore, and thus freeing up resources faster 
for more performance. In the case of the ORM, we will be able to manage a lot more data within one request. Add to that 
the use of `yield` and `Generators` and the maximum results returned on the same hardware will increase by a lot!

The following example gives you an idea:

```php
class Invoices
{
    private WeakMap $cache;
 
    public function generate(Customer $customer): Resultset
    {
        return $this->cache[$customer] ??= $this->generateCustomerInvoices($customer);
    }
}
```

### Static return type
For those that have worked with me in the past, I have not hidden my dislike for static classes, methods and properties. They do have a use for a very limited amount of cases (in my view of course) but sadly they are completely misused and one ends up with Pandora's box of static classes and methods, objects that you have no real control over when they will be destroyed or not. Scope issues definitely are a consideration once developers go down that path. As such, (again personally) I avoid them like the plague.

We can return `self` from any method in order to introduce chaining in our methods. However, we will now be able to [return `static`](https://wiki.php.net/rfc/static_return_type), signifying a new static object being returned. This is a great step forward (for those that will use this) to make interfaces much tighter while still keeping the dynamic typing nature of PHP.

```php
class Invoices
{
    public function generate(): static
    {
        return new static();
    }
}
```

## Conclusion
Although the above is not an extensive list, it highlights the features that stuck out for me. PHP 8 will have a lot more features and honestly I cannot wait to see the final feature list. 

More on PHP 8 in a future post.

_Cross posted from [niden.net](https://niden.net/post/php-8-goodies/)_

<hr>

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.link/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://brighteon.com/bitchute)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team
