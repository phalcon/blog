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
