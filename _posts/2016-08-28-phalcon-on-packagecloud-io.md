---
layout: post
title: "Phalcon on Packagecloud.io"
tags: [php, phalcon, "3.0.x", phalcon3, packagecloud.io, installation, lts]
---
One of the most requested features by the community, is an easy way to install and upgrade Phalcon.
  
Admittedly, a lot of us have installed Phalcon so many times that it is second nature to perform the task. However some developers might find the task daunting, especially if this is the first time they are trying to install the framework.

![image](/assets/files/2016-08-28-packagecloud-logo-dark.png)

To help with this task, we have employed the services of [PackageCloud.io](https://PackageCloud.io), so as to create packages for PhalconPHP. With [PackageCloud.io](https://PackageCloud.io) users can now add the relevant repository to their distribution, and install Phalcon with the package manager of their choice.

<!--more-->
For instance, if we are looking at a Ubuntu distribution, all we have to do is:

### DEB distributions (i.e Ubuntu)

#### Add the repository to your distribution

```sh
# Stable releases
curl -s https://packagecloud.io/install/repositories/phalcon/stable/script.deb.sh | sudo bash

# Nightly releases
curl -s https://packagecloud.io/install/repositories/phalcon/nightly/script.deb.sh | sudo bash
```

This will be done only once, unless your distribution changes or you want to switch from stable to nightly builds

#### Install Phalcon

```sh
sudo apt-get install php5-phalcon
```

or for PHP 7

```sh
sudo apt-get install php7.0-phalcon
```

### RPM distributions (i.e. CentOS)

#### Add the repository to our distribution

```sh
# Stable releases
curl -s https://packagecloud.io/install/repositories/phalcon/stable/script.rpm.sh | sudo bash

# Nightly releases
curl -s https://packagecloud.io/install/repositories/phalcon/nightly/script.rpm.sh | sudo bash
```

This will be done only once, unless your distribution changes or you want to switch from stable to nightly builds

#### Install Phalcon

```sh
sudo yum install php56u-phalcon
```

or for PHP 7

```sh
sudo yum install php70u-phalcon
```

### Repositories

The repositories (stable/nightly) are located at [https://packagecloud.io/phalcon](https://packagecloud.io/phalcon/). You can click any of the repositories and inspect the packages. You can also find installation instructions as well as stats for each repository.

### Thank you

A big thank you once more to our community for embracing this new change, even before the official announcement. We released 3.0.1 4 days ago, and as you can see, 388 installations in just 7 days!

![Phalcon Installations](/assets/files/2016-08-28-installations.png)

<3 Phalcon Team
