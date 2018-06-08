----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Myles Borins: Please wait... loading: a tale of two loaders'
speaker:
  published: true
  reviewed: true
  id: myles-borins-please-wait-loading-a-tale-of-two-loaders
  order: 28
  firstname: Myles
  lastname: Borins
  talkTitle: 'Please wait... loading: a tale of two loaders'
  twitterHandle: '@MylesBorins'
  githubHandle: '@MylesBorins'
  links:
    twitter: 'https://twitter.com/MylesBorins'
    github: 'https://github.com/MylesBorins'
    homepage: 'https://mylesborins.com'
  country: United States
  city: New York City
  name: Myles Borins
  image:
    filename: myles-borins.jpg
    width: 440
    height: 440

----

Modules were first standardized in ECMAScript 6 in 2015. As of December 2017
you can now use ESModules (ESM) in 3 out of 4 of the major browsers. Node.js
has traditionally shipped an implementation of Common.js (CJS), you use it in
your Node.js code today via require().

There are vast differences between the two module systems that make it quite
difficult to utilize Common.js code in an ESModule and vice versa. Implementing
modules correctly in Node.js will have a significant impact on the future of
JavaScript, the wrong decisions could fause fractures in the ecosystem. This
talk will dive into some of the more nefarious edge cases and the ways the
Node.js project has navigated them. The talk will also look into joint efforts
with the Web platform as we attempt to make a singular pattern that can work on
both the client and server.