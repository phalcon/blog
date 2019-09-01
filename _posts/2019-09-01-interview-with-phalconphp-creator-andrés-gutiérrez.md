---
layout: post
title: Interview with PhalconPHP Creator Andrés Gutiérrez
date: 2015-05-19T20:33:00.000Z
tags:
  - interview
  - phalcon
---
PhalconPHP has been quickly gaining popularity in the PHP community. Their different approach to how a PHP framework should be has garnered them as much followers as despisers. All in all we are convinced Phalcon is here to stay and it will have a much greater impact that most developers think in the near future.

For this we decided to do an interview with the main figure behind what's pushing Phalcon forward, Andrés Gutiérrez.

```php
// Example of Phalcon Micro , for creating API's
$app = new Phalcon\Mvc\Micro();

// Returning data in JSON
$app->get('/', function () {
    echo json_encode(array("Welcome to Phalcon 2.0"));
});

$app->handle();
```

### Have you ever thought of writing a framework for another language?

Yes, of course! They were more like hobby projects though. I’ve tried to write frameworks for Go, Rust, C and Clojure, but were all left as prototypes.

### Why PHP?

PHP, despite all of its unfounded criticism, has always been my favorite language. It makes me feel greatly productive and it was the language that first allowed me to create software for the web, something that really inspires me. PHP continues to evolve on many aspects on a daily basis and I think this is something that excites us all.

### What was your inspiration for the development of Phalcon?

Mainly my experience with Ruby on Rails and Seam for Java. I’ve been creating custom open source frameworks in PHP for businesses since 2005, which has contributed in great part to my vision of how a framework for PHP should be, and what developers need.

### How hard was it to get started on Phalcon?

We started the idea for Phalcon around 2011, which was called Spark back then. We later decided to change the name to Phalcon based on the combination of the words PHP and Falcon. The first concept test and the prototype of the framework took us around one year of interrupted work. In the beginning we were faced with many technical challenges which we could overcome to launch a beta at the start of 2012. Up to this date Phalcon has evolved and is substantially different to when it was launched.

### What do you consider to be Phalcon's weak point?

In general terms, being written in C is both it’s strongest and weakest points. Finding collaborators that had the necessary skills to contribute to the core of the framework wasn’t and still isn’t an easy task. Now with Phalcon 2.0 being written in Zephir the number of collaborators has increased and I am quite happy for it.

### What would you say is the greatest value that Phalcon has brought to the PHP community?

In its conception Phalcon was an out of the box idea, to propose a different way of doing things. Three years ago performance wasn’t such a big deal as it is today. I think Phalcon has contributed and influenced in this sense, in helping the developer to quickly and easily construct web sites and PHP applications, taking into account the performance of the framework.

### When do you expect to launch Phalcon 2.0?

It launched on April 17 of 2015.

### How long have you been developing in PHP?

I started to program when I was 12 years old and with PHP when I was 16 (13 years ago), using PHP 3.0 in college. :)

### How is a normal day in your life?

I actually work for a video game company and spend a lot of time in the office. After work I relax myself playing a game, watching a movie, doing sports or taking a few beers with friends.

### What are your thoughts on other frameworks? In particular Zend, Symphony and Laravel?

The framework market for PHP is colossal, there are dozens of frameworks that have been around for many years and it’s relatively easy to find one that adapts to the needs, experience and knowledge of everyone.

Personally I haven’t used other PHP frameworks actively any particular development. However I believe that frameworks for PHP (as in other languages) are improved stemmed adaptations from frameworks from other languages like Ruby on Rails or Spring. Therefore most frameworks implement strong similarities in their design patterns and do things in similar ways, which is positive for developers because it reduces the learning curve and helps expand the knowledge of web development in general.

### What are your thoughts on the Zephir's reception?

There are many developers that are interested in the evolution of Zephir and they are contributing so that it keeps getting better. I don’t think that creating an extension for PHP has ever been this easy.

### Where did you get your inspiration for Zephir?

Zephir is the culmination of several personal ideas and others, already well established and matured, from Rust, PHP and Javascript. Creating a programming language has been an enriching experience. Creating a language from scratch is probably not the best and most pragmatic idea, but I personally think there is no better language in which to have written Phalcon 2.0 and at the same time accomplish other proposed objectives. Zephir combines the elements we wanted from C and PHP in one unified language.

### Which IDE do you use?

Mainly text editors like Sublime or Atom souped up many plugins. When I require and IDE for PHP my first choice is without a doubt PHPStorm.

### What comprises your working environment? (Operating systems, coding tools, work tools, type of computer, etc.

I normally work on Sublime to develop in PHP/C/Zephir, MongoDB as a database and on an iMac computer.

### Could we get a picture of your working environment?

![](/assets/files/andres_interview.jpg)

### Why haven’t you promoted Phalcon more extensively?

Phalcon has been promoted as much as it can be. Personally I’ve done many presentations and am constantly sharing our advances on social networks. The promotion of a framework comes mainly from the community’s effort, assisting to different conferences around the world and talk with people, sharing accomplishments, tutorials, tips and other useful information through social networks greatly increase Phalcon’s presence.

### What are your thoughts on PHP 7?

PHP 7 is a great leap forward for PHP, which has been steadily and significantly evolving since version 5. It implements much needed characteristics and opens up new opportunities so that other interesting improvements are made in the future.

### How will Zephir evolve with all the changes coming with PHP 7 and it's new engine?

Progress has been made with experimentation on code generation for PHP 7. We hope to soon have a better integration from which Phalcon and the community may benefit from.

### What's your vision on Phalcon’s and Zephir’s future? What's next?

Phalcon 2 depends entirely on whether Zephir can deliver, so we want Zephir to be as good as it can be so that Phalcon can be too. Subsequent versions of Phalcon 2 will include much needed improvements regarding actual components required by the community. We also have to take into account that we didn’t introduce many elements that could break current compatibility. So our plan is for Phalcon 3 to create a version from scratch exploring other design patterns and other ways of working.
