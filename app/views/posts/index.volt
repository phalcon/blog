{% for post in posts %}
    <div>
        {{ markdown(post['content']) }}
        <span class="pull-right">
            <a href="post/{{ post['url'] }}"><i class="fa fa-file-text-o"></i></a>
        </span>
    </div>
{% endfor %}
