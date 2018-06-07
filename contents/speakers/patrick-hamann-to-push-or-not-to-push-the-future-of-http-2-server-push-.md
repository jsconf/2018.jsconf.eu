----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Patrick Hamann: To push, or not to push?! - The future of HTTP/2 server push '
speaker:
  published: true
  reviewed: true
  id: patrick-hamann-to-push-or-not-to-push-the-future-of-http-2-server-push-
  order: 38
  firstname: Patrick
  lastname: Hamann
  talkTitle: 'To push, or not to push?! - The future of HTTP/2 server push '
  twitterHandle: '@patrickhamann'
  githubHandle: '@phamann'
  links:
    twitter: 'https://twitter.com/patrickhamann'
    github: 'https://github.com/phamann'
    homepage: null
  country: United Kingdom
  city: London
  name: Patrick Hamann
  image:
    filename: patrick-hamann.jpg
    width: 440
    height: 440

----

HTTP/2 server push gives us the ability to proactively send assets to a browser
without waiting for them to be requested. Sounds great, right?! 

However, is this new mechanism really the silver bullet we all thought it was?
Is it time to abandon our build systems and stop bundling our assets entirely?
Or are lack of server support and browser inconsistencies holding us back?
Lastly, what are new specifications such as cache digests and the 103 status
code doing to improve the situation?

Using new research and real-world examples, this talk will take a deep dive
into HTTP/2 server push, exploring the current and future best practices for
loading assets in the browser. Giving us the knowledge to make better decisions
when loading our web pages and ultimately leading to faster, more resilient
user experiences.