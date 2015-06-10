{% for post in posts %}
    <div>
        {{ markdown(post['content']) }}
        <span class="pull-right">
            <a href="post/{{ post['url'] }}"><i class="fa fa-file-text-o"></i></a>
        </span>
    </div>
    <div class="text-center">
        01110000011010000110000101101100011000110110111101101110011100000110100001110000
    </div>
{% endfor %}
