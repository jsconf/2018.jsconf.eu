----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'James Coglan: Breaking changes'
speaker:
  published: true
  reviewed: true
  id: james-coglan-breaking-changes
  order: 34
  firstname: James
  lastname: Coglan
  talkTitle: Breaking changes
  twitterHandle: null
  githubHandle: '@jcoglan'
  links:
    twitter: null
    github: 'https://github.com/jcoglan'
    homepage: 'https://blog.jcoglan.com/'
  country: United Kingdom
  city: London
  name: James Coglan
  image:
    filename: james-coglan.jpg
    width: 440
    height: 440

----

Semantic Versioning or SemVer has become a de-facto standard in the last few
years, with several language ecosystems now relying on it to manage software
upgrades. However, it is frequently misunderstood as a technical tool for
making
cold hard guarantees about code, rather than as a human tool for signalling
intent and setting expectations.

Never is this more apparent than when we consider what a "breaking change"
means. It's highly contextual: it depends on which language you're using, what
your public interface is, what guarantees you've explicitly or implicitly made
to users, how much software sits downstream of you, and so on. In this talk
I'll
explore several ways you can accidentally break other people's JavaScript apps,
how to avoid them, and what to do when you can't.