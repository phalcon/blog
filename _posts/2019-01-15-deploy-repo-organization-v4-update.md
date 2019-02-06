---
layout: post
title: Deploy Repo reorganization - v4 Update
date: 2019-01-15T13:46:27.992Z
tags:
  - phalcon
  - v4
  - rpm
  - deb
  - packagecloud
  - alpha
---
We wanted to close the year in a high note, so we worked really hard and managed to release Phalcon v4-alpha1 on Christmas day. This was a present to the community and we are very happy that it was well received, with its bugs and all :)
<!--more-->
During that release, we pushed the alpha version to our [stable](https://packagecloud.io/phalcon/stable) channel.

### The problem

Doing that was not _necessarily_ bad but it was not good either. There were some of our users that either updated their servers or their devops processes automatically updated the target servers. As a result of that the `v4-alpha1` was installed on the target server (since it was coming from the `stable` channel).

Several of our friends advised us of this in Github but also in our Discord channel, offering a temporary solution until we get this resolved.

### Workaround

The [solution](https://stackoverflow.com/questions/54004316/phalcon-choose-version-to-install/54066201) is relatively simple:

```bash
sudo apt-get remove php7.2-phalcon
sudo apt-get install php7.2-phalcon=3.4.*
sudo apt-mark hold php7.2-phalcon
```

The above solution is for deb based distributions but similar commands will work for any other distribution. You will need to restart your web server after issuing those commands.

### Solution

To permanently solve the issue, we have removed `v4-alpha1` from the stable channel. This way users will only see the v3 version when trying to upgrade.

For those that want to try the `v4-alpha1`, there is a new channel in our packagist repo called `mainline` and can be found here:

<https://packagecloud.io/phalcon/mainline>

The page has installation instructions to help you with enabling that channel in your system.

### Thank you

As always, the Phalcon team wants to thank all of our early adopters that are helping with this new release, and also for the advice and support when problems such as this one arise.

There will be a new alpha version coming up soon, since we have identified and fixed a good number of bugs found in `v4-alpha1`.

<3 Phalcon Team
