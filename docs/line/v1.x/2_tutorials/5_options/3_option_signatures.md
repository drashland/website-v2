# Option Signatures

## Table of Contents

- [About Option Signatures](#about-option-signatures)
- [Complete Example](#complete-example)

## About Option Signatures

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
option in Line. This means a user can specify `-d` or `--debug` and you can
retrieve the option using ...

```typescript
const debugEnabled = this.option("--debug"); // Evaluates to true if specified by the user
```

... or ...

```typescript
const debugEnabled = this.option("-d"); // Evalutes to true if specified by the user
```

Both options will evaluate to `true` if specified by the user. It does not
matter which signature you specify in the `this.option()` call. Line will know
which one you are trying to get based on the signature you specify in the
`this.option()` call since both are considered the same option.

## Complete Example

```typescript
// File: cli.ts

// @Import line_v1_from_deno

// Create your main command

class MainCommand extends Line.MainCommand {
  public signature = "greet";

  public options = {
    "-s, --some-option": "Some cool option.",
  };

  public handle(): void {
    console.log(this.option("--some-option")); // Evalutes to the same value as -s
    console.log(this.option("-s")); // Evaluates to the same value as --some-option
  }
}

// Construct your Line.CLI object and plug in your main command

const cli = new Line.CLI({
  name: "Option Handler",
  description: "A CLI that handles options",
  version: "v1.0.0",
  command: MainCommand,
});

// Run your CLI

cli.run();
```
