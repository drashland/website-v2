# About Drash

## Table of Contents

* [Overview](#overview)
* [Concepts](#concepts)

## Overview

Drash is a microframework for Deno's HTTP server. It has zero third-party dependencies outside of Deno Standard Modules. It is designed to help you build performant, scalable projects quickly.

Some examples of what you can build are:

* Application programming interfaces (APIs)
* Single page applications (SPAs)
* Server-side rendered (SSR) pages
* Statically generated HTML sites (through Drash's SSG feature)

## Concepts

Drash is a unique framework. **It is not another Express clone.** It is more of a mixture of different frameworks with a different take on how "controllers" are written.

Its maintainers have taken concepts from the following ...

* [Flask](https://flask.palletsprojects.com/) — being micro and extensible
* [Laravel](https://laravel.com/) — use of similarly styled middleware
* [Tonic](https://github.com/peej/tonic) — use of resources instead of controllers
* RESTful principles — content negotiation, HTTP verbs, URIs, etc.

... and mixed in their own concepts and practices such as ...

* Developer UX
* Approachability
* Test-driven development
* Documentation-driven development
* Transparency