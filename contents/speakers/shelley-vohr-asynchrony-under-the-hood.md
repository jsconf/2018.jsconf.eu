----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Shelley Vohr: Asynchrony: Under the Hood'
speaker:
  published: true
  reviewed: true
  id: shelley-vohr-asynchrony-under-the-hood
  firstname: Shelley
  lastname: Vohr
  talkTitle: 'Asynchrony: Under the Hood'
  twitterHandle: '@codebytere'
  githubHandle: '@codebytere'
  links:
    twitter: 'https://twitter.com/codebytere'
    github: 'https://github.com/codebytere'
    homepage: 'http://codebyte.re'
  country: USA
  city: 'San Francisco, CA'
  image:
    filename: shelley-vohr.jpg
    width: 440
    height: 440

----

This talk will explore the conceptual underpinnings of asynchronous
programming options, and the drawbacks and advantages to each. JS has supported
callbacks since 2009, and as years have gone by it's added support for
promises, generators, and now async/await. On a surface level, each of these
techniques seeks to answer a question of how to access data not immediately
available, but a deeper look into how each works on a granular level will show
their implementation differences and how these differences affect usage. We'll
also take a look at how intermediate values, and errors are affected by each
method.  I'll walk through a series of scenarios so you can better visualize
performance differences, and how each method propagates data through the stack
and the event loop. Finally, I'll talk about where the future of async may be
headed. Armed with new knowledge from this deep dive, the potentially
treacherous road to fully understanding async will hopefully become a smoother
ride!