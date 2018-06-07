----

# THIS FILE WAS GENERATED AUTOMATICALLY.
# CHANGES MADE HERE WILL BE OVERWRITTEN.

template: pages/speaker.html.njk
title: 'Miguel Jiménez Esún: Metro: Scaling JavaScript Build Systems'
speaker:
  published: true
  reviewed: true
  id: miguel-jimenez-esun-metro-scaling-javascript-build-systems
  order: 35
  firstname: Miguel
  lastname: Jiménez Esún
  talkTitle: 'Metro: Scaling JavaScript Build Systems'
  twitterHandle: null
  githubHandle: null
  links:
    twitter: null
    github: null
    homepage: null
  country: null
  city: null
  name: Miguel Jiménez Esún
  image:
    filename: miguel-jim-nez-es-n.png
    width: 401
    height: 401

----

React Native ships its own development server and bundler, which is both
externally and internally used at Facebook. Making this process scalable and
reliable is a hard process when you have a large codebase. We will be
presenting and explaining its architecture, as well as the ideas behind it in
order to make it fast; and we will roughly introduce the different output
formats it is able to provide for maximum performance both on development and
on iOS and Android production environments.