# Adding Arguments to Commands

## Table of Contents

- [About Arguments](#about-arguments)
- [Complete Example](#complete-example)

## About Arguments

Main commands and subcommands can both take in arguments.

Things to know:

- Commands can have an unlimited number of arguments.
- All arguments in a signature _**are required**_. If a user does not specify
  all arguments, then they will be shown an error and the `USAGE` section for
  the command.
- If a user specifies too many arguments, then they will be shown an error and
  the `USAGE` section for the command.
- Arguments must be surrounded by square brackets in the `signature`. This is
  how Line knows that the command handles arguments.
- If an argument is surrounded by quotes when passed in through the command line
  (e.g., `<MAIN COMMAND> "some really long argument"`), then the entire value
  inside the quotes will be the argument value.
- If your command takes arguments, then your command _MUST_ have a `handle()`
  method to handle the arguments. More on this can be found in the
  [Arguments > Adding Arguments](/line/v1.x/tutorials/arguments/adding-arguments)
  page.

## Complete Example

```typescript
// File: cli.ts

// @Import line_v1_from_deno

// Create your main command

class MainCommand extends Line.MainCommand {
  public signature = "greet [some_arg]";

  public handle(): void {
    console.log(this.argument("some_arg")); // Targets [some_arg] in the signature
  }
}

// Construct your Line.CLI object and plug in your main command

const cli = new Line.CLI({
  name: "Arg Handler",
  description: "A CLI that handles arguments",
  version: "v1.0.0",
  command: MainCommand,
});

// Run your CLI

cli.run();
```
