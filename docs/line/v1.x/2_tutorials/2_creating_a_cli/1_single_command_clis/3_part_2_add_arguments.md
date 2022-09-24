# Part 2: Add Arguments

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

This tutorial builds off of
[Part 1](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-1-entry-points).

In this tutorial part, you will add the following arguments:

- `greeting`
- `name`

At the end of this tutorial part, your CLI will be able to output a greeting.

To learn more about arguments, read the
[Arguments > Introduction](/line/v1.x/tutorials/arguments/introduction) page.

## Folder Structure End State

```text
▾  path/to/your/project/
     cli.ts
     deps.ts
```

## Steps

1. Add the `greeting` and `name` arguments to your main command's `signature`
   property. These arguments will help your CLI construct a greeting.

   ```diff-typescript
     // File: cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class GreetMainCommand extends Line.MainCommand {
   -   public signature = "greet";
   +   public signature = "greet [greeting] [name]";
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

2. Add descriptions to your arguments.

   ```diff-typescript
     // File: cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class GreetMainCommand extends Line.MainCommand {
       public signature = "greet [greeting] [name]";
   +
   +   public arguments = {
   +     "greeting": "The greeting to use before the name.",
   +     "name": "The name of the thing to greet.",
   +   };
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

3. Add your `handle()` method. This method will be in charge of concatenating a
   greeting based on the `greeting` and `name` arguments and outputting it to
   the console. **Line will be expecting this method under the hood (it is
   required since your main command now takes in arguments).**

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
   +   public handle(): void {
   +     const greeting = this.argument("greeting");
   +     const name = this.argument("name");
   +
   +     console.log(`${greeting}, ${name}!`);
   +   }
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

4. Reinstall your CLI using the `--force` option to forcefully overwrite the
   existing installion.

   ```shell
   $ deno install --force --name greet cli.ts
   ```

## Verification

1. Run your CLI.

   ```shell
   $ greet
   ```

   You should see the following output:

   ```text
   Greeter CLI - A CLI that outputs greetings

   USAGE

       greet [option]
       greet [arg: greeting] [arg: name]

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
   ```

2. Run your CLI again with arguments.

   ```shell
   $ greet Hello Line
   ```

   You should see the following output:

   ```text
   Hello, Line!
   ```

3. Run your CLI again, but without the second argument.

   ```shell
   $ greet Hello
   ```

   You should see the following output based on Line's argument validation code:

   ```text
   [ERROR] Command 'greet' used incorrectly. Error(s) found:

     * Argument 'name' is missing

   USAGE

       greet [option]
       greet [arg: greeting] [arg: name]

       Run `greet --help` for more information.
   ```

4. Run your CLI again, but add an extra argument.

   ```shell
   $ greet Hello Line SomeRandomArgument
   ```

   You should see the following output based on Line's argument validation code:

   ```text
   [ERROR] Command 'greet' used incorrectly. Error(s) found:

     * Unknown argument(s) provided: SomeRandomArgument.

   USAGE

       greet [option]
       greet [arg: greeting] [arg: name]

       Run `greet --help` for more information.
   ```

5. Run your CLI again, but surround arguments with quotes.

   ```shell
   $ greet "How are you" "user of this CLI"
   ```

   You should see the following output:

   ```text
   How are you, user of this CLI!
   ```

Continue to
[Part 3](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-3-add-an-option)
to make your main command handle an option.
