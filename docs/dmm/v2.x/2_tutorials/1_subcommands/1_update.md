#Update

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Dmm provides a subcommand called `update`, which will read a file (defaults to
`./deps.ts`, or the file passed in as an argument), and will update every
dependency in that file to use the latest version, by writing new content to it.

If no new version was found for a dependency, it will simply do nothing for that
line, and move onto the next.

This command requires the following permissions:

- `--allow-net`: dmm uses HTTP requests to fetch information on the given
  module.
- `--allow-read`: dmm needs to read your dependency file to gather the
  dependencies you have.
- `--allow-write`: dmm will update the version strings inside your `deps.ts` and
  rewrite the file.

In this tutorial, you are going to create your dependency file. This is what dmm
will read, extract the version from each dependency and check against its
related CDN if there is a newer version available. Note that some CDNs we do not
currently support, so if you use one we do not support, please feel free to
[make an issue](https://github.com/drashland/dmm/issues/new/choose)!

## Folder Structure End State

```text
▾ /path/to/your/project/
  deps.ts
```

## Steps

1. Create your `deps.ts` file.

   ```typescript
   export { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts";
   export * as DrashTwo from "https://raw.githubusercontent.com/drashland/drash/v1.5.1/mod.ts";
   ```

   Note that the versions in the `export` statements are old, so dmm should
   update them for you.

## Verification

1. Update your dependencies.

   ```shell
   $ dmm update
   ```

   Dmm will default (if no argument was given to the `update` command) to
   `deps.ts` at the current working directory.

   If your dependency file is named something else, or you still wish to specify
   the filepath for any reason, you can do so:

   ```shell
   $ dmm update --deps-file src/server/my_deps.ts
   $ dmm update -F src/server/my_deps.ts
   ```

   `-F` is just shorthand for `--deps-file`.

   You should receive something like the following:

   ```text
   INFO Reading deps.ts to gather your dependencies...
   INFO Checking if your modules can be updated...
   INFO drash was updated from v1.5.1 to v2.2.0
   INFO drash was updated from v1.5.1 to v2.2.0
   ```

2. Check your `deps.ts` file.

   You should see something like the following (the versions have been updated):

   ```ts
   export { Drash } from "https://deno.land/x/drash@v2.2.0/mod.ts";
   export * as DrashTwo from "https://raw.githubusercontent.com/drashland/drash/v2.2.0/mod.ts";
   ```
