# About Sinco

## Table of Contents

- [Overview](#overview)
- [Concepts](#concepts)
- [Suggestions](#suggestions)

## Overview

Sinco is a browser automation and testing tool. What this means is, Sinco runs a
subprocess for Chrome or Firefox, and will communicate to the process via the
Chrome Devtools Protocol, as the subprocess opens a WebSocket server that Sinco
connects to. This allows Sinco to spin up a new browser tab, go to certain
websites, click buttons and so much more, all programatically. All Sinco does is
runs a subprocess for Chrome or Firefox, so you do not need to worry about it
creating or running any other processes.

Sinco is used to run or test actions of a page in the browser. Similar to unit
and integration tests, Sinco can be used for "browser" tests.

Some examples of what you can build are:

- Browser testing for your web application
- Web scraping
- Automating interactions with a website using code

## Concepts

Sinco is similar to the more well-known tools that achieve the same thing, such
as Puppeteer. What sets Sinco apart is:

- It is the first Deno browser automation tool
- It does not try to install a specific Chrome or Firefox version on your
  computer
- It is transparent: It will use the browser and version you already have
  installed.

Its maintainers have taken concepts from the following ...

- [Puppeteer](https://pptr.dev/) — following a similar API and used as
  inspriration

... and mixed in their own concepts and practices such as ...

- Developer UX
- Approachability
- Test-driven development
- Documentation-driven development
- Transparency

## Suggestions

1. Using Chrome. While we have no preference on what you wish to use, and we
   won't force you to use a certain browser, it's worth noting that running a
   Firefox headless instance and communicating it via the Chrome Devtools
   Protocol (CDP) can be around 50-66% slower than using Chrome. This would mean
   that generally speaking, each test case (if you are using Sinco to run tests)
   would take 50% longer if the browser chosen is Firefox. This is why we would
   suggest Chrome if you have no specific preferences, as it will drastically
   speed up your tests.
