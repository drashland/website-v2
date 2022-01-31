# Part 1: Entry Points

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

In this tutorial part, you will create your entry point file (`cli.ts`) and your
[main command](/line/v1.x/tutorials/commands/main-commands).

At the end of this tutorial part, you will have a CLI that will be able to show
a help menu and version.

Before continuing, create a `deps.ts` file by following the
[add Line as a Dependency](/line/v1.x/tutorials/introduction/add-line-as-a-dependency#add-line-as-a-dependency)
instructions.

## Folder Structure End State

```text
▾  path/to/your/project/
     cli.ts
     deps.ts
```

## Steps

1. Create your `cli.ts` file.

   ```typescript
   // cli.ts

   import { Line } from "./deps.ts";

   // Create your main command

   class GreetMainCommand extends Line.MainCommand {
     public signature = "greet";
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

2. Install your CLI. Notice the `--name` option. Caveats on this can be found on
   the
   [Commands > Main Commands](/line/v1.x/tutorials/commands/main-commands#caveats)
   page under the "Caveats" section.

   ```shell
   $ deno install --name greet cli.ts
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

   OPTIONS

       -h, --help
           Show this menu.
       -v, --version
           Show this CLI's version.
   ```

2. Get your CLI's version.

   ```shell
   $ greet -v
   ```

   You should see the following output:

   ```text
   Greeter CLI v1.0.0
   ```

Continue to
[Part 2](/line/v1.x/tutorials/creating-a-cli/single-command-clis/part-2-add-arguments)
to make your main command handle arguments.
