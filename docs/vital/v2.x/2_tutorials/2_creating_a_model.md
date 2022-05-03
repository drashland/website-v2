# Creating A Model

A "model" is a representation of a database table and it is declared via a
class. You may well be familiar with this concept, but if you aren't, here is a
rundown:

- A model is just a class, that points to a specific table in the database.
- If you want to get a user, or many users from the `users` table, you would use
  a "User Model".
- Any queries you might want to do that relate to the `users` table, would
  involve this class.

Your models will extends Vital's `Model` class. This will allow your class start
making queries against your database! Alongside defining relationships and
defining a 'factory', but we will go into factories later.

Once your class extends `Model`, you have a lot of access to the methods it
provides. For every field/column on the table, you will want to define it as a
property against your class. This way, when Vital fetches a record from the
database, it will 'fill' the class using the column names. If you omit the `id`
property, it will not get set! This way, you will also have TypeScript aiding
in, on what properties exist against your representation.

Let us finish off with an example!

For the sake of simplicity, we will assume that you have a `users` table, and
this table follows the following schema:

    ```json
    {
      "id": "number",
      "name": "string",
      "email": "string"
    }
    ```

To define your model for this table you would write it like so:

    ```typescript
    // ./models/user_model.ts
    import { Model } from "../deps.ts";
    class UserModel extends Model {
      /**
       * Tell Vital what table this model should be pointing to
       */
      protected tablename = "users";

      /**
       * The id of the row
       *
       * Default to 0
       */
      public id = 0;

      /**
       * The name of the user. Firstname + lastname
       *
       * Default to an empty string
       */
      public name = "";

      /**
       * The email address of the user
       *
       * Default to an empty string
       */
      public email = "";
    }
    ```

That is the basics of creating a model. Like we have said above, now you have
declared an `id`, `name` and `email` property, when you fetch a record, this
properties will be filled. It also means you can update them as you wish.

There is a powerful tool behind Vital: Generics. By the power of generics, you
can call static methods from the `Model` class, on your own models, and Vital
will understand what class is being used. Take the following example:

    ```ts
    class UserModel extends Model {
      // ...
    }
    ```

A `factory()` method exists on the `Model` class, a public static method, which
we will get into more later. But if you were to call `UserModel.factory()`,
Vital would know that the class `UserModel` is being used, and would use the
tablename on the model, and if needed, instantiated a new instance of it.
