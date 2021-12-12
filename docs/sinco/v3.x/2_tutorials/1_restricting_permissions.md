# Restricting Permissions

Sinco requires 3-4 permissions (dependant on which browser you intend to use):

## `--allow-net`

**Browser**: Both

The `--allow-net` permission is required for Sinco to interact with the Chrome Devtools Protocol (CDP) via a WebSocket that is opened when a headless browser instance is created.

As such, restricting this permission is purely a matter of specifying a hostname and port, both of which make up the endpoint of the websocket URL. 

The hostname defaults to "localhost", and the port defaults to "9292", so restricting the permissions would look like:

```shell
$ deno test --allow-net=localhost:9292
```

But if you've specified different values in the `BuildOptions` for `buildFor()`, those optiopns are what we tell the WebSokcet server to run on, so you would specify those in the test command. For example:

```ts
const client = await buildFor("chrome", {
    hostname: "0.0.0.0",
    port: 1234
})
```

```shell
$ deno test --allow-net=0.0.0.0:1234
```

## `--allow-read`

This permission is only required for Windows and when using Chrome, because Windows can have one of two default locations for Chrome, so it checks if these files exist. The argument to pass to this is the patht o your Chrome executable:

```shell
$ deno test --allow-read="C:\Program Files\Google\Chrome\Application\chrome.exe,C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
```

## `--allow-run`

This permission is required because Sinco runs a subprocess for Chrome or Firefox, to start a headless browser instance. So the argument to pass to this would be the path to your browsers executable:

```shell
$ deno test --allow-run="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Or if you've specified a binary path in the `buildFor()` arguments, you' would specify that path in the command line too:

```ts
const client = await buildFor("chrome", {
    binaryPath: "C:/chrome_version_67.exe",
});
```

```shell
$ deno test --allow-run="C:/chrome_version_67.exe"
```

## `--allow-write`

This permission is only required if you are running a Firefox instance. The reason for this is because, to run a firefox headless browser, we (Sinco) need to set a "profile" with some extra configuration to allow us to correctly interact with it over the CDP, and then pass this profile as an argument when running the subprocess. As such, you will need to pass in the location of your temporary files location, which is where Sinco will store the profile:

```shell
$ deno test --allow-write=/tmp
$ deno test --allow-write=$TMPDIR
$ deno test --allow-write=$TMP
$ deno test --allow-write="C:\Users\<user>\AppData\Local\Temp"
```