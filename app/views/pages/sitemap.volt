<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    {% for post in posts %}
        <url>
            <loc>https://blog.phalconphp.com/post/{{ post['slug'] }}</loc>
            <changefreq>daily</changefreq>
        </url>
    {% endfor %}

    {% for tag in tags %}
        <url>
            <loc>https://blog.phalconphp.com/tag/{{ tag }}</loc>
            <changefreq>daily</changefreq>
        </url>
    {% endfor %}

</urlset>