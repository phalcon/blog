<?php

namespace Kitsune\Markdown\Github;

use Ciconia\Common\Text;
use Ciconia\Extension\ExtensionInterface;
use Ciconia\Markdown;

/**
 * Converts @username to a github link
 */
class MentionExtension implements ExtensionInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Markdown $markdown)
    {
        $this->markdown = $markdown;

        $markdown->on('inline', array($this, 'processMentions'));
    }

    /**
     * @param Text $text
     */
    public function processMentions(Text $text)
    {
        /**
         * Turn @username into [@username](http://example.com/user/username)
         */
        $text->replace(
            '/(?:^|[^a-zA-Z0-9.])@([A-Za-z]+[A-Za-z0-9]+)/',
            function (Text $w, Text $username) {
                return sprintf(
                    '[@%s](https://github.com/%s)',
                    $username,
                    $username
                );
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'mention';
    }
}
