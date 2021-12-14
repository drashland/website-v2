# Part 2: Add an Arguemnt

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 1](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-1-entry-points).

In this tutorial part, you will add a `file_pattern` argument to your main
command.

At the end of this tutorial part, your CLI will be able to run tests stored in a
`tests` directory.

To learn more about arguments, read the
[Arguments > Introduction](/line/v1.x/tutorials/arguments/introduction) page.

## Folder Structure End State

```text
▾  path/to/your/project/
  ▾  tests/
       unit_1_test.ts
     cli.ts
     deps.ts
```

## Steps

1. Add the `file_pattern` argument to your main command's `signature` property.
   This argument will take in a file pattern and pass it to `Deno.run()` to run
   tests.

   ```diff-typescript
     // cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class RhumMainCommand extends Line.MainCommand {
   -   public signature = "rhum";
   +   public signature = "rhum [file_pattern]";
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

2. Add a description to your argument.

   ```diff-typescript
     // cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class RhumMainCommand extends Line.MainCommand {
       public signature = "rhum [file_pattern]";
   +
   +   public arguments = {
   +     "file_pattern": "Pattern used to match test files. Can also be a directory.",
   +   };
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

3. Add your `handle()` method. This method will be in charge of handling the
   `file_pattern` argument and running tests. **Line will be expecting this
   method under the hood (it is required since your main command takes an
   argument).**

   ```diff-typescript
     // cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class RhumMainCommand extends Line.MainCommand {
       public signature = "rhum [file_pattern]";

       public arguments = {
         "file_pattern": "Pattern used to match test files. Can also be a directory.",
       };
   +
   +   public async handle(): Promise<void> {
   +     const filePattern = this.argument("file_pattern");
   +
   +     const proc = Deno.run({
   +       cmd: `deno test -A ${filePattern}`.split(" "),
   +       stdout: "piped",
   +     });
   +
   +     const stdout = new TextDecoder().decode(await proc.output());
   +     proc.close();
   +
   +     console.log(stdout);
   +   }
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

4. Reinstall your CLI using the `--force` option to forcefully overwrite the
   existing installion. Also, make sure you install it using the `--allow-run`
   option. The `--allow-run` option will allow your CLI to run `Deno.run()`.

   ```shell
   $ deno install --allow-run --force --name rhum cli.ts
   ```

## Verification

1. Run your CLI.

   ```shell
   $ rhum
   ```

   You should see the following output:

   ```text
   Rhum CLI - A CLI that can run tests and make test files

   USAGE

       rhum [option]
       rhum [arg: file_pattern]

   ARGUMENTS

       file_pattern
           Pattern used to match test files. Can also be a directory.

   OPTIONS

       -h, --help
           Show this menu.
       -v, --version
           Show this CLI's version.
   ```

2. Before moving on to the next verification steps, your CLI needs a test file
   (or test files) that it can run. That being said, make a test file (or test
   files) in a `tests` directory at the root of your project. The one below is
   named `unit_1_test.ts`.

   ```typescript
   // tests/unit_1_test.ts

   Deno.test("Unit 1 Test ", () => {
     // Test code goes here
   });
   ```

3. Having your unit test file made, run your CLI again with the `file_pattern`
   argument as `tests/`. This command will run all tests in your `tests`
   directory.

   ```shell
   $ rhum tests/
   ```

   You should see the following output:

   ```text
   Check file:///path/to/your/project/tests/unit_1_test.ts
   running 1 test from file:///path/to/your/project/tests/unit_1_test.ts
   test Unit 1 Test  ... ok (9ms)

   test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (22ms)
   ```

4. To verify the built-in argument validation in Line, run the same command
   above with an extra argument.

   ```shell
   $ rhum tests/ SomeRandomArgument
   ```

   You should see the following output based on Line's argument validation code:

   ```text
   [ERROR] Command 'rhum' used incorrectly. Error(s) found:

     * Unknown argument(s) provided: SomeRandomArgument.

   USAGE

       rhum [option]
       rhum [arg: file_pattern]

       Run `rhum --help` for more information.
   ```

Continue to
[Part 3](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-3-add-an-option)
to make your main command handle an option.
