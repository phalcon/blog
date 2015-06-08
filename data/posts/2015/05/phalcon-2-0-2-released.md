<!--
slug: phalcon-2-0-2-released
date: Mon May 25 2015 18:26:49 GMT-0400 (EDT)
tags: phalcon, phalcon2, release
title: Phalcon 2.0.2 released
id: 119885725880
link: http://blog.phalconphp.com/post/119885725880/phalcon-2-0-2-released
raw: {"blog_name":"phalconphp","id":119885725880,"post_url":"http://blog.phalconphp.com/post/119885725880/phalcon-2-0-2-released","slug":"phalcon-2-0-2-released","type":"text","date":"2015-05-25 22:26:49 GMT","timestamp":1432592809,"state":"published","format":"html","reblog_key":"dQI3SmLZ","tags":["phalcon","phalcon2","release"],"short_url":"http://tmblr.co/Z6Pumv1lflm2u","highlighted":[],"note_count":2,"title":"Phalcon 2.0.2 released","body":"<p>The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find <a href=\"http://zephir-lang.com/\">Zephir</a> very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:</p>\n\n<ul><li>Added `stats()` methods to Beanstalk</li>\n <li>Fixed segfault when a docblock does not have annotations #10301\n </li><li>Fixed wrong number of parameters passed when triggering an event in Mvc\\Collection</li>\n <li>Now Mvc\\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL</li>\n <li>Readded Http\\Request::hasPut() (#10283)</li>\n <li>Phalcon\\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes</li>\n <li>Phalcon\\Text: Added method concat() - Concatenates strings using the separator only once without duplication in places concatenation</li>\n <li>Added conditional on Session adapter start() to check if the session has already been started</li>\n <li>Added status() function in Session adapter to return the status of the session (disabled/none/started)</li>\n <li>Implementation of subqueries as expressions in PHQL</li>\n <li>Performance improvements focused on PHP 5.6</li>\n</ul><h3>Subqueries</h3>\n<p>One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:</p>\n\n<pre>\n$phql = \"SELECT c.* FROM Shop\\Cars c\nWHERE c.brandId IN (SELECT id FROM Shop\\Brands)\nORDER BY c.name\";\n$cars = $this-&gt;modelsManager-&gt;executeQuery($phql);\n</pre>\n\n<p>Models must belong to the same database in order to be used as source in a subquery.</p>\n\n<h3>Default Database Values</h3>\n<p>Now in the case that a column has a &lsquo;default&rsquo; value declared in the field of the mapped table, this 'default&rsquo; value will be used instead of inserting 'NULL&rsquo;:</p>\n\n<pre>\n$robots = new Robots();\n$robots-&gt;save(); // use all `default` values\n</pre>\n\n<h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<h3>Comming soon</h3>\n<p>In the future 2.0.x series, we will be concentrating our efforts on requests from the community:</p>\n\n<ul><li>Eager-Loading in PHQL</li>\n  <li>Optional string empty values in the ORM</li>\n  <li>PHQL custom functions</li>\n  <li>Case Statements in PHQL</li>\n  <li>Aliases for namespaces in PHQL</li>\n</ul><p>Later on, we will be planning the features to include in Phalcon 2.1, for now:</p>\n\n<ul><li>Complete deprecation of PHP 5.3</li>\n  <li>Unification of Phalcon\\Mvc\\Model\\Validation and Phalcon\\Validation</li>\n</ul><h3>Thanks</h3>\n<p>Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!</p>","reblog":{"tree_html":"","comment":"<p>The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find <a href=\"http://zephir-lang.com/\">Zephir</a> very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:</p>\n\n<ul><li>Added `stats()` methods to Beanstalk</li>\n <li>Fixed segfault when a docblock does not have annotations #10301\n </li><li>Fixed wrong number of parameters passed when triggering an event in Mvc\\Collection</li>\n <li>Now Mvc\\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL</li>\n <li>Readded Http\\Request::hasPut() (#10283)</li>\n <li>Phalcon\\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes</li>\n <li>Phalcon\\Text: Added method concat() - Concatenates strings using the separator only once without duplication in places concatenation</li>\n <li>Added conditional on Session adapter start() to check if the session has already been started</li>\n <li>Added status() function in Session adapter to return the status of the session (disabled/none/started)</li>\n <li>Implementation of subqueries as expressions in PHQL</li>\n <li>Performance improvements focused on PHP 5.6</li>\n</ul><h3>Subqueries</h3>\n<p>One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:</p>\n\n<pre>\n$phql = \"SELECT c.* FROM Shop\\Cars c\nWHERE c.brandId IN (SELECT id FROM Shop\\Brands)\nORDER BY c.name\";\n$cars = $this-&gt;modelsManager-&gt;executeQuery($phql);\n</pre>\n\n<p>Models must belong to the same database in order to be used as source in a subquery.</p>\n\n<h3>Default Database Values</h3>\n<p>Now in the case that a column has a &lsquo;default&rsquo; value declared in the field of the mapped table, this 'default&rsquo; value will be used instead of inserting 'NULL&rsquo;:</p>\n\n<pre>\n$robots = new Robots();\n$robots-&gt;save(); // use all `default` values\n</pre>\n\n<h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<h3>Comming soon</h3>\n<p>In the future 2.0.x series, we will be concentrating our efforts on requests from the community:</p>\n\n<ul><li>Eager-Loading in PHQL</li>\n  <li>Optional string empty values in the ORM</li>\n  <li>PHQL custom functions</li>\n  <li>Case Statements in PHQL</li>\n  <li>Aliases for namespaces in PHQL</li>\n</ul><p>Later on, we will be planning the features to include in Phalcon 2.1, for now:</p>\n\n<ul><li>Complete deprecation of PHP 5.3</li>\n  <li>Unification of Phalcon\\Mvc\\Model\\Validation and Phalcon\\Validation</li>\n</ul><h3>Thanks</h3>\n<p>Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"119885725880"},"content":"<p>The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find <a href=\"http://zephir-lang.com/\">Zephir</a> very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:</p>\n\n<ul><li>Added `stats()` methods to Beanstalk</li>\n <li>Fixed segfault when a docblock does not have annotations #10301\n </li><li>Fixed wrong number of parameters passed when triggering an event in Mvc\\Collection</li>\n <li>Now Mvc\\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL</li>\n <li>Readded Http\\Request::hasPut() (#10283)</li>\n <li>Phalcon\\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes</li>\n <li>Phalcon\\Text: Added method concat() - Concatenates strings using the separator only once without duplication in places concatenation</li>\n <li>Added conditional on Session adapter start() to check if the session has already been started</li>\n <li>Added status() function in Session adapter to return the status of the session (disabled/none/started)</li>\n <li>Implementation of subqueries as expressions in PHQL</li>\n <li>Performance improvements focused on PHP 5.6</li>\n</ul><h3>Subqueries</h3>\n<p>One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:</p>\n\n<pre>\n$phql = \"SELECT c.* FROM Shop\\Cars c\nWHERE c.brandId IN (SELECT id FROM Shop\\Brands)\nORDER BY c.name\";\n$cars = $this->modelsManager->executeQuery($phql);\n</pre>\n\n<p>Models must belong to the same database in order to be used as source in a subquery.</p>\n\n<h3>Default Database Values</h3>\n<p>Now in the case that a column has a ‘default’ value declared in the field of the mapped table, this 'default’ value will be used instead of inserting 'NULL’:</p>\n\n<pre>\n$robots = new Robots();\n$robots->save(); // use all `default` values\n</pre>\n\n<h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<h3>Comming soon</h3>\n<p>In the future 2.0.x series, we will be concentrating our efforts on requests from the community:</p>\n\n<ul><li>Eager-Loading in PHQL</li>\n  <li>Optional string empty values in the ORM</li>\n  <li>PHQL custom functions</li>\n  <li>Case Statements in PHQL</li>\n  <li>Aliases for namespaces in PHQL</li>\n</ul><p>Later on, we will be planning the features to include in Phalcon 2.1, for now:</p>\n\n<ul><li>Complete deprecation of PHP 5.3</li>\n  <li>Unification of Phalcon\\Mvc\\Model\\Validation and Phalcon\\Validation</li>\n</ul><h3>Thanks</h3>\n<p>Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!</p>","content_raw":"<p>The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find <a href=\"http://zephir-lang.com/\">Zephir</a> very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:</p>\n\n<ul><li>Added `stats()` methods to Beanstalk</li>\n <li>Fixed segfault when a docblock does not have annotations #10301\n </li><li>Fixed wrong number of parameters passed when triggering an event in Mvc\\Collection</li>\n <li>Now Mvc\\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL</li>\n <li>Readded Http\\Request::hasPut() (#10283)</li>\n <li>Phalcon\\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes</li>\n <li>Phalcon\\Text: Added method concat() - Concatenates strings using the separator only once without duplication in places concatenation</li>\n <li>Added conditional on Session adapter start() to check if the session has already been started</li>\n <li>Added status() function in Session adapter to return the status of the session (disabled/none/started)</li>\n <li>Implementation of subqueries as expressions in PHQL</li>\n <li>Performance improvements focused on PHP 5.6</li>\n</ul><h3>Subqueries</h3>\n<p>One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:</p>\n\n<pre>\n$phql = \"SELECT c.* FROM Shop\\Cars c\nWHERE c.brandId IN (SELECT id FROM Shop\\Brands)\nORDER BY c.name\";\n$cars = $this-&gt;modelsManager-&gt;executeQuery($phql);\n</pre>\n\n<p>Models must belong to the same database in order to be used as source in a subquery.</p>\n\n<h3>Default Database Values</h3>\n<p>Now in the case that a column has a 'default' value declared in the field of the mapped table, this 'default' value will be used instead of inserting 'NULL':</p>\n\n<pre>\n$robots = new Robots();\n$robots-&gt;save(); // use all `default` values\n</pre>\n\n<h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<h3>Comming soon</h3>\n<p>In the future 2.0.x series, we will be concentrating our efforts on requests from the community:</p>\n\n<ul><li>Eager-Loading in PHQL</li>\n  <li>Optional string empty values in the ORM</li>\n  <li>PHQL custom functions</li>\n  <li>Case Statements in PHQL</li>\n  <li>Aliases for namespaces in PHQL</li>\n</ul><p>Later on, we will be planning the features to include in Phalcon 2.1, for now:</p>\n\n<ul><li>Complete deprecation of PHP 5.3</li>\n  <li>Unification of Phalcon\\Mvc\\Model\\Validation and Phalcon\\Validation</li>\n</ul><h3>Thanks</h3>\n<p>Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2015-05-025
-->


Phalcon 2.0.2 released
======================

The development of Phalcon has been accelerated since we released 2.0.0.
More and more contributors find [Zephir](http://zephir-lang.com/) very
easy to understand and work with, and as a result it is time to release
Phalcon 2.0.2. This version includes many features, bug fixes and
improvements in terms of performance:

-   Added \`stats()\` methods to Beanstalk
-   Fixed segfault when a docblock does not have annotations \#10301
-   Fixed wrong number of parameters passed when triggering an event in
    Mvc\\Collection
-   Now Mvc\\Model checks if an attribute has a default value associated
    in the database and ignores it from the insert/update generated SQL
-   Readded Http\\Request::hasPut() (\#10283)
-   Phalcon\\Text: Added method reduceSlashes() - Reduces multiple
    slashes in a string to single slashes
-   Phalcon\\Text: Added method concat() - Concatenates strings using
    the separator only once without duplication in places concatenation
-   Added conditional on Session adapter start() to check if the session
    has already been started
-   Added status() function in Session adapter to return the status of
    the session (disabled/none/started)
-   Implementation of subqueries as expressions in PHQL
-   Performance improvements focused on PHP 5.6

### Subqueries

One of the most requested requests by the community is now available in
Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:

    $phql = "SELECT c.* FROM Shop\Cars c
    WHERE c.brandId IN (SELECT id FROM Shop\Brands)
    ORDER BY c.name";
    $cars = $this->modelsManager->executeQuery($phql);

Models must belong to the same database in order to be used as source in
a subquery.

### Default Database Values

Now in the case that a column has a ‘default’ value declared in the
field of the mapped table, this 'default’ value will be used instead of
inserting 'NULL’:

    $robots = new Robots();
    $robots->save(); // use all `default` values

### Update/Upgrade

This version can be installed from the master branch, if you don’t have
Zephir installed follow these instructions:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout master
cd ext
sudo ./install
~~~~

The standard installation method also works:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout master
cd build
sudo ./install
~~~~

If you have Zephir installed:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout master
zephir fullclean
zephir build
~~~~

Note that running the installation script will replace any version of
Phalcon installed before.

Windows DLLs are available in the [download
page](http://phalconphp.com/en/download/windows).

See the [upgrading
guide](http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2)
for more information about upgrading to Phalcon 2.0.x from 1.3.x.

### Comming soon

In the future 2.0.x series, we will be concentrating our efforts on
requests from the community:

-   Eager-Loading in PHQL
-   Optional string empty values in the ORM
-   PHQL custom functions
-   Case Statements in PHQL
-   Aliases for namespaces in PHQL

Later on, we will be planning the features to include in Phalcon 2.1,
for now:

-   Complete deprecation of PHP 5.3
-   Unification of Phalcon\\Mvc\\Model\\Validation and
    Phalcon\\Validation

### Thanks

Thanks to everyone involved in making this version as well to the
community for their continuous input and feedback!

