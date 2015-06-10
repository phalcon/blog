    <div>
        <span class="pull-right">
            <a href="post/{{ post.slug }}"><i class="fa fa-file-text-o"></i></a>
        </span>
        {{ markdown(post.content) }}
        <div>
            {% for tag in post.tags %}
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
        var disqus_identifier = '{{ post.disqus_id }}';
        var disqus_url        = '{{ post.disqus_url }}';

        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    {% endif %}
