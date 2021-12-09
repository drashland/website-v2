# Adding Arguments to Commands

## Table of Contents

- [About Arguments](#about-arguments)
- [Complete Example](#complete-example)

## About Arguments

Main commands and subcommands can both take in arguments.

Things to know:

- Commands can have an unlimited number of arguments.
- All arguments in a signature _**are required**_. If a user does not specify
  all arguments, then they will be shown an error and the `USAGE` section.
- If a user specifies too many arguments, then they will be shown an error and
  the `USAGE` section.
- Arguments must be surrounded by square brackets in the `signature`. This is
  how Line knows that the command handles arguments.
- If an argument is surrounded by quotes when passed in, then the entire value
  inside the quotes will be the argument value.

## Complete Example

```typescript
// cli.ts

import { Line } from "./deps.ts";

// Create your main command

class MainCommand extends Line.MainCommand {
  public signature = "greet [some_arg]";

  public handle(): void {
    console.log(this.argument("some_arg"));
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
