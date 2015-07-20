Looking Forward: Phalcon in Assembler
=====================================

**UPDATE: Although write Phalcon in Assembler may be challenging, we regret to inform you that this was our April Fools' joke, thanks for your great sense of humor! :)**

Continuing our work of trying to make Phalcon even faster, we have decided to start migrating our code to [assembler](http://en.wikipedia.org/wiki/Assembly_language).

After some internal testing we have concluded that this is ​the next step for this project.

We have​ estimated ​that the migration to assembler will take approximately two years but by the end Phalcon will be even faster.

In addition to this, developers can write their own functions in assembler and be executed within PHP:

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

We are looking forward to the support of the community to begin this​ new phase. If you work in PHP and also are an expert in assembler, we invite you to join us.

Enjoy!
