<div>
    <span class="pull-left">
        {% if pages['previous'] > 0 %}
            <a href="/{{ pages['previous'] }}"><i class="fa fa-fast-backward"></i></a>
        {% endif %}
    </span>
    <span class="pull-right">
        {% if pages['next'] > 0 %}
            <a href="/{{ pages['next'] }}"><i class="fa fa-fast-forward"></i></a>
        {% endif %}
    </span>
</div>
{% for post in posts %}
    {% include 'posts/view.volt' %}
    <div class="text-center horizontal-ruler">
        01010000011010000110000101101100011000110110111101101110010100000100100001010000
    </div>
{% endfor %}
<div>
    <span class="pull-left">
        {% if pages['previous'] > 0 %}
            <a href="/{{ pages['previous'] }}"><i class="fa fa-fast-backward"></i></a>
        {% endif %}
    </span>
    <span class="pull-right">
        {% if pages['next'] > 0 %}
            <a href="/{{ pages['next'] }}"><i class="fa fa-fast-forward"></i></a>
        {% endif %}
    </span>
</div>
