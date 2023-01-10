---
layout: post
title: Phalcon 5.1.4 Released and Update
image: /assets/files/2023-01-10-phalcon-5.1.4-release.png
date: 2023-01-10T22:21:09.751Z
tags:
  - phalcon
  - phalcon5
  - release
---
Phalcon 5.1.4 is now available! This release contains a bug fix for the ACL adapter producing warnings.

<﻿!--more-->

T﻿hank you to our community member that discovered this, otherwise those that used the `Phalcon\Acl\Adapter\Memory` would have been inundated with warnings about a deprecated Reflection method.

#﻿## Update

W﻿e have not been very active with our bug fixes or new functionality in the `phalcon/cphalcon` repository lately. This is because we have been working hard on the `phalcon/phalcon` repository (the v6 version), to _translate_ all the code from Zephir to PHP. 

T﻿he reason behind this shift is that there are several issues with our ORM, pertaining to related records, and finding the issues and fixing them in `cphalcon` was going to be a very time consuming task. As such, we opted to work on v6, find the bugs there and then move them over to `cphalcon`.

R﻿ight now, the `Phalcon\Http` namespace is nearly done and after that there are a couple of files left for the `Phalcon\Mvc` namespace. With those two we will be in a position to debug and diagnose the issues at hand. 

T﻿his will also bring us closer to having v6 ready and potentially release an alpha version for it.

A big thank you to our community!

