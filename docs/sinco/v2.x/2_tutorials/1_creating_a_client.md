# Creating A Client

## Table of Contents

* [Before You Get Started](#before-you-get-started)
* [Folder Structure End State](#folder-structure-end-state)
* [Steps](#steps)
* [Verification](#verification)

## Before You Get Started

Sinco defines clients as a browser subprocess and Sinco's API. You wanting to use Chrome means that you will be interacting with the client, and Sinco will create a client. Sinco currently supports:

* Chrome (or other chromium based browsers)
* Firefox (or other Gecko based browsers)

When you wish to build a client, Sinco will do the following:

* Run a Deno subprocess for the given browser. This points to your own executable of the browser. If you're using Chrome version 88, Sinco to spin up Chrome instance using version 88. If you do not have Chrome installed, Sinco will fail to run.
    * This means that a Chrome or Firefox process will run, and will run indefinitely until Sinco closes it via it's `.close()` method on the API
* The browser is ran via headless, meaning the process is running, but there is no window or application you can view it on. The command used to run the headless browser instance will open up a websocket server.
* Sinco will connect to that websocket endpoint as a client, via the Chrome Remote Devtools Protocol. This is how Sinco tells the page what to do
* Sinco then returns a class to you, with methods that allow you to easily interact with your browser instance/client.
* This class provides the exact same API methods whether you're using Firefox or Chrome. The reason we did this was for consistency

To create and build a client, Sinco provides a `buildFor()` method, where you can specify which browser to build for, and any extra confguration options you wish to supply, such as a default URL to open when the browser instance runs, or point to a specific Chrome version installed on your computer.

In this tutorial, you will:

* Create both a headless browser instance for Chrome and Firefix
* Customise the build options

## Folder Structure End State

```text
▾ /path/to/your/project/
  app.ts
  deps.ts
```

## Steps

1. Create your `app_test.ts` file.

  ```typescript
  // app.ts

  import { buildFor } from "./deps.ts";

    // `buildFor()` takes two arguments:
    //   1. The browser name to build for. This can be "firefox" or "chrome". This is required.
    //   2. Options for creating the client. This is optional, and can be left out. This can be any or all of the following:
    //     - The hostname of the system that the client was created on. For you, this is your host machine. Defaults to "0.0.0.0" for MacOS and Linux, and "127.0.0.1" for Windows.
    //     - The port for the headless browser process to start a debugger server on. This is only important if you wish to occupy a different port than the default one. Defaults to 9293.
    //     - The default URL to navigate to when the browser starts. Defaults to "https://chromestatus.com" for a Chrome browser, and "https://developer.mozilla.org" for a Firefox browser
    //     - The full path to the browser binary. Useful when the binary is installed in a different location or using an alternate browser of the same underlying engine. A good example would be Brave Browser (Chromium based).
    //     e.g. await buildFor("chrome", {
    //            hostname: "localhost",
    //            debuggerPort: 9292,
    //            defaultUrl: "http://drash.land",
    //            binaryPath: "C:\\Users\\Nishchay\\brave\\brave.exe"
    //          });
    const Chrome = await buildFor("chrome");
    const Firefox = await buildFor("firefox");
    // Both clients provide the exact same API
    await Chrome.goTo("https://drash.land");
    await Firefox.goTo("https://drash.land");
    // Now you close the connections and processes, as you are done here
    await Chrome.done();
    await Firefox.done();
  ```

Here you are going to create your headless browser instance for Firefox and Chrome. Note that you wouldn't need to create both at the same time, you are only doing that here for demonstration purposes.

When building a client for Firefox, note that it will create a temporary profile that will be used, due to this, a Firefox client requires a `--allow-write=$TMPDIR` flag

## Verification

1. Run your file.

  ```shell
  $ deno run --allow-run --allow-net --allow-write=$TMPDIR --allow-read app.ts
  ```