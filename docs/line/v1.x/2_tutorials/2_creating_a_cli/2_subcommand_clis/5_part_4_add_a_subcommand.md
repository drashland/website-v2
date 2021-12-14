# Part 3: Add a Subcommand

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 3](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-3-add-an-option).

In this tutorial part, you will add a `make` subcommand to your main command.
You will also add a `filename` argument and a `--debug` option to your
subcommand. The implementation to add arguments and options to a subcommand is
the same as adding them to a main command.

At the end of this tutorial part, your CLI will be able to create test files in
the `tests` directory.

To learn more about subcommands, read the
[Commands > Subcommands](/line/v1.x/tutorials/commands/subcommands) page.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  tests/
       new_test.ts
       unit_1_test.ts
     cli.ts
     deps.ts
```

## Steps

1. Add a `MakeSubcommand` class and plug it into your _**main**_ command.

   ```diff-typescript
      // cli.ts

      import { Line } from "./deps.ts";

      // Create your main command

      class RhumMainCommand extends Line.MainCommand {
        public signature = "rhum [file_pattern]";

        public arguments = {
          "file_pattern": "Pattern used to match test files. Can also be a directory.",
        };

        public options = {
          "--debug": "Output debug logging.",
        };
   +
   +    public subcommands = [
   +      MakeSubcommand,
   +    ];

        #debug = false;

        public async handle(): Promise<void> {
          this.#debug = this.option("--debug") as boolean; // Evalutes to true if specified by the user

          this.#log("Running tests");

          const filePattern = this.argument("file_pattern");

          this.#log(`Argument "file_pattern" is: ${filePattern}`);
          this.#log("Opening `Deno.run()` process");

          const proc = Deno.run({
            cmd: `deno test -A ${filePattern}`.split(" "),
            stdout: "piped",
          });

          const stdout = new TextDecoder().decode(await proc.output());
          proc.close();

          this.#log("Closing `Deno.run()` process");
          this.#log("Outputting stdout");

          console.log(stdout);
        }

        /**
         * Log messages if debug is enabled.
         *
         * @param message - The message to show in the log output.
         */
        #log(message: string): void {
          if (this.#debug) {
            console.log(`[DEBUG] ${message}`);
          }
        }
      }
   +
   +  class MakeSubcommand extends Line.Subcommand {
   +    public signature = "make [filename]";
   +    public description = "Make a test file in the tests/ directory.";
   +
   +    public arguments = {
   +      "filename": "The name of the test file."
   +    };
   +
   +    public options = {
   +      "--debug": "Output debug logging.",
   +    };
   +
   +    #debug = false;
   +
   +    public handle() {
   +      try {
   +        this.#debug = this.option("--debug") as boolean; // Evalutes to true if specified by the user
   +        const filename = this.argument("filename");
   +        this.#log(`Making test file: ${filename}`);
   +        Deno.writeFileSync(
   +          `tests/${filename}`,
   +          new TextEncoder().encode(`Deno.test("Some Unit Test", () => {\n\n});`)
   +        );
   +        console.log(`Successfuly wrote file: ${filename}`);
   +      } catch (error) {
   +        console.log("An error occurred while making the test file.");
   +        this.#log(`Could not make test file: ${error}`);
   +      }
   +    }
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
   +  }

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
   existing installion. Also, make sure you install it using the `--allow-write`
   option. The `--allow-write` option will allow your CLI to run
   `Deno.writeFileSync()` in the `make` subcommand.

   ```shell
   $ deno install --allow-run --allow-write --force --name rhum cli.ts
   ```

## Verification

1. Run your CLI.

   ```shell
   $ rhum
   ```

   You should see the following output:

   ```diff-text
     Rhum CLI - A CLI that can run tests and make test files

     USAGE

         rhum [option]
         rhum [options] [arg: file_pattern]
   +     rhum [subcommand]

     ARGUMENTS

         file_pattern
             Pattern used to match test files. Can also be a directory.
   +
   + SUBCOMMANDS
   +
   +     make
   +         Make a test file in the tests/ directory.

     OPTIONS

         -h, --help
             Show this menu.
         -v, --version
             Show this CLI's version.

         --debug
             Output debug logging.
   ```

2. Run your CLI again with the `make` subcommand and its `--help` option.

   ```shell
   $ rhum make --help
   ```

   You should see the following output:

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

3. Make a file.

   ```shell
   $ rhum make new_test.ts
   ```

   _Note: If the above command fails, make sure you installed your `cli.ts` file
   with the `--allow-write` option._

   You should see the following output:

   ```text
   Successfuly wrote file: new_test.ts
   ```

   There should also be a `new_test.ts` file in your `tests` directory:

   ```text
   ▾  path/to/your/project/
     ▾  tests/
          new_test.ts <--------- file made by `rhum make new_test.ts`
          unit_1_test.ts
        cli.ts
        deps.ts
   ```

4. Run your tests.

   ```shell
   $ rhum tests/
   ```

   You should see the following output:

   ```text
   Check file:///path/to/your/project/tests/new_test.ts
   Check file:///path/to/your/project/tests/unit_1_test.ts
   running 1 test from file:///path/to/your/project/tests/new_test.ts
   test Some Unit Test ... ok (9ms)
   running 1 test from file:///path/to/your/project/tests/unit_1_test.ts
   test Unit 1 Test  ... ok (10ms)

   test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (46ms)
   ```

Congratulations! You have finished the Subcommand CLIs tutorial series!
