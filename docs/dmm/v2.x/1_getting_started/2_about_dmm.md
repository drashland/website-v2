# About Dmm

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)

## Overview

Dmm is a CLI tool that helps you keep your dependencies up to date. It is
**not** a manager, and it is very small and simple. That's the great thing with
Deno, dependency management needs no manager, it just needs to simply update the
exports of each dependency to their latest versions.

## How It Works

1. Reads your `deps.ts` file (or file of argument passed in)
2. Turns the data into a data structure so it is easy to rewrite the URL if the
   version is updated, get the latest version of that module based on the CDN,
   and more.
3. For each "line" (dependency in the `deps.ts` file), it will make a `fetch`
   request to the CDN, to get the latest version.
4. If the version imported is already matching the latest, it does nothing.
5. If it does not, it will update the line to use the latest version.
6. Finally, once this is done for each dependency, it will rewrite the new
   content to the `deps.ts` file we read from with new versions for each
   dependency in place of old versions.
