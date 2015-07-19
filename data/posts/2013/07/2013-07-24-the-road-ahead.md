The road ahead
==============

![image]({{ cdnUrl }}/files/2013-07-24-phalcon-php-logo.png)

With every release, throughout the development of Phalcon, we have always focused on offering a good balance between new features (driven by the community) and bug fixes/optimizations.

Because of that, some areas of the framework have suffered, mainly unit tests and documentation. Despite the fact that our documentation is very thorough, there is a lot of room for improvement. The same goes with the unit tests of course.

We have therefore decided to take a short NFR hiatus, dedicating two stints/versions to improve on those areas that need improving. 

For the upcoming 1.3/1.4 versions, developers should expect to see:

- Our initial attempt on addressing subqueries in PHQL. We will start with the

  ```WHERE (SELECT ... FROM ...)```
  
  support for MySQL and move towards other ORMs. Once that is completed we will address other usages of subqueries such as

  ```SELECT x = (SELECT ... FROM ...)```
  
  etc. This feature will span through more than one versions.
- Go through the documents with a fine tooth comb and add numerous examples on every page. We will also improve on the English so that instructions are clear and precise. We would welcome all of you that contributed in translating the documentation to do just that, and also invite others to join that effort.
- Enhance the unit tests of the framework. The goal is to move all unit tests in our latest test suite (php-tests subfolder) and decommission the old one. The new unit tests will be a lot more thorough than their predecessors, testing features in all ORMs and all application setups (Single/Multi module/Micro).
- Speed up the framework. There is always room for improvement! We have been discussing regarding some changes in the kernel of the framework that would reduce processing cycles while increasing performance for certain tasks. Utility functions are to be revisited so as faster versions of them can be implemented if possible, squeezing even more performance from the framework.

Smaller NFRs will also be addressed during those two versions. Our Roadmap will inform you of what is coming down the line.

Naturally, bugs will also have a high priority during those two versions. 

A big thank you to all that have contributed, are contributing and will contribute to Phalcon, via contributions, discussion and bug discovery/reporting.


<3 The Phalcon Team
