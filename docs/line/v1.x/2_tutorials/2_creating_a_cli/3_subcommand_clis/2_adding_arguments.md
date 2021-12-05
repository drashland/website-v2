# Adding Arguments

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Argument Descriptions](#argument-descriptions)

## Before You Get Started

This tutorial builds off of
[Tutorials > Creating Single Command CLIs > Creating a Main Command](/line/v1.x/tutorials/main-commands/creating-a-main-command).

To allow your main command to handle arguments, add them to your main command's
`signature` property like so ...

```typescript
public signature = "my-cli [arg1] [arg2] [arg3]";
```

... and create a `handle()` method in your main command to handle arguments:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  // Handle arguments here
}
```

You can retrieve arguments using the following in the `handle()` method:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log(this.argument("arg1"));
  console.log(this.argument("arg2"));
  console.log(this.argument("arg3"));
}
```

You can add as many arguments as you wish.

Things to know:

- Any argument in a signature _**is required**_. This means if a user does not
  specify all arguments, then they will be shown an error and the `USAGE`
  section for the command being used.
- Any extra arguments specified by a user will result in an error being shown.
- Arguments must be surrounded by square brackets in the signature. This is how
  Line knows that the command handles arguments.

In this tutorial, you will create a CLI that takes in two arguments.

## Folder Structure End State

```text
▾  path/to/your/project/
     cli.ts
     deps.ts
```

## Steps

1. Add arguments to your main command's `signature`.

   ```diff-typescript
     // cli.ts

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

2. Add your `handle()` method.

   ```diff-typescript
     // cli.ts

     import { Line } from "./deps.ts";

     // Create your main command

     class GreetMainCommand extends Line.MainCommand {
       public signature = "greet [greeting] [name]";
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

3. Reinstall your CLI using the `--force` option to forcefully overwrite the
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
           (no description)
       name
           (no description)

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

## Argument Descriptions

By default, arguments do not have descriptions. This is because Line does not
know the intent behind the arguments you define. For example, in the above
Verification steps, the output of the help menu contains the following
`ARGUMENTS` section:

```text
ARGUMENTS

    greeting
        (no description)
    name
        (no description)
```

To add descriptions to these arguments, you can define an `arguments` property
in your main command class. For example:

```diff-typescript
  // cli.ts

  import { Line } from "./deps.ts";

  // Create your main command

  class GreetMainCommand extends Line.MainCommand {
    public signature = "greet [greeting] [name]";
+
+   public arguments = {
+     "greeting": "The greeting to use before the name.",
+     "name": "The name of the thing to greet.",
+   };

    public handle(): void {
      const greeting = this.argument("greeting");
      const name = this.argument("name");

      console.log(`${greeting}, ${name}!`);
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

The above CLI's `ARGUMENTS` section will show the following:

```text
ARGUMENTS

    greeting
        The greeting to use before the name.
    name
        The name of the thing to greet.
```

Take note of the following when defining the `arguments` property:

- The key is the argument name that is in the `signature` property.
- Argument names are not surrounded by square brackets.
- The value is the description of the argument.
