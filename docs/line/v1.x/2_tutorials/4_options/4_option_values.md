# Option Values

## Table of Contents

- [Default Behavior](#default-behavior)
- [Example of Option Values](#example-of-option-values)

## Default Behavior

By default, the value of an option is `true`. However, options can take in a
different value if you change their signature to do so. You can have your
options take in a value by doing the following:

```typescript
public options = {
  "-l [value], --log [value]": "Output logging at the specified value",
};
```

Things to note:

- If an option takes in a value, the value _**is required**_ when the user
  specifies the option. If a user does not specify the value, then they will be
  shown an error and the `USAGE` section.
- Options can only take in one value (support to take in more values might be
  introduced in the future).
- If you want your option to take in a value, it must be done using `[value]`.
  Notice the square brackets. This is required for Line to know that the option
  takes in a value.

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
