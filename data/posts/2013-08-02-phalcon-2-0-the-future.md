## Phalcon 2.0 - The future

It's time to talk about Phalcon 2 and the future of this project.

Despite being a PHP extension implemented in C and its young age, Phalcon offers the same or better features than other frameworks that have been around a lot longer. Phalcon is a fast, robust, secure, extendable PHP framework for everyone to use.

Since we have created a great framework, framework's development is an every day task, constant improvement and evolution is required to deliver more and better applications.

We have often said that our team is small and sometimes the work that needs to be competed can be overwhelming. Thus far we have been very good in responding to new features that we identified or that the community has requested. Still this process requires the Phalcon team to implement the features.

Looking ahead, we can continue doing this for several years, we love it and enjoy it, however but due to the fact that Phalcon's popularity and community has grown and continues to grow significantly by the day, we foresee problems in the development of new features, fixing bugs etc. The team in effect sometimes could become a bottleneck.

One of the main reasons why frameworks are written in high level languages such as PHP is the ease of maintainability. Big frameworks are primarily maintained by a few developers and they rely on the community to submit new additions and bug fixes. Since the code is in a high level language, it invites the community to hack away and understand the code better, submit bug fixes, new features etc. Due to the fact that Phalcon is implemented in C, the submissions from the community are not as frequent as any other framework. We always knew that this is the case, even when we were just considering the idea of developing Phalcon. 

Taking into consideration these concerns of the community, our conclusion is that we need to take a totally different approach for Phalcon 2.

### Introducing Zephir

![image]({{ cdnUrl }}files/2013-08-02-zephir.png)

To address the specific needs associated by building a framework/library as a PHP extension written in C, we have decided to build a brand new tool that will help all of us in terms of developing, supporting and enhancing

Addressing the specific needs of build a framework/library as a C-extension, we have decided build a new tool to make our lives easier ensuring this project will have a clear future.

In recent weeks we have been creating a new programming language called Zephir. It's a high level language, something between C and PHP. It's both dynamic and static typed and it supports just the features we need to create and maintain a project like Phalcon.

This how Zephir code looks like:

```php
namespace Test;
class MyTest extends SomeNamespace\MyAnotherClass 
{
    public function someFunction(a, b) 
    { 
        return a + b;
    }
}
```

All the code in Zephir must be placed in classes (a namespace is required), the use of `$` in variables is not required. By default variables have dynamic typing like PHP, which means you can do:

```php
namespace Test;
class MyTest extends SomeNamespace\MyAnotherClass 
{
    public function someFunction(a, b)
    {
        let a = "5", b = 10;
        return a + b;
    }
}
```

While the above code works, in a big code base, the frequent use of dynamic variables could reduce the performance down. Zephir introduces static typing, allowing compilers to do a better Job, producing compiler errors when implicit conversions are done:

```php
namespace Test;
class MyTest extends SomeNamespace\MyAnotherClass 
{
    public function someMethod(int a, int b)
    {
        let a = 5, b = 10;
        return  a+ b;
    }
}
```

The static types supported are: long/int, double/float, bool and strings, all these types are converted to C types. Static and dynamic typing are also managed by the compiler so the developer must not be aware of allocating or freeing memory like in PHP.

The syntax of Zephir is inspired by C, PHP, Rust and Javascript, making it easy for developers to adapt to the new language:

```php
namespace Test;
class MyTest 
{
    public function someMethod()
    {
        /* Variables must be declared */
        var fruits;
        int i = 0, length;
            
        /* Create PHP array */
        let myArray = ["hello", 0, 100.25, false, null];
        
        /* count the array into a 'int' variable */
        let length = count(myArray);        
        /* Print value types */
        while i < length {
            echo typeof myArray[i], "\n";
            let i++;
        }
        
        return fruits;
    }
}
```

**Goals**

The main goals of Zephir's are:

