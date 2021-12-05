# Introduction

This tutorial is split into parts to help you build a single command CLI from
the ground up progressively.

At the end of the tutorial, you will have a CLI that can handle arguments and
options. An example of the end state is shown below. To get started, proceed to
[Part 1: Add a Main Command](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-1-add-a-main-command)!

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
