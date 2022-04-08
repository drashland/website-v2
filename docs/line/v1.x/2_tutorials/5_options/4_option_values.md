# Option Values

## Table of Contents

- [Default Behavior](#default-behavior)
- [Example of Option Values](#example-of-option-values)

## Default Behavior

By default, the initial value of an option is `false`. If it is specified by a
user through the command line, then the value changes to `true`. This works well
in some cases, but what if you want your options to take in values like:

```shell
$ <MAIN COMMAND> --config my.config.ts run
```

This can be achieved by changing the signature of the option(s) like so:

```typescript
public options = {
  "-l [value], --log [value]": "Output logging at the specified value",
};
```

Notice that each signature has a `[value]` attribute. This lets Line know that
your option(s) can take in a value.

_**Important: You must use `[value]` and not something else if you want to make
your options take in values. For example, `--some-option [some_other_wording]`
will not work. It has to be `--some-option [value]`. In a future release, Line
will allow `[some_other_wording]` instead of `[value]` so that it is more
intuitive.**_

Things to note:

- If an option takes in a value, the value _**is required**_ when the user
  specifies the option. If a user does not specify the value, then they will be
  shown an error and the `USAGE` section for the command they used the option
  with.
- Options can only take in one value (support to take in more values might be
  introduced in the future).
- If you want your option(s) to take in a value, it must be done using
  `[value]`. Notice the square brackets.

## Example of Option Values

```typescript
class GreetMainCommand extends Line.MainCommand {
  public signature = "greet";

  public options = {
    "-l [value], --log [value]": "Output logging at the specified value",
  };

  public handle(): void {
    const logLevel = this.option("--log"); // or this.option("-l");

    console.log(logLevel);
  }
}
```

Taking the above example:

- If a user were to pass in ...

  ```shell
  $ greet --log error
  ```

  ... then the `--log` option would evaluate as follows ...

  ```typescript
  this.option("--log") === "error";
  this.option("-l") === "error";
  ```

- If a user were to pass in ...

  ```shell
  $ greet --log debug
  ```

  ... then the `--log` option would evaluate as follows ...

  ```typescript
  this.option("--log") === "debug";
  this.option("-l") === "debug";
  ```

- If a user were to pass in ...

  ```shell
  $ greet --log "Some really cool option value"
  ```

  ... then the `--log` option would evaluate as follows ...

  ```typescript
  this.option("--log") === "Some really cool option value";
  this.option("-l") === "Some really cool option value";
  ```
