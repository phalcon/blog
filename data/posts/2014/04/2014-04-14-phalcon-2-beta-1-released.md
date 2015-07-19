Phalcon 2 (beta 1) released!
============================

[Eight months ago](https://blog.phalconphp.com/post/phalcon-2-0-the-future) we announced the creation of a new high-level compiled language called [Zephir](http://www.zephir-lang.com) which we used to completely rewrite Phalcon 2.0.

Zephir's purpose is to offer a new and easier syntax of writing PHP extensions, translating its PHP/JS inspired syntax to C instructions and thus allowing more and more developers to be involved with the project. In addition, it offers the ability to create new PHP extensions without the need to know C or any of the PHP internals.

For us and thanks to Zephir, the development of Phalcon is now more enjoyable. We have to deal less and less with low-level details and our base code is more readable for anyone who wants to understand, contribute and improve Phalcon.

During these we have been implemented several interesting features in Zephir, that have enriched the quality of Phalcon and have made the development more robust:

- [Static Typing](http://zephir-lang.com/types.html#static-types)
- [Named Parameters](http://blog.zephir-lang.com/post/76596064349/whats-new-in-zephir-v)
- [Getter/Setter shortcuts](http://zephir-lang.com/oop.html#getter-setter-shortcuts)
- [Return Type Hints](http://zephir-lang.com/oop.html#return-type-hints)
- [Use static types as objects](http://zephir-lang.com/builtin-methods.html)
- [And more...](http://zephir-lang.com/index.html)

The result of all this hard work is now available for all to use. Today, we are excited to announce the release of Phalcon 2 beta 1!

To showcase our trust in our work, the following Phalcon powered software uses Phalcon 2.0:

#### Official WebSite

![image]({{ cdnUrl }}/images/posts/2014-04-14-website.jpg)

The official Phalcon website was one of the first Phalcon applications that we have focused on, to make sure that the Phalcon 2.0 code base is compatible with it and thus compatible with Phalcon 1.x.

Today, it runs entirely on Phalcon 2.0. If you have visited our site in the last few days, you have contributed in testing Phalcon 2.0.

#### INVO

![image]({{ cdnUrl }}/images/posts/2014-04-14-invo.jpg)

INVO was the first application we launched several months ago to show how an application can be created using Phalcon. It's also now fully compatible with Phalcon 2.0.

#### Phosphorum

![image]({{ cdnUrl }}/images/posts/2014-04-14-phosphorum.jpg)

Phosphorum is the software that powers our discussion forum. Everyone that has used Phosphorum in the last couple of weeks has been using an application that is powered by Phalcon 2.0 in production!

### Is Phalcon 2/Zephir ready?

All the functionality available in Phalcon 1.x has not yet been completely migrated to Phalcon 2.0. For example, only support for MySQL is available with regards to database adapters at the moment. Other adapters are missing but they will be implemented in the very near future.

There are for sure some bugs and issues to resolve and we need to enhance the test suite to cover more of the code base. However we are confident that with your help we will achieve a stable version very soon.

Regarding Zephir, while the progress made is quite significant, there is much work to do as with any language:

- Increase stability
- Improve documentation
- Increase debuggability
- Improve performance in certain scenarios, etc.

With the contributions of the community and the use case available through Phalcon 2.0, Zephir will undoubtedly evolve even more.

### Help with Testing

This version can be installed from the 2.0.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install
```

We welcome your comments regarding this new release. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on [Github](http://github.com/phalcon/cphalcon).

### Want to contribute?

The simplest way is to look through the issue tracker for issues or features to implement. Also fixing the necessary code to make some unit-tests pass on Phalcon 2.0 would help a lot.

### Next Steps

While with the help of Zephir the maintenance of Phalcon 2.0's code should be much easier now, we know that it could be even better. One disadvantage of the compiled languages in a large code base, such as Phalcon's, is that compilation takes away several seconds and introduces undesired pauses in the development.

That is why we recently started developing something called **Zephir "Runtime"**. With all the experience we have acquired over the last few years and following the same philosophy we used on the code generation in the Zephir AOT, started to implement a JIT compiler for Zephir.

This JIT compiler will aid in making development and testing with Zephir much faster and in the long run become an alternative to the Zephir compiler itself, achieving similar or better performance depending on the scenario.

Zephir Runtime is still in its infancy and right now only supports a minimal subset of the Zephir language.

The following video shows how it works:

As you can see, there is no need to invoke the Zephir compiler so as to recompile your extension after changes were made. Just by refreshing the page, the Zephir code is compiled on-the-fly using [LLVM](http://llvm.org/) as backend.

Zephir Runtime is still in the earliest stages and we're hopeful that by announcing it early in its lifecycle and open-sourcing the code, we can collaborate with the community throughout its development.

We hope you all have enjoyed these great news, in the next few weeks we will be announcing new betas and more news.

Thank you!


<3 Phalcon Team
