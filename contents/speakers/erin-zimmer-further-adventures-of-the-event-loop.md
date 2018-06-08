----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Erin Zimmer: Further Adventures of the Event Loop'
speaker:
  published: true
  reviewed: true
  id: erin-zimmer-further-adventures-of-the-event-loop
  order: 46
  firstname: Erin
  lastname: Zimmer
  talkTitle: Further Adventures of the Event Loop
  twitterHandle: '@ErinJZimmer'
  githubHandle: '@ejzimmer'
  links:
    twitter: 'https://twitter.com/ErinJZimmer'
    github: 'https://github.com/ejzimmer'
    homepage: null
  country: Australia
  city: Melbourne
  name: Erin Zimmer
  image:
    filename: erin-zimmer.jpg
    width: 440
    height: 440

----

Most JavaScript developers are probably familiar with the event loop. It’s how
JavaScript handles I/O events without blocking, even though it’s
single-threaded. Event callbacks are added to the task queue. The browser then
takes a callback from the queue and runs it from start to finish. Then it
decides to either repaint or run another callback. Simple, right?

But what about web workers? And promises? And what happens when your JavaScript
isn’t running in a browser? In this talk, we’ll look at how multi-threaded
event loops work, how promises differ from other callbacks, and what goes on in
the Node event loop.