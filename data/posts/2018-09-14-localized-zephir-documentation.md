Hello everyone!!

We had some requests in the past to localize our documentation for [Zephir](https://zephir-lang.com). Today we are happy to announce that we now have full localization in our Zephir documentation. 

> For those that do not know, Zephir is the language that Phalcon is written on :) It allows you the developer to create PHP extensions using a familiar PHP/Javascript format, without the need to learn C.

As with the Phalcon documentation we took the following steps:

Our documentation is split into two repositories:
- [Zephir Docs App](https://github.com/phalcon/zephir-docs-app). This repo contains the application that handles our documentation (templates, CSS, etc.). It is pretty much the same application as the one that powers the Phalcon documentation.
- [Zephir Docs](https://github.com/phalcon/zephir-docs). This repo contains the actual articles that are shown on screen (content).

These repositories have been set up to work together to offer an easy way to set up and maintain the documentation.

The `docs` repository has also been integrated with [Crowdin](https://crowdin.com), which handles all the translation efforts of our documentation. A **huge** thank you to our friends at Crowdin for hosting our documentation on their platform. If your application needs localization, be sure to check them out!

If you wish to help with the localization effort, you can visit our project in Crowdin:

[https://crowdin.com/project/zephir-documentation](https://crowdin.com/project/zephir-documentation)

The base language is English (`en`). If changes are needed in the English text, please fork the [repository](https://github.com/phalcon/zephir-docs) and issue a Pull Request. Pull requests will only be accepted for the English language.

For other languages, please use the interface in Crowdin. Their integration pushes your translations to our repository automatically, making it very easy for us to maintain localized versions of the documentation.

Enjoy!!


<3 Phalcon Team

