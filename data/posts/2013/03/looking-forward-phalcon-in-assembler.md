<!--
slug: looking-forward-phalcon-in-assembler
date: Sun Mar 31 2013 23:59:00 GMT-0400 (EDT)
tags: php, phalcon, april fool
title: Looking Forward: Phalcon in Assembler
id: 46821212307
link: http://blog.phalconphp.com/post/46821212307/looking-forward-phalcon-in-assembler
raw: {"blog_name":"phalconphp","id":46821212307,"post_url":"http://blog.phalconphp.com/post/46821212307/looking-forward-phalcon-in-assembler","slug":"looking-forward-phalcon-in-assembler","type":"text","date":"2013-04-01 03:59:00 GMT","timestamp":1364788740,"state":"published","format":"html","reblog_key":"Kh7HW1kq","tags":["php","phalcon","april fool"],"short_url":"http://tmblr.co/Z6Pumvhcmm2J","highlighted":[],"note_count":1,"title":"Looking Forward: Phalcon in Assembler","body":"<p><strong>UPDATE: Although write Phalcon in Assembler may be challenging, we regret to inform you that this was our April Fools&rsquo; joke, thanks for your great sense of humor! :)</strong></p>\n<p>Continuing our work of trying to make Phalcon even faster, we have decided to start migrating our code to <a href=\"http://en.wikipedia.org/wiki/Assembly_language\">assembler</a>.</p>\n<p>After some internal testing we have concluded that this is ​the next step for this project.</p>\n<p>We have​ estimated ​that the migration to assembler will take approximately two years but by the end Phalcon will be even faster.</p>\n<p>In addition to this, developers can write their own functions in assembler and be executed within PHP:</p>\n<p>Instead of this ugly and slow code:</p>\n<pre class=\"sh_php sh_sourceCode\">echo \"hello\";\n</pre>\n<p>You can run it in a faster and flexible way:</p>\n<pre class=\"sh_php sh_sourceCode\">$asm = '\n.extern printf\n.section .data\nhellotext:\n    .ascii \"hello\"\n.section .text\n.global do_php_echo\n.type do_php_echo, @function\n\ndo_php_echo:\n    pushl %ebp\n    movl %esp, %ebp\n    push hellotext\n    call printf\n    movl %ebp, %esp\n    pop %ebp\nret';\n\nPhalcon\\Asm::run($asm);\n</pre>\n<p>We are looking forward to the support of the community to begin this​ new phase. If you work in PHP and also are an expert in assembler, we invite you to join us.</p>\n<p>Enjoy!</p>","reblog":{"tree_html":"","comment":"<p><strong>UPDATE: Although write Phalcon in Assembler may be challenging, we regret to inform you that this was our April Fools&rsquo; joke, thanks for your great sense of humor! :)</strong></p>\n<p>Continuing our work of trying to make Phalcon even faster, we have decided to start migrating our code to <a href=\"http://en.wikipedia.org/wiki/Assembly_language\">assembler</a>.</p>\n<p>After some internal testing we have concluded that this is &#8203;the next step for this project.</p>\n<p>We have&#8203; estimated &#8203;that the migration to assembler will take approximately two years but by the end Phalcon will be even faster.</p>\n<p>In addition to this, developers can write their own functions in assembler and be executed within PHP:</p>\n<p>Instead of this ugly and slow code:</p>\n<pre class=\"sh_php sh_sourceCode\">echo \"hello\";\n</pre>\n<p>You can run it in a faster and flexible way:</p>\n<pre class=\"sh_php sh_sourceCode\">$asm = '\n.extern printf\n.section .data\nhellotext:\n    .ascii \"hello\"\n.section .text\n.global do_php_echo\n.type do_php_echo, @function\n\ndo_php_echo:\n    pushl %ebp\n    movl %esp, %ebp\n    push hellotext\n    call printf\n    movl %ebp, %esp\n    pop %ebp\nret';\n\nPhalcon\\Asm::run($asm);\n</pre>\n<p>We are looking forward to the support of the community to begin this&#8203; new phase. If you work in PHP and also are an expert in assembler, we invite you to join us.</p>\n<p>Enjoy!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"46821212307"},"content":"<p><strong>UPDATE: Although write Phalcon in Assembler may be challenging, we regret to inform you that this was our April Fools' joke, thanks for your great sense of humor! :)</strong></p>\n<p>Continuing our work of trying to make Phalcon even faster, we have decided to start migrating our code to <a href=\"http://en.wikipedia.org/wiki/Assembly_language\">assembler</a>.</p>\n<p>After some internal testing we have concluded that this is ​the next step for this project.</p>\n<p>We have​ estimated ​that the migration to assembler will take approximately two years but by the end Phalcon will be even faster.</p>\n<p>In addition to this, developers can write their own functions in assembler and be executed within PHP:</p>\n<p>Instead of this ugly and slow code:</p>\n<pre class=\"sh_php sh_sourceCode\">echo \"hello\";\n</pre>\n<p>You can run it in a faster and flexible way:</p>\n<pre class=\"sh_php sh_sourceCode\">$asm = '\n.extern printf\n.section .data\nhellotext:\n    .ascii \"hello\"\n.section .text\n.global do_php_echo\n.type do_php_echo, @function\n\ndo_php_echo:\n    pushl %ebp\n    movl %esp, %ebp\n    push hellotext\n    call printf\n    movl %ebp, %esp\n    pop %ebp\nret';\n\nPhalcon\\Asm::run($asm);\n</pre>\n<p>We are looking forward to the support of the community to begin this​ new phase. If you work in PHP and also are an expert in assembler, we invite you to join us.</p>\n<p>Enjoy!</p>","content_raw":"<p><strong>UPDATE: Although write Phalcon in Assembler may be challenging, we regret to inform you that this was our April Fools' joke, thanks for your great sense of humor! :)</strong></p>\r\n<p>Continuing our work of trying to make Phalcon even faster, we have decided to start migrating our code to <a href=\"http://en.wikipedia.org/wiki/Assembly_language\">assembler</a>.</p>\r\n<p>After some internal testing we have concluded that this is &#8203;the next step for this project.</p>\r\n<p>We have&#8203; estimated &#8203;that the migration to assembler will take approximately two years but by the end Phalcon will be even faster.</p>\r\n<p>In addition to this, developers can write their own functions in assembler and be executed within PHP:</p>\r\n<p>Instead of this ugly and slow code:</p>\r\n<pre class=\"sh_php sh_sourceCode\">echo \"hello\";\r\n</pre>\r\n<p>You can run it in a faster and flexible way:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$asm = '\r\n.extern printf\r\n.section .data\r\nhellotext:\r\n    .ascii \"hello\"\r\n.section .text\r\n.global do_php_echo\r\n.type do_php_echo, @function\r\n\r\ndo_php_echo:\r\n    pushl %ebp\r\n    movl %esp, %ebp\r\n    push hellotext\r\n    call printf\r\n    movl %ebp, %esp\r\n    pop %ebp\r\nret';\r\n\r\nPhalcon\\Asm::run($asm);\r\n</pre>\r\n<p>We are looking forward to the support of the community to begin this&#8203; new phase. If you work in PHP and also are an expert in assembler, we invite you to join us.</p>\r\n<p>Enjoy!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-03-031
-->


Looking Forward: Phalcon in Assembler
=====================================

**UPDATE: Although write Phalcon in Assembler may be challenging, we
regret to inform you that this was our April Fools' joke, thanks for
your great sense of humor! :)**

Continuing our work of trying to make Phalcon even faster, we have
decided to start migrating our code to
[assembler](http://en.wikipedia.org/wiki/Assembly_language).

After some internal testing we have concluded that this is ​the next
step for this project.

We have​ estimated ​that the migration to assembler will take
approximately two years but by the end Phalcon will be even faster.

In addition to this, developers can write their own functions in
assembler and be executed within PHP:

Instead of this ugly and slow code:

```php
echo "hello";
```

You can run it in a faster and flexible way:

```php
$asm = '
.extern printf
.section .data
hellotext:
    .ascii "hello"
.section .text
.global do_php_echo
.type do_php_echo, @function

do_php_echo:
    pushl %ebp
    movl %esp, %ebp
    push hellotext
    call printf
    movl %ebp, %esp
    pop %ebp
ret';

Phalcon\Asm::run($asm);
```

We are looking forward to the support of the community to begin this​
new phase. If you work in PHP and also are an expert in assembler, we
invite you to join us.

Enjoy!

