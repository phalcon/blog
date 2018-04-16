Hello everyone!

It has been a while since we last posted an update regarding Phalcon. We apologize for this. As you all know this is an open source project and all of us in the community contribute using our free time and enthusiasm for the project. However sometimes, other tasks need more immediate attention such as work and family.

### Workload
Due to the team's increased workload (family/work), we reached out to a C developer that can help us with some Zephir and Phalcon related bugs. We are working on compensation at the moment as well as the priority of bugs that need to be squashed so that we can move the project forward. We are going to use the funds that all of our supporters have graciously donated to the project in [OpenCollective](http://opencollective.com/phalcon). We are very careful about those funds and only use them when needed, so we have decided that this would be a great way to help the project. 

### Github issues
Again, related to the workload, we have a number of Github issues that have been opened and are stale. Some of those issues have been open for months and are no longer valid because either they have been fixed but never updated and some have never been followed up (requesting information/examples).

In an effort to clean up our issue list as well as be able to focus on valid issues, we have installed the stale bot in Github, which will close issues that have not been active for the last 90 days. This process is automated.

This new bot will allow us to shorten the list of issues and focus in fixing and closing valid issues from the list. 

##### NOTE: The bot is not part of any Artificial Intelligence code, so it is going to close issues that have been inactive the last 90 days. This could very well close valid issues that we have not had the time to address yet. If your issue has been automatically closed and it is valid, please help us by reopening it or creating a new one. {.alert .alert-danger} 
  
### Release
Since our last communication, we have released released [3.3.2](https://github.com/phalcon/cphalcon/releases/tag/v3.3.2). This release contained some bug fixes.

#### Changelog
- Fixed `Phalcon\Db\Dialect\Mysql::modifyColumn` to produce valid SQL for renaming the column [#13012](https://github.com/phalcon/cphalcon/issues/13012)
- Fixed `Phalcon\Forms\Form::getMessages` to return back previous behaviour: return array of messages with element name as key [#13294](https://github.com/phalcon/cphalcon/issues/13294)
- Fixed `Phalcon\Mvc\Model\Behavior\SoftDelete::notify` to solve the exception that soft deletion renamed model [#13302](https://github.com/phalcon/cphalcon/issues/13302), [#13306](https://github.com/phalcon/cphalcon/issues/13306)
- Fixed `E_DEPRECATED` error for `each()` in `Phalcon\Debug\Dump` [#13253](https://github.com/phalcon/cphalcon/issues/13253)


### Update/Upgrade
Phalcon 3.3.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code. {.alert .alert-danger}

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.3.2) page. {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version and as always a big thank you to our contributors!


<3 Phalcon Team

