# Part 3: Add an Option

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 2](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-2-add-arguments).

In this tutorial part, you will add a `--debug` option to your main command.

At the end of this tutorial part, your CLI will be able to output debug logging.

To learn more about options, read the
[Options > Introduction](/line/v1.x/tutorials/options/introduction) page.

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
      // File: cli.ts

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
