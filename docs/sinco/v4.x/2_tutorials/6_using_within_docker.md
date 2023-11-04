# Using Within Docker

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Folder Structure End State](#folder-structure-end-state)
- [Steps](#steps)
- [Verification](#verification)

## Before You Get Started

Sinco provides support for running your tests inside Docker. It only requires
just over half a dozen lines inside a `dockerfile` to install the chrome-driver
and you should be ready to go.

Other than that, there are no other changes required, and the rest of Sinco's
documentation still applies.

The ability to run your Browser tests from within a Docker container is very
useful, because (as containers can be networked together), you could go to your
website, test your `/register` page works when creating a user, and then clean
up (delete the user) from your database -- whether that is importing your "User
model" and deleting it manually.

In this tutorial, you will:

- Create a Docker container, that installs Deno and chrome-driver;
- Create a headless browser instance from within Docker;
- Go to a page; and
- Assert that you are on the expected web page.

## Folder Structure End State

```text
▾ /path/to/your/project/
    docker-compose.yml
    app.dockerfile
    ▾ src/
        app_test.ts
        deps.ts
```

## Steps

1. Create your `dockerfile`.

   ```dockerfile
   # app.dockerfile

   FROM debian:stable-slim

   # Install chrome driver
   RUN apt update -y && apt clean -y
   RUN apt install gnupg -y
   ENV CHROME_VERSION "google-chrome-stable"
   RUN sed -i -- 's&deb http://deb.debian.org/debian jessie-updates main&#deb http://deb.debian.org/debian jessie-updates main&g' /etc/apt/sources.list \
     && apt-get update && apt-get install wget -y
   RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list \
     && apt-get update && apt-get -qqy install ${CHROME_VERSION:-google-chrome-stable}

   # Install deno
   RUN apt install curl unzip -y
   RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh
   RUN export DENO_INSTALL="/root/.local"
   RUN export PATH="$DENO_INSTALL/bin:$PATH"
   ```

Here, you are using a very small image (`debian-slim`) as your baseline for your
Docker container. Then you install the chrome-driver, which allows Sinco to
create a headless browser instance for Chrome. Then you install Deno, because
whilst you may have Deno installed on your host machine, it will not be from
within Docker unless you tell it to.

2. Create your docker compose file

   ```yml
   # docker-compose.yml

   version: '3'

   services:
     app:
       container_name: my_app
       build:
         context: .
         dockerfile: app.dockerfile
       volumes:
         - ./src:/var/www/my-app
       command: bash -c "deno test --allow-run --allow-net"
       working_dir: /var/www/my-app
   ```

Here, you are creating your `docker-compose` file, which will start/run your
container, and execute your test file.

3. Create your `app_test.ts` file.

   ```typescript
   // app_test.ts

   import { buildFor } from "./deps.ts";

   Deno.test("My web app works as expected", async () => {
     const { browser: chrome, page: chromePage } = await buildFor("chrome");
     await chromePage.location("https://drash.land");
     const chromePageElem = await chromePage.querySelector(
       'a[href="https://discord.gg/UuYKTVMW"]',
     );
     await chromePageElem.click({
       waitFor: "navigation",
     });
     const chromePageLocation = await chromePage.location();
     assertEquals(chromePageLocation, "https://discord.com/invite/UuYKTVMW");
     await chrome.close();
   });
   ```

Here you are going to create your headless browser instance, and navigate to
`https://drash.land`. Once the page has loaded, you will click an element
matching the `img[src="/logo-sinco.svg"]` selector, which will send you to a
different page. You will then assert this page change by checking the location
of the page.

## Verification

1. Run your test.

   ```shell
   $ docker-compose build
   $ docker-compose up
   ```

2. All of your tests should pass, and your docker container should exit
   successfully.
