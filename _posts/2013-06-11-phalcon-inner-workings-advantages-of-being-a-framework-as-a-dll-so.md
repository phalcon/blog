---
layout: post
title: "Phalcon Inner Workings: Advantages of being a Framework as a DLL/SO"
tags: [php, phalcon, internals, performance, "1.x"]
---
This post is quite technical, explaining the inner workings of Phalcon. 

As a web developer, you don't need to know how it works (most of the times) so long as it works, and works well. However we believe that this article will allow users of the framework to understand some of the inner workings of Phalcon, and allow them to make decisions on the hardware they use, so as to maximize performance for their applications.

<!--more-->
In previous posts, we have explained how the compilation process aids in increasing Phalcon's performance by generating processor specific instructions.

In addition to that, we need to take into account that C-compilers are very mature, and can detect where the code can be optimized, removing unnecessary code, and preventing lots of errors by indicating which part of the code could lead to bugs such as uninitialized variables, wrong data types, etc.

Writing code in C reduces large amounts of overhead in several parts of the framework. However processors nowadays can execute millions of instructions per second, and therefore in some cases if the target machine does not have a high workload, the speed difference between Phalcon and plain PHP will go unnoticed.

Phalcon's speed doesn't only come from the optimization of instructions (due to the compilation process). Another important area where Phalcon shines is the memory reduction.

### Memory Reduction Overview
Phalcon is distributed as a [shared library](https://en.wikipedia.org/wiki/Library_(computing)), a [DLL (Dynamic-Link Library)](https://en.wikipedia.org/wiki/Dynamic-link_library) in Windows or as a  shared object in most Unix flavors. These files/structures have been optimized and matured over decades by operating system vendors. Although there are important differences between platforms, we could generalize that Phalcon's DLL/Shared object is composed mainly by these parts:

```sh
+------------------------+
| Variable Data Section  |
+------------------------+
| Read Only Data Section | <- Strings and numbers that are constants
+------------------------+
| Code Section           | <- Binary native instructions
|                        |
|                        |
|                        |
|                        |
|                        |
|                        |
+------------------------+
```

Currently Phalcon's compilation produces a binary of about 1.5Mb - which is very small. As seen in the above diagram, the *Code Section* and the Read Only Data Section (which is the largest part of the extension) are shared across requests/processes. This means that if the server runs 1,000 requests the same 1.5Mb is shared by all the requests, reducing dramatically the memory usage compared with any other PHP framework. 

Multiple processes can load same DLL/so library at the same base address or a different base address and still share same physical copy of the DLL/so in memory. This reduces memory consumption as well as disc swapping.

Every constant string and number in the extension is also shared by all the requests, which again can save huge amounts of memory.

This functionality allows us ample leeway, since the extension can grow much larger and more robust, without impacting the performance or its load time.

When function in Phalcon needs to be executed due to a call from the source code of a web application, it is already interpreted in the "binary language" that a processor understands, and it is simply executed from its position in the main memory, without any preparations, interpretations or compilations.

When PHP is used together with a bytecode cache (like APC) a similar methodology is used. The PHP bytecode is stored in [shared memory segments](https://en.wikipedia.org/wiki/Memory-mapped_file) and it's shared across requests reducing the memory usage and improving the performance. Minor issues with this approach is memory copying, fragmentation, etc. but we won't expand on that at the moment.

However, although the PHP bytecode is a high level language (according to processor execution), it is not literally binary code. Therefore it needs to be fetched from the shared memory segment (APC) to the process that executes the code, it needs to be prepared for execution by the Zend Engine and then executed. Phalcon clearly does not need these steps and thus this overhead is avoided. 

### PHP's performance is fine, why do I need more speed?
PHP offers great performance and unless an application is very big and complex, one will not consider it being the bottleneck. So why do we need more speed?

The answer is because a server's resources (memory/processor) are not unlimited. By utilizing the hardware as efficiently as possible, we can do more, e.g. serve more applications, allow more users to access each application, and of course keep the server costs at a minimum.

By offering more performance with less investment in hardware we can achieve more profits and satisfied users.

If we assume that we have a VPS with 256Mb RAM, the following calculations will give you an idea of what to expect from an application in terms of performance (*the calculations below are very optimistic but they could serve as an indication on what to expect*):

If every request takes 3Mb one could expect 256Mb / 3Mb = 75-90 requests filling all the memory in your server. This translates to slowness of the site, should a peak arise (say 100 requests). The more requests translates to more disk swapping and in return a slower site and unhappy users.

As seen above, Phalcon has a very low memory footprint, which allows the developer to create significantly more complex applications while using a smaller overhead for the framework.

**Network latency is my real problem**
This point is quite true with almost all web applications. This is the reason that CDN was introduced as well as Nginx implementations to serve static resources. If a page is generated in 240ms but the network latency is 450ms, the application will be delivering the page in more than 600ms and the page delivery perceived by the user will be around one second after the page is completely rendered.

Currently, getting a page in [more than 250ms is perceived as slow by the users](https://www.nytimes.com/2012/03/01/technology/impatient-web-users-flee-slow-loading-sites.html?pagewanted=all&_r=0), and slow websites/applications result in lost visitors, customers, money. etc.

With Phalcon responses are usually generated in around 10ms-35ms even if the server load is high, which means the even if the network latency is in the 200-225ms region, pages are generated faster and delivered to the users. With additional planning and tolls such as CDN, the network latency can be significantly reduced.

### Conclusion
In this blog post we outlined one of the main reasons on why Phalcon is significantly faster than most PHP frameworks. 

Our goal is to push the envelope even further, increasing performance and functionality as much as possible. 

We welcome your comments and contributions in our [Forum](https://forum.phalcon.io "Forum")  If you need to report a bug, feel free to do so in our [Github Issues](https://github.com/phalcon/cphalcon/issues?state=open) page. Any questions regarding how-to could be either directed in our [Forum](https://forum.phalcon.io "Forum") or [Stack Overflow](https://stackoverflow.com/questions/tagged/phalcon).

