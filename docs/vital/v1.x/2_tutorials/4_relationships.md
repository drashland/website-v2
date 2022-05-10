# Relationships

## Overview

Vital supports relationships, and how you support relationships for your models,
is by defining a new method.

Say `users` can belong to a company:

```ts
// models/company_model.ts

import { Model, QueryBuilder } from "../deps.ts"

interface CompanyEntity {
   id: number;
   name: string;
}
class CompanyModel extends Model {
   protected tablename = "companies";

   public id = 0;

   public name = "";

   public factoryDefaults(data: Partial<CompanyEntity>): Partial<CompanyEntity> {
      return {
         name: data.name ?? "A company";
      }
   }

   /**
      * A company can have many users
      * 
      * @returns A query builder for users, defaulting to select by company id
      */
   public users(): QueryBuilder {
      // Default to querying Users where the company id matches the one against the current model
      return UserModel.where('company_id', this.id);
   } 
}

interface UserEntity {
   id: number;
   name: string;
   email: string;
   company_id: number;
}
class UserModel extends Model {
   protected tablename = "users";

   public id = 0;

   public name = "";

   public email = "";

   public company_id = 0;

   public async factoryDefaults(data: Partial<UserEntity>): Promise<Partial<UserEntity>> {
      const companyId = data.company_id ?? (await CompanyModel.factory()).id;
      return {
         name: data.name ?? "name";
         email: data.email ?? "email";
         company_id: companyId,
      };
   }

   /**
      * Gets the company associated with this user
      * 
      * @returns The company if there is a relationship, else null if not
      */
   public async company(): Promise<CompanyModel | null> {
      return await CompanyModel.where('id', this.company_id).first();
   }
}
```

A relation is very simple to define, you simply create a new method, and you can
name it whatever you would like. Say there is a *-to-one relationship, you can
use the API to query a company, where the id matches the `company_id` on the
current user. If there is a *-to-many relationship, you can create a builder to
not only query via a key, but also add extra constraints if you wish.

## Running the Example

So say you actually want to use these relationships! Here is how they can be
used:

```ts
// Setup some data
const mainUser = await UserModel.factory(); // id = 1
const mainCompany = await CompanyModel.factory(); // id = 1

const theUsersCompany = await mainUser.company(); // CompanyModel { ... }
const companyUsers = await mainCompany.users().all(); // [ UserModel { ... } ]
const companyUsersWithTestEmail = await mainCompany.users()
  .where("email", "admin@example.com")
  .all();
```

## `withRelationships()`

The `Model` class also provides a public `withRelationships()` method, which
will turn your model into an entity and attach any relationships. Note that
because this is a raw object, you will not be able to access the object, or the
properties like you would a `Model` instance.

```ts
class UserModel {
...

   public async company() {
      return await CompanyModel.where('id', this.company_id).first();
   }
}
const user = await UserModel.factory();
const userEntity = await user.withRelationships('company'); // { id: 1, ..., company: { id: 1, ... } }
```

This method can take any number of arguments:

```ts
await user.withRelationships("company", "articles", "session"); // { ..., company: ..., session: ..., ... }
```

Behind the scenes, Vital will loop through each parameter, and call it on the
model instance:

```ts
public async withRelationships(...relations: string[]) {
   const relationships = {};
   for (const relation of relations) {
      relationships[relation] = await this[relation]()
   }
   return {
      ...this,
      ...relationships
   }
}
```

And of course, you can chain as many constraints as you wish. You will learn
more about the Query Builder in the tutorial below.
