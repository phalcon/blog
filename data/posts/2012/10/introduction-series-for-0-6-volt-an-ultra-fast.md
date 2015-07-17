<!--
slug: introduction-series-for-0-6-volt-an-ultra-fast
date: Sun Oct 07 2012 16:50:00 GMT-0400 (EDT)
tags: php, volt, design, html
title: Introduction series for 0.6: Volt: An ultra-fast template engine for Phalcon
id: 33109442637
link: http://blog.phalconphp.com/post/33109442637/introduction-series-for-0-6-volt-an-ultra-fast
raw: {"blog_name":"phalconphp","id":33109442637,"post_url":"http://blog.phalconphp.com/post/33109442637/introduction-series-for-0-6-volt-an-ultra-fast","slug":"introduction-series-for-0-6-volt-an-ultra-fast","type":"text","date":"2012-10-07 20:50:00 GMT","timestamp":1349643000,"state":"published","format":"html","reblog_key":"I8Z8Ojjd","tags":["php","volt","design","html"],"short_url":"http://tmblr.co/Z6PumvUrUW1D","highlighted":[],"note_count":1,"source_url":"https://github.com/phalcon/cphalcon","source_title":"github.com","title":"Introduction series for 0.6: Volt: An ultra-fast template engine for Phalcon","body":"<div><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/volt.jpg\" width=\"530\"/></div>\n<p>Following the major refactoring in 0.5.0, we are going to be posting several blog posts introducing the changes in the upcoming version of Phalcon, 0.6.0.</p>\n<p>One of the most important component introduced in the 0.6.0 series is Volt, a completely new template engine, written in C, ready to be used in PHP applications.</p>\n<p>Volt is enhancing the view layer with a simple and user friendly syntax. Volt is inspired on <a href=\"http://jinja.pocoo.org/\">Jinja</a>, originally created by <a href=\"https://github.com/vito/chyrp/wiki/Twig-Reference\">Armin Ronacher</a>. Therefore many developers will be in familiar ground using the same syntax they have been using with other similar template engines. Volt&rsquo;s syntax and features have been enhanced with more elements and of course with the performance that developers have been accustomed to while working with Phalcon.</p>\n<p>The following example shows its basic usage:</p>\n<pre class=\"sh_php\">{# app/views/products/show.volt #}\n{% for product in products %}\n  * Name: {{ product.name|e }}\n  {% if product.status == \"Active\" %}\n       Price: {{ product.price + product.taxes/100 }}\n  {% endif  %}\n{% endfor  %}\n</pre>\n<p>Volt views are compiled to pure PHP code, so basically they save the effort of writing PHP code manually. For the above example, the following PHP code is generated:</p>\n<pre class=\"sh_php\">&lt;?php foreach ($products as $product) { ?&gt;\n  * Name: &lt;?php echo $this-&gt;escaper-&gt;escapeHtml($product-&gt;name); ?&gt;\n  &lt;?php if ($product-&gt;status == 'Active') { ?&gt;\n       Price: &lt;?php echo $product-&gt;price + $product-&gt;taxes / 0; ?&gt;\n  &lt;?php } ?&gt;\n&lt;?php } ?&gt;\n</pre>\n<p>As an added value, Volt is integrated with <a href=\"http://docs.phalconphp.com/en/latest/reference/tags.html\">Phalcon\\Tag</a>, making the creation of views in Phalcon applications much easier than before:</p>\n<pre class=\"sh_php\">{{ form('products/save', 'method': 'post') }}\n\n    &lt;label&gt;Name&lt;/label&gt;\n    {{ text_field(\"name\", \"size\": 32) }}\n\n    &lt;label&gt;Type&lt;/label&gt;\n    {{ select(\"type\", productTypes, 'using': ['id', 'name']) }}\n\n&lt;/form&gt;\n</pre>\n<p>Producing:</p>\n<pre class=\"sh_php\">&lt;?php echo Phalcon\\Tag::form(array('products/save', 'method' =&gt; 'post')); ?&gt;\n\n    &lt;label&gt;Name&lt;/label&gt;\n    &lt;?php echo Phalcon\\Tag::textField(array('name', 'size' =&gt; 32)); ?&gt;\n\n    &lt;label&gt;Type&lt;/label&gt;\n    &lt;?php echo Phalcon\\Tag::select(array('type', $productTypes, 'using' =&gt; array('id', 'name'))); ?&gt;\n\n&lt;/form&gt;\n</pre>\n<p>A core design feature in Volt is security, therefore Volt offers a limited set of functions that can be used in the templates, while aiding in escaping potentially malicious input by the users.</p>\n<p>The first iteration of the Volt templating engine is introduced in 0.6.0, which covers a basic functional basis. As time passes by, more and more features will be added.You can try Volt installing Phalcon from the 0.6.0 branch on <a href=\"https://github.com/phalcon/cphalcon\">Github</a>.</p>\n<p><span class=\"short_text\" id=\"result_box\"><span class=\"hps\">A</span> <span class=\"hps\">preliminary documentation</span> <span class=\"hps\">is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">here</a></span><span><br/></span></span></p>\n<p>Stay tuned, there&rsquo;s more news on the upcoming version of Phalcon!</p>","reblog":{"tree_html":"","comment":"<div><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/volt.jpg\" width=\"530\"></div>\n<p>Following the major refactoring in 0.5.0, we are going to be posting several blog posts introducing the changes in the upcoming version of Phalcon, 0.6.0.</p>\n<p>One of the most important component introduced in the 0.6.0 series is Volt, a completely new template engine, written in C, ready to be used in PHP applications.</p>\n<p>Volt is enhancing the view layer with a simple and user friendly syntax. Volt is inspired on <a href=\"http://jinja.pocoo.org/\">Jinja</a>, originally created by <a href=\"https://github.com/vito/chyrp/wiki/Twig-Reference\">Armin Ronacher</a>. Therefore many developers will be in familiar ground using the same syntax they have been using with other similar template engines. Volt&rsquo;s syntax and features have been enhanced with more elements and of course with the performance that developers have been accustomed to while working with Phalcon.</p>\n<p>The following example shows its basic usage:</p>\n<pre class=\"sh_php\">{# app/views/products/show.volt #}\n{% for product in products %}\n  * Name: {{ product.name|e }}\n  {% if product.status == \"Active\" %}\n       Price: {{ product.price + product.taxes/100 }}\n  {% endif  %}\n{% endfor  %}\n</pre>\n<p>Volt views are compiled to pure PHP code, so basically they save the effort of writing PHP code manually. For the above example, the following PHP code is generated:</p>\n<pre class=\"sh_php\">&lt;?php foreach ($products as $product) { ?&gt;\n  * Name: &lt;?php echo $this-&gt;escaper-&gt;escapeHtml($product-&gt;name); ?&gt;\n  &lt;?php if ($product-&gt;status == 'Active') { ?&gt;\n       Price: &lt;?php echo $product-&gt;price + $product-&gt;taxes / 0; ?&gt;\n  &lt;?php } ?&gt;\n&lt;?php } ?&gt;\n</pre>\n<p>As an added value, Volt is integrated with <a href=\"http://docs.phalconphp.com/en/latest/reference/tags.html\">Phalcon\\Tag</a>, making the creation of views in Phalcon applications much easier than before:</p>\n<pre class=\"sh_php\">{{ form('products/save', 'method': 'post') }}\n\n    &lt;label&gt;Name&lt;/label&gt;\n    {{ text_field(\"name\", \"size\": 32) }}\n\n    &lt;label&gt;Type&lt;/label&gt;\n    {{ select(\"type\", productTypes, 'using': ['id', 'name']) }}\n\n&lt;/form&gt;\n</pre>\n<p>Producing:</p>\n<pre class=\"sh_php\">&lt;?php echo Phalcon\\Tag::form(array('products/save', 'method' =&gt; 'post')); ?&gt;\n\n    &lt;label&gt;Name&lt;/label&gt;\n    &lt;?php echo Phalcon\\Tag::textField(array('name', 'size' =&gt; 32)); ?&gt;\n\n    &lt;label&gt;Type&lt;/label&gt;\n    &lt;?php echo Phalcon\\Tag::select(array('type', $productTypes, 'using' =&gt; array('id', 'name'))); ?&gt;\n\n&lt;/form&gt;\n</pre>\n<p>A core design feature in Volt is security, therefore Volt offers a limited set of functions that can be used in the templates, while aiding in escaping potentially malicious input by the users.</p>\n<p>The first iteration of the Volt templating engine is introduced in 0.6.0, which covers a basic functional basis. As time passes by, more and more features will be added.You can try Volt installing Phalcon from the 0.6.0 branch on <a href=\"https://github.com/phalcon/cphalcon\">Github</a>.</p>\n<p><span class=\"short_text\" id=\"result_box\"><span class=\"hps\">A</span> <span class=\"hps\">preliminary documentation</span> <span class=\"hps\">is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">here</a></span><span><br></span></span></p>\n<p>Stay tuned, there&rsquo;s more news on the upcoming version of Phalcon!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"33109442637"},"content":"<div><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/volt.jpg\" width=\"530\"></div>\n<p>Following the major refactoring in 0.5.0, we are going to be posting several blog posts introducing the changes in the upcoming version of Phalcon, 0.6.0.</p>\n<p>One of the most important component introduced in the 0.6.0 series is Volt, a completely new template engine, written in C, ready to be used in PHP applications.</p>\n<p>Volt is enhancing the view layer with a simple and user friendly syntax. Volt is inspired on <a href=\"http://jinja.pocoo.org/\">Jinja</a>, originally created by <a href=\"https://github.com/vito/chyrp/wiki/Twig-Reference\">Armin Ronacher</a>. Therefore many developers will be in familiar ground using the same syntax they have been using with other similar template engines. Volt's syntax and features have been enhanced with more elements and of course with the performance that developers have been accustomed to while working with Phalcon.</p>\n<p>The following example shows its basic usage:</p>\n<pre class=\"sh_php\">{# app/views/products/show.volt #}\n{% for product in products %}\n  * Name: {{ product.name|e }}\n  {% if product.status == \"Active\" %}\n       Price: {{ product.price + product.taxes/100 }}\n  {% endif  %}\n{% endfor  %}\n</pre>\n<p>Volt views are compiled to pure PHP code, so basically they save the effort of writing PHP code manually. For the above example, the following PHP code is generated:</p>\n<pre class=\"sh_php\"><?php foreach ($products as $product) { ?>\n  * Name: <?php echo $this->escaper->escapeHtml($product->name); ?>\n  <?php if ($product->status == 'Active') { ?>\n       Price: <?php echo $product->price + $product->taxes / 0; ?>\n  <?php } ?>\n<?php } ?>\n</pre>\n<p>As an added value, Volt is integrated with <a href=\"http://docs.phalconphp.com/en/latest/reference/tags.html\">Phalcon\\Tag</a>, making the creation of views in Phalcon applications much easier than before:</p>\n<pre class=\"sh_php\">{{ form('products/save', 'method': 'post') }}\n\n    <label>Name</label>\n    {{ text_field(\"name\", \"size\": 32) }}\n\n    <label>Type</label>\n    {{ select(\"type\", productTypes, 'using': ['id', 'name']) }}\n\n</form>\n</pre>\n<p>Producing:</p>\n<pre class=\"sh_php\"><?php echo Phalcon\\Tag::form(array('products/save', 'method' => 'post')); ?>\n\n    <label>Name</label>\n    <?php echo Phalcon\\Tag::textField(array('name', 'size' => 32)); ?>\n\n    <label>Type</label>\n    <?php echo Phalcon\\Tag::select(array('type', $productTypes, 'using' => array('id', 'name'))); ?>\n\n</form>\n</pre>\n<p>A core design feature in Volt is security, therefore Volt offers a limited set of functions that can be used in the templates, while aiding in escaping potentially malicious input by the users.</p>\n<p>The first iteration of the Volt templating engine is introduced in 0.6.0, which covers a basic functional basis. As time passes by, more and more features will be added.You can try Volt installing Phalcon from the 0.6.0 branch on <a href=\"https://github.com/phalcon/cphalcon\">Github</a>.</p>\n<p><span class=\"short_text\" id=\"result_box\"><span class=\"hps\">A</span> <span class=\"hps\">preliminary documentation</span> <span class=\"hps\">is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">here</a></span><span><br></span></span></p>\n<p>Stay tuned, there's more news on the upcoming version of Phalcon!</p>","content_raw":"<div><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/volt.jpg\" width=\"530\"></div>\r\n<p>Following the major refactoring in 0.5.0, we are going to be posting several blog posts introducing the changes in the upcoming version of Phalcon, 0.6.0.</p>\r\n<p>One of the most important component introduced in the 0.6.0 series is Volt, a completely new template engine, written in C, ready to be used in PHP applications.</p>\r\n<p>Volt is enhancing the view layer with a simple and user friendly syntax. Volt is inspired on <a href=\"http://jinja.pocoo.org/\">Jinja</a>, originally created by <a href=\"https://github.com/vito/chyrp/wiki/Twig-Reference\">Armin Ronacher</a>. Therefore many developers will be in familiar ground using the same syntax they have been using with other similar template engines. Volt's syntax and features have been enhanced with more elements and of course with the performance that developers have been accustomed to while working with Phalcon.</p>\r\n<p>The following example shows its basic usage:</p>\r\n<pre class=\"sh_php\">{# app/views/products/show.volt #}\r\n{% for product in products %}\r\n  * Name: {{ product.name|e }}\r\n  {% if product.status == \"Active\" %}\r\n       Price: {{ product.price + product.taxes/100 }}\r\n  {% endif  %}\r\n{% endfor  %}\r\n</pre>\r\n<p>Volt views are compiled to pure PHP code, so basically they save the effort of writing PHP code manually. For the above example, the following PHP code is generated:</p>\r\n<pre class=\"sh_php\">&lt;?php foreach ($products as $product) { ?&gt;\r\n  * Name: &lt;?php echo $this-&gt;escaper-&gt;escapeHtml($product-&gt;name); ?&gt;\r\n  &lt;?php if ($product-&gt;status == 'Active') { ?&gt;\r\n       Price: &lt;?php echo $product-&gt;price + $product-&gt;taxes / 0; ?&gt;\r\n  &lt;?php } ?&gt;\r\n&lt;?php } ?&gt;\r\n</pre>\r\n<p>As an added value, Volt is integrated with <a href=\"http://docs.phalconphp.com/en/latest/reference/tags.html\">Phalcon\\Tag</a>, making the creation of views in Phalcon applications much easier than before:</p>\r\n<pre class=\"sh_php\">{{ form('products/save', 'method': 'post') }}\r\n\r\n    &lt;label&gt;Name&lt;/label&gt;\r\n    {{ text_field(\"name\", \"size\": 32) }}\r\n\r\n    &lt;label&gt;Type&lt;/label&gt;\r\n    {{ select(\"type\", productTypes, 'using': ['id', 'name']) }}\r\n\r\n&lt;/form&gt;\r\n</pre>\r\n<p>Producing:</p>\r\n<pre class=\"sh_php\">&lt;?php echo Phalcon\\Tag::form(array('products/save', 'method' =&gt; 'post')); ?&gt;\r\n\r\n    &lt;label&gt;Name&lt;/label&gt;\r\n    &lt;?php echo Phalcon\\Tag::textField(array('name', 'size' =&gt; 32)); ?&gt;\r\n\r\n    &lt;label&gt;Type&lt;/label&gt;\r\n    &lt;?php echo Phalcon\\Tag::select(array('type', $productTypes, 'using' =&gt; array('id', 'name'))); ?&gt;\r\n\r\n&lt;/form&gt;\r\n</pre>\r\n<p>A core design feature in Volt is security, therefore Volt offers a limited set of functions that can be used in the templates, while aiding in escaping potentially malicious input by the users.</p>\r\n<p>The first iteration of the Volt templating engine is introduced in 0.6.0, which covers a basic functional basis. As time passes by, more and more features will be added.You can try Volt installing Phalcon from the 0.6.0 branch on <a href=\"https://github.com/phalcon/cphalcon\">Github</a>.</p>\r\n<p><span class=\"short_text\" id=\"result_box\"><span class=\"hps\">A</span> <span class=\"hps\">preliminary documentation</span> <span class=\"hps\">is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">here</a></span><span><br></span></span></p>\r\n<p>Stay tuned, there's more news on the upcoming version of Phalcon!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-10-07
-->


