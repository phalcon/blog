    <div class="row">
        <div class="col-md-{% if '404' !== post['slug'] %}10{% else %}12{% endif %}">
            <a href="/post/{{ post['slug'] }}">
                <h2>{{ post['title'] }}</h2>
            </a>
        </div>
        {% if '404' !== post['slug'] %}
        <div class="col-md-2 post-date">
            {{ post['date'] }}
        </div>
        {% endif %}
    </div>
    <div>
        {{ post['content'] }}
        <div class="tags-container">
            {#{% for tag in post.getTags() %}#}
            {#<a href="/tag/{{ tag }}">#}
                {#<span class="badge">{{ tag }}</span>#}
            {#</a>#}
            {#{% endfor %}#}
        </div>
    </div>

    <div id="comments_section"></div>
