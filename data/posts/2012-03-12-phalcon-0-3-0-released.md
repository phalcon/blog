Phalcon 0.3.0 released
======================

Last week, we were working on a huge refactoring over many aspects of Phalcon. Once all code in the last 0.2.x branch has reached maturity and reasonable stability We are now working on a new exciting branch producing a cleaner code base which let us to add many improvements as possible.

The current list of changes is:

- Refactoring many code patterns as C macros, the total base code was reduced by about 8000 lines of code less.
- Most function calls were rewritten to avoid any string length counting by avoiding potential use of strlen. Functions and method names have fixed string lengths improving general performance. This improvement was also implemented for static string concatenation.
- We have implemented some kind of [Register Allocation](http://en.wikipedia.org/wiki/Register_allocation) to take advantage of processor registers. However, the compiler will choose best register allocations when it compiles the extension.
- Support for PHP 5.4. A number of issues when running Phalcon under PHP 5.4 were identified and corrected.
- In some cases memory was copied without need when updating internal arrays, they were fixed.
- A function cache was included to avoid potential function lookups on internal HashTables. This cache stores internal pointers to functions low level code improving performance.

We would like to thank each and every person who has contributed feedback, testing, and more for the last release and invite you to send us your comments on the new branch.

<3 Phalcon Team