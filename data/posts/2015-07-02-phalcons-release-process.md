Phalcon's release process
=========================

![Phalcon Process]({{ cdnUrl }}files/2015-05-peregrine-falcon-kelly-harris.jpg)

The following post explain our release process:

## Official Releases

Since version 0.5, release numbering works as follows:

* Versions are numbered in the form A.B.C where A.B is the major version number and C is the minor version  
* Backwards compatibility is ensured between minor versions ie. A.B.C and A.B.C+1
* Minor version is incremented for small releases

Each Phalcon release will have a tag indicating its version number. Before Phalcon 2, all versions including minor versions had their own branch, starting from Phalcon 2 major versions have their own branch, but minor versions all they share the branch of the major version.

### Major release

Major release will happen between 6 and 9 months. These release contain new features, improvements and bug fixes. A major release may deprecate features from previous releases.

### Minor release

Minor releases add bug and security fixes and new features. These releases are compatible with versions of the same major version. A.B.C+1 is compatible with A.B.C. These versions will happen between 3 and 5 weeks. We encourage all Phalcon users to update minor versions.

## Supported versions

Development is isolated in each respective branch. The Master branch will always contain the current version released as stable. Each supported version will be updated with any minor revisions that happen in the current version. Older versions will receive only bug fixes and security updates.

If a new version has to have an API change which will change backwards compatibility then we will extend the support on older versions to allow users to adjust their code. Naturally any upcoming changes that will break backwards compatibility will be communicated with the community well in advance.

## State of Phalcon versions

* Phalcon 1.2.x: Supported until 2014-03-17. No longer supported.
* Phalcon 1.3.x: Supported until 2015-05-08. No longer supported.
* Phalcon 2.0.x: Supported until 2016-04-17 (1 year from release date)
* Phalcon 2.1.x: LTS release. Supported until 2017-09-30 (2 years from release date)


<3 Phalcon Team
