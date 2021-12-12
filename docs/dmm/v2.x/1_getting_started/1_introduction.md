# Introduction

Dmm is a CLI tool that helps you keep your dependencies up to date. Nothing
else. It simply checks your dependency file, and for each dependency, if a newer
version exists, dmm will write to the file updating the specific version string
on the line for the URL, to match the latest.

Learn more about Dmm [here](about-dmm).

Note that all examples after this page will act as if you have installed dmm as
an executable.

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `deps.ts` file.

   ```typescript
   export { Drash } from "https://deno.land/x/drash@v1.5.1/mod.ts"; // outdated on purpose
   ```

4. Run dmm against your dependency file.

   ```shell
   $ deno run \
    --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' \
    --allow-read='deps.ts' \
    --allow-write='deps.ts' \
    https://deno.land/x/dmm/mod.ts \
    update
   ```

   (When installing, the file passed for `--allow-write` and `--allow-read` is
   the file you wish to update, so if you are specifying a custom path, make
   sure to specify that: `--allow-read=server/my_deps.ts`)

5. Check output.

   You should see something like the following:

   ```text
   drash was updated from v1.5.2 to v2.0.0
   ```

   And if you check your `deps.ts` file, the version should have been updated.

## Features

- Zero third-party dependencies outside of Deno Standard Modules
- Updates dependencies in a simple manner
- Only reads and writes to your `deps.ts` file
- Looks up modules on the following registries:
  - https://deno.land/std/
  - https://deno.land/x/
  - https://x.nest.land/
  - https://raw.githubusercontent.com
