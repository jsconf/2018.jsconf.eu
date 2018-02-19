----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Ashi Krishnan: Deep Learning  in JS'
speaker:
  published: true
  reviewed: true
  id: emil-bay-hand-crafting-webassembly
  firstname: Emil
  lastname: Bay
  talkTitle: Hand-crafting WebAssembly
  twitterHandle: '@emilbayes'
  githubHandle: '@emilbayes'
  links:
    twitter: 'https://twitter.com/emilbayes'
    github: 'https://github.com/emilbayes'
    homepage: 'http://bayes.dk'
  country: Denmark
  city: Denmark
  image:
    filename: emil-bay.jpg
    width: 460
    height: 460

----

There has been many talks about what WebAssembly (WASM) is, it's relation to
compilers and how bright our collective future is with WASM in our toolbox.
However most talks treat WebAssembly as a semi-opaque box, and mostly as
something you can compile higher level languages into. This is a shame!
WebAssembly is a fun language to learn, and allows one to write code less than
a magnitude slower than C!

In this talk I will show how to write WAT (WebAssembly Text-format), how to
reason about algorithms when all you have is one large slab of memory, how to
convert high level constructs such as loops into elementary instructions and
how to have fun at the same time! We will convert a number of progressively
harder algorithms, each revealing a challenging aspect of working with no
abstractions.

Even if you will not write WASM at work, learning at the lowest level of
computer tears away the enchantment that abstractions cause, and reveals the
magical machine that is the computer.