---
layout: post
title: Phalcon v6.0.0-alpha.1 - we rewrote the whole thing in PHP
image: /assets/files/2026-06-19-phalcon-6.0.0alpha1-release.svg
date: 2026-06-19T00:01:02.699Z
tags:
  - phalcon
  - phalcon6
  - release
---
Finally! Deep breath. **Phalcon [v6.0.0alpha1][6.0.0alpha1] has been released!**

<!--more-->

```bash
composer require phalcon/phalcon:^6.0@alpha
```

If you've followed Phalcon for any length of time, you know what that command *did not* use to look like. For more than a decade, getting Phalcon onto a box meant compiling a C extension, matching it to your PHP version, fighting your package manager, and praying the build gods were in a good mood. That was the whole identity of the project: a framework that lived in C so your app could fly.

v6 takes a new approach. **Phalcon is now pure PHP.** No extension. No compile step. No `pecl`. Just `composer require` and you are writing code. Same framework you know - `Phalcon\` namespaces, the DI container, the ORM, Volt, all of it - except now it's PHP all the way down.

This is the first public build of that effort, and we want to talk about what it actually took, because the headline ("now in PHP!") really undersells the ridiculous amount of work hiding behind it. Allow us to look at some numbers:

## ~6 years and 2,571 commits

The first commit on the PHP port lands on **2020-08-29**. This alpha lands today, **2026-06-19**. That's nearly **six years**.

Six years, **2,571 commits**, **15 contributors**, to get to an *alpha*. Not because anyone was slacking - because porting a mature, full-stack framework is not "translate the syntax and ship it." Every class, every adapter, every quietly load-bearing edge case that cphalcon had handled correctly for years had to be re-expressed in PHP and then *proven* to behave the same way. Where it stands today:

- **1,336 PHP files** and **~161,800 lines** in `src/`.
- A test suite of **2,873 test files** and **5,892 test methods** - about **225,000 lines** of tests on its own.

That's not generated boilerplate. That's a framework, rebuilt.

## The part nobody believes: it was all by hand

Here's the detail that makes other developers wince when we tell them.

Until about **two months ago, all of this synchronization was done by hand.** No codegen. No AI in the loop. When something changed in cphalcon, one of us humans opened the Zephir/C source, read it, understood *why* it did what it did, and wrote the equivalent PHP - keeping two large codebases in lockstep across well over a thousand files, one function at a time.

It is exactly as tedious as it sounds, and it's worse than it sounds, because the failure mode is silent. Miss one branch in one conditional and nothing explodes today. It explodes three weeks later inside a test you did not think was related, and now you are bisecting your own memory.

AI assistance only joined for the final stretch, to take some of the grind out of the sync. By that point the overwhelming majority of the port had already been typed out the hard way. We want to be straight about that, because "_we used some tooling at the end_" is very different from "_a machine wrote our framework._" It did not. We did.

## The parsers nearly broke us: PHQL and Volt

If there's one place this project went from "_long slog_" to "_what have we done_," it's the parsers.

Phalcon ships two little languages: **PHQL** (the model query language) and **Volt** (the templating engine). In cphalcon these are not even Zephir - they are C, generated out of [lemon](https://www.hwaci.com/sw/lemon/) grammars and a hand-written scanner, then wired straight into the extension. So there was no friendly high-level source to port. There was *this*:

- **PHQL** in C: a **6,174-line** scanner plus a **3,262-line** generated parser.
- **Volt** in C: a **5,744-line** scanner plus a **3,976-line** generated parser.

That's roughly **19,000 lines** of dense, machine-generated, goto-laden C whose entire job is to turn strings into exact syntax trees. You do not "refactor" that into PHP. You reproduce it. Token for token. State transition for state transition. Error message for error message - because somewhere out there an app relies on the *specific* exception text when a query is malformed, and "close enough" means you just broke production for a stranger. 

Jeckerson has been a rock here, doing all of it by hand and spending endless hours debugging, fixing, reproducing and fixing again.

The result is two standalone PHP projects that now feed the framework:

- **Volt** -> **13 files, ~11,150 lines** of PHP (work started 2022-10-24).
- **PHQL** -> **8 files, ~8,230 lines** of PHP (work started 2024-12-14).

So: ~19k lines of generated C, reborn as ~19k lines of hand-written PHP that has to behave *identically*. Getting a query to parse took an afternoon. Getting it to parse into the exact same structure as the C version, with the exact same weird corners, took months.

## Endless, character-by-character debugging

When your spec is literally "behave byte-for-byte like this other codebase," *almost right* is just a fancy way of spelling *wrong*.

A test that passed over in cphalcon but failed here always meant something subtle was off: a type juggle PHP does differently, a default that did not carry over, an order of operations, a scanner eating one token too early. We chased an absurd number of these. Some took five minutes. Some ate a whole day and ended with a one-character fix and a long, quiet stare at the wall. Every single one had to be hunted down, because the bar was never "mostly works." The bar was **parity**.

## We rebuilt the tests on PHPUnit, and synced those too

You can not *claim* parity - you have to prove it, continuously. So the entire testing approach was moved over to **PHPUnit** and then synchronized with cphalcon's suite.

The rule we held ourselves to: a test in this repo should be runnable against cphalcon with no changes, and vice versa. Same inputs, same expectations, both engines. That shared test surface is the whole argument. We are not asking you to trust that the PHP port behaves like the C extension - we are pointing at ~5,900 test methods that pass against both. Every green check is one more promise that your app behaves the way it always did.

## Oh, and the target kept moving

The genuinely unfair part: **cphalcon never sat still while we did this.**

The C extension kept shipping - bug fixes, new features, improvements, all on its own schedule. Every one of those had to be caught and mirrored into the PHP port too. We were not copying a frozen snapshot; we were re-implementing a living, moving codebase *and* keeping pace with every change it made while we ran after it. Finish the port, and also never fall behind the thing you are porting. Both. At once. For years.

## What "alpha" actually means here

The expectations:

- It's an **alpha**. APIs can still shift before stable.
- You **will** hit rough edges. Please open issues when you do - that is the entire point of shipping this now.
- **Do not put it in production** yet.

What it *is*: a real, `composer require`-able, pure-PHP Phalcon you can pull down today, poke at, break, and help us fix. Every bug report and every test case you send sharpens the path to stable.

## Thanks

To everyone who hand-wrote those lines, hunted those one-character bugs, and flat refused to settle for "close enough" - thank you. And to the backers and the community who stuck around through years of a quiet rewrite that had almost nothing flashy to show until right now: this one's yours.

The framework that built its name as a C extension now runs as plain PHP. Go break it:

```bash
composer require phalcon/phalcon:^6.0@alpha
```

[6.0.0alpha1]: https://github.com/phalcon/phalcon/releases/tag/v6.0.0alpha1
