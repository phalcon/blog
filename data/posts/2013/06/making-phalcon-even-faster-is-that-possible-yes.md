<!--
slug: making-phalcon-even-faster-is-that-possible-yes
date: Sun Jun 23 2013 19:57:00 GMT-0400 (EDT)
tags: phalcon, optimizations, compiling
title: Making Phalcon even faster. Is that possible? Yes!
id: 53713853781
link: http://blog.phalconphp.com/post/53713853781/making-phalcon-even-faster-is-that-possible-yes
raw: {"blog_name":"phalconphp","id":53713853781,"post_url":"http://blog.phalconphp.com/post/53713853781/making-phalcon-even-faster-is-that-possible-yes","slug":"making-phalcon-even-faster-is-that-possible-yes","type":"text","date":"2013-06-23 23:57:00 GMT","timestamp":1372031820,"state":"published","format":"html","reblog_key":"5SZAxDeK","tags":["phalcon","optimizations","compiling"],"short_url":"http://tmblr.co/Z6Pumvo1c5rL","highlighted":[],"note_count":2,"title":"Making Phalcon even faster. Is that possible? Yes!","body":"<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/phalcon-php-logo.png\" width=\"300\"/></div>\n<div>\n<p>The Phalcon Team is constantly trying to find ways of making Phalcon even faster while keeping a good balance in terms of features offered and performance.</p>\n</div>\n<p>Today, we are happy to announce that <strong>profile-guided optimizations are available in Phalcon</strong>!</p>\n<p>In a recent post, we have highlighted how implementing Phalcon as a DLL/Shared Object (so) helps with the optimization of the memory usage while running PHP applications on a web server. Phalcon&rsquo;s installation is structured in such a way that it takes advantage of specific optimizations available in the target machine. In most cases, this is more than enough to offer high performance.</p>\n<p><strong><span>PGO</span></strong></p>\n<p><span>A new feature as far as optimizations is concerned is now available, taking advantage of the compiled nature of Phalcon!</span></p>\n<p><span>Profile-guided optimization (<a href=\"http://en.wikipedia.org/wiki/Profile-guided_optimization\">PGO</a>), is a compiler optimization technique in computer programming that is aimed to improve runtime performance of applications. In contrast to traditional optimization techniques that  solely use the source code, PGO uses the results of test runs of the application to optimize the final generated code.</span></p>\n<p><strong><span>What does this mean?</span></strong></p>\n<p><span>Every environment and application is different and every application requires certain components that other applications do not. This particular optimization <em>teaches</em> the compiler which functions are executed more frequently and which functions are not. </span></p>\n<p><span>Starting from 1.2, we are offering a new installation that compiles Phalcon with profiling enabled. </span></p>\n<p>The functioning works as follows:</p>\n<ul><li><span>Compile Phalcon with profiling</span></li>\n<li><span>Execute your application extensively</span></li>\n<li><span>Compile Phalcon again taking advantage of the profiled data</span></li>\n</ul><p><span>You need at least GCC 4.5 to use PGO, the instruction to compile with profiling is:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./pgo-install</pre>\n<p><span>Restart your webserver, test/execute the applications, Restart your webserver again, compile using the data collected:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./use-pgo-install</pre>\n<p><span>Restart your webserver and enjoy and even-more-optimized version of Phalcon for your specific needs!</span></p>","reblog":{"tree_html":"","comment":"<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/phalcon-php-logo.png\" width=\"300\"></div>\n<div>\n<p>The Phalcon Team is constantly trying to find ways of making Phalcon even faster while keeping a good balance in terms of features offered and performance.</p>\n</div>\n<p>Today, we are happy to announce that <strong>profile-guided optimizations are available in Phalcon</strong>!</p>\n<p>In a recent post, we have highlighted how implementing Phalcon as a DLL/Shared Object (so) helps with the optimization of the memory usage while running PHP applications on a web server. Phalcon&rsquo;s installation is structured in such a way that it takes advantage of specific optimizations available in the target machine. In most cases, this is more than enough to offer high performance.</p>\n<p><strong><span>PGO</span></strong></p>\n<p><span>A new feature as far as optimizations is concerned is now available, taking advantage of the compiled nature of Phalcon!</span></p>\n<p><span>Profile-guided optimization (<a href=\"http://en.wikipedia.org/wiki/Profile-guided_optimization\">PGO</a>), is a compiler optimization technique in computer programming that is aimed to improve runtime performance of applications. In contrast to traditional optimization techniques that &nbsp;solely use the source code, PGO uses the results of test runs of the application to optimize the final generated code.</span></p>\n<p><strong><span>What does this mean?</span></strong></p>\n<p><span>Every environment and application is different and every application requires certain components that other applications do not. This particular optimization <em>teaches</em>&nbsp;the compiler which functions are executed more frequently and which functions are not.&nbsp;</span></p>\n<p><span>Starting from 1.2, we are offering a new installation that compiles Phalcon with profiling enabled.&nbsp;</span></p>\n<p>The functioning works as follows:</p>\n<ul><li><span>Compile Phalcon with profiling</span></li>\n<li><span>Execute your application extensively</span></li>\n<li><span>Compile Phalcon again taking advantage of the profiled data</span></li>\n</ul><p><span>You need at least GCC 4.5 to use PGO, the instruction to compile with profiling is:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./pgo-install</pre>\n<p><span>Restart your webserver, test/execute the applications, Restart your webserver again, compile using the data collected:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./use-pgo-install</pre>\n<p><span>Restart your webserver and enjoy and even-more-optimized version of Phalcon for your specific needs!</span></p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"53713853781"},"content":"<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/phalcon-php-logo.png\" width=\"300\"></div>\n<div>\n<p>The Phalcon Team is constantly trying to find ways of making Phalcon even faster while keeping a good balance in terms of features offered and performance.</p>\n</div>\n<p>Today, we are happy to announce that <strong>profile-guided optimizations are available in Phalcon</strong>!</p>\n<p>In a recent post, we have highlighted how implementing Phalcon as a DLL/Shared Object (so) helps with the optimization of the memory usage while running PHP applications on a web server. Phalcon's installation is structured in such a way that it takes advantage of specific optimizations available in the target machine. In most cases, this is more than enough to offer high performance.</p>\n<p><strong><span>PGO</span></strong></p>\n<p><span>A new feature as far as optimizations is concerned is now available, taking advantage of the compiled nature of Phalcon!</span></p>\n<p><span>Profile-guided optimization (<a href=\"http://en.wikipedia.org/wiki/Profile-guided_optimization\">PGO</a>), is a compiler optimization technique in computer programming that is aimed to improve runtime performance of applications. In contrast to traditional optimization techniques that  solely use the source code, PGO uses the results of test runs of the application to optimize the final generated code.</span></p>\n<p><strong><span>What does this mean?</span></strong></p>\n<p><span>Every environment and application is different and every application requires certain components that other applications do not. This particular optimization <em>teaches</em> the compiler which functions are executed more frequently and which functions are not. </span></p>\n<p><span>Starting from 1.2, we are offering a new installation that compiles Phalcon with profiling enabled. </span></p>\n<p>The functioning works as follows:</p>\n<ul><li><span>Compile Phalcon with profiling</span></li>\n<li><span>Execute your application extensively</span></li>\n<li><span>Compile Phalcon again taking advantage of the profiled data</span></li>\n</ul><p><span>You need at least GCC 4.5 to use PGO, the instruction to compile with profiling is:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./pgo-install</pre>\n<p><span>Restart your webserver, test/execute the applications, Restart your webserver again, compile using the data collected:</span></p>\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\n./use-pgo-install</pre>\n<p><span>Restart your webserver and enjoy and even-more-optimized version of Phalcon for your specific needs!</span></p>","content_raw":"<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/phalcon-php-logo.png\" width=\"300\"></div>\r\n<div>\r\n<p>The Phalcon Team is constantly trying to find ways of making Phalcon even faster while keeping a good balance in terms of features offered and performance.</p>\r\n</div>\r\n<p>Today, we are happy to announce that <strong>profile-guided optimizations are available in Phalcon</strong>!</p>\r\n<p>In a recent post, we have highlighted how implementing Phalcon as a DLL/Shared Object (so) helps with the optimization of the memory usage while running PHP applications on a web server. Phalcon's installation is structured in such a way that it takes advantage of specific optimizations available in the target machine. In most cases, this is more than enough to offer high performance.</p>\r\n<p><strong><span>PGO</span></strong></p>\r\n<p><span>A new feature as far as optimizations is concerned is now available, taking advantage of the compiled nature of Phalcon!</span></p>\r\n<p><span>Profile-guided optimization (<a href=\"http://en.wikipedia.org/wiki/Profile-guided_optimization\">PGO</a>), is a compiler optimization technique in computer programming that is aimed to improve runtime performance of applications. In contrast to traditional optimization techniques that &nbsp;solely use the source code, PGO uses the results of test runs of the application to optimize the final generated code.</span></p>\r\n<p><strong><span>What does this mean?</span></strong></p>\r\n<p><span>Every environment and application is different and every application requires certain components that other applications do not. This particular optimization <em>teaches</em>&nbsp;the compiler which functions are executed more frequently and which functions are not.&nbsp;</span></p>\r\n<p><span>Starting from 1.2, we are offering a new installation that compiles Phalcon with profiling enabled.&nbsp;</span></p>\r\n<p>The functioning works as follows:</p>\r\n<ul><li><span>Compile Phalcon with profiling</span></li>\r\n<li><span>Execute your application extensively</span></li>\r\n<li><span>Compile Phalcon again taking advantage of the profiled data</span></li>\r\n</ul><p><span>You need at least GCC 4.5 to use PGO, the instruction to compile with profiling is:</span></p>\r\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\r\n./pgo-install</pre>\r\n<p><span>Restart your webserver, test/execute the applications, Restart your webserver again, compile using the data collected:</span></p>\r\n<pre class=\"sh_php sh_sourceCode\">cd cphalcon/build\r\n./use-pgo-install</pre>\r\n<p><span>Restart your webserver and enjoy and even-more-optimized version of Phalcon for your specific needs!</span></p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-06-023
-->


Making Phalcon even faster. Is that possible? Yes!
==================================================

![image](http://static.phalconphp.com/blog/img/phalcon-php-logo.png)

The Phalcon Team is constantly trying to find ways of making Phalcon
even faster while keeping a good balance in terms of features offered
and performance.

Today, we are happy to announce that **profile-guided optimizations are
available in Phalcon**!

In a recent post, we have highlighted how implementing Phalcon as a
DLL/Shared Object (so) helps with the optimization of the memory usage
while running PHP applications on a web server. Phalcon's installation
is structured in such a way that it takes advantage of specific
optimizations available in the target machine. In most cases, this is
more than enough to offer high performance.

**PGO**

A new feature as far as optimizations is concerned is now available,
taking advantage of the compiled nature of Phalcon!

Profile-guided optimization
([PGO](http://en.wikipedia.org/wiki/Profile-guided_optimization)), is a
compiler optimization technique in computer programming that is aimed to
improve runtime performance of applications. In contrast to traditional
optimization techniques that  solely use the source code, PGO uses the
results of test runs of the application to optimize the final generated
code.

**What does this mean?**

Every environment and application is different and every application
requires certain components that other applications do not. This
particular optimization *teaches* the compiler which functions are
executed more frequently and which functions are not. 

Starting from 1.2, we are offering a new installation that compiles
Phalcon with profiling enabled. 

The functioning works as follows:

-   Compile Phalcon with profiling
-   Execute your application extensively
-   Compile Phalcon again taking advantage of the profiled data

You need at least GCC 4.5 to use PGO, the instruction to compile with
profiling is:

~~~~ {.sh_php .sh_sourceCode}
cd cphalcon/build
./pgo-install
~~~~

Restart your webserver, test/execute the applications, Restart your
webserver again, compile using the data collected:

~~~~ {.sh_php .sh_sourceCode}
cd cphalcon/build
./use-pgo-install
~~~~

Restart your webserver and enjoy and even-more-optimized version of
Phalcon for your specific needs!

