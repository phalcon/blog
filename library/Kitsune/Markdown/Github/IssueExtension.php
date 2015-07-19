<?php

namespace Kitsune\Markdown\Github;

use Ciconia\Common\Text;
use Ciconia\Extension\ExtensionInterface;
use Ciconia\Markdown;

/**
 * Converts @[GI:9999] to a github issue link
 */
class IssueExtension implements ExtensionInterface
{
    private $issueUrl = '[#%s](https://github.com/phalcon/cphalcon/issues/%s)';

    public function setIssueUrl($url)
    {
        $this->issueUrl = $url;
    }

    /**
     * {@inheritdoc}
     */
    public function register(Markdown $markdown)
    {
        $this->markdown = $markdown;

        $markdown->on('inline', array($this, 'processIssues'));
    }

    /**
     * @param Text $text
     */
    public function processIssues(Text $text)
    {
        /**
         * Turn the token to a github issue URL
         */
        $text->replace(
            '(\[GI:(\d+)\])',
            function (Text $w, Text $issue) {
                return sprintf($this->issueUrl, $issue, $issue);
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
