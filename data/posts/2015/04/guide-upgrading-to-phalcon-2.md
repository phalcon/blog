<!--
slug: guide-upgrading-to-phalcon-2
date: Tue Apr 07 2015 13:19:30 GMT-0400 (EDT)
tags: phalcon2, phalcon, zephir, php
title: Guide: Upgrading to Phalcon 2
id: 115773676765
link: http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2
raw: {"blog_name":"phalconphp","id":115773676765,"post_url":"http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2","slug":"guide-upgrading-to-phalcon-2","type":"text","date":"2015-04-07 17:19:30 GMT","timestamp":1428427170,"state":"published","format":"html","reblog_key":"ykW4AUcF","tags":["phalcon2","phalcon","zephir","php"],"short_url":"http://tmblr.co/Z6Pumv1hqfXpT","highlighted":[],"note_count":6,"title":"Guide: Upgrading to Phalcon 2","body":"<p>Phalcon 2 is the a major upgrade to the framework and will be released <b>April 17th, 2015</b>. This new version is a rewriting of about 85% total code from C to a high-level language we have created called <a href=\"http://zephir-lang.com/\">Zephir</a>.</p>\n\n<p>Upgrading to the latest version has several benefits:</p>\n\n<ul><li>New features and improvements are added and bugs are fixed</li>\n<li>Upgrading to the latest release available makes future upgrades less painful by keeping your code base up to date</li>\n<li>Older version of Phalcon will eventually no longer receive bugs, security or feature updates</li>\n</ul><p>If you&rsquo;re upgrading an existing application, it&rsquo;s a great idea to have good test coverage before going in. You should also first upgrade to Phalcon 1.3.4 in case you haven&rsquo;t and make sure your application still runs as expected before attempting an update to Phalcon 2. </p>\n\n<p>Most of the development of Phalcon 2 has been focused on maintaining backwards compatibility with 1.3 and thus make the \nupgrade as easy as possible. However being a different version with many internal changes, existing applications may require some minor changes. Here are some things to consider to help make your upgrade process as smooth as possible.</p>\n\n<p>\n<b>Interfaces and parameter types</b><br/>\nPhalcon 1.3 sometimes does not validate data types and interfaces compliance in parameters with the rigourousness as Phalcon 2 does. \nIn many cases this should not be a problem. If you&rsquo;re implementing your own adapters or components based on Phalcon&rsquo;s interfaces then \nwill be necessary to update the method prototypes:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi($di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\DiInterface;\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi(DiInterface $di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>If for any reason, a wrong type is passed to methods that are not suppose to, you will probably have to change it:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(100, function() {\n\t// ...\t\n})\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(\"100\", function() {\n\t// ...\t\t\n})\n</pre>\n\n<p>\n<b>Protected methods</b><br/>\nTo improve performance some protected methods have been marked as final. It is a good practice not to override these methods as \nthese might change in this or future versions and break applications.</p>\n\n<p>\n<b>Dependencies</b><br/>\nIn most cases it will be necessary to upgrade to the latest version of your dependencies as well. If the Phalcon version was recently released or if some of your dependencies are not well-maintained, some of your dependencies may not yet support the new Phalcon version. In these cases you may have to wait until new versions of your dependencies are released.</p>\n\n<p>\n<b>PHP compatibility</b><br/>\nLike Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we will no longer deliver Windows DLLs for 5.3.x as it is \nconsidered an outdated and obsolte version. Additionally, you should know that many performance improvements have been particularly focused on PHP 5.6, so if you want to get the best performance we recommend to use this version. </p>\n\n<p>\n<b>Installation</b><br/></p><p>This version can be installed from the 2.0.0 branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>\n<b>Deployment</b><br/>\nWhen you are sufficiently confident your application is working with Phalcon 2, you&rsquo;re ready to go ahead and deploy your upgraded Phalcon project.</p>\n\n<p>Happy Upgrading!</p>","reblog":{"tree_html":"","comment":"<p>Phalcon 2 is the a major upgrade to the framework and will be released <b>April 17th, 2015</b>. This new version is a rewriting of about 85% total code from C to a high-level language we have created called <a href=\"http://zephir-lang.com/\">Zephir</a>.</p>\n\n<p>Upgrading to the latest version has several benefits:</p>\n\n<ul><li>New features and improvements are added and bugs are fixed</li>\n<li>Upgrading to the latest release available makes future upgrades less painful by keeping your code base up to date</li>\n<li>Older version of Phalcon will eventually no longer receive bugs, security or feature updates</li>\n</ul><p>If you&rsquo;re upgrading an existing application, it&rsquo;s a great idea to have good test coverage before going in. You should also first upgrade to Phalcon 1.3.4 in case you haven&rsquo;t and make sure your application still runs as expected before attempting an update to Phalcon 2. </p>\n\n<p>Most of the development of Phalcon 2 has been focused on maintaining backwards compatibility with 1.3 and thus make the \nupgrade as easy as possible. However being a different version with many internal changes, existing applications may require some minor changes. Here are some things to consider to help make your upgrade process as smooth as possible.</p>\n\n<p>\n<b>Interfaces and parameter types</b><br>\nPhalcon 1.3 sometimes does not validate data types and interfaces compliance in parameters with the rigourousness as Phalcon 2 does. \nIn many cases this should not be a problem. If you&rsquo;re implementing your own adapters or components based on Phalcon&rsquo;s interfaces then \nwill be necessary to update the method prototypes:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi($di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\DiInterface;\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi(DiInterface $di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>If for any reason, a wrong type is passed to methods that are not suppose to, you will probably have to change it:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(100, function() {\n\t// ...\t\n})\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(\"100\", function() {\n\t// ...\t\t\n})\n</pre>\n\n<p>\n<b>Protected methods</b><br>\nTo improve performance some protected methods have been marked as final. It is a good practice not to override these methods as \nthese might change in this or future versions and break applications.</p>\n\n<p>\n<b>Dependencies</b><br>\nIn most cases it will be necessary to upgrade to the latest version of your dependencies as well. If the Phalcon version was recently released or if some of your dependencies are not well-maintained, some of your dependencies may not yet support the new Phalcon version. In these cases you may have to wait until new versions of your dependencies are released.</p>\n\n<p>\n<b>PHP compatibility</b><br>\nLike Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we will no longer deliver Windows DLLs for 5.3.x as it is \nconsidered an outdated and obsolte version. Additionally, you should know that many performance improvements have been particularly focused on PHP 5.6, so if you want to get the best performance we recommend to use this version. </p>\n\n<p>\n<b>Installation</b><br></p><p>This version can be installed from the 2.0.0 branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>\n<b>Deployment</b><br>\nWhen you are sufficiently confident your application is working with Phalcon 2, you&rsquo;re ready to go ahead and deploy your upgraded Phalcon project.</p>\n\n<p>Happy Upgrading!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"115773676765"},"content":"<p>Phalcon 2 is the a major upgrade to the framework and will be released <b>April 17th, 2015</b>. This new version is a rewriting of about 85% total code from C to a high-level language we have created called <a href=\"http://zephir-lang.com/\">Zephir</a>.</p>\n\n<p>Upgrading to the latest version has several benefits:</p>\n\n<ul><li>New features and improvements are added and bugs are fixed</li>\n<li>Upgrading to the latest release available makes future upgrades less painful by keeping your code base up to date</li>\n<li>Older version of Phalcon will eventually no longer receive bugs, security or feature updates</li>\n</ul><p>If you’re upgrading an existing application, it’s a great idea to have good test coverage before going in. You should also first upgrade to Phalcon 1.3.4 in case you haven’t and make sure your application still runs as expected before attempting an update to Phalcon 2. </p>\n\n<p>Most of the development of Phalcon 2 has been focused on maintaining backwards compatibility with 1.3 and thus make the \nupgrade as easy as possible. However being a different version with many internal changes, existing applications may require some minor changes. Here are some things to consider to help make your upgrade process as smooth as possible.</p>\n\n<p>\n<b>Interfaces and parameter types</b><br>\nPhalcon 1.3 sometimes does not validate data types and interfaces compliance in parameters with the rigourousness as Phalcon 2 does. \nIn many cases this should not be a problem. If you’re implementing your own adapters or components based on Phalcon’s interfaces then \nwill be necessary to update the method prototypes:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi($di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\DiInterface;\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi(DiInterface $di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>If for any reason, a wrong type is passed to methods that are not suppose to, you will probably have to change it:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app->add(100, function() {\n\t// ...\t\n})\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app->add(\"100\", function() {\n\t// ...\t\t\n})\n</pre>\n\n<p>\n<b>Protected methods</b><br>\nTo improve performance some protected methods have been marked as final. It is a good practice not to override these methods as \nthese might change in this or future versions and break applications.</p>\n\n<p>\n<b>Dependencies</b><br>\nIn most cases it will be necessary to upgrade to the latest version of your dependencies as well. If the Phalcon version was recently released or if some of your dependencies are not well-maintained, some of your dependencies may not yet support the new Phalcon version. In these cases you may have to wait until new versions of your dependencies are released.</p>\n\n<p>\n<b>PHP compatibility</b><br>\nLike Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we will no longer deliver Windows DLLs for 5.3.x as it is \nconsidered an outdated and obsolte version. Additionally, you should know that many performance improvements have been particularly focused on PHP 5.6, so if you want to get the best performance we recommend to use this version. </p>\n\n<p>\n<b>Installation</b><br></p><p>This version can be installed from the 2.0.0 branch, if you don’t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>\n<b>Deployment</b><br>\nWhen you are sufficiently confident your application is working with Phalcon 2, you’re ready to go ahead and deploy your upgraded Phalcon project.</p>\n\n<p>Happy Upgrading!</p>","content_raw":"<p>Phalcon 2 is the a major upgrade to the framework and will be released <b>April 17th, 2015</b>. This new version is a rewriting of about 85% total code from C to a high-level language we have created called <a href=\"http://zephir-lang.com/\">Zephir</a>.</p>\n\n<p>Upgrading to the latest version has several benefits:</p>\n\n<ul><li>New features and improvements are added and bugs are fixed</li>\n<li>Upgrading to the latest release available makes future upgrades less painful by keeping your code base up to date</li>\n<li>Older version of Phalcon will eventually no longer receive bugs, security or feature updates</li>\n</ul><p>If you're upgrading an existing application, it's a great idea to have good test coverage before going in. You should also first upgrade to Phalcon 1.3.4 in case you haven't and make sure your application still runs as expected before attempting an update to Phalcon 2. </p>\n\n<p>Most of the development of Phalcon 2 has been focused on maintaining backwards compatibility with 1.3 and thus make the \nupgrade as easy as possible. However being a different version with many internal changes, existing applications may require some minor changes. Here are some things to consider to help make your upgrade process as smooth as possible.</p>\n\n<p>\n<b>Interfaces and parameter types</b><br>\nPhalcon 1.3 sometimes does not validate data types and interfaces compliance in parameters with the rigourousness as Phalcon 2 does. \nIn many cases this should not be a problem. If you're implementing your own adapters or components based on Phalcon's interfaces then \nwill be necessary to update the method prototypes:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi($di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_php sh_sourceCode\">\nuse Phalcon\\DiInterface;\nuse Phalcon\\Di\\InjectionAwareInterface;\n\nclass MyComponent implements InjectionAwareInterface\n{\n\tpublic function setDi(DiInterface $di)\n\t{\n\n\t}\n}\n</pre>\n\n<p>If for any reason, a wrong type is passed to methods that are not suppose to, you will probably have to change it:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(100, function() {\n\t// ...\t\n})\n</pre>\n\n<p>Must be changed to:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\n// Passing a number as route ???\n$app-&gt;add(\"100\", function() {\n\t// ...\t\t\n})\n</pre>\n\n<p>\n<b>Protected methods</b><br>\nTo improve performance some protected methods have been marked as final. It is a good practice not to override these methods as \nthese might change in this or future versions and break applications.</p>\n\n<p>\n<b>Dependencies</b><br>\nIn most cases it will be necessary to upgrade to the latest version of your dependencies as well. If the Phalcon version was recently released or if some of your dependencies are not well-maintained, some of your dependencies may not yet support the new Phalcon version. In these cases you may have to wait until new versions of your dependencies are released.</p>\n\n<p>\n<b>PHP compatibility</b><br>\nLike Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we will no longer deliver Windows DLLs for 5.3.x as it is \nconsidered an outdated and obsolte version. Additionally, you should know that many performance improvements have been particularly focused on PHP 5.6, so if you want to get the best performance we recommend to use this version. </p>\n\n<p>\n<b>Installation</b><br></p><p>This version can be installed from the 2.0.0 branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n\n<p>The standard installation method also works:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout 2.0.0\ncd build\nsudo ./install\n</pre>\n\n<p>If you have Zephir installed:</p>\n\n<pre class=\"sh_sh sh_sourceCode\">\ngit clone http://github.com/phalcon/cphalcon\ngit checkout 2.0.0\nzephir build\n</pre>\n\n<p>Note that running the installation script will replace any version of Phalcon installed before.</p>\n\n<p>Windows DLLs are available in the <a href=\"http://phalconphp.com/en/download/windows\">download page</a>.</p>\n\n<p>\n<b>Deployment</b><br>\nWhen you are sufficiently confident your application is working with Phalcon 2, you're ready to go ahead and deploy your upgraded Phalcon project.</p>\n\n<p>Happy Upgrading!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2015-04-07
-->


Guide: Upgrading to Phalcon 2
=============================

Phalcon 2 is the a major upgrade to the framework and will be released
**April 17th, 2015**. This new version is a rewriting of about 85% total
code from C to a high-level language we have created called
[Zephir](http://zephir-lang.com/).

Upgrading to the latest version has several benefits:

-   New features and improvements are added and bugs are fixed
-   Upgrading to the latest release available makes future upgrades less
    painful by keeping your code base up to date
-   Older version of Phalcon will eventually no longer receive bugs,
    security or feature updates

If you’re upgrading an existing application, it’s a great idea to have
good test coverage before going in. You should also first upgrade to
Phalcon 1.3.4 in case you haven’t and make sure your application still
runs as expected before attempting an update to Phalcon 2.

Most of the development of Phalcon 2 has been focused on maintaining
backwards compatibility with 1.3 and thus make the upgrade as easy as
possible. However being a different version with many internal changes,
existing applications may require some minor changes. Here are some
things to consider to help make your upgrade process as smooth as
possible.

**Interfaces and parameter types**\
 Phalcon 1.3 sometimes does not validate data types and interfaces
compliance in parameters with the rigourousness as Phalcon 2 does. In
many cases this should not be a problem. If you’re implementing your own
adapters or components based on Phalcon’s interfaces then will be
necessary to update the method prototypes:

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\Di\InjectionAwareInterface;

class MyComponent implements InjectionAwareInterface
{
    public function setDi($di)
    {

    }
}
~~~~

Must be changed to:

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\DiInterface;
use Phalcon\Di\InjectionAwareInterface;

class MyComponent implements InjectionAwareInterface
{
    public function setDi(DiInterface $di)
    {

    }
}
~~~~

If for any reason, a wrong type is passed to methods that are not
suppose to, you will probably have to change it:

~~~~ {.sh_sh .sh_sourceCode}
// Passing a number as route ???
$app->add(100, function() {
    // ...  
})
~~~~

Must be changed to:

~~~~ {.sh_sh .sh_sourceCode}
// Passing a number as route ???
$app->add("100", function() {
    // ...      
})
~~~~

**Protected methods**\
 To improve performance some protected methods have been marked as
final. It is a good practice not to override these methods as these
might change in this or future versions and break applications.

**Dependencies**\
 In most cases it will be necessary to upgrade to the latest version of
your dependencies as well. If the Phalcon version was recently released
or if some of your dependencies are not well-maintained, some of your
dependencies may not yet support the new Phalcon version. In these cases
you may have to wait until new versions of your dependencies are
released.

**PHP compatibility**\
 Like Phalcon 1.3, Phalcon 2.0 requires PHP 5.3.21 or above, however we
will no longer deliver Windows DLLs for 5.3.x as it is considered an
outdated and obsolte version. Additionally, you should know that many
performance improvements have been particularly focused on PHP 5.6, so
if you want to get the best performance we recommend to use this
version.

**Installation**\

This version can be installed from the 2.0.0 branch, if you don’t have
Zephir installed follow these instructions:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install
~~~~

The standard installation method also works:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd build
sudo ./install
~~~~

If you have Zephir installed:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
zephir build
~~~~

Note that running the installation script will replace any version of
Phalcon installed before.

Windows DLLs are available in the [download
page](http://phalconphp.com/en/download/windows).

**Deployment**\
 When you are sufficiently confident your application is working with
Phalcon 2, you’re ready to go ahead and deploy your upgraded Phalcon
project.

Happy Upgrading!

