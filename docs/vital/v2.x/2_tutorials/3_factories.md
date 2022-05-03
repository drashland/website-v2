# Factories

## Overview

A factory (again, taking inspiration from elsewhere), is a simple way to quickly create a new record using your model/class.

Any model can have one, and in fact, it is encouraged. To 'enable' a factory on a model, you have to define a protected method, which would contain the default data to use when creating a new record. You can also pass in extra data to this method, to override any data.

To support factories, you need to define a protected `factoryDefaults()` method:

  ```ts
  protected async factoryDefaults() {
    return {
      // ...
    }
  }
  ```

This method should return default data to insert into the database when creating a new record.

You should define a parameter, so you're able to customise the data it returns:

  ```ts
  interface UserEntity {
    id: number;
    name: string;
    email: string;
  }
  class UserModel extends Model {
    protected factoryDefaults(data: Partial<UserEntity>): Partial<UserEntity> {
      return {
        name: data.username ?? "A random name",
        email: data.email ?? "admin@example.com",
      };
    }
  }
  ```

## Process

Vital's `Model` class (which you extend), provides a public static method called `.factory()`. How this method works is:

- `UserModel.factory()` is called
- Vital understands that `factory()` was called on the `UserModel` definition.
- Vital retrieves the `tablename` from `UserModel`
- Vital will call your `factoryDefaults()` method, passing in the parameters passed to `factory()` (if any) to it. As you might understand, `factoryDefaults()` will use the data passed in, or a default value
- Vital will then construct a prepared query to insert a new record using the default data and passed in data, and grab the new record, all in one query.
- Vital will finally assign the new record to a new instance of the class, and return it.

## Example

An example would be:

    ```ts
    class UserModel extends Model {
      // Assume you still have your definitions as declared above
      ...
    }
    const user = UserModel.factory(); // UserModel { id: 1, name: "A random name", email: "admin@example.com" }
    const user2 = await UserModel.factory({
      email: "tets@test.com",
    }); // UserModel { id: 2, name: "A random name", email: "test@test.com" }
    ```

You can also use relationships if you wish. We will go more in-depth with relationships later, but say the user belongs to a company:

  ```ts
  class UserModel {
    ...

    public company_id = 0;

    public async company(): Promise<CompanyModel> {
      return await CompanyModel.where("id", this.company_id).first();
    }

    protected async factoryDefaults(data: Partial<UserEntity>) {
      const companyId = data.company_id ?? (await CompanyModel.factory()).id;
      return {
        ...,
        company_id,
      }
    }
  }
  ```