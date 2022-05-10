# About Vital

## Table of Contents

- [Overview](#overview)
- [Concepts](#concepts)

## Overview

Vital is an ORM, for Postgres, for Deno. It's only non-deno third-party
dependency is Postgres itself. It is designed to help improve how you interact
with your database, as opposed to interacting with the `deno-postgres` API,
which includes raw SQL queries with prepared statements. Vital provides an
elegant and very simple API to provide many operations on your database.

The core of Vital is quite small, it simply constructs a query and executes it
behind the scenes.

## Concepts

Vital may seem common to some people who have used Eloquent, but one goal of
Vital was to provide a simple, lightweight API without a whole bunch of magic
happening behind the scenes, much like Eloquent does. Vital is an Object
Orientated module, focussing classes.

Its maintainers have taken concepts from the following ...

- [Eloquent](https://laravel.com/docs/9.x/eloquent) — taking inspriration from
  the API and ability to chain methods to create a simpel query

... and mixed in their own concepts and practices such as ...

- Developer UX
- Approachability
- Test-driven development
- Documentation-driven development
- Transparency

These concepts have made Drash very approachable and one of the most
well-documented frameworks in the Deno ecosystem.
