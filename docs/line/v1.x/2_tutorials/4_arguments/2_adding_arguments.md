# Adding Arguments to Commands

## Table of Contents

- [Adding Arguments](#adding-arguments)
- [Complete Example](#complete-example)

## Adding Arguments

To allow a command to handle arguments, add them in the command's `signature`
property. For example:

```typescript
public signature = "my-cli [arg1] [arg2] [arg3]";
```

Once you have arguments defined, create a `handle()` method in the command to
handle the arguments. For example:

```typescript
public handle(): void { // or public async handle(): Promise<void> {
  console.log(this.argument("arg1")); // Targets [arg1] in the signature
  console.log(this.argument("arg2")); // Targets [arg2] in the signature
  console.log(this.argument("arg3")); // Targets [arg3] in the signature
}
```

When calling `this.argument()`, the argument name must match the argument name
in the signature. Otherwise, the value will be `undefined`.

## Complete Example

```typescript
// File: cli.ts

// @Import line_v1_from_deno

// Create your main command

class MainCommand extends Line.MainCommand {
  public signature = "greet [some_arg]";

  public handle(): void {
    console.log(this.argument("some_arg"));
  }
}

// Construct your Line.CLI object and plug in your main command

const cli = new Line.CLI({
  name: "Arg Handler",
  description: "A CLI that handles arguments",
  version: "v1.0.0",
  command: MainCommand,
});

// Run your CLI

cli.run();
```
