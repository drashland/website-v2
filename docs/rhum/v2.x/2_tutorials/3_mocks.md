# Stubs

## Table of Contents

- [Before You Get Started](#before-you-get-started)
- [Creating A Mock](#creating-a-mock)
- [Checking Calls](#checking-calls)
- [Mock Constructor Arguments](#mock-constructor-arguments)

### Before You Get Started

Rhum defines mocks as follows:

  - Mocks register calls they receive

Unlike stubs, mocks help verify behavior. For example, you can mock an email service class and check to see if it is called in a test.

### Creating A Mock

Creating a mock can be done as follows:

   ```ts
   class ToBeMocked = { ... }

   const mock = Rhum
     .mock(ToBeMocked)
     .withConstructorArgs("someArg") // if the class to be mocked has a constructor and it requires args
     .create();
   ```

### Checking Calls

Since mocks register calls they receive, you can check to see how many times a mocked object's methods were called by accessing its calls property. Below is an example of checking if a math service's add() method was called.

   ```ts
   class MathService {
     add(num1: number, num2: number): number {
       return num1 + num2;
     }
   }

   class MyObj {
     protected service: MathService;
     constructor(service: MathService) { ... }
     add(num1: number, num2: number): number {
       return this.service.add(num1, num2);
     }
   }

   const mock = Rhum.mock(MathService).create();

   const myObj = new MyObj(mock);

   // Assert that the service's add() method was not called yet
   assertEquals(mock.calls.add, 0); // pass

   // Assert that the service's add() method was called once
   myObj.add(1, 1);
   assertEquals(mock.calls.add, 1); // pass
   ```

### Mock Constructor Arguments

Mocks can be created with constructor arguments as follows:


   ```ts
   class ToBeMocked {
     constructor(arg1: string, arg2: number) { ... }
   }

   // Create a mock with the following constructor args
   const mock = Rhum
     .mock(ToBeMocked)
     .withConstructorArgs("someStringArg", 1)
     .create();
   ```