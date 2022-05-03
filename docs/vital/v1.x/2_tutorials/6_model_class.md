# Model Class

Here we are going to go over some of the instance and static methods the `Model`
class provides.

## `save()`

This method would be used if you want to manually save a new record or update an
existing one.

Updating will happen if the `id` property on the class is defined. Saving will
happen if it is not.

```ts
const newUser = new UserModel();
newUser.name = "Vital";
await newUser.save(); // Saves the new record, updates `newUser` with fields such as the `id`
console.log(newUser.id); // 1
newUser.name = "Not vital";
await newUser.save(); // Updates all fields
console.log(newUser); // UserModel { id: 1, name: "Not vital" }
```

## `delete()`

This method will delete the record from the database using the `id` property:

```ts
const user = await UserModel.factory();
await user.delete(); // this record no longer exists in the database
```

## `exists()`

This method is used to check if a record exists in the table with the id of the
model:

```ts
const user = await UserModel.factory(); // id = 1
await user.exists(); // Does a record in the `users` table exist with the id of 1? Yes
await user.delete();
await user.exists(); // false
```

Note that the query this method makes is as performant as possible.

## `refresh()`

This method is to re-fetch the record from the database. This can be useful in
many cases, such as tests:

```ts
Deno.test("PUT /users/{id} updates a user", async () => {
  const user = await UserModel.factory(); // name = "Vital"
  await fetch(`/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: "Test case",
    }),
  });
  console.log(user.name); // Vital
  await user.refresh();
  console.log(user.name); // Test case
});
```

## `count()`

This method is to accurately count how many records exists for a given table:

```ts
for (const i in new Array(5)) {
  await UserModel.factory();
}
const count = await UserModel.count(); // 5
```

## `first()`

This method is used to fetch the first record from the table:

```ts
const user = await UserModel.first();
```

## `latest()`

This method will fetch the latest record from the database, using the id:

```ts
const user1 = await UserModel.factory(); // id = 1
const user2 = await UserModel.factory(); // id = 2
console.log(await UserModel.latest()); // UserModel { id: 2 }
```
