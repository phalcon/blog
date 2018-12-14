---
layout: post
title: "Benchmarking Phalcon Micro"
tags: [php, phalcon, phalcon3, benchmarks, performance, fatfree, limonade, lumen, phalcon micro, silex]
---

Continuing from our yesterday's [post](/post/benchmarking-phalcon-micro), we are checking the benchmarks for micro PHP frameworks.

<h5 class="alert alert-info">
From feedback from the community, we intend to expand this test to be a bit more realistic, offering CRUD tests, JSON responses etc. We will work on this with the community in our repo so any help and suggestions are more than welcome!
</h5>

Phalcon offers the `Phalcon\Mvc\Micro` application, used to create micro applications. Again we hope that this blog post will give an indication on what one can expect from a Phalcon Micro application. Note that this [blog](https://github.com/phalcon/blog) and our [website](https://github.com/phalcon/website) both run using the Phalcon Micro application. Both sites run on an Amazon VM with 512Mb RAM and 1 vCPU.

<!--more-->
### Methodology
We used the same methodology as when benchmarking the full frameworks. A simple `Hello World` was displayed on the screen. Naturally, this is not a real life example, but it demonstrates the minimum resources needed to display a simple string on the screen.

As with the previous test, we are measuring the the time it takes for each framework to start, run each action, present the result needed and free up the resources at the end of the request. Any PHP application based on the said framework will need this time and resources. It is safe to assume that any implementations that will be much more complex than this one will require additional resources per request.

The [ab](http://httpd.apache.org/docs/2.4/en/programs/ab.html) benchmarking tool from Apache was used for these tests. 1,000 requests using 5 concurrent connections for each framework.

### Results
We will start with the results of our benchmark. The hardware used, raw data as well as setup/configuration changes we did for each framework are further down in this post.

#### Included Files
We have used the [get_included_files()](http://php.net/manual/en/function.get-included-files.php) function to figure out how many files have been included for one request. The call to the function was at the end of the entry point, usually `index.php` (lower is better). As one can expect, most micro frameworks can be dispatched in one file. 

![image](/assets/files/2017-04-14-files-per-request.png)

#### Memory used (KB)
We have used the [memory_get_usage()](http://php.net/manual/en/function.memory_get_usage.php) function to figure out how many much memory was used for each request. The call to this function was at the end of the entry point, usually `index.php`. (lower is better).

![image](/assets/files/2017-04-14-memory-per-request.png)

#### Requests per Second (mean)
Using the [ab](http://httpd.apache.org/docs/2.4/en/programs/ab.html) tool, we measured the requests per second that each framework could handle. (higher is better).

![image](/assets/files/2017-04-14-requests-per-second.png)

#### Time to complete 1,000 requests
Again using the [ab](http://httpd.apache.org/docs/2.4/en/programs/ab.html) tool, we measured the time it took to complete 1,000 requests.  (lower is better).

![image](/assets/files/2017-04-14-requests-time.png)

### Conclusion
Just as our previous benchmark, Phalcon is outperforming any other framework in this test. 

A couple of observations:
- We modified `Lumen` and `Silex` moving services, routes etc. to the `index.php` file so that we can have a more realistic idea of how many files would be included for a simple request.
- In the `Requests per Second` test, the requests are much closer between `Phalcon`, `Limonade` and `FatFree`. Still 100-300 requests per second slower, but this shows how these frameworks perform in the micro application world.
- The `Time to complete` test is also close between `Phalcon`, `Limonade` and `FatFree`, between 0.1-0.2 seconds.
 
Again we will stress out that these are bare bones applications on Micro frameworks, intended to give you an idea of how fast your framework is, in a simple test. The results will definitely vary based on your installation and implementation. Adding more services as needed by the functionality of each application developed will significantly increase the values shown above (or decrease in the `Requests per second` test).

As mentioned in our previous post **nothing beats a good design** or better yet, **the best design for the application needs**. Phalcon offers a fast full stack framework as well as a micro one. The main difference (here comes the sales pitch <i class="fa fa-smile-o"></i>) is that since Phalcon is memory resident and loosely coupled, it offers a wealth of components ready to be used whenever needed, without having to slim down the framework itself i.e. speed vs. features. It is worth a look.

<h5 class="alert alert-danger">
<strong>NOTE</strong>: If any of our readers have suggestions that we could implement to make this benchmark as realistic as possible, feel free to issue a pull request with your suggestions or your submission of another framework  
</h5>

<h5 class="alert alert-info">
The last benchmark that one can find is from <a href="https://www.techempower.com/benchmarks/#section=data-r13&hw=ph&test=json&l=4fthbz">TechEmpower</a> which was conducted on November 16, 2016. According to their test schedule, we should have seen round 14 in February this year but that has not happened yet. 
</h5>


<3 Phalcon Team


### Appendix
#### Github Repo
[Framework Benchmarks](https://github.com/phalcon/framework-bench)

#### Hardware
I set up a virtual machine with Ubuntu Server 16.10. We stopped the X server and allocated 4GB of RAM and 50GB of hard drive space.

After the system was updated to the latest packages, Apache was installed on the virtual machine. For PHP and Phalcon we chose to use PHP 7.1 using the PPA from [Ondřej Surý](https://launchpad.net/~ondrej).

#### PHP
##### Version
```bash
PHP 7.1.3-3+deb.sury.org~yakkety+1 (cli) (built: Mar 25 2017 14:01:32) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
    with Zend OPcache v7.1.3-3+deb.sury.org~yakkety+1, Copyright (c) 1999-2017, by Zend Technologies
```

##### Modules
OPCache was enabled and the installation was the default one without any modifications in `php.ini`. The modules installed were:

```bash
calendar, Core, ctype, curl, date, dom, exif, fileinfo, filter, ftp, gettext, hash, iconv, intl, json, libxml, mbstring, mcrypt, openssl, pcntl, pcre, PDO, phalcon, Phar, posix, readline, Reflection, session, shmop, SimpleXML, sockets , SPL, standard, sysvmsg, sysvsem, sysvshm, tokenizer, wddx, xml, xmlreader, xmlwriter, xsl, Zend OPcache, zlib
```

#### Frameworks
The frameworks compared were:
- [FatFree (v3.6)](https://fatfreeframework.com/3.6/home)
- [Limonade (v0.5.1)](https://limonade-php.github.io/)
- [Lumen (v5.4.0)](https://laravel.com/)
- [Phalcon (v3.1.2)](https://phalconphp.com/en/)
- [Silex (v.2.0.4)](https://framework.zend.com/)

<h5 class="alert alert-warning">
Limonade has not been updated for nearly 4 years but is a fast micro framework that we thought would be great to include it in our tests
</h5>

#### Installation and Changes
We tried to make this test as realistic as possible, ensuring that all frameworks behave in production mode. However, nobody is perfect so any suggestions that the community can provide to tweak each framework to its maximum potential, feel free to issue a pull request in our [Github repository](https://github.com/phalcon/framework-bench). 

#### FatFree
**index.php**
```php
<?php

$f3=require('lib/base.php');

$f3->route('GET /',
    function() {
        echo 'Hello World!';
    }
);
$f3->run();
```

#### Limonade
**index.php**
```php
<?php

ini_set('display_errors', 0);

require_once __DIR__.'/vendor/lib/limonade.php';

dispatch('/', 'hello');
  function hello()
  {
      return 'Hello World!';
  }
run();
```

#### Lumen
**public/index.php**
```php
<?php

require_once __DIR__.'/../vendor/autoload.php';

try {
    (new Dotenv\Dotenv(__DIR__.'/../'))->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    //
}

$app = new Laravel\Lumen\Application(
    realpath(__DIR__.'/../')
);

$app->get('/', function () use ($app) {
    return "Hello World!";
//    return $app->version();
});

$app->run();
```

#### Phalcon
**index.php**
```php
<?php

$app = new Phalcon\Mvc\Micro();

$app->get(
    '/',
    function () {
        echo "Hello World!";
    }
);

$app->notFound(
    function() {
        echo "Not Found";
    }
);

$app->handle();
```

#### Silex
**web/index.php**
```php
<?php

use Silex\Application;

ini_set('display_errors', 0);

require_once __DIR__.'/../vendor/autoload.php';

$app = new Application();

$app->get('/', function () use ($app) {
    return "Hello World!";
//    return $app['twig']->render('index.html.twig', array());
})
    ->bind('homepage')
;

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    return "Error: " . $e->getMessage();
});

$app->run();
```


#### `ab` results
#### FatFree
```bash
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 10.4.6.123 (be patient)


Server Software:        Apache/2.4.18
Server Hostname:        10.4.6.123
Server Port:            80

Document Path:          /micro/fatfree/
Document Length:        12 bytes

Concurrency Level:      5
Time taken for tests:   0.811 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      420000 bytes
HTML transferred:       12000 bytes
Requests per second:    1233.71 [#/sec] (mean)
Time per request:       4.053 [ms] (mean)
Time per request:       0.811 [ms] (mean, across all concurrent requests)
Transfer rate:          506.01 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       3
Processing:     1    4   5.4      2      55
Waiting:        1    2   3.0      2      35
Total:          1    4   5.4      2      56

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      3
  75%      3
  80%      3
  90%      9
  95%     15
  98%     26
  99%     28
 100%     56 (longest request)
```

#### Limonade
```bash
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 10.4.6.123 (be patient)


Server Software:        Apache/2.4.18
Server Hostname:        10.4.6.123
Server Port:            80

Document Path:          /micro/limonade/
Document Length:        12 bytes

Concurrency Level:      5
Time taken for tests:   0.631 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      404000 bytes
HTML transferred:       12000 bytes
Requests per second:    1584.79 [#/sec] (mean)
Time per request:       3.155 [ms] (mean)
Time per request:       0.631 [ms] (mean, across all concurrent requests)
Transfer rate:          625.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:     1    3   5.3      1      46
Waiting:        0    2   1.4      1      25
Total:          1    3   5.3      2      47

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      2
  80%      3
  90%      4
  95%     14
  98%     24
  99%     30
 100%     47 (longest request)
```

#### Lumen
```bash
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 10.4.6.123 (be patient)


Server Software:        Apache/2.4.18
Server Hostname:        10.4.6.123
Server Port:            80

Document Path:          /micro/lumen/public/
Document Length:        12 bytes

Concurrency Level:      5
Time taken for tests:   1.328 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      213000 bytes
HTML transferred:       12000 bytes
Requests per second:    752.89 [#/sec] (mean)
Time per request:       6.641 [ms] (mean)
Time per request:       1.328 [ms] (mean, across all concurrent requests)
Transfer rate:          156.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       2
Processing:     1    6   6.8      3      43
Waiting:        1    5   6.0      3      43
Total:          1    7   6.8      4      44

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      5
  75%      7
  80%     11
  90%     17
  95%     23
  98%     27
  99%     31
 100%     44 (longest request)
```

#### Phalcon Micro
```bash
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 10.4.6.123 (be patient)


Server Software:        Apache/2.4.18
Server Hostname:        10.4.6.123
Server Port:            80

Document Path:          /micro/phalcon/
Document Length:        12 bytes

Concurrency Level:      5
Time taken for tests:   0.591 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      179000 bytes
HTML transferred:       12000 bytes
Requests per second:    1691.97 [#/sec] (mean)
Time per request:       2.955 [ms] (mean)
Time per request:       0.591 [ms] (mean, across all concurrent requests)
Transfer rate:          295.76 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:     0    3   7.0      1      83
Waiting:        0    2   5.1      1      80
Total:          1    3   7.0      2      84

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      2
  80%      2
  90%      3
  95%      9
  98%     25
  99%     31
 100%     84 (longest request)
```

#### Silex
```bash
This is ApacheBench, Version 2.3 <$Revision: 1706008 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 10.4.6.123 (be patient)


Server Software:        Apache/2.4.18
Server Hostname:        10.4.6.123
Server Port:            80

Document Path:          /micro/silex/web/
Document Length:        12 bytes

Concurrency Level:      5
Time taken for tests:   1.663 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      251000 bytes
HTML transferred:       12000 bytes
Requests per second:    601.48 [#/sec] (mean)
Time per request:       8.313 [ms] (mean)
Time per request:       1.663 [ms] (mean, across all concurrent requests)
Transfer rate:          147.43 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.5      0       4
Processing:     1    8   9.0      4      57
Waiting:        1    6   7.4      3      48
Total:          1    8   9.0      4      57

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      7
  75%     11
  80%     13
  90%     21
  95%     28
  98%     37
  99%     44
 100%     57 (longest request)
```
