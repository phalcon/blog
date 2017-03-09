Sample Application: Album O'Rama
================================

[![image]({{ cdnUrl }}files/2012-12-08-albumorama.jpg)](http://album-o-rama.phalconphp.com)

We are very excited to release our third Phalcon demo after [INVO](/post/invo-a-sample-application) and the [alternative PHP website](/post/sample-application-php-alternative-site) to the community, so as to showcase the power of Phalcon.

In this demo, we decided to go big! We created a music album library where one can get information about their favorite artists, discover new music and much more.

We decided to add volume in this application to showcase how Phalcon behaves with a lot of data. In our database we have:

- > 5,000 Artists
- > 50,000 Albums
- > 30,000 Album tags
- > 20,000 Artists tags
- > 100,000 Tracks
- > 200,000 Photos

To make things even more interesting we introduced a custom layout generator which is invoked every time a new album is requested. This improves aesthetics and showcases the power of [Volt](https://docs.phalconphp.com/en/latest/reference/volt.html), Phalcon's template engine:

[![image]({{ cdnUrl }}files/2012-12-08-album.jpg)](http://album-o-rama.phalconphp.com/album/155/Battle+Born)

If you have [Spotify](http://spotify.com/) installed you may listen most popular songs.

In this demo you will find:

- Usage the [Volt](https://docs.phalconphp.com/en/latest/reference/volt.html) template engine in a real application
- Generating queries using [PHQL](https://docs.phalconphp.com/en/latest/reference/phql.html) (relations, joins, groupings, etc)
- Basic pagination
- Use of [view helpers](https://docs.phalconphp.com/en/latest/reference/tags.html)
- Implementation of custom components
- Implementation of [custom routing](https://docs.phalconphp.com/en/latest/reference/routing.html)
- Implementation of [views caching](https://docs.phalconphp.com/en/latest/reference/views.html#caching-view-fragments)
- Implementation of a custom error handle

Check the application running here: [https://album-o-rama.phalconphp.com](https://album-o-rama.phalconphp.com)

Complete code here: [https://github.com/phalcon/album-o-rama](https://github.com/phalcon/album-o-rama)

We hope that you enjoy it and looking forward to your comments as well as submissions of your implementations in our [Incubator](https://github.com/phalcon/incubator)!


<3 The Phalcon Team
