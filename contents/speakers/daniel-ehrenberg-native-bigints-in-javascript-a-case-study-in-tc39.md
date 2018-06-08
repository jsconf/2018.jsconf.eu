----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Daniel Ehrenberg: Native BigInts in JavaScript: A Case Study in TC39'
speaker:
  published: true
  reviewed: true
  id: daniel-ehrenberg-native-bigints-in-javascript-a-case-study-in-tc39
  order: 44
  firstname: Daniel
  lastname: Ehrenberg
  talkTitle: 'Native BigInts in JavaScript: A Case Study in TC39'
  twitterHandle: '@littledan'
  githubHandle: '@littledan'
  links:
    twitter: 'https://twitter.com/littledan'
    github: 'https://github.com/littledan'
    homepage: null
  country: Spain
  city: Barcelona
  name: Daniel Ehrenberg
  image:
    filename: daniel-ehrenberg.jpg
    width: 440
    height: 440

----

Quick, what do you get when you increment Math.pow(2, 53)? If you said
Math.pow(2, 53), you may be a JavaScript programmer.

From the beginning, JavaScript has supported 64-bit binary floats as its sole
numeric type. In this talk, I'll explain how, through TC39, JavaScript
developers are working together with JS engine implementers and spec wonks like
me to create BigInt: a native, unlimited-size integer type.

Through collaboration, any layer of software can be changed, even the language
itself.