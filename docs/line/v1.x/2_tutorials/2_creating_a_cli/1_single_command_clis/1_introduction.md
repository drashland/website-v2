# Introduction

## Table of Contents

- [About This Tutorial Series](#about-this-tutorial-series)
- [About Single Command CLIs](#about-single-command-clis)
- [Example End State](#example-end-state)

## About This Tutorial Series

This tutorial series is split into parts to help you build a
[single command CLI](#about-single-command-clis) from the ground up
progressively.

At the end of the tutorial, you will have a CLI that can handle arguments and
options using a single command.

To get started, proceed to
[Part 1](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-1-entry-points)!

## About Single Command CLIs

Single command CLIs are those like `mkdir` and `rm` -- they only have a single
command that you can run. They have a command signature like the following:

```text
<MAIN COMMAND> [options] [arg] ...
```

## Example End State

```text
Greeter CLI - A CLI that outputs greetings

USAGE

    greet [option]
    greet [options] [arg: greeting] [arg: name]

ARGUMENTS

    greeting
        The greeting to use before the name.
    name
        The name of the thing to greet.

OPTIONS

    -h, --help
        Show this menu.
    -v, --version
        Show this CLI's version.

    --debug
        Output debug logging
```
