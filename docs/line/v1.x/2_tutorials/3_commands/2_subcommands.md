# Subcommands

## Table of Contents

- [About Subcommands](#about-subcommands)
  - [Example Subcommand](#example-subcommand)
- [Configuration](#configuration)
  - [Signatures](#signatures)
  - [Arguments](#arguments)
  - [Options](#options)
  - [Subcommands](#subcommands)
  - [The Handler Method](#the-handler-method)

## About Subcommands

For the most part, subcommands are the same as
[Main Commands](/line/v1.x/tutorials/commands/main-commands). The differences
are:

- Subcommands are extensions of the `Line.Subcommand` class
- Subcommands can only be plugged into a main command's `subcommands` property,
  whereas a main command is plugged into a `Line.CLI` object's `command` config.

Things to know:

- Subcommands are optional. They are not required for you to make a CLI.
  However, without subcommands, you can only create a
  [single command CLI](/line/v1.x/tutorials/creating-a-cli/single-command-clis/introduction#single-command-clis).

All subcommands must extend the `Line.Subcommand` class. This is the base class
for all subcommands. You can define your own base subcommand class, but it
_MUST_ extend the `Line.Subcommand` class for type checking and to inherit
required data members.

You can have as many subcommands as you wish. There is no limit to a main
command's `subcommands` property.

Under the hood, the `Line.Subcommand` class extends the `Line.Command` class.

### Example Subcommand

To create a subcommand class, extend the `Line.Subcommand` class and provide a
`signature`:

```typescript
// subcommand.ts

// @Import line_v1_from_deno

export class SomeSubcommandClass extends Line.Subcommand {
  public signature = "greet";
}
```

In the above, `greet` is specified as the subcommand. This means you expect
users to use `<MAIN COMMAND> greet` to execute this subcommand in your CLI.

This page will not go over the all of the implementation details of a subcommand
because it can vary greatly depending on things like adding arguments and
options. However, the tutorial below goes over creating a subcommand with
arguments and options:

- [Creating a CLI > Subcommand CLIs](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/introduction)

## Configuration

### Signatures

To add/modify a subcommand's signature, add/modify its `signature` property:

```typescript
// @Import line_v1_from_deno

class MySubcommand extends Line.Subcommand {
  public signature = "greet";
  // or public signature = "test";
  // or public signature = "yarn";

  ...
  ...
  ...
}
```

### Arguments

To add/modify a subcommand's arguments, add/modify its `signature` property:

```typescript
// @Import line_v1_from_deno

class MySubcommand extends Line.Subcommand {
  public signature = "greet [some_arg]";
  // or public signature = "greet [some_arg]";
  // or public signature = "greet [some_other_arg_name] [some_second_arg]";

  ...
  ...
  ...
}
```

If your subcommand takes arguments, it must have a `handle()` method in order to
handle them:

```typescript
// @Import line_v1_from_deno

class MySubcommand extends Line.Subcommand {
  ...
  ...
  ...

  public handle(): void { // can also be async
    console.log(this.argument("the_argument_name"));
  }

  ...
  ...
  ...
}
```

To learn more about using arguments, read
[Arguments > Introduction](/line/v1.x/tutorials/arguments/introduction) and its
respective tutorials (under "Arguments" in the side bar).

#### Argument Descriptions

To add descriptions to your arguments, follow the steps outlined on the
[Arguments > Argument Descriptions](/line/v1.x/tutorials/arguments/argument-descriptions)
page.

### Options

To add/modify a subcommand's options, add/modify its `options` property:

```typescript
// @Import line_v1_from_deno

class MySubcommand extends Line.Subcommand {
  ...
  ...
  ...

  public options = {
    "--some-option": "Some description for the option.",
    // or "-s, --some-option": "Some description for the option.",
    // or "-s [value], --some-option [value]": "Some description for the option.",
  }

  ...
  ...
  ...
}
```

If your subcommand takes options, it must have a `handle()` method in order to
handle them:

```typescript
// @Import line_v1_from_deno

class MySubcommand extends Line.Subcommand {
  ...
  ...
  ...

  public handle(): void { // can also be async
    console.log(this.option("--some-option"));
  }

  ...
  ...
  ...
}
```

To learn more about using options, read
[Options > Introduction](/line/v1.x/tutorials/options/introduction) and its
respective tutorials (under "Options" in the side bar).

### The Handler Method

To add/modify a subcommand's handler method, edit its `handle()` method.

The `handle()` method is the method Line calls under the hood to execute the
subcommand. This method is in charge of processing your subcommand's code. An
example of a `handle()` could be as simple as ...

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log("Hello!");
}
```

... or as complex as ...

```typescript
public async handle(): Promise<void> {
  console.log("Process started");

  const response = await fetch("http://something.tld");

  // ... handle the response
  // ... take the contents of the response and write it to a file
  // ... send the file to your private server
  // ... verify the above operation
  // ... output log messages on the status

  console.log("Process finished");
}
```
