---
layout: post
title: Trial and Error
date: 2019-07-06T16:42:03.251Z
tags:
  - phalcon
  - phalcon4
  - restructuring
---
Phalcon has always been focused in performance and usability. We strive to offer the fastest, easiest to use framework.

One of our efforts led to what developers call a _rabbit hole_ that we had to get out of so to speak.

### The idea
The idea we had was to split Phalcon into smaller extensions. We have discussed this before as well as recently during our [June Community Hangout](https://www.youtube.com/watch?v=YfTzAfC4DKo)

The way this was going to work was as follows:
- We generate code and create an extension called `phalcon-config.so` that exposes `Phalcon\Config`
- We generate code and create another extension called `phalcon-escaper` that exposes `Phalcon\Escaper`

Then we could just load both extensions on our web server

```ini
extension=phalcon-config.so
extension=phalcon-escaper.so
```
and we will have both `Phalcon\Config` and `Phalcon\Escaper` exposed, ready to be used in our applications.

Loading the full framework would be just a matter of either loading all the necessary extensions or loading a `phalcon-full.so` extension.

The rationale behind this was that we can squeeze more performance while utilizing less resources. If a developer needed to use only the `Config`, `Filter`, `Escaper` and `Micro` they would just load them and utilize just those components for their application, resulting in less memory used by Phalcon and more available to the application.

### The problem
There are two issues with the above approach:
- Can we do it (technologically)
- What is the gain vs. reward ratio

The answer to the `can we do it` was relatively simple. Serghei did quite a bit of research and found that it is feasible to load two extensions on the same web server exposing the same namespace.

However we found out that at this moment [Zephir](https://zephir-lang.com) cannot do this for us so we would have to do it using pure C.

The `gain vs reward` was what made us abandon this idea and backtrack.

In order to realize the above, we would have to pretty much rewrite Zephir from the ground up. The current implementation of Zephir cannot help with the above and in order to achieve the goals mentioned above we would have to do a serious refactor, pretty much a full rewrite.

The final indication that this was not going to help the framework was the extension itself. At the moment the extension is using around 5Mb of memory which in the grand scheme of things is a small amount of memory, since this is not 1990 :)

### Wrapping up
In the last month we have been _preparing_ for the above, moving certain classes into their respective folders. An example was `Phalcon\Config` became `Phalcon\Config\Config`. This was going to help with the above idea but it was going to bring a bit of confusion to the community - it seemed alien as a naming convention. It was however the best we could do in order to make the above idea work. 

Now that the decision has been made to backtrack, developers will be happy to hear that no more `Phalcon\Config\Config`. We are going back to the good old `Phalcon\Config`.

One of our [latest pull requests](https://github.com/phalcon/cphalcon/pull/14234) reorganized things back to where they used to be, so now we can still use `Phalcon\Config`, `Phalcon\Escaper` etc. The one thing we did was to move the interfaces from the root namespace to their respective folders. So for instance the `Phalcon\DiInterface` is now `Phalcon\Di\DiInterface`. The root namespace contains only classes not interfaces.

And there goes another experiment, another effort to make Phalcon better for our users.

Thank you to all that make this framework better every day!

<3 Phalcon Team
