# Introduction

## Table of Contents

- [About This Tutorial Series](#about-this-tutorial-series)
- [About Subcommand CLIs](#about-subcommand-clis)
- [Example End State](#example-end-state)
  - [Main Command](#main-command)
  - [Subcommand](#subcommand)

## About This Tutorial Series

This tutorial series is split into parts to help you build a
[subcommand CLI](#about-subcommand-clis) from the ground up progressively.

At the end of the tutorial, you will have a CLI that can handle the following:

- Arguments at the main command level
- Options at the main command level
- Arguments at the subcommand level
- Options at the subcommand level

To get started, proceed to
[Part 1](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-1-entry-points)!

## About Subcommand CLIs

Subcommand CLIs are those like `deno` and `yarn` -- `deno`/`yarn` are the main
commands and they take in subcommands like `run`. They have a command signature
like the following:

```text
<MAIN COMMAND> [subcommand] [options] [arg] ...
```

## Example End State

### Main Command

```text
Rhum CLI - A CLI that can run tests and make test files

USAGE

    rhum [option]
    rhum [options] [arg: file_pattern]
    rhum [subcommand]

ARGUMENTS

    file_pattern
        Pattern used to match test files. Can also be a directory.

SUBCOMMANDS

    make
        Make a test file in the tests/ directory.

OPTIONS

    -h, --help
        Show this menu.
    -v, --version
        Show this CLI's version.

    --debug
        Output debug logging.
```

### Subcommand

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

    --debug
        Output debug logging.
```