Introduction series for 0.6: Volt: An ultra-fast template engine for Phalcon
============================================================================

![image](http://static.phalconphp.com/blog/img/volt.jpg)

Following the major refactoring in 0.5.0, we are going to be posting
several blog posts introducing the changes in the upcoming version of
Phalcon, 0.6.0.

One of the most important component introduced in the 0.6.0 series is
Volt, a completely new template engine, written in C, ready to be used
in PHP applications.

Volt is enhancing the view layer with a simple and user friendly syntax.
Volt is inspired on [Jinja](http://jinja.pocoo.org/), originally created
by [Armin Ronacher](https://github.com/vito/chyrp/wiki/Twig-Reference).
Therefore many developers will be in familiar ground using the same
syntax they have been using with other similar template engines. Volt's
syntax and features have been enhanced with more elements and of course
with the performance that developers have been accustomed to while
working with Phalcon.

The following example shows its basic usage:

```
{# app/views/products/show.volt #}
{% for product in products %}
  * Name: {{ product.name|e }}
  {% if product.status == "Active" %}
       Price: {{ product.price + product.taxes/100 }}
  {% endif  %}
{% endfor  %}
```

Volt views are compiled to pure PHP code, so basically they save the
effort of writing PHP code manually. For the above example, the
following PHP code is generated:

```
<?php foreach ($products as $product) { ?>
  * Name: <?php echo $this->escaper->escapeHtml($product->name); ?>
  <?php if ($product->status == 'Active') { ?>
       Price: <?php echo $product->price + $product->taxes / 0; ?>
  <?php } ?>
<?php } ?>
```

As an added value, Volt is integrated with
[Phalcon\\Tag](http://docs.phalconphp.com/en/latest/reference/tags.html),
making the creation of views in Phalcon applications much easier than
before:

```
{{ form('products/save', 'method': 'post') }}

    <label>Name</label>
    {{ text_field("name", "size": 32) }}

    <label>Type</label>
    {{ select("type", productTypes, 'using': ['id', 'name']) }}

</form>
```

Producing:

```
<?php echo Phalcon\Tag::form(array('products/save', 'method' => 'post')); ?>

    <label>Name</label>
    <?php echo Phalcon\Tag::textField(array('name', 'size' => 32)); ?>

    <label>Type</label>
    <?php echo Phalcon\Tag::select(array('type', $productTypes, 'using' => array('id', 'name'))); ?>

</form>
```

A core design feature in Volt is security, therefore Volt offers a
limited set of functions that can be used in the templates, while aiding
in escaping potentially malicious input by the users.

The first iteration of the Volt templating engine is introduced in
0.6.0, which covers a basic functional basis. As time passes by, more
and more features will be added.You can try Volt installing Phalcon from
the 0.6.0 branch on [Github](https://github.com/phalcon/cphalcon).

A preliminary documentation is available
[here](http://docs.phalconphp.com/en/0.6.0/reference/volt.html)\

Stay tuned, there's more news on the upcoming version of Phalcon!

