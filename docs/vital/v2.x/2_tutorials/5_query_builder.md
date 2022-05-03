# Query Builder

Here we are going to go over some of the instance and static methods the `Model` and `QueryBuilder` class provide.

The `QueryBuilder` class is used, as the name suggests, to help build queries. It isn't the only way to this of course. You will most likely be using this class, and without even knowing it! You do not need to do anything extra, so lets dig right in.

Both classes contain the same methods: `where`, `select`, `limit`, `whereIn`, `offset` and `orderBy`.

All are static on the `Model` but instanced in `QueryBuilder`. Upon calling one from the model, it will return a new `QueryBuilder` in which you can chain more constraints. `QueryBuilder` is the class in which you would be able to retrieve records, for example:

  ```ts
  const builder = UserModel.where('id', 1);
  builder
    .where('updated_at', '>', new Date().toTime())
    .limit(5)
  const results = await builder.all(); // SELECT * FROM users WHERE updated_at > $1 LIMIT 5, 2022-12-22
  ```

You can chain as many queries as you want:

  ```ts
  const where = UserModel.where; // Function
  const builder = where('is_admin', true); // QueryBuilder { ... }
  builder
    .where('id' > 1)
    .where('email', 'like', '%hotmail%')
    .offset(10)
    .limit(5)
  const results = await builder.all();
  ```

Though generally you may write your code like so:

  ```ts
  const users = await UserModel.where('id', id)
    .select('name')
    .first();
  ```

## `where()`

This method will add "where" constraints. It can be chained as `Model#where` returns a `QueryBuilder`.

It takes 2-3 parameters:

- 2 given for: "column name" and "value"
- 3 given for: "column name", "operator" and "value"

  ```ts
  UserModel
    .where('id', 1)
    .where('company_id', '>', 0)
  ```

## `select()`

This method will only select the given columns. Note that if you do this, the model will also only have a subset of fields:

  ```ts
  const user = await UserModel.select('name').first(); // UserModel { id: 0, name: "Vital", email: "" }
  ```

This can be used to make queries more performant where only a subset of fields are needed.

## `limit()`

This method is used to limit the amount of records retrieved:

  ```ts
  await UserModel.count(); // 10
  const users = await UserModel.limit(5).all(); // 5 items
  ```

## `whereIn()`

This method is used to apply the "where in" constraint:

  ```ts
  const userIds = [1, 3, 5, 8];
  const users = await UserModel.whereIn('id', userIds).select('name').all();
  ```

## `where()`

This method is used to apply the "where" constraint:

  ```ts
  const userIds = [1, 3, 5, 8];
  const users = await UserModel.where('id', userIds[0]).select('name').first(); // UserModel { id: 1, ... }
  ```

## `offset()`

This method is used to "offset" (ignore) a certain amount of rows.

Assume we have 10 records, the first record having the id of 1, the second being 2, all the way to the tenth where it has an id of 10:

  ```ts
  const users = await UserModel.offset(8).all(); // [ UserModel { id: 9, ... }, UserModel { id: 10, ... } ]
  ```

## `orderBy()`

This method is used to order the result set. It takes one parameter: an array of 2 items. The first being the column name to order by, and the second being `"asc"` or `"desc"`:

  ```ts
  const users = await UserModel.orderBy("id", "desc").all();
  console.log(users[0].id, users[1].id); // 10, 9
  ```

## `QueryBuilder#count()`

This method is used to count records assuming you wish to add constraints:

  ```ts
  const amount = await UserModel.where('is_admin', true).count(); // 5
  ```

Note that this method is not chainable. It will return the count.

## `QueryBuilder#delete()`

This method is used to delete records given any constraints:

  ```ts
  await UserModel.where('is_admin', true)
    .delete();
  ```

This will delete all records from the `users` table where the column `is_admin` is `true`.

Note that this method is not chainable, it will return `void`.

## `QueryBuilder#update()`

This method is used to update records given any constraints:

  ```ts
  const updatedUsers = await UserModel.where('is_admin', true)
    .update({
      name: "Administrator",
    });
  ```

`update()` will take a key value pair, where the key is the column name, and the value is the new value.

In the example above, you will update all `users` where `is_admin` is `true`, to change their `name` field to be `"Administrator"`.

Note that this method is not chainable, it will return a list models (in this case, `UserModel`) with the updated values.

## `QueryBuilder#latest()`

This method is used to get the latest record given any constraints:

  ```ts
  const user = await UserModel.where('is_admin', true).latest();
  ```

The above will get the latest user where the field `is_admin` is `true`.

Note that this method is not chainable, as it will return a model instance.

## `QueryBuilder#first()`

This method is used to get the first record given any constraints:

  ```ts
  const user = await UserModel.where('is_admin', true).first();
  ```

The above will get the first user where the field `is_admin` is `true`.

Note that this method is not chainable, as it will return a model instance.

## `QueryBuilder#all()`

This method is used to get the all records given any constraints:

  ```ts
  const user = await UserModel.where('is_admin', true).all();
  ```

The above will get all users where the field `is_admin` is `true`.

Note that this method is not chainable, as it will return a list of model instances.