- Static/Dynamic typing
- Automatic memory management
- Strict and explicit behavior over flexible and implicit behavior
- Produce object-oriented libraries that can be used in PHP
- Hide unnecessary complexity to developers
- Make the code more debugable
- Produce exceptions in runtime instead of notices/warnings when possible
- Detect potentially slow or unrechable code and notify the developer about it
- Produce faster and better code that can be compiled by most important C-compilers: (gcc, vc++, clang)
- Provide a very low learning curve without creating a new PHP/C implementation

Main Phalcon's goals using Zephir:

- Reduce the development time
- Make the code less prone to coding errors
- Allow more members of the community to get involved in
- Allow most Phalcon's users to read and understand how a functionality is implemented
- Allow developers to take more advantage of the framework fully understanding how it works by reading its code
- Introduce potential refactoring and optimizations without affect the stability
- Easily adapt the code to new PHP versions
- Allow contributors to implement additional components

What Zephir will **not** be:

- The next kick-ass language for the web
- A replacement for PHP or C (or any other language)
- Be the most elegant and coherent language available
- Cover every possible feature (current or future) provided by PHP or C
- Implement every feature working exactly as in PHP or C
- Provide awesome expresiveness or support every possible programming paradigm
- Make everyone happy

As an example of how Zephir looks in a large program we have implemented `Phalcon\Mvc\Router` in Zephir, Check the code out [here](https://github.com/phalcon/zephir/blob/master/test/router.zep).

**Q&A**
Below are some questions and answers to better explain this initiative:

*Why are you creating a new language?*
C is more than a powerful language, you can do almost everything with it, however most of time for our specific needs (web development) is more than we need. Due to the fact that PHP is written in C, the only language we can use to create faster code is C or C++. PHP is a great language for web development, however, as we have stated before, compiled and low level libraries provide significant benefits, like faster execution and reduction in memory consumption.

*Why do not use or create a PHP to C conversor?*
PHP is a very high level language, full of dynamic features and weak typing. While those features make our lives easier, most of the time emulating those features in low level languages like C/C++ result in the same performance which is what we don't want. A compiled language with static typing provides better opportunities to optimize things up.

Current PHP compilers to binary executables (or JIT compilers) are islands of new PHP implementations that are behind of the main PHP release (or are partially/totally incompatible with existing PHP libraries/extensions). Zend Engine is used in the main and official PHP implementation and its used in the 98% of installations powered by PHP. Zephir creates extensions that run in the official PHP/Zend Engine.

Zephir aims to offer enough features that can be successfully transformed into efficient, cross compiler C-code for PHP extensions running with the Zend Engine. C-extensions will provide near full interoperability with the official PHP versions, just like Phalcon does currently. You will be able to call methods and classes from PHP code keeping the performance critical ones in Zephir.

PHP supports a lot of language constructs. Not all of them will be supported by Zephir. Additional constructs Zephir-specific will be introduced that will aid with development, maintenance and improvement of Phalcon 2 and could not be available in PHP and vice-versa.

*Would the use of Zephir will affect the current performance/stability of Phalcon?*
It should not, however using Zephir allow us to introduce better optimizations with less effort. In the long run, we will be able to produce better, faster and more stable versions of Phalcon.

*Will Phalcon be completely rewritten in Zephir?*
Most of the code, yes. But not everything, some parts will be kept in pure C since they perform better than any possible Zephir code. Zephir will support call and use C-functions if necessary.

*Will Zephir work on every available platform?*
Initially we will only invest efforts in making it available in the platforms the core developers need to. We mostly work on Linux/MacOSX, so the language would work fine there. Generated extensions by Zephir will work on platforms where PHP is available.

*What PHP versions will be supported by Zephir?*
The same as Phalcon: 5.3, 5.4 and 5.5 and future ones that use the Zend Engine.

*I'm a Phalcon user and I don't want to learn or use Zephir*
You don't have to, it will be mainly used by the core developers to make their lives easier as well as contributors that don't want to use/learn C.

*Is Zephir production-ready?*
No, it's in a very alpha stage. When we reach a beta stage we will start porting Phalcon to Zephir. Once Phalcon 2 is ready, we're going to mark Zephir stable.

*Does Zephir provide any new functions/libraries?*
Zephir will reuse all the functionality provided by PHP and its extensions. We don't have plans to create and maintain our own library of functions.

*Why did not make this before?, since 0.x/1.x?*
Phalcon started as a proof of concept. We learned a lot during the last year as far as optimizations are concerned and how to expose functionality for users. Now we are in a stage where Phalcon has an increasingly growing number of followers and is used in production ready projects. We have a clear path on how to build something new like this with a very high probability of success.

*How is Zephir licensed? Can I use it in commercial products? Can I build my own commercial (close-sourced) extensions?*
Zephir is open-source, licensed under the Zephir License. All the code generated by Zephir can be licensed as you wish using closed/open source licenses. However, we don't have plans to support or cover custom syntax or make efforts to allow third parties to accommodate Zephir to their specific needs. Our first and main goal is reach Phalcon 2.

*In addition to Phalcon 2, which other uses Zephir will have?*
Once Zephir will ready, you will be able to use it for additional things like:

- Create your own OO applications, packing them into C-extensions for PHP/ZendEngine
- Protect your intellectual property (disallow third ones to read your source code), delivering compiled extensions (dll,shared libraries) to your customers instead of the original Zephir code
- Create faster and high performance applications like Phalcon 
- Port all or part of your project's "slow" code to Zephir to gain an immediate performance boost in the compute bound

*Where should I not use Zephir for?*
We are not creating a PHP to C compiler, Zephir is a new language with its own advantages and disadvantages. You shouldn't try to port huge PHP applications into C-based PHP extensions because you might not get the benefit you think you will. Zephir's idea is reduce the coding time required to build a big C-extension for PHP. 

*When will Phalcon 2 available? Should I wait for Phalcon 2 instead of use Phalcon 1.x?*
Phalcon 1.x will continue receiving bug fixes and minor improvements, this is the right version to start your developments now. If everything goes as planned, Phalcon 2 will be available in roughly a year. There will be some API changes and the interface will break, thus affecting backward compatibility. All these will be communicated well in advance. However our goal is to keep the API as close to 1.x as possible so as to minimize the changes that current applications will need so as to run in Phalcon 2.0. The whole community is invited to participate once the code is mostly ported in design decisions or new components.

*How can I contribute to Phalcon 2?*
Once most of the bulk of the codebase is ready, you can help by testing and reporting problems. We will posting articles on beta or new features introduced, so you can help with feedback.

If you want to learn Zephir so as to help building Phalcon 2, the documentation for the language will be added to its own website.

*How can I contribute to Zephir?*
Just like Phalcon, Zephir is driven by the voluntary and altruist efforts of the core developers and contributors; there is no company or business behind it. We expect this additional effort open new possibilities for the PHP world and its community.

You can get involved by writing documentation, reporting bugs, providing feedback, creating unit-tests, improving Zephir itself under the guidelines mentioned in this article and more.

At this moment, we don't require help to promote, spread or make hype about Zephir, since we are still in a very early alpha stage.

Finally we would like to invite individuals/companies interested in sponsoring our work, to donate or contacting us regarding sponsorship, allowing us to invest more time and resources to the project, ensuring it will be ready sooner and with loads of features. Hopefully, you can take advantage of the features provided by Zephir too!

### TL;DR

Phalcon 2 will be mostly written in Zephir, a high performance language, intended to ease the creation and maintainability of PHP extensions. You will not need to install additional software for Phalcon 2. You will however be able to contribute to Phalcon 2 or even write your own extensions.

Hoping you're very excited as us with this new and amazing project and technology!

Thank you!!


<3 The Phalcon Team
