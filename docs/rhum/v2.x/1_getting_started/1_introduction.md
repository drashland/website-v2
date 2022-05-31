# Introduction

Rhum is a test double library that follows
[test double definitions](https://martinfowler.com/bliki/TestDouble.html) from
Gerard Meszaros.

Learn more about Rhum [here](./about-rhum).

## Getting Started

The below example shows you how to create a mock of a class. More test double
tutorials can be found in the left navigation.

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your test file.

   ```typescript
   // @Tab Deno
   // my_class_test.ts

   // Replace `<VERSION>` with the latest version of Rhum v2.x. The latest
   // version can be found at https://github.com/drashland/rhum/releases/latest
   import { Mock } from "https://deno.land/x/rhum@<VERSION>/mod.ts";
   import {
     assertEquals,
     assertThrows,
   } from "https://deno.land/std@<VERSION>/testing/asserts.ts";

   class MyClass {
     public methodOne(): string {
       return "1";
     }

     public methodTwo(): string {
       let ret = "2";
       ret += this.methodOne();
       ret += this.methodFour();
       return ret;
     }

     public methodThree(): string {
       return "3";
     }

     public methodFour(): string {
       return "4";
     }
   }

   Deno.test({
     name: "MyClass.methodTwo() should make some calls and return a string",
     fn(): void {
       const mock = Mock(MyClass).create();
       assertEquals(mock.is_mock, true); // We can check if this is a mock after calling Mock(...).create()

       // We expect methodOne and methodFour to be called once
       mock.expects("methodOne").toBeCalled(1);
       mock.expects("methodFour").toBeCalled(1);

       // Do the thing that we want to test
       const actual = mock.methodTwo(); // We expect this to be "214" down below

       // Make assertions
       mock.verifyExpectations(); // Will verify .expect(...).toBeCalled(...) expectations
       assertEquals(actual, "214");
     },
   });

   // @Tab TypeScript (ESM)
   // my_class.test.ts
   import { Mock } from "@drashland/rhum";

   class MyClass {
     public methodOne(): string {
       return "1";
     }

     public methodTwo(): string {
       let ret = "2";
       ret += this.methodOne();
       ret += this.methodFour();
       return ret;
     }

     public methodThree(): string {
       return "3";
     }

     public methodFour(): string {
       return "4";
     }
   }

   const mock = Mock(MyClass).create();
   expect(mock.is_mock).toBe(true); // We can check if this is a mock after calling Mock(...).create()

   // We expect methodOne and methodFour to be called once
   mock.expects("methodOne").toBeCalled(1);
   mock.expects("methodFour").toBeCalled(1);

   // Do the thing that we want to test
   const actual = mock.methodTwo(); // We expect this to be "214" down below

   // Make assertions
   mock.verifyExpectations(); // Will verify .expect(...).toBeCalled(...) expectations
   expect(actual).toBe("214");

   // @Tab JavaScript (ESM)
   // my_test.test.js
   import { Mock } from "@drashland/rhum";

   class MyClass {
     methodOne() {
       return "1";
     }

     methodTwo() {
       let ret = "2";
       ret += this.methodOne();
       ret += this.methodFour();
       return ret;
     }

     methodThree() {
       return "3";
     }

     methodFour() {
       return "4";
     }
   }

   const mock = Mock(MyClass).create();
   expect(mock.is_mock).toBe(true); // We can check if this is a mock after calling Mock(...).create()

   // We expect methodOne and methodFour to be called once
   mock.expects("methodOne").toBeCalled(1);
   mock.expects("methodFour").toBeCalled(1);

   // Do the thing that we want to test
   const actual = mock.methodTwo(); // We expect this to be "214" down below

   // Make assertions
   mock.verifyExpectations(); // Will verify .expect(...).toBeCalled(...) expectations
   expect(actual).toBe("214");

   // @Tab CommonJS
   // my_test.test.js
   const { Mock } = require("@drashland/rhum");

   class MyClass {
     methodOne() {
       return "1";
     }

     methodTwo() {
       let ret = "2";
       ret += this.methodOne();
       ret += this.methodFour();
       return ret;
     }

     methodThree() {
       return "3";
     }

     methodFour() {
       return "4";
     }
   }

   const mock = Mock(MyClass).create();
   expect(mock.is_mock).toBe(true); // We can check if this is a mock after calling Mock(...).create()

   // We expect methodOne and methodFour to be called once
   mock.expects("methodOne").toBeCalled(1);
   mock.expects("methodFour").toBeCalled(1);

   // Do the thing that we want to test
   const actual = mock.methodTwo(); // We expect this to be "214" down below

   // Make assertions
   mock.verifyExpectations(); // Will verify .expect(...).toBeCalled(...) expectations
   expect(actual).toBe("214");
   ```

4. Run your test file.

   ```shell
   // @Tab Deno
   $ deno run app.ts

   // @Tab TypeScript (ESM)
   $ yarn test # Assumes you have your Node project set up with yarn test, ts-node, and the expect library

   // @Tab JavaScript (ESM)
   $ yarn test # Assumes you have your Node project set up with yarn test and the expect library

   // @Tab CommonJS
   $ yar test # Assumes you have your Node project set up with yarn test and the expect library
   ```

5. You should see something like the following:

   ```text
   // @Tab Deno
   Check file:///my_class_test.ts
   running 1 test from file:///my_class_test.ts
   test MyClass.methodTwo() should make some calls and return a string ... ok (5ms)

   test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (18ms)

   // @Tab TypeScript (ESM)
   Test pass

   // @Tab JavaScript (ESM)
   Test pass

   // @Tab CommonJS
   Test pass
   ```

## Features

- Zero third-party dependencies
- Lightweight
- Simple and easy to use
- Dummy support
- Fake support
- Mock support
- Stub support

## Badge

Want to show your support? Feel free to use our badge below!

```text
<a href="https://drash.land/rhum">
  <img alt="Tested with Rhum" src="https://img.shields.io/badge/tested%20with-rhum-brightgreen.svg?logo=data:image/png;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTA4cHgiIGhlaWdodD0iNTA4cHgiIHZpZXdCb3g9IjAgMCA1MDggNTA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPmJhY2s8L3RpdGxlPgogICAgPGcgaWQ9InJodW0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwb2x5Z29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjMuMDAwMDAwLCA3OS4wMDAwMDApIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjMTA5RUQzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTAuNjI2Mjk5LCAyODYuNDk1OTE4KSByb3RhdGUoLTI1OS4wMDAwMDApIHRyYW5zbGF0ZSgtMzEwLjYyNjI5OSwgLTI4Ni40OTU5MTgpICIgcG9pbnRzPSIzNjIuNjEyOTY5IDMyOC4wMDE5NjIgMjU4LjYzOTYyOSAzNDcuOTg0Njk0IDM0Mi4zNjU1ODggMjI1LjAwNzE0MiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iVHJpYW5nbGUiIGZpbGw9IiMxMEIwRUMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwOS42NzMwNjEsIDI2Ni45OTA1NDMpIHJvdGF0ZSgtMjU5LjAwMDAwMCkgdHJhbnNsYXRlKC0yMDkuNjczMDYxLCAtMjY2Ljk5MDU0MykgIiBwb2ludHM9IjE1Ny42ODYzOTEgMjI1LjQ4NDQ5OSAyNjEuNjU5NzMyIDIwNS41MDE3NjcgMTc3LjkzMzc3MyAzMjguNDc5MzE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iI0NCMDgwNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQyLjc2MzU2OSwgMTM1LjkwOTM1Nikgcm90YXRlKC0zMDQuMDAwMDAwKSB0cmFuc2xhdGUoLTE0Mi43NjM1NjksIC0xMzUuOTA5MzU2KSAiIHBvaW50cz0iOTAuNzQ0MjMxMSA5NC4xMzEyMTc0IDE5NC43ODI5MDcgNzMuOTI3NDU0OSAxMTAuOTMyNTQxIDE5Ny44OTEyNTgiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjQTcwODBBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MC4wNjMxNjIsIDc4LjIwMDcwNikgcm90YXRlKC0zMDQuMDAwMDAwKSB0cmFuc2xhdGUoLTgwLjA2MzE2MiwgLTc4LjIwMDcwNikgIiBwb2ludHM9IjEzMi4wODI0NzQgMTE5LjY0NDQ1OSAyOC4wNDM4NTA1IDEzOS42ODY4NiAxMTEuODkzODk2IDE2LjcxNDU1MTIiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjRDlCQTA2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjUuMTUyMDUyLCAxODguOTk3MzQwKSBzY2FsZSgxLCAtMSkgcm90YXRlKDExLjAwMDAwMCkgdHJhbnNsYXRlKC0yMjUuMTUyMDUyLCAtMTg4Ljk5NzM0MCkgIiBwb2ludHM9IjIzOS4zOTY2IDIzMi4wODQ3MjkgMTUxLjczOTg5NyAxNzQuMDAyMTk4IDI5OC41NjQyMDcgMTQ1LjkwOTk1MiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iVHJpYW5nbGUiIGZpbGw9IiNGNEQwMDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3NS43NDU0MDQsIDE1MC4xNjIyMjkpIHNjYWxlKDEsIC0xKSByb3RhdGUoLTc5LjAwMDAwMCkgdHJhbnNsYXRlKC0yNzUuNzQ1NDA0LCAtMTUwLjE2MjIyOSkgIiBwb2ludHM9IjI2MS40NzYzMTQgMTA2LjUyNDU2NyAzNDkuMDIxNyAxNjUuNDM1NjA0IDIwMi40NjkxMDcgMTkzLjc5OTg5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iIzJBODczNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjI0LjU1OTQ3OSwgOTkuMTkwNDkzKSByb3RhdGUoMTEuMDAwMDAwKSB0cmFuc2xhdGUoLTIyNC41NTk0NzksIC05OS4xOTA0OTMpICIgcG9pbnRzPSIyMzguODAzMDc3IDE0Mi43NzM0MTggMTUxLjE0NzM4OCA4NC4wMjM0ODQ2IDI5Ny45NzE1NjkgNTUuNjA3NTY3NSI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+">
</a>

[![tested-with-rhum](https://img.shields.io/badge/tested%20with-rhum-brightgreen.svg?logo=image/png;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTA4cHgiIGhlaWdodD0iNTA4cHgiIHZpZXdCb3g9IjAgMCA1MDggNTA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPmJhY2s8L3RpdGxlPgogICAgPGcgaWQ9InJodW0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJwb2x5Z29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjMuMDAwMDAwLCA3OS4wMDAwMDApIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjMTA5RUQzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTAuNjI2Mjk5LCAyODYuNDk1OTE4KSByb3RhdGUoLTI1OS4wMDAwMDApIHRyYW5zbGF0ZSgtMzEwLjYyNjI5OSwgLTI4Ni40OTU5MTgpICIgcG9pbnRzPSIzNjIuNjEyOTY5IDMyOC4wMDE5NjIgMjU4LjYzOTYyOSAzNDcuOTg0Njk0IDM0Mi4zNjU1ODggMjI1LjAwNzE0MiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iVHJpYW5nbGUiIGZpbGw9IiMxMEIwRUMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwOS42NzMwNjEsIDI2Ni45OTA1NDMpIHJvdGF0ZSgtMjU5LjAwMDAwMCkgdHJhbnNsYXRlKC0yMDkuNjczMDYxLCAtMjY2Ljk5MDU0MykgIiBwb2ludHM9IjE1Ny42ODYzOTEgMjI1LjQ4NDQ5OSAyNjEuNjU5NzMyIDIwNS41MDE3NjcgMTc3LjkzMzc3MyAzMjguNDc5MzE5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iI0NCMDgwNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQyLjc2MzU2OSwgMTM1LjkwOTM1Nikgcm90YXRlKC0zMDQuMDAwMDAwKSB0cmFuc2xhdGUoLTE0Mi43NjM1NjksIC0xMzUuOTA5MzU2KSAiIHBvaW50cz0iOTAuNzQ0MjMxMSA5NC4xMzEyMTc0IDE5NC43ODI5MDcgNzMuOTI3NDU0OSAxMTAuOTMyNTQxIDE5Ny44OTEyNTgiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjQTcwODBBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MC4wNjMxNjIsIDc4LjIwMDcwNikgcm90YXRlKC0zMDQuMDAwMDAwKSB0cmFuc2xhdGUoLTgwLjA2MzE2MiwgLTc4LjIwMDcwNikgIiBwb2ludHM9IjEzMi4wODI0NzQgMTE5LjY0NDQ1OSAyOC4wNDM4NTA1IDEzOS42ODY4NiAxMTEuODkzODk2IDE2LjcxNDU1MTIiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlRyaWFuZ2xlIiBmaWxsPSIjRDlCQTA2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjUuMTUyMDUyLCAxODguOTk3MzQwKSBzY2FsZSgxLCAtMSkgcm90YXRlKDExLjAwMDAwMCkgdHJhbnNsYXRlKC0yMjUuMTUyMDUyLCAtMTg4Ljk5NzM0MCkgIiBwb2ludHM9IjIzOS4zOTY2IDIzMi4wODQ3MjkgMTUxLjczOTg5NyAxNzQuMDAyMTk4IDI5OC41NjQyMDcgMTQ1LjkwOTk1MiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iVHJpYW5nbGUiIGZpbGw9IiNGNEQwMDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3NS43NDU0MDQsIDE1MC4xNjIyMjkpIHNjYWxlKDEsIC0xKSByb3RhdGUoLTc5LjAwMDAwMCkgdHJhbnNsYXRlKC0yNzUuNzQ1NDA0LCAtMTUwLjE2MjIyOSkgIiBwb2ludHM9IjI2MS40NzYzMTQgMTA2LjUyNDU2NyAzNDkuMDIxNyAxNjUuNDM1NjA0IDIwMi40NjkxMDcgMTkzLjc5OTg5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgZmlsbD0iIzJBODczNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjI0LjU1OTQ3OSwgOTkuMTkwNDkzKSByb3RhdGUoMTEuMDAwMDAwKSB0cmFuc2xhdGUoLTIyNC41NTk0NzksIC05OS4xOTA0OTMpICIgcG9pbnRzPSIyMzguODAzMDc3IDE0Mi43NzM0MTggMTUxLjE0NzM4OCA4NC4wMjM0ODQ2IDI5Ny45NzE1NjkgNTUuNjA3NTY3NSI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)](https://drash.land/rhum)
```
