# Adding Options

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Option Signatures](#option-signatures)
- [Option Values](#option-values)
  - [Example](#example)

## Before You Get Started

This tutorial builds off of
[Tutorials > Creating Single Command CLIs > Adding Arguments](/line/v1.x/tutorials/main-commands/creating-a-main-command).

To allow your main command to handle options, define the `options` property like
so ...

```typescript
public options = {
  "--some-option": "Some cool option."
};
```

You can retrieve arguments using the following in the `handle()` method:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log(this.option("--some-option"));
}
```

You can add as many options as you wish.

Things to know:

- Options are optional.
- The key in the `options` property is the signature.
- The value in the `options` property is the option's description.
- Options do not have to begin with `-` or `--`. However, it is probably best to
  keep this convention to prevent confusion.

In this tutorial, you will create a CLI that takes in one option.

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

## Option Signatures

Multiple option signatures for a single option can be defined in the key of the
`options` property. For example:

```typescript
public options = {
  "-d, --debug": "Output debug logging",
};
```

Notice that each signature is separated by a comma. The comma lets Line know
that a single option has multiple signatures.

In the above `options` property, both `-d` and `--debug` are considered the same
option in Line. This means a user can specify `-d` or `--debug`.

You can retrieve the option using ...

```typescript
const debugEnabled = this.option("--debug"); // Evaluates to true if specified by the user
```

... or:

```typescript
const debugEnabled = this.option("-d"); // Evalutes to true if specified by the user
```

Both options will evaluate to `true`. It does not matter which signature you
specify in the `this.option()` call. Line will know which one you are trying to
get based on the signature you specify in the `this.option()` call since both
are considered the same option.

## Option Values

By default, the value of an option is `true`. However, options can take in a
different value. You can have your options take in a value by doing the
following:

```typescript
public options = {
  "-l [value], --log [value]": "Output logging at the specified value",
};
```

Things to note:

- If an option takes in a value, the value _**is required**_ when the user
  specifies the option.
- Options can only take in one value (support to take in more values might be
  introduced in the future).
- If you want your option to take in a value, it must be done using `[value]`.
  Notice the square brackets. This is required for Line to register that the
  option takes in a value.

### Example

```typescript
class GreetMainCommand extends Line.MainCommand {
  public signature = "greet [greeting] [name]";

 public options = {
   "-l [value], --log [value]": "Output logging at the specified value",
 };

public handle(): void {
  const logLevel = this.option("--log");

  // If a user specifies `greet --log error Hello Line`, then the `logLevel`
  // variable above would evaluate to `error`.
  //
  // If a user specifies `greet --log debug Hello Line`, then the `logLevel`
  // variable above would evaluate to `debug`.
  ...
  ...
  ...
}
```
