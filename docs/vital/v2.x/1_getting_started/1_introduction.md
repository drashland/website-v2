# Introduction

Vital is a lightweight Postgres ORM for Deno

Learn more about Vital [here](about-vital).

## Getting Started

1. Install [Deno](https://deno.land/).

2. Create your project directory.

   ```shell
   $ mkdir my-project
   $ cd my-project
   ```

3. Create your `.env` file.

  ```typescript
  DB_USER=user
  DB_PASSWORD=password
  DB_DATABASE=database
  DB_HOSTNAME=localhost
  DB_PORT=36606
  DB_ENABLE_TLS=false # or true. Optional
  DB_CA_CERTIFICATES="./certs/cert.crt,./certs/cert.key" # Comma seperated, optional
  ```

Here you are defining some environmental variables. These will be used by Vital to know where the database is, and how to connect to it.

3. Create your `app.ts` file.

   ```typescript
   // app.ts

   // Replace `<VERSION>` with the latest version of Vital v1.x. The latest
   // version can be found at https://github.com/drashland/vital/releases/latest
   import { Model } from "https://deno.land/x/vital@<VERSION>/mod.ts";

   // Create your model. This is a representation of a table

   interface UserEntity {
     id: number;
   }
   class UserModel extends Model {
     protected tablename = "users";

     public id = 0;

     // ...

     protected factoryDefaults(data: Partial<UserEntity>): Partial<UserEntity> {
       return {

       }
     }
   }

   // Create a new user

   const user = await User.factory();
   console.log(user);
   ```
  
Here, you are defining a 'model', a model is a representation of a database table. It is used to make any form of query relating to the table. The general convention of naming classes is "<non plural table name>Model", for example: "UserModel" points to the `users` table.

You are free to change the model based on your own setup of your database, for example adding new fields to the model.

4. Run your `app.ts` file.

   ```shell
   $ deno run --allow-net app.ts
   ```

Assume you have a `users` table with only an `id` column (or at least, no other fields that are required), you should see the following:

  ```shell
  UserModel {
    id: 1
  }
  ```

## Features

- Zero third-party dependencies outside of Deno Standard Modules and `deno-postgres`
- Extensively documented
- Factory support
- Support for providing relationships
- Find, select, count, where, whereIn, delete, save and update support
