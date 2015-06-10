{% for post in posts %}
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
    <div class="text-center" style="padding: 20px;color:#fafafa">
        01010000011010000110000101101100011000110110111101101110010100000100100001010000
    </div>
{% endfor %}
