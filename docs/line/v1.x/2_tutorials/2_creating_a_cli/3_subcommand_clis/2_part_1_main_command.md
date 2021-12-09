# Part 1: Main Command

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

In this tutorial part, you will create your CLI's main command. At the end of
this tutorial part, your CLI will be able to show a help menu and verison.

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

   class RhumMainCommand extends Line.MainCommand {
     public signature = "rhum";
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

2. Install your CLI.

   ```shell
   $ deno install --name rhum cli.ts
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

   OPTIONS

       -h, --help
           Show this menu.
       -v, --version
           Show this CLI's version.
   ```

2. Get your CLI's version.

   ```shell
   $ rhum -v
   ```

   You should see the following output:

   ```text
   Rhum CLI v1.0.0
   ```

Continue to
[Part 2](/line/v1.x/tutorials/creating-a-cli/subcommand-clis/part-2-main-command-argument)
to make your main command handle an argument.
