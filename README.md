# await-invocation

Provides the ability to await until a function has been invoked. Created to help test asynchronous functions without having to wait for them to finish, namely Temporal.io workflows.

## Example usage

Imagine you have an asynchronous function named ```systemUnderTest```.
You wish to test ```systemUnderTest``` without waiting for the returned promise to resolve.
This example waits for two calls to a mock function:
```ts
const mock = jest.fn();
const {proxy, nextCall} = awaitInvocation(mock);
systemUnderTest(proxy); // note: no await
await nextCall();
await nextCall();
expect(mock).toHaveBeenCalledTimes(2);
```

## Author

👤 **David Leston**

* Website: https://DavidLeston.com
* Github: [@davidleston](https://github.com/davidleston)

## Show your support

Give a ⭐️ if this project helped you!
