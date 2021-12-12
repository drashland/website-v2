# Introduction

Line is a class-based, command-line interface framework for Deno.

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `my_cli.ts` file.

   ```typescript
   // my_cli.ts

   // Replace `<VERSION>` with the latest version of Line v1.x. The latest
   // version can be found at https://github.com/drashland/line/releases/latest
   import * as Line from "https://deno.land/x/line@<VERSION>/mod.ts";

   // Create your main command

   class Main extends Line.MainCommand {
     public signature = "my-cli [name]";

     public handle(): void {
       const name = this.argument("name")!;
       console.log(`Hello, ${name}!`);
     }
   }

   // Construct your CLI and plug in your main command

   const cli = new Line.CLI({
     name: "My Cool CLI",
     description: "Some really cool description",
     version: "v1.0.0",
     command: Main,
   });

   // Run your CLI

   cli.run();
   ```

4. Install your CLI. The `--name` flag should match your main command's
   signature. In this case, we are using `my-cli`, so that will be the name.

   ```shell
   $ deno install --name my-cli cli.ts
   ```

   This should install a `my-cli` executable that you can execute through your
   command line.

5. Run your your CLI.

   ```shell
   $ my-cli
   ```

   You should see the following:

   ```text
   My Cool CLI - Some really cool description

   USAGE

       my-cli [option]
       my-cli [arg: name]

   ARGUMENTS

       name
           (no description)

   OPTIONS

       -h, --help
           Show this menu.
       -v, --version
           Show this CLI's version.
   ```

6. Pass in a `name` argument to your CLI.

   ```shell
   $ my-cli Line
   ```

   You should see the following:

   ```text
   Hello, Line!
   ```

## Features

- Zero third-party dependencies outside of Deno Standard Modules
- Extensively documented
- Class-based
- Option support (e.g., `some-command --hello`)
- Argument support (e.g., `some-command arg1 arg2 arg3 ..and so on`
- Argument validation
- Option validation
- Auto-generated help menus

## Badge

Want to show your support? Feel free to use our badge below!

```text
<a href="https://drash.land/drash">
  <img alt="Powered by Drash" src="https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC">
</a>

[![powered-by-drash](https://img.shields.io/badge/powered%20by-drash-brightgreen.svg?logo=image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAqFBMVEUAAAAcjjk5qjn/AAAzmWb/AADbtgelCgrhBQoPndK7VwqZBgkrhjVtrnzgnQcQsO0XibMokTXxAwXxAwUWjLcWjLmGBATLBwb/AACKBAQQruj00QHSBweLwm6Mwm4ln3gspzpSUR//AAC6KAgrpj14GQyqBwelBwoQruvzzwInnTQjm3/VWgcQn9XavAYQntOJBAThBwkqhzUyskBKWSSnCArZugbhBwnEMechAAAAMnRSTlMACQkJDxEjMzNET1pldZKbm6SnqKurq6ursLG7v8HBwsPExcjJzNDS1NTW4OPt7e/w8+r9Fr8AAABkSURBVHjaVccDFgMxAADRGLWV2knt+5+sy2ie5gMXBmF0FGkdUXRi/rp250rpxmNq2Zzp6/c8dDzWWWXjOLlIwD97y94t5WFs2epLUL0PHE9bY1Y7y8XrtWw/37WSBCEE09JNAFkaBzkb5U0ZAAAAAElFTkSuQmCC)](https://drash.land/drash)
```
