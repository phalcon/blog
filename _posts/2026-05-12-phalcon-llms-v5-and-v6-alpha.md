---
layout: post
title: Phalcon, LLMs, v5.x and v6 Alpha
image: 
date: 2026-05-12T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - phalcon6
---
## A small team, a big framework, and a new way to ship

If you've been around Phalcon for any length of time, you know the deal: a small group of us, scattered across time zones, working on this thing whenever life lets us. Same story as every other open-source project - the work happens in the cracks. Weekends, evenings, the occasional quiet afternoon.
<!--more-->

And the math never works out. Bug reports pile up. Feature requests pile up on top of those. Modernization tasks get punted to "next sprint," which somehow becomes next quarter, which somehow becomes next year. You've all been patient about it. Thank you for not giving up on us.

Something's shifted over the last few months, though. It's not really a secret - the pace of the last v5 release was the tell.

## Leveraging LLMs to actually move the needle

LLMs have finally gotten good enough to be useful for the gnarly stuff. Not "write me a CRUD controller" useful - actually useful. Tracing a bug through six layers of indirection. Reading a generated parser nobody wants to read. The kind of work that used to sit in the backlog for months because nobody had a free weekend (or two) to lose to it.

We've leaned into it hard, and you can see it in the changelog.

## What we've actually done

**Tackling the C-level parsers.** If you've ever opened the Volt or PHQL parser source, you know. Generated code on top of generated code, edge cases nobody remembers adding, behavior that only shows up when the input is just weird enough. We've been chewing through it methodically - tracing what actually happens vs. what's supposed to happen, and fixing things that have been hiding in plain sight for years.

The biggest hurdle for getting v6 out, even as an Alpha release, has been the PHQL parser. A parser written in pure C that had to be "translated" to PHP. Jeckerson has been a hero managing to translate Volt (the other C parser) by hand and by spending endless hours debugging it, and then doing the same with the PHQL one, bringing it close to the finish line. Finally, we can say that these two parsers have been implemented in pure PHP as accompanying libraries.

**v6 is heading toward Alpha.** This is the headline. v6 is close enough that we're actively prepping the Alpha. There's still polish to do, but the ugly stuff is behind us.

**Close to 100 bugs fixed.** Counting the ones landing in the upcoming v5 too, we're looking at nearly a hundred bugs closed. Some opened years ago. A few had become folklore in the issue tracker - the kind of bug you mention with a shrug and a "yeah, we know." Those are getting fixed now.

**Modernization is finally happening.** New interfaces. Cleaner contracts between components. The internals are starting to look like the framework we always wanted Phalcon to be, instead of the one that grew sideways from years of "we'll clean it up later." The focus is, as always, to keep the framework fast and user friendly.

## Where do we go from here?

We keep doing what's working. LLMs stay in the loop, doing the grunt work and the deep digging. More bug fixes, faster turnaround on feature requests, continued modernization.

To make it abundantly clear: **We're not handing the framework over to a machine**. Every change still gets reviewed, tested, and argued about by humans before it lands. What's changed is how fast we can investigate, prototype, and verify - and how deep we can dig into problems that used to be too expensive to chase.

For a team this size, working on a framework this old and this big, that shift is the whole game. It's the difference between "we'll get to it eventually" and "we got to it last week."

## Thank you

To everyone who's stuck around - filed bugs, sent PRs, asked questions, kept Phalcon in production despite everything - thank you. We're not done, but we're moving again.

v5 and v6 Alpha announcements are coming. Watch this space.
