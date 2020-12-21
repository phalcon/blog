---
layout: post
title: "Help test Phalcon 0.4.0"
tags: [php, framework, test, help, "0.4", release, "0.x"]
---
Our next release, 0.4.0, is almost ready to rock, but we need your help to get the finish line in the best shape possible. Although [previous alpha](https://blog.phalcon.io/post/introducing-phalcon-0-4-0-alpha) only included improvements in code structure and overall speed, this version (0.4.0 beta) is introducing several new features, improvements and bug fixes. 

Below is a comprehensive list of changes:

<!--more-->
*Internal Refactor:*

- Moved zval separation to `phalcon_array_update_*`
- Moved zval separation to `phalcon_array_append_*`
- Moved zval constructor to `phalcon_array_update_*`
- Implemented functions to avoid use arrays of zvals parameters for static and method calls
- Removed error reporting silence from the extension
- Removed thousands of unnecessary referencing/deferencing vars when calling functions/methods
- Moved multi-dimensional array updates to less complex functions
- Moved access to static properties to a function that controls possible invalid access to nonexistent properties
- Refactored `Phalcon_Tag::select` and `Phalcon_Tag::selectStatic`, now uses the same code in `Phalcon_Tag_Select`

*Bug Fixes*:

- Fixed possible segmentation fault when releasing memory of zval strings that has constant values
- Fixed bug avoiding that auto-globals will jit-initialized inside Phalcon on some old versions of PHP
- Fixed memory leaks in `Phalcon_Cache` and `Phalcon_Transaction_Manager`
- Sometimes when Phalcon threw an internal exception or `E_ERROR` the memory stack was not properly cleaned producing an unstable state, this situation was fixed
- Dispatcher exceptions now throws a 404 Not found status correctly
- Fixed many bugs in `Phalcon_Model_Query`

*New Features*:

- Added virtual foreign keys to Phalcon_Model (ORM) [[More Info](https://docs.phalcon.io/latest/en/db-models#virtual-foreign-keys)]
- Implemented the possibility to serialize `Phalcon_Model_Resultset` objects
- Implemented the possibility to access `Phalcon_Model_Resultset` as an array of objects
- Added `Phalcon_Cache_Backend_Apc`, `Phalcon_Cache_Backend_Memcache`, `Phalcon_Cache_Frontend_None` and `Phalcon_Cache_Frontend_Data` [[More Info](https://docs.phalcon.io/latest/en/cache)]
- Added Phalcon_Request::hasPost and `Phalcon_Request::hasQuery`
- Added parameter "persistent" to Phalcon_Db allowing to create persistent connections
- Added alphanum to `Phalcon_Filter` to filter strings allowing filter only alpha-numeric characters
- Added `Phalcon_Tag::checkField` helper to create `input[type="checkbox"]` tags
- Added `Phalcon_View::getParams` to recover extra parameters sent in the request
- `Phalcon_View` was refactored to allow other templating engines like Mustache or Twig [[More info](https://docs.phalcon.io/latest/en/views#template-engines)]
- Added `Phalcon_Translate` for multilingual translation messages based on adapters
- Added calculation functions to Phalcon_Model: count, sum, average, minimum and maximum [[more info](https://docs.phalcon.io/latest/en/db-models#generating-calculations)]

We're pushing out a beta of the 0.4.0 code. Here's how you can help us out:

- Downloading the beta version from the downloads page and testing it with your actual applications or prototypes
- Running the unit-test suite in your own machine and send us feedback on the results. Find instructions on how doing that [here](https://github.com/phalcon/cphalcon/tree/master/tests)
- Giving us suggestions on the implementation of features before the definitive release

Although, the new version is passing all the [760 unit-tests](http://travis-ci.org/#!/phalcon/cphalcon/builds/1445961) on Travis-CI, there might be some odd bug pending to be fixed.

Let's make this release the best yet. 

Thanks in advance for all your help and support — it's appreciated more than you know!
