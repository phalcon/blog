Phalcon's release process
=========================

# Official Releases

Since version 0.5, release numbering works as follows:

* Versions are numbered in the form A.B.C where A.B is the major version number
  and C is the minor version  
* Backwards compatibility is ensured between minor versions ie. A.B.C and A.B.C+1
* Minor version is incremented for small releases

Each Phalcon release will have a tag indicating its version number.
Before Phalcon 2, all versions including minor versions had their own branch,
starting from Phalcon 2 major versions have their own branch, but minor
versions all they share the branch of the major version.

## Major release

Major release will happen between 6 and 9 months. These release contain
new features, improvements and bug fixes. A major release may deprecate
features from previous releases.

## Minor release

Minor releases add bug and security fixes and new features. These releases
are compatible with versions of the same major version. A.B.C+1 is compatible
with A.B.C. These versions will happen between 3 and 5 weeks. We encourage
all Phalcon users to update minor versions.

# Supported versions

Development happens in the respective branch. Master branch always have
the current version released as stable.

The following are the state of the Phalcon versions out there:

* Phalcon 1.2.x: This version was supported until 2014/01/13. No longer supported.
* Phalcon 1.3.x: This version was supported until 2014/01/13. No longer supported.
* Phalcon 2.0.x: This version will be supported until 2015/09/30
* Phalcon 2.1.x: This version will be supported until 2016/05/31
