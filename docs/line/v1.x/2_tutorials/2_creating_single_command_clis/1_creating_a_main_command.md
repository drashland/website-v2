# Creating A Main Command

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)
- [Caveats](#caveats)
  - [Differentiating Signatures](#differentiating-signatures)
    - [Option 1: Provide Explicit Installation Instructions](#option-1-provide-explicit-installation-instructions)
    - [Option 2: Use a Generic Signature](#option-2-use-a-generic-signature)

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

## Caveats

### Differentiating Signatures

Based on
[Deno's documentation on script installations](https://deno.land/manual/tools/script_installer),
Line has no control over what users will use as an executable's name. Even
though you can specify an explicit `signature` in a main command class, users
can still specify `--name some-random-name` when installing your CLI and they
will be able to use `some-random-name` as the command instead of what you
specified in the `signature`. This can cause great confusion.

In this tutorial, you created a `GreetMainCommand` with a `signature` of ...

```typescript
public signature = "greet";
```

... and you installed your CLI using `--name greet` ...

```shell
$ deno install --name greet cli.ts
```

... which allowed you to run `greet` and be shown a help menu ...

```text
$ greet

Greeter CLI - A CLI that outputs greetings

USAGE

    greet [option]


OPTIONS

    -h, --help
        Show this menu.
    -v, --version
        Show this CLI's version.
```

This help menu makes sense because the `USAGE` section shows `greet`, but what
if a user installs your CLI using `--name` like so:

```shell
$ deno install --name tester app.ts
```

The user would be able to run your CLI using `tester` instead of `greet` and
when they are shown your CLI's help menu, they will see the following `USAGE`
section:

```text
USAGE

    greet [option]
```

As you can see, the `USAGE` section still shows `greet`. This is because of the
following:

- You defined a `signature` of `greet`
- The user installed your CLI using a different name than what is specified by
  you
- Line only knows about _YOUR_ CLI's signature, so it uses that in the help
  menu(s)

Below are two options to help you prevent this confusion:

#### Option 1: Provide Explicit Installation Instructions

(This first option comes from
[Deno's documentation on script installations](https://deno.land/manual/tools/script_installer))

You can provide explicit installation instructions to your users. That is, give
them something like the following:

> When installing this CLI, please use the following command:

> ```shell
> $ deno install --name greet app.ts`.
> ```

> If you install this CLI using a different `--name`, then please be aware that
> the help menu(s) will not reflect the `--name` you have chosen.

#### Option 2: Use a Generic Signature

Another option is to use a placeholder in your main command's signature. For
example:

```typescript
class GreetMainCommand extends Line.MainCommand {
  public signature = "<COMMAND>";
}
```

When users install your CLI with the above main command and are shown the help
menu, they will see the following in the `USAGE` section:

```text
USAGE

    <COMMAND> [option]
```

This way, users can be free to install your CLI as they please and will see a
generic `<COMMAND>` instead of something you defined. However, it would be best
to tell users that `<COMMAND>` is a placeholder for the `--name` they used when
installing your CLI. For example, you can provide users with the following:

> The help menu(s) in this CLI contain `<COMMAND>` in the USAGE section(s).
> Please be aware that this is just a placeholder value for help menu purposes.
> This command is actually the command you specified with the `--name` option
> when installing this CLI.

Also take note that this approach may cause ambiguity to some users.
