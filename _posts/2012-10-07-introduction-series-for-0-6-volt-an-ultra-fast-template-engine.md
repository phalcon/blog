---
layout: post
title: "Introduction series for 0.6: Volt: An ultra-fast template engine for Phalcon"
tags: [php, phalcon, volt, template engine, html, design, "0.6", "0.x"]
---

![image](/assets/files/2012-10-07-volt.jpg)

Following the major refactoring in 0.5.0, we are going to be posting several blog posts introducing the changes in the upcoming version of Phalcon, 0.6.0.

One of the most important component introduced in the 0.6.0 series is Volt, a completely new template engine, written in C, ready to be used in PHP applications.

Volt is enhancing the view layer with a simple and user friendly syntax. Volt is inspired on [Jinja](http://jinja.pocoo.org/), originally created by [Armin Ronacher](https://github.com/vito/chyrp/wiki/Twig-Reference). Therefore many developers will be in familiar ground using the same syntax they have been using with other similar template engines. Volt's syntax and features have been enhanced with more elements and of course with the performance that developers have been accustomed to while working with Phalcon.

The following example shows its basic usage:

```php
{% raw %}
{# app/views/products/show.volt #}
{% for product in products %}
  * Name: {{ product.name|e }}
  {% if product.status == "Active" %}
       Price: {{ product.price + product.taxes/100 }}
  {% endif  %}
{% endfor  %}
{% endraw %}
```

Volt views are compiled to pure PHP code, so basically they save the effort of writing PHP code manually. For the above example, the following PHP code is generated:

```php
<?php foreach ($products as $product) { ?>
  * Name: <?php echo $this->escaper->escapeHtml($product->name); ?>
  <?php if ($product->status == 'Active') { ?>
       Price: <?php echo $product->price + $product->taxes / 0; ?>
  <?php } ?>
<?php } ?>
```

As an added value, Volt is integrated with [Phalcon\\Tag](https://docs.phalconphp.com/en/latest/reference/tags.html), making the creation of views in Phalcon applications much easier than before:

```php
{% raw %}
{{ form('products/save', 'method': 'post') }}

    <label>Name</label>
    {{ text_field("name", "size": 32) }}

    <label>Type</label>
    {{ select("type", productTypes, 'using': ['id', 'name']) }}

</form>
{% endraw %}
```

Producing:

```php
<?php echo Phalcon\Tag::form(['products/save', 'method' => 'post']); ?>

    <label>Name</label>
    <?php echo Phalcon\Tag::textField(['name', 'size' => 32]); ?>

    <label>Type</label>
    <?php echo Phalcon\Tag::select(['type', $productTypes, 'using' => array('id', 'name')]); ?>

</form>
```

A core design feature in Volt is security, therefore Volt offers a limited set of functions that can be used in the templates, while aiding in escaping potentially malicious input by the users.

The first iteration of the Volt templating engine is introduced in 0.6.0, which covers a basic functional basis. As time passes by, more and more features will be added.You can try Volt installing Phalcon from the 0.6.0 branch on [Github](https://github.com/phalcon/cphalcon).

A preliminary documentation is available [here](https://docs.phalconphp.com/en/0.6.0/reference/volt.html)

Stay tuned, there's more news on the upcoming version of Phalcon!


<3 The Phalcon Team
