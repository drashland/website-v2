# Part 3: Add an Option

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 2](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-2-add-an-argument).

In this tutorial part, you will add a `--debug` option to your main command.

At the end of this tutorial part, your CLI will be able to output debug logging.

To learn more about options, read the
[Options > Introduction](/line/v1.x/tutorials/options/introduction) page.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  tests/
       unit_1_test.ts
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

      class RhumMainCommand extends Line.MainCommand {
        public signature = "rhum [file_pattern]";

        public arguments = {
          "file_pattern": "Pattern used to match test files. Can also be a directory."
        };
   +
   +    public options = {
   +      "--debug": "Output debug logging.",
   +    };
   +
   +    #debug = false;

        public async handle(): Promise<void> {
   +      this.#debug = this.option("--debug") as boolean; // Evalutes to true if specified by the user
   +
   +      this.#log("Running tests");
   +
          const filePattern = this.argument("file_pattern");
   +
   +      this.#log(`Argument "file_pattern" is: ${filePattern}`);
   +      this.#log("Opening `Deno.run()` process");

          const proc = Deno.run({
            cmd: `deno test -A ${filePattern}`.split(" "),
            stdout: "piped",
          });

          const stdout = new TextDecoder().decode(await proc.output());
          proc.close();
   +
   +      this.#log("Closing `Deno.run()` process");
   +      this.#log("Outputting stdout");

          console.log(stdout);
        }
   +
   +    /**
   +     * Log messages if debug is enabled.
   +     *
   +     * @param message - The message to show in the log output.
   +     */
   +    #log(message: string): void {
   +      if (this.#debug) {
   +        console.log(`[DEBUG] ${message}`);
   +      }
   +    }
      }

      // Construct your Line.CLI object and plug in your main command

      const cli = new Line.CLI({
        name: "Rhum CLI", // Required config
        description: "A CLI that can run tests and make test files", // Required config
        version: "v1.0.0", // Required config
        command: RhumMainCommand, // Required config
      });

      // Run your CLI

      cli.run();
   ```

2. Reinstall your CLI using the `--force` option to forcefully overwrite the
   existing installation.

   ```shell
   $ deno install --allow-run --force --name rhum cli.ts
   ```

## Verification

1. Run your CLI.

   ```shell
   $ rhum
   ```

   You should see the following output:

   ```diff-text
     Rhum - A Deno tester script

     USAGE

         rhum [option]
   -     rhum [arg: file_pattern]
   +     rhum [options] [arg: file_pattern]

     ARGUMENTS

         file_pattern
             Pattern used to match test files. Can also be a directory.

     OPTIONS

         -h, --help
             Show this menu.
         -v, --version
             Show this CLI's version.
   +
   +     --debug
   +         Output debug logging.
   ```

2. Run your CLI again with the `file_pattern` argument and the `--debug` option.

   ```shell
   $ rhum --debug tests/
   ```

   You should see the following output:

   ```text
   [DEBUG] Running tests
   [DEBUG] Argument "file_pattern" is: tests
   [DEBUG] Opening `Deno.run()` process
   [DEBUG] Closing `Deno.run()` process
   [DEBUG] Outputting stdout
   running 1 test from file:///path/to/your/project/tests/unit_1_test.ts
   test Unit 1 Test  ... ok (12ms)

   test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (31ms)
   ```

Continue to
[Part 4](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-4-add-a-subcommand)
to make your main command handle a subcommand.
