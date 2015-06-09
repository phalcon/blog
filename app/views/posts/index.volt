{% for post in posts %}
    <?php echo $this->markdown->render(file_get_contents($post)); ?>
{% endfor %}
