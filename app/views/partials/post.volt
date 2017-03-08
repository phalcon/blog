    <div>
        <span class="pull-right post-date">
            <a href="/post/{{ post['slug'] }}"><i class="fa fa-file-text-o"></i></a>
            {{ post['date'] }}
        </span>
        {{ post['content'] }}
        <div class="tags-container">
            {#{% for tag in post.getTags() %}#}
            {#<a href="/tag/{{ tag }}">#}
                {#<span class="badge">{{ tag }}</span>#}
            {#</a>#}
            {#{% endfor %}#}
        </div>
    </div>
    {% if showDisqus %}
    <div id="disqus_thread"></div>
    <script>
        /**
         *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE
         *  SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
         *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT:
         *  https://disqus.com/admin/universalcode/#configuration-variables
         */

         var disqus_config = function () {
            this.page.url = 'http://blog.phalconphp.com/post/{{ post['slug'] }}';
            this.page.identifier = 'Phalcon Framework - {{ post['title'] }}';
         };

        (function() {
            var d = document, s = d.createElement('script');

            s.src = '//phalconphp.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!

            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>

    {% endif %}
