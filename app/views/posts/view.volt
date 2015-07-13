    <div>
        <span class="pull-right post-date">
            <a href="post/{{ post.getSlug() }}"><i class="fa fa-file-text-o"></i></a>
            {{ post.getDate() }}
        </span>
        {{ post.getContent() }}
        <div class="tags-container">
            {% for tag in post.getTags() %}
            <a href="/tag/{{ tag }}">
                <span class="badge">{{ tag }}</span>
            </a>
            {% endfor %}
        </div>
    </div>
    {% if showDisqus %}
    <div id="disqus_thread"></div>
    <script type="text/javascript">
        var disqus_shortname  = 'phalconphp';
        var disqus_identifier = "{{ post.getDisqusId() }}";
        var disqus_url        = '{{ post.getDisqusUrl() }}';

        (function () {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    {% endif %}
