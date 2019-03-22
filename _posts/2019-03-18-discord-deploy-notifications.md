---
layout: post
title: Netlify - Discord deploy notifications
date: 2019-03-18T22:15:26.884Z
tags:
  - discord
  - phalcon
  - documentation
  - netlify
---
This blog post is not related to the actual code of Phalcon, but to the process of updating our documentation and notifying our [Discord](https://phalcon.link/discord) server of the build status.
<!--more-->
We have blogged in the past that we have switched our documentation to a static site, utilizing Jekyll on the Netlify platform. The build process starts automatically whenever we push changes to our repository.

Because of the size of our documentation in terms of files as well as content, the documentation site builds in around 15 minutes, while a full rebuild is created in around 60 minutes.

### The problem
We always wanted to get notifications in our Discord server as to whether our build failed or not. Of course we can check the Netlify app section but that requires us to log into the web interface and check things there. Having notifications in Discord is something that was really missing from our workflow.

Netlify offers notifications tied to specific hooks, such as deploy started, deploy ended, successful deploy etc. There is no Discord integration available but there is a Slack one, so we used those to notify our Discord server.

### Discord
Go to your Discord server and click the gear icon next to the channel you wish to receive notifications. 

Click Webhooks and add a new one, modifying the name to whatever you want. You can also change the channel for the hook.

![Discord Webhook](/assets/files/hook-01.png "Discord Webhook")

Once you created the webhook, copy its URL.

### Netlify
Go to your application in Netlify and click the **Deploy** link. Click the **Notifications** button.

![Notifications in Netlify](/assets/files/notification.png "Notifications in Netlify")

Click the **Add Notification** button and click **Slack Integration** from the dropdown.
![Slack Integration](/assets/files/hook-02.png "Slack Integration")

A popup window will appear. You can then choose the hook you want (deploy started, deploy successful, deploy failed etc.). You will need then to paste the webhook URL (that you copied from Discord) in the _Slack Incoming Webhook URL_ field, suffixed with `/slack`.

![Adding the hook](/assets/files/hook-03.png "Adding the hook")

**IMPORTANT**:  For the hook to work, you **must** append at the end `/slack`. So if your webhook URL is:

```html
https://example.org/blahblah
```
you need to change it to:
```html
https://example.org/blahblah/slack
```

That's it. After that, any successful build will show a message similar to the one below in your Discord channel.

![Successful build on Discord](/assets/files/discord.png "Successful build on Discord")

If you wish to see the integration in action, you can stop by our [Discord](https://phalcon.link/discord) server and say hi!

<3 Phalcon Team
