<!--
slug: phalcon-0-5-0-beta1-released
date: Tue Aug 28 2012 05:36:00 GMT-0400 (EDT)
tags: php, mvc, frameworks, release, 0.5.0
title: Phalcon 0.5.0 beta1 released!
id: 30325463805
link: http://blog.phalconphp.com/post/30325463805/phalcon-0-5-0-beta1-released
raw: {"blog_name":"phalconphp","id":30325463805,"post_url":"http://blog.phalconphp.com/post/30325463805/phalcon-0-5-0-beta1-released","slug":"phalcon-0-5-0-beta1-released","type":"text","date":"2012-08-28 09:36:00 GMT","timestamp":1346146560,"state":"published","format":"html","reblog_key":"EAVDAdbu","tags":["php","mvc","frameworks","release","0.5.0"],"short_url":"http://tmblr.co/Z6PumvSFYThz","highlighted":[],"note_count":0,"source_url":"http://github.com/phalcon/cphalcon","source_title":"github.com","title":"Phalcon 0.5.0 beta1 released!","body":"<p><img src=\"http://i.qkme.me/355ovv.jpg\"/></p>\n<p>It has been a really busy month and a half. We concentrated all of our efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of core parts of the framework. We increased flexibility, extensibility and added more features while still keeping performance high.</p>\n<p>Most of the examples and features present in previous versions work - however there might be some unexpected behavior (bugs) lurking around. All the tests are passing in our <a href=\"http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188\">Travis CI server</a> and the <a href=\"http://phalconphp.com\">official site</a> has been running on 0.5.0b1 for a few days now with no problems.</p>\n<p>We are now concentrating in writing documentation, fixing bugs and attending to areas that still need a bit of work.</p>\n<p>We would like to invite the community to install and test the new features of 0.5.0b1.</p>\n<p><em>To install 0.5.0b1:</em></p>\n<p>Follow the same instructions as installing the stable version. The only difference is that the files are located in the dev/ folder (instead of “cd release” issue “cd dev”).</p>\n<p>Checkout the following steps to compile the extension for a Linux/Mac platform:</p>\n<pre class=\"sh_sh\">git clone git://github.com/phalcon/cphalcon.git\ncd cphalcon/dev\nexport CFLAGS=\"-O2 -fno-delete-null-pointer-checks\"\nphpize\n./configure --enable-phalcon \nmake \nsudo make install <br/></pre>\n<p>Windows users please download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a></p>\n<p><em>To report a bug:</em> Please open an issue in <a href=\"https://github.com/phalcon/cphalcon/issues?state=open\">Github</a>. <span id=\"result_box\"><span class=\"hps\">We highly recommend</span> <span class=\"hps\">that you make</span> <span class=\"hps\">tests using</span> <span class=\"hps\">the</span> <span class=\"hps\">latest versions of</span> <span class=\"hps\">PHP 5.3</span><span> (&gt;=5.3.11).</span></span></p>\n<div><em>To ask for help:</em> Use our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Community Group</a></div>\n<p>Looking forward to hearing from you! :)</p>","reblog":{"tree_html":"","comment":"<p><img src=\"http://i.qkme.me/355ovv.jpg\"></p>\n<p>It has been a really busy month and a half. We concentrated all of our efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of core parts of the framework. We increased flexibility, extensibility and added more features while still keeping performance high.</p>\n<p>Most of the examples and features present in previous versions work - however there might be some unexpected behavior (bugs) lurking around. All the tests are passing in our <a href=\"http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188\">Travis CI server</a> and the <a href=\"http://phalconphp.com\">official site</a> has been running on 0.5.0b1 for a few days now with no problems.</p>\n<p>We are now concentrating in writing documentation, fixing bugs and attending to areas that still need a bit of work.</p>\n<p>We would like to invite the community to install and test the new features of 0.5.0b1.</p>\n<p><em>To install 0.5.0b1:</em></p>\n<p>Follow the same instructions as installing the stable version. The only difference is that the files are located in the dev/ folder (instead of &ldquo;cd release&rdquo; issue &ldquo;cd dev&rdquo;).</p>\n<p>Checkout the following steps to compile the extension for a Linux/Mac platform:</p>\n<pre class=\"sh_sh\">git clone git://github.com/phalcon/cphalcon.git\ncd cphalcon/dev\nexport CFLAGS=\"-O2 -fno-delete-null-pointer-checks\"\nphpize\n./configure --enable-phalcon \nmake \nsudo make install <br></pre>\n<p>Windows users please download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a></p>\n<p><em>To report a bug:</em> Please open an issue in <a href=\"https://github.com/phalcon/cphalcon/issues?state=open\">Github</a>. <span id=\"result_box\"><span class=\"hps\">We highly recommend</span> <span class=\"hps\">that you make</span> <span class=\"hps\">tests using</span> <span class=\"hps\">the</span> <span class=\"hps\">latest versions of</span> <span class=\"hps\">PHP 5.3</span><span> (&gt;=5.3.11).</span></span></p>\n<div><em>To ask for help:</em> Use our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Community Group</a></div>\n<p>Looking forward to hearing from you! :)</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"30325463805"},"content":"<p><img src=\"http://i.qkme.me/355ovv.jpg\"></p>\n<p>It has been a really busy month and a half. We concentrated all of our efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of core parts of the framework. We increased flexibility, extensibility and added more features while still keeping performance high.</p>\n<p>Most of the examples and features present in previous versions work - however there might be some unexpected behavior (bugs) lurking around. All the tests are passing in our <a href=\"http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188\">Travis CI server</a> and the <a href=\"http://phalconphp.com\">official site</a> has been running on 0.5.0b1 for a few days now with no problems.</p>\n<p>We are now concentrating in writing documentation, fixing bugs and attending to areas that still need a bit of work.</p>\n<p>We would like to invite the community to install and test the new features of 0.5.0b1.</p>\n<p><em>To install 0.5.0b1:</em></p>\n<p>Follow the same instructions as installing the stable version. The only difference is that the files are located in the dev/ folder (instead of “cd release” issue “cd dev”).</p>\n<p>Checkout the following steps to compile the extension for a Linux/Mac platform:</p>\n<pre class=\"sh_sh\">git clone git://github.com/phalcon/cphalcon.git\ncd cphalcon/dev\nexport CFLAGS=\"-O2 -fno-delete-null-pointer-checks\"\nphpize\n./configure --enable-phalcon \nmake \nsudo make install <br></pre>\n<p>Windows users please download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a></p>\n<p><em>To report a bug:</em> Please open an issue in <a href=\"https://github.com/phalcon/cphalcon/issues?state=open\">Github</a>. <span id=\"result_box\"><span class=\"hps\">We highly recommend</span> <span class=\"hps\">that you make</span> <span class=\"hps\">tests using</span> <span class=\"hps\">the</span> <span class=\"hps\">latest versions of</span> <span class=\"hps\">PHP 5.3</span><span> (>=5.3.11).</span></span></p>\n<div><em>To ask for help:</em> Use our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Community Group</a></div>\n<p>Looking forward to hearing from you! :)</p>","content_raw":"<p><img src=\"http://i.qkme.me/355ovv.jpg\"></p>\r\n<p>It has been a really busy month and a half. We concentrated all of our efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of core parts of the framework. We increased flexibility, extensibility and added more features while still keeping performance high.</p>\r\n<p>Most of the examples and features present in previous versions work - however there might be some unexpected behavior (bugs) lurking around. All the tests are passing in our <a href=\"http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188\">Travis CI server</a> and the <a href=\"http://phalconphp.com\">official site</a> has been running on 0.5.0b1 for a few days now with no problems.</p>\r\n<p>We are now concentrating in writing documentation, fixing bugs and attending to areas that still need a bit of work.</p>\r\n<p>We would like to invite the community to install and test the new features of 0.5.0b1.</p>\r\n<p><em>To install 0.5.0b1:</em></p>\r\n<p>Follow the same instructions as installing the stable version. The only difference is that the files are located in the dev/ folder (instead of &ldquo;cd release&rdquo; issue &ldquo;cd dev&rdquo;).</p>\r\n<p>Checkout the following steps to compile the extension for a Linux/Mac platform:</p>\r\n<pre class=\"sh_sh\">git clone git://github.com/phalcon/cphalcon.git\r\ncd cphalcon/dev\r\nexport CFLAGS=\"-O2 -fno-delete-null-pointer-checks\"\r\nphpize\r\n./configure --enable-phalcon \r\nmake \r\nsudo make install <br></pre>\r\n<p>Windows users please download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a></p>\r\n<p><em>To report a bug:</em> Please open an issue in <a href=\"https://github.com/phalcon/cphalcon/issues?state=open\">Github</a>. <span id=\"result_box\"><span class=\"hps\">We highly recommend</span> <span class=\"hps\">that you make</span> <span class=\"hps\">tests using</span> <span class=\"hps\">the</span> <span class=\"hps\">latest versions of</span> <span class=\"hps\">PHP 5.3</span><span> (&gt;=5.3.11).</span></span></p>\r\n<div><em>To ask for help:</em> Use our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Community Group</a></div>\r\n<p>Looking forward to hearing from you! :)</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-08-028
-->


Phalcon 0.5.0 beta1 released!
=============================

![](http://i.qkme.me/355ovv.jpg)

It has been a really busy month and a half. We concentrated all of our
efforts in developing Phalcon 0.5.0, which outlines a huge rewrite of
core parts of the framework. We increased flexibility, extensibility and
added more features while still keeping performance high.

Most of the examples and features present in previous versions work -
however there might be some unexpected behavior (bugs) lurking around.
All the tests are passing in our [Travis CI
server](http://travis-ci.org/#!/phalcon/cphalcon/jobs/2247188) and the
[official site](http://phalconphp.com) has been running on 0.5.0b1 for a
few days now with no problems.

We are now concentrating in writing documentation, fixing bugs and
attending to areas that still need a bit of work.

We would like to invite the community to install and test the new
features of 0.5.0b1.

*To install 0.5.0b1:*

Follow the same instructions as installing the stable version. The only
difference is that the files are located in the dev/ folder (instead of
“cd release” issue “cd dev”).

Checkout the following steps to compile the extension for a Linux/Mac
platform:

~~~~ {.sh_sh}
git clone git://github.com/phalcon/cphalcon.git
cd cphalcon/dev
export CFLAGS="-O2 -fno-delete-null-pointer-checks"
phpize
./configure --enable-phalcon 
make 
sudo make install 
~~~~

Windows users please download a DLL from the [download
page](http://phalconphp.com/download)

*To report a bug:* Please open an issue in
[Github](https://github.com/phalcon/cphalcon/issues?state=open). We
highly recommend that you make tests using the latest versions of PHP
5.3 (\>=5.3.11).

*To ask for help:* Use our [Community
Group](https://groups.google.com/forum/#!forum/phalcon)

Looking forward to hearing from you! :)

