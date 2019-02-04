---
layout: post
title: 'New documents, awesome hosting'
date: 2019-02-01T02:39:08.854Z
tags:
  - netlify
  - phalcon
  - jamstack
  - jekyll
---
For Phalcon v4 we wanted to enhance our documentation and make it as thorough and precise as possible. Admittedly our documentation has been lacking a lot of content, with features not being well documented, being incorrect or not documented at all. Along with that, we had a lot of broken links that were already indexed by search engines, and our redirect rules were not covering everything. That lead to a lot of frustration because developers were not able to find what they were looking for. We started an effort to correct all the above, and continuing to do so on a daily basis, with the goal being that v4 documentation is as thorough and precise as possible.

We mentioned in our [previous blog post](recent-repository-reorganization) that we started moving a lot of our applications to static websites in order to reduce the maintenance needed from the core team and concentrate on the framework itself. To that effect we started using Jekyll to build those sites and moved everything to [Netlify](https://netlify.com).

### v3 Documentation
The most challenging project was the documentation website. First of all we needed to keep all the v3 documentation intact. All those documents need to remain static as we no longer introduce new functionality for that release. After many unsuccessful attempts, we managed to generate a proper structure that Jekyll will understand and thus generate that documentation with the correct URLs.

We also used Google Webmaster Tools to figure out where are any broken links and add appropriate redirects for those pages. More on that below.

### v4 Documentation
The documentation should be suitable for all type of users. From beginner to expert. To achieve that have set the following goals for v4:
- The documentation site must offer a clear and easy to navigate design
- The site must be mobile friendly
- The code examples must be thorough and snippets of code should be avoided
- Each component page must be split into smaller pages, each concentrating in one area/feature of the component
- Each page must allow comments from contributors which will become part of the documentation
- API documentation must be thorough and uniformed
- API methods/classes etc. need to have a developer friendly color scheme, so that method names, types and variable names are easy to identify.

#### Site
Prior to releasing v4, we had changed the layout of the Phalcon Documentation website. We purchased a theme and commissioned UI developers to help us with setting everything up in a mobile friendly website. After that we wired everything together.

Using that layout and with some minor modifications, we converted the site to use Jekyll. Upon deployment, Jekyll will parse the whole site and generate HTML documents, one per URL that we have, and as a result the site will be static. With this process, the site becomes much faster and allows us to concentrate on the content vs the maintenance of the application that serves the content.

#### Versions
We have several versions in our documentation. We really wanted to keep all the documents we have because not everyone is using v4 alpha (well not yet anyway). As such, to make everything work as expected, we created different folders and added the relevant markdown files there. The folder structure looks something like this:

```bash
/3.1/
/3.1/en/
/3.1/en/index.md
...
/3.2/
/3.2/en/
/3.2/en/index.md
...
/3.3/
/3.3/en/
/3.3/en/index.md
...
/3.4/
/3.4/en/
/3.4/en/index.md
...
/3.4/ru-ru/
/3.4/ru-ru/index.md
...
/4.0/ -- submodule
```
So all the documents are going to be served from their respective versions, allowing us to keep older versions of the documentation, serving them all from the same site.

Version 4 is also there but it exists as a submodule from the `docs` repository to the `docs-app` repository (where our application lives). When we get updates either by normal edits, pull requests or even translations, we update the `docs` repository and then updating the submodule in the `docs-app` repository brings everything in sync.

### Netlify
![](/assets/files/full-logo-light.svg)

We found a company that has been a champion of open source called [Netlify](https://netlify.com)! We cannot thank them enough, not only for the help they provide to the open source community, but also the help they gave us when we started this journey, offering advice on how to optimize our site and of course the free hosting!

The articles on their blog offered better insight on how Jekyll works, advice that was heeded and implemented in our site. Additionally setting up our documentation (and other) sites with them was a breeze. Literally a handful of clicks, checking the DNS records and the site was up and running.

The beauty of [Netlify](https://netlify.com) is that it connects to our GitHub repository. As such, any change we make to the repository by introducing more content, triggers a deployment in Netlify and lo and behold a bit later our site is updated without lifting a finger. The amount of time that [Netlify](https://netlify.com) has saved by offering this workflow is a lot!

#### Build time
To make all the sidebars work with translated content, there are some data manipulation that happens locally. We copy certain files from the submodule to the main site, so that Jekyll knows what to render in the sidebar in terms of the main menu as well as the article menu.

When looking at the number of different documents we have, the number started creeping up really high. Each version has the base language which is English and then every additional language, increases the number of files/pages we have, pretty much cloning the English language files for the new language. The total number of files/documents in our repository right now is in the region of 15K files.

All these files need to be read, converted from markdown to HTML and then compiled to pages so that the site is ready and available to accept requests.

Due to the number of those files, we were expecting that the build time would take a bit more than normal. The usual build time was around 10 minutes. However deploying and copying the files in the live site was taking a lot longer. And when we say a lot, we mean a bit over 65 minutes. As one can imagine, that is fine if the site is updated once in a while, but our documents can receive multiple updates per day due to translated content alone.

When reaching out to the Netlify team, one of the engineers was extremely polite and professional and worked with us to try and identify the issue and offer solutions. It appears that the problem was stemming from the cache busting that we had introduced for our assets. i.e:

```html
<llnk rel="stylesheet" href="/assets/css/main.css?v{% raw %}{{ date | format: '%Y%m%d'" }}{% endraw %}" />
```

[Netlify](https://netlify.com) has an awesome algorithm where each page is cached and a hash of the page contents is kept when the site is deployed the first time. In a subsequent deployment, after the site is built, the hash of the new page is compared to the cached hash and if they are identical, the particular content is not uploaded to the live site, well because there is no reason to. This allows the deployments to be blistering fast even for large sites as ours.

The snipped above was pretty much invalidating the caching feature of [Netlify](https://netlify.com) because when the site was being built in say deployment no 2, the timestamp was different than the one cached and therefore a full rebuilt and upload was necessary.

Once this issue was identified and corrected, our deployment time dropped from 65 minutes to roughly 13. A huge improvement just by a small and simple change.

#### Redirects
Finally a great feature offered by [Netlify](https://netlify.com) is the ability to have redirects on your site using a text file `_redirects`. This file initially was populated with several URLs that we knew that were broken. After careful review of the Google Webmaster Tools console, we downloaded all the 404 reports and added more and more redirections in that file. A week or two later we found out that our 404 page count was reduced significantly which helps the site a lot!

### Thank you
Thank you once more to [Netlify](https://netlify.com) for their excellent service and support! If any of our friends are thinking about replicating what we did here for personal projects or to reduce maintenance for their documentation, [Netlify](https://netlify.com) is definitely a service to consider!



