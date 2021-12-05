# Creating A Main Command

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

The entry point for all Line CLI's is a "main command" class that gets plugged
into a `Line.CLI` object. To create a main command class, you must extend the
`Line.MainCommand` class. For example:

```typescript
public class MyMainCommand extends Line.MainCommand { ... }
```

In this tutorial, you will create a VERY basic CLI that can show your CLI's help
menu and version.

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

2. Install your CLI.

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
