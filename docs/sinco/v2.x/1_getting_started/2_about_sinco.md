# About Sinco

## Table of Contents

* [Overview](#overview)
* [Concepts](#concepts)

## Overview

Sinco is a browser automation and testing tool. What this means is, Sinco runs a subprocess for Chrome or Firefox, and will communicate to the process via the Chrome Devtools Protocol. This allows Sinco to spin up a new browser tab, go to certain websites, click buttons and so much more, all programtically.

Some examples of what you can build are:

* Browser testing for your web application
* Web scraping
* Automating interactions with a website using code

## Concepts

Sinco is similar to the more well known tools that achieve the same thing, such as Puppeteer. What sets Sinco apart is:

- It's the first Deno browser automation tool
- It doesn't try to install a specific chrome or firefox version on your computer
- It is transparent: It will use the browser and version you already have installed.

Its maintainers have taken concepts from the following ...

* [Puppeteer](https://pptr.dev/) — following a similar API and used as inspriration

... and mixed in their own concepts and practices such as ...

* Developer UX
* Approachability
* Test-driven development
* Documentation-driven development
* Transparency
