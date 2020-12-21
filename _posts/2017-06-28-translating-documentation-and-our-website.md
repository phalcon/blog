---
layout: post
title: "Translating documentation and our website"
date: 2017-06-28T16:23:19.160Z
tags: 
  - php
  - phalcon
  - phalcon3
  - crowdin
  - documentation
  - website
  - translations
---
<h5 class="alert alert-warning">
<strong>TLDR;</strong> We released new docs, messed up, fixed it, enhancing it now, new translation platform.
</h5>

Hello everyone!

Last week we have released a new Phalcon version 3.2 as well as our new documentation.

<!--more-->
Well, that did not go as planned, since we ended up with a lot of angry developers, because the old documentation was not available (at least temporarily) and also we had a lot of broken links in search engines.

We tried to rectify the issue as fast as possible so we have several redirects that point old links to where they are supposed to. We have also created [https://olddocs.phalcon.io/](https://olddocs.phalcon.io/) which contains all the old documents. That site will remain active for quite a long time, so you don't need to worry if you are behind in upgrating to a later version of Phalcon. :)

#### Changes
The biggest chance that we have been working on the last few months, was to change all of our documents to the markdown format from reStructured Text. Although this was not a huge task, it was time consuming. We also addressed the issue of broken links, image files left over from old documents etc.

Once that process was completed, we tied up the documentation to [Crowdin](https://crowdin.com) in order to allow contributors translate our documentation in different languages. As with any new technology, we had some setup issues that were only identified after we released 3.2.

<h5 class="alert alert-info">
Note that there are indeed some CSS issues with the documentation that we expect to have them resolved by next week.
</h5>

#### Docs
The `docs` repository had to be split into two. One (`docs-app`) would contain the Phalcon application that handles the documentation, contains the stylesheets etc. while the second one (`docs`) the one that contains all the markdown documents with the contents of our documentation.

The [Crowdin](https://crowdin.com) team was simply amazing during this process. Not only have they fixed stuff we broke in our integration, but they also guided us on how to create an easy to maintain workflow so that we can easily release our new documentation, translated, whenever we release a new version.

You can find our docs-app repository [here](https://github.com/phalcon/docs-app) and the docs repository [here](https://github.com/phalcon/docs).

For each release we will have a branch in the `docs` repository that will contain the documentation for that specific release with the added functionality.

The beauty of using [Crowdin](https://crowdin.com) is that it identifies identical strings of text throughout branches. As a result if contributors say have translated all of the documents in Spanish for `3.2`, when we release `3.3` only the changed text will appear as not translated.

We have to thank once again [Crowdin](https://crowdin.com) for their tremendous help with our implementation and for hosting our translations/documents in their platform. We highly recommend their service:

<a href="https://crowdin.com">
    <img src="assets/files/2017-06-28-crowdin-logo.png" alt="Crowdin Logo" title="Crowdin Logo">
</a>

Phalcon Documentation: [https://crowdin.com/project/phalcon-documentation](https://crowdin.com/project/phalcon-documentation)

#### Website
We have also ported all of the translations from Transifex to Crowdin so that we can use only one platform for our translations. The Crowdin project is located [here](https://crowdin.com/project/phalcon-website). We made an announcement in Transifex for all translators there, and hopefully we will see everyone migrate to the new platform.

As always any suggestions for new languages or even corrections in our text are more than welcome!

#### Thank you!
Thank you all for your contributions! You guys rock!  

#### References:
* [Crowdin](https://crowdin.com)
* [Docs App Repository (Github)](https://github.com/phalcon/docs-app)
* [Docs Repository (Github)](https://github.com/phalcon/docs)
* [Documentation (Crowdin)](https://crowdin.com/project/phalcon-documentation)
* [Website (Crowdin)](https://crowdin.com/project/phalcon-website)