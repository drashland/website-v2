# About Wocket

## Table of Contents

- [Overview](#overview)
- [Concepts](#concepts)

## Overview

Wocket is a Websocket server, it's built on Deno's own native way of creating a websocket server, but provides a more feature rich experience.

Wocket was designed to fill in the gaps that a native Websocket server couldn't *easily* do, this includes:

- Class based
- Create 'channels'
- Sending to 1, all, or all but one clients of a channel
- Handle paths in the Websocket URI

Wocket has this built for you, providing a very simple API for you to interact wth.

## Concepts

Wocket can be seen as very similar to NodeJS' "socket.io", in how the API is consumed. Anyone familiar with socket.io, would feel at home with Wocket.

Its maintainers have taken concepts from the following ...

- [Socket.io](https://socket.io) — following a similar API and used as
  inspriration

... and mixed in their own concepts and practices such as ...

- Developer UX
- Approachability
- Test-driven development
- Documentation-driven development
- Transparency
