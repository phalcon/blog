<div class="widget">
    <div class="tag-cloud text-center">
        {% for tag, class in tagCloud %}
            <span style="font-size: {{ class }}">
                <a href="/tag/{{ tag }}">{{ tag }}</a>
            </span>
        {% endfor %}
    </div>
</div>
