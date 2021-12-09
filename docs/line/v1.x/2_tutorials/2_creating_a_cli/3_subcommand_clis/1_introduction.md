# Introduction

This tutorial is split into parts to help you build a subcommand CLI from the
ground up progressively.

At the end of the tutorial, you will have a CLI that can handle the following:

- Arguments at the main command level
- Options at the main command level
- Arguments at the subcommand level
- Options at the subcommand level

An example of the end state is shown below. To get started, proceed to
[Part 1: Add a Main Command](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-1-add-a-main-command)!

**Main Command**

```text
Rhum - A Deno tester script

USAGE

    rhum [option]
    rhum [options] [arg: file_pattern]
    rhum [subcommand]

ARGUMENTS

    file_pattern
        Run `deno test` on files matching this pattern.

SUBCOMMANDS

    make
        Make a test file in the tests/ directory.

OPTIONS

    -h, --help
        Show this menu.
    -v, --version
        Show this CLI's version.

    -d, --debug
        Output debug logging.
```

**Subcommand**

```text
USAGE (for: `rhum make`)

    rhum make [option]
    rhum make [options] [arg: filename]

ARGUMENTS

    filename
        The name of the test file.

OPTIONS

    -h, --help
        Show this menu.
    -v, --version
        Show this CLI's version.

    -nt, --num-tests
        Write a specified number of `Deno.test()` placeholders in the file.
```
