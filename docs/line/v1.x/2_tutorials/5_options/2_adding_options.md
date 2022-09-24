# Adding Options to Commands

## Table of Contents

- [Adding Options](#adding-options)
- [Option Locations](#option-locations)
- [Complete Example](#complete-example)

## Adding Options

To allow a command to handle options, add them in the command's `options`
property. For example:

```typescript
public options = {
  "--some-option": "Some cool option.",
  "--some-other-option": "Some other cool option.",
  "--some-other-other-option": "Some other other cool option.",
};
```

Once you have options defined, create a `handle()` method in the command to
handle the options. For example:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log(this.option("--some-option"));
  console.log(this.option("--some-other-option"));
  console.log(this.option("--some-other-other-option"));
}
```

## Option Locations

If you have a main command _and_ subcommand(s) that take in options, then please
take not of the following:

- Main command options come after the main command
- Subcommand options come after the subcommand
- You cannot use a main command option before a subcommand

The above rules are reflected in the help menus for both main commands and
subcommands, but we want to make sure we call this out as we feel it is not
noticeable at first glance.

## Complete Example

```typescript
// File: cli.ts

// @Import line_v1_from_deno

// Create your main command

class MainCommand extends Line.MainCommand {
  public signature = "greet";

  public options = {
    "--some-option": "Some cool option.",
  };

  public handle(): void {
    console.log(this.option("--some-option"));
  }
}

// Construct your Line.CLI object and plug in your main command

const cli = new Line.CLI({
  name: "Option Handler",
  description: "A CLI that handles options",
  version: "v1.0.0",
  command: MainCommand,
});

// Run your CLI

cli.run();
```
