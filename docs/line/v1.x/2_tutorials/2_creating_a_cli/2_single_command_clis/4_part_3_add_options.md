# Adding Options

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 2: Add Arguments](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-2-add-arguments).

To allow your main command to handle options, define an `options` property like
so ...

```typescript
public options = {
  "--some-option": "Some cool option."
};
```

You can retrieve options using the following in the `handle()` method:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log(this.option("--some-option")); // Evalutes to true if specified by a user
}
```

You can add as many options as you wish.

Things to know:

- Options are optional.
- The key in the `options` property is the signature.
- The value in the `options` property is the option's description.
- Options do not have to begin with `-` or `--`. However, it is probably best to
  keep this convention to prevent confusion in your CLIs.
- A single option can have multiple signatures. This is discussed in the
  [Option Signatures](/line/v1.x/tutorials/options/option-signatures) tutorial.
- Options can take in values. This is discussed in the
  [Option Values](/line/v1.x/tutorials/options/option-values) tutorial.

In this tutorial, you will create a CLI that takes in one option: `--debug`.

## Folder Structure End State

```text
▾  path/to/your/project/
     cli.ts
     deps.ts
```

## Steps

1. Add a `--debug` option to enable debug logging. Also, add the logic to handle
   the `--debug` option.

   ```diff-typescript
      // cli.ts

      import { Line } from "./deps.ts";

      // Create your main command

      class GreetMainCommand extends Line.MainCommand {
        public signature = "greet [greeting] [name]";

        public arguments = {
          "greeting": "The greeting to use before the name.",
          "name": "The name of the thing to greet.",
        };
   +
   +    public options = {
   +      "--debug": "Output debug logging",
   +    };

        public handle(): void {
   +      const debugEnabled = this.option("--debug"); // Evalutes to true if specified by the user
   +
   +      if (debugEnabled) {
   +        console.log("[DEBUG] Process started.");
   +      }

          const greeting = this.argument("greeting");
          const name = this.argument("name");
   +
   +      if (debugEnabled) {
   +        console.log(`[DEBUG] User passed in greeting arg: ${greeting}`);
   +        console.log(`[DEBUG] User passed in name arg: ${name}`);
   +      }

          console.log(`${greeting}, ${name}!`);
   +
   +      if (debugEnabled) {
   +        console.log("[DEBUG] Process finished.");
   +      }
        }
      }

      // Construct your Line.CLI object and plug in your main command

      const cli = new Line.CLI({
        name: "Greeter CLI", // Required config
        description: "A CLI that outputs greetings", // Required config
        version: "v1.0.0", // Required config
        command: GreetMainCommand, // Required config
      });

      // Run your CLI

      cli.run();
   ```

2. Reinstall your CLI using the `--force` option to forcefully overwrite the
   existing installation.

   ```shell
   $ deno install --force --name greet cli.ts
   ```

## Verification

1. Run your CLI.

   ```shell
   $ greet
   ```

   You should see the following output:

   ```diff-text
      Greeter CLI - A CLI that outputs greetings

      USAGE

          greet [option]
   -      greet [arg: greeting] [arg: name]
   +      greet [options] [arg: greeting] [arg: name]

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
   +
   +      --debug
   +          Output debug logging
   ```

2. Run your CLI again with arguments and the `--debug` option.

   ```shell
   $ greet --debug Hello Line
   ```

   You should see the following output:

   ```text
   [DEBUG] Process started.
   [DEBUG] User passed in greeting arg: Hello
   [DEBUG] User passed in name arg: Line
   Hello, Line!
   [DEBUG] Process finished.
   ```

Congratulations! You finished the Single Command CLIs tutorial series!

To learn how to make a more complex CLI that can handle subcommands, proceed to
[Subcommand CLIs](/line/v1.x/tutorials/creating-a-cli/subcommand-clis).
