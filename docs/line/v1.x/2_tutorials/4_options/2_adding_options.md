# Adding Options to Commands

## Table of Contents

- [Adding Options](#adding-options)
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

## Complete Example

```typescript
// cli.ts

import { Line } from "./deps.ts";

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
