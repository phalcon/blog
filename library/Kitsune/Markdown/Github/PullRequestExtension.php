<?php

namespace Kitsune\Markdown\Github;

use Ciconia\Common\Text;
use Ciconia\Extension\ExtensionInterface;
use Ciconia\Markdown;

/**
 * Converts @[GPR:9999] to a github pull request link
 */
class PullRequestExtension implements ExtensionInterface
{
    private $issueUrl = '[#%s](https://github.com/phalcon/cphalcon/pull/%s)';

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

        $markdown->on('inline', array($this, 'processPullRequest'));
    }

    /**
     * @param Text $text
     */
    public function processPullRequest(Text $text)
    {
        /**
         * Turn the token to a github issue URL
         */
        $text->replace(
            '(\[GPR:(\d+)\])',
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
        return 'pullRequest';
    }
}
