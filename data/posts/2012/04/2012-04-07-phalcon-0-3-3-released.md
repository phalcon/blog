Phalcon 0.3.3 released
======================

We're proud to announce the immediate availability of Phalcon 0.3.3. The last 
version 0.3.2 was a bugfix/maintenance release. 

This is a short list of changes that can be expected in this version:

0.3.3

- Added `Phalcon\Tag::setDefault` as an alias for `Phalcon\Tag::displayTo`
- Added `Phalcon\View::setVar` as an alias for `Phalcon\View::setParamToView`
- Added `Phalcon\ACL` management with in-memory lists 
  [More Info](https://docs.phalconphp.com/en/latest/reference/acl.html)
- Fixed segfaults on methods with array optional parameters
- Fixed segfaults on some internal isset
- Added built-in model attributes validators for `Phalcon\Model` 
  [More Info](https://docs.phalconphp.com/en/latest/reference/models.html#validating-data-integrity)
- Added missing `Phalcon\Tag::passwordField` [#2](https://github.com/phalcon/cphalcon/issues/2)

0.3.2

- Fixed separation of super globals by mistake causing segmentation faults
- Support for compilation on Visual C++ 6.0
- Fixed segmentation faults when required parameters are not given for most methods

Our newest release is our most stable and feature-rich release yet. 

A huge thanks to all involved in terms of both contributions through ideas, 
tickets, documentation, and those whom have otherwise contributed to the 
framework. :)

<3 Phalcon Team