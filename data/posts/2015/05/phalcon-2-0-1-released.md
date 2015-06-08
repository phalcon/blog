<!--
slug: phalcon-2-0-1-released
date: Fri May 08 2015 16:11:01 GMT-0400 (EDT)
tags: phalcon, zephir
title: Phalcon 2.0.1 released
id: 118465365385
link: http://blog.phalconphp.com/post/118465365385/phalcon-2-0-1-released
raw: {"blog_name":"phalconphp","id":118465365385,"post_url":"http://blog.phalconphp.com/post/118465365385/phalcon-2-0-1-released","slug":"phalcon-2-0-1-released","type":"text","date":"2015-05-08 20:11:01 GMT","timestamp":1431115861,"state":"published","format":"html","reblog_key":"q5WebzZ7","tags":["phalcon","zephir"],"short_url":"http://tmblr.co/Z6Pumv1kL5WM9","highlighted":[],"note_count":2,"title":"Phalcon 2.0.1 released","body":"<p>Today we&rsquo;re releasing Phalcon 2.0.1, this version fixes bugs and adds new features in the 2.0 series, the following is the CHANGELOG:</p>\n<ul><li>Fixed random segfaults in installations using PHP &lt;= 5.5 caused by inline caches</li>\n<li>Added missing Phalcon\\Debug::listenLowSeverity</li>\n<li>Added new theme in Phalcon\\Debug</li>\n<li>Allow to count and iterate Phalcon\\Session\\Bag as in 1.3.x</li>\n<li>Renamed getEventsManager to getInternalEventsManager in Phalcon\\Di to avoid collision\n  with existing services</li>\n<li>Added constants FILTER_* to Phalcon\\Filter for filters names</li>\n<li>Fixed multibyte characters in cssmin/jsmin filters</li>\n<li>Added Phalcon\\Security::destroyToken() to remove current token key and value from session</li>\n<li>Restored alternative hash algorithms in Phalcon\\Security that were available in 1.3.x</li>\n<li>Fixed bug that makes instances returned in Model::findFirst to be not completely initialized</li>\n<li>Added support for general SELECT ALL/SELECT DISTINCT in PHQL</li>\n<li>Added support for &ldquo;not in&rdquo; test in Volt</li>\n<li>Phalcon\\Debug\\Dump\n&ndash; Renamed method var() to variable()\n&ndash; Renamed method vars() to variables()</li>\n<li>Phalcon\\Mvc\\Model::findFirst() now allows hydration (#10259).</li>\n<li>Fixed high memory consumption when serializing Cache\\Backend\\Memory.</li>\n</ul><h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<p>Thanks to all the collaborators and the community!</p>","reblog":{"tree_html":"","comment":"<p>Today we&rsquo;re releasing Phalcon 2.0.1, this version fixes bugs and adds new features in the 2.0 series, the following is the CHANGELOG:</p>\n<ul><li>Fixed random segfaults in installations using PHP &lt;= 5.5 caused by inline caches</li>\n<li>Added missing Phalcon\\Debug::listenLowSeverity</li>\n<li>Added new theme in Phalcon\\Debug</li>\n<li>Allow to count and iterate Phalcon\\Session\\Bag as in 1.3.x</li>\n<li>Renamed getEventsManager to getInternalEventsManager in Phalcon\\Di to avoid collision\n&nbsp; with existing services</li>\n<li>Added constants FILTER_* to Phalcon\\Filter for filters names</li>\n<li>Fixed multibyte characters in cssmin/jsmin filters</li>\n<li>Added Phalcon\\Security::destroyToken() to remove current token key and value from session</li>\n<li>Restored alternative hash algorithms in Phalcon\\Security that were available in 1.3.x</li>\n<li>Fixed bug that makes instances returned in Model::findFirst to be not completely initialized</li>\n<li>Added support for general SELECT ALL/SELECT DISTINCT in PHQL</li>\n<li>Added support for &ldquo;not in&rdquo; test in Volt</li>\n<li>Phalcon\\Debug\\Dump\n&ndash; Renamed method var() to variable()\n&ndash; Renamed method vars() to variables()</li>\n<li>Phalcon\\Mvc\\Model::findFirst() now allows hydration (#10259).</li>\n<li>Fixed high memory consumption when serializing Cache\\Backend\\Memory.</li>\n</ul><h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<p>Thanks to all the collaborators and the community!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"118465365385"},"content":"<p>Today we’re releasing Phalcon 2.0.1, this version fixes bugs and adds new features in the 2.0 series, the following is the CHANGELOG:</p>\n<ul><li>Fixed random segfaults in installations using PHP <= 5.5 caused by inline caches</li>\n<li>Added missing Phalcon\\Debug::listenLowSeverity</li>\n<li>Added new theme in Phalcon\\Debug</li>\n<li>Allow to count and iterate Phalcon\\Session\\Bag as in 1.3.x</li>\n<li>Renamed getEventsManager to getInternalEventsManager in Phalcon\\Di to avoid collision\n  with existing services</li>\n<li>Added constants FILTER_* to Phalcon\\Filter for filters names</li>\n<li>Fixed multibyte characters in cssmin/jsmin filters</li>\n<li>Added Phalcon\\Security::destroyToken() to remove current token key and value from session</li>\n<li>Restored alternative hash algorithms in Phalcon\\Security that were available in 1.3.x</li>\n<li>Fixed bug that makes instances returned in Model::findFirst to be not completely initialized</li>\n<li>Added support for general SELECT ALL/SELECT DISTINCT in PHQL</li>\n<li>Added support for “not in” test in Volt</li>\n<li>Phalcon\\Debug\\Dump\n– Renamed method var() to variable()\n– Renamed method vars() to variables()</li>\n<li>Phalcon\\Mvc\\Model::findFirst() now allows hydration (#10259).</li>\n<li>Fixed high memory consumption when serializing Cache\\Backend\\Memory.</li>\n</ul><h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<p>Thanks to all the collaborators and the community!</p>","content_raw":"<p>Today we're releasing Phalcon 2.0.1, this version fixes bugs and adds new features in the 2.0 series, the following is the CHANGELOG:</p>\n<ul><li>Fixed random segfaults in installations using PHP &lt;= 5.5 caused by inline caches</li>\n<li>Added missing Phalcon\\Debug::listenLowSeverity</li>\n<li>Added new theme in Phalcon\\Debug</li>\n<li>Allow to count and iterate Phalcon\\Session\\Bag as in 1.3.x</li>\n<li>Renamed getEventsManager to getInternalEventsManager in Phalcon\\Di to avoid collision\n&nbsp; with existing services</li>\n<li>Added constants FILTER_* to Phalcon\\Filter for filters names</li>\n<li>Fixed multibyte characters in cssmin/jsmin filters</li>\n<li>Added Phalcon\\Security::destroyToken() to remove current token key and value from session</li>\n<li>Restored alternative hash algorithms in Phalcon\\Security that were available in 1.3.x</li>\n<li>Fixed bug that makes instances returned in Model::findFirst to be not completely initialized</li>\n<li>Added support for general SELECT ALL/SELECT DISTINCT in PHQL</li>\n<li>Added support for \"not in\" test in Volt</li>\n<li>Phalcon\\Debug\\Dump\n-- Renamed method var() to variable()\n-- Renamed method vars() to variables()</li>\n<li>Phalcon\\Mvc\\Model::findFirst() now allows hydration (#10259).</li>\n<li>Fixed high memory consumption when serializing Cache\\Backend\\Memory.</li>\n</ul><h3>Update/Upgrade</h3>\n<p>This version can be installed from the master branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout master\nzephir fullclean\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>See the <a href=\"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2\">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>\n\n<p>Thanks to all the collaborators and the community!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2015-05-08
-->


Phalcon 2.0.1 released
======================

Today we’re releasing Phalcon 2.0.1, this version fixes bugs and adds
new features in the 2.0 series, the following is the CHANGELOG:

-   Fixed random segfaults in installations using PHP \<= 5.5 caused by
    inline caches
-   Added missing Phalcon\\Debug::listenLowSeverity
-   Added new theme in Phalcon\\Debug
-   Allow to count and iterate Phalcon\\Session\\Bag as in 1.3.x
-   Renamed getEventsManager to getInternalEventsManager in Phalcon\\Di
    to avoid collision   with existing services
-   Added constants FILTER\_\* to Phalcon\\Filter for filters names
-   Fixed multibyte characters in cssmin/jsmin filters
-   Added Phalcon\\Security::destroyToken() to remove current token key
    and value from session
-   Restored alternative hash algorithms in Phalcon\\Security that were
    available in 1.3.x
-   Fixed bug that makes instances returned in Model::findFirst to be
    not completely initialized
-   Added support for general SELECT ALL/SELECT DISTINCT in PHQL
-   Added support for “not in” test in Volt
-   Phalcon\\Debug\\Dump – Renamed method var() to variable() – Renamed
    method vars() to variables()
-   Phalcon\\Mvc\\Model::findFirst() now allows hydration (\#10259).
-   Fixed high memory consumption when serializing
    Cache\\Backend\\Memory.

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

Thanks to all the collaborators and the community!

