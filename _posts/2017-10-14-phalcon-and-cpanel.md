---
layout: post
title: "Phalcon and cPanel"
tags: [phalcon, cPanel, installation]
---

Back in 2013, we began an [effort](/post/help-the-community-to-make-phalcon-available-on-cpanel) to include Phalcon with cPanel as a module, so that users of cPanel can install the module effortlessly. We had a [rocky start](https://niden.net/post/voting-for-phalcon-as-cpanel-feature) but in the end there was a custom module created and users of cPanel could enable it easily.

### cPanel::Zer0Cool - ea4 
Recently Dan Muey from cPanel's Zer0Cool team reached out to us with some exciting news! 

<h5 class="alert alert-info">
**Phalcon is now available in the next EasyApache (ea4) release!!** 
</h5>

This will make things much easier for cPanel users that wish to use Phalcon in their applications.

The email is below:

> Hello Andres,
> 
> My name is Dan Muey and I work for cPanel, specifically the team (ZerØCool) that works with our EasyApache product .
> 
> We are happy to let you know that we are adding phalcon to our ea4 offering in our next ea4 release! That should be sometime between now and early Sept, watch [release notes](https://documentation.cpanel.net/display/EA4/EasyApache+4+Release+Notes) for the details, I'd be happy to notify you also if you like, just let me know.
> 
> You will probably want to update the “cPanel” heading at [https://phalconphp.com/en/download/linux](https://phalconphp.com/en/download/linux) since it is currently about Phalcon in ea3 which is deprecated and scheduled for removal early in 2018.
> 
> Here are some details for that document and/or to let your users know about (by whatever means you all do that sort of thing).
> 
> It will be as simple as `yum install ea-php70-php-phalcon`.
> 
> The available packages are:
> - `yum install ea-php55-php-phalcon`
> - `yum install ea-php56-php-phalcon`
> - `yum install ea-php70-php-phalcon`
> - `yum install ea-php71-php-phalcon`
> 
> As we add new versions of PHP to ea4 phalcon should be included (due to it being done as na SCL RPM). For example once we include PHP 7.2 there should be an ea-php72-php-phalcon package.
> 
> Users and vendors can also [create profiles](https://documentation.cpanel.net/display/EA4/EasyApache+4+-+Create+a+Profile) that contain any or all of those packages.
> 
> For users migrating from ea3 to ea4 that have the custom opt mod for Phalcon installed:
> 
> It will be included in ea3-to-ea4 profile mapping via internal case EA-6697. Until then they will need to migrate to ea4 and then install the phalcon packages they need (`yum install ea-php55-php-phalcon ea-php56-php-phalcon`– ea3 does not have PHP 7.x). After EA-6697 is in place that will happen automatically. If you would like to be kept up to date as to the progress of EA-6697 please let me know what email address to contact.
> 
> If you have any questions, let us know!

> Thanks,
> Dan Muey – cPanel::ZerØCool::EA4


**Many thanks to the cPanel::Zer0Cool team!!**

<3 Phalcon Team

