# Introduction

## Table of Contents

- [About Options](#about-options)
- [Complete Example](#complete-example)

## About Options

Main commands and subcommands can both take in options.

Things to know:

- Commands can have an unlimited number of options.
- Options are optional -- they do not have to be specified by users.
- The key in the `options` property is the signature.
- The value in the `options` property is the option's description.
- Options do not have to begin with `-` or `--`. However, it is probably best to
  keep this convention to prevent confusion in your CLIs.
- A single option can have multiple signatures. This is discussed in the
  [Option Signatures](/line/v1.x/tutorials/options/option-signatures) page.
- Options can take in values. This is discussed in the
  [Option Values](/line/v1.x/tutorials/options/option-values) page.

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
