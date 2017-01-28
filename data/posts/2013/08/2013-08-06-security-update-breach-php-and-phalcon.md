Security Update: BREACH, PHP and Phalcon
========================================

Last week, security researchers announced that a new attack towards websites has been discovered called [BREACH](http://breachattack.com/). This attack allows the attacker to obtain data even if connections are secured with SSL connections. Several web sites and applications could be compromised. Note that this attack could affect any web application no matter the technology (language, os, frameworks, etc) that powers it. Their [paper](http://breachattack.com/resources/BREACH%20-%20SSL,%20gone%20in%2030%20seconds.pdf) explains the attack and provides full details on how it works.

In short, your application may be affected if:

- Your page is served with HTTP compression enabled (GZIP / DEFLATE).
- Your page reflects user data via query string parameters, POST, etc.
- Your application page serves Personally identifiable information*(*PII), a CSRF token, sensitive data.

According to the [possible solutions](http://breachattack.com/#mitigations) to mitigate this attack as suggested by the authors, you can:

- Disable HTTP compression.
- Separate secrets from user input
- Randomize secrets per request
- Mask secrets (effectively randomizing by XORing with a random secret per request)
- Protect vulnerable pages with CSRF
- Length hide (by adding random amount of bytes to the responses)
- Rate-limit the requests

By default, Phalcon randomizes CSRF secrets for every request using pseudo random string of bytes. If you have altered this behavior we strongly suggest that you restore it to the default one.

You are also encouraged to disable GZip compression on your web server. For Apache, disable the [mod_deflate](http://httpd.apache.org/docs/2.2/mod/mod_deflate.html) module and for Nginx the [gzip module](http://wiki.nginx.org/HttpGzipModule). If you are using a different web server please check the relevant documentation in order to disable gzip compression if it is currently in use.


<3 The Phalcon Team
