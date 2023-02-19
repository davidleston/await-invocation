type PromiseResolver<P> = (value: P) => void

/**
 * @example
 * Imagine you have an asynchronous function named ```systemUnderTest```.
 * You wish to test ```systemUnderTest``` without waiting for the returned promise to resolve.
 * This example waits for two calls to a mock function:
 * ```ts
 * const mock = jest.fn();
 * const {proxy, nextCall} = awaitInvocation(mock);
 * systemUnderTest(proxy); // note: not awaiting on the promise returned by systemUnderTest
 * await nextCall();
 * await nextCall();
 * expect(mock).toHaveBeenCalledTimes(2);
 * ```
 */
export function awaitInvocation<R, P extends any[]>(
    delegate: (...args: P) => R
): {
    /**
     * Monitors for invocations.
     * Will not have properties that may have existed on the delegate.
     * Each invocation to this function results in an invocation of the delegate.
     */
    proxy(...args: P): R,
    /**
     * The nth invocation of nextCall returns a promise that will resolve after the nth invocation of the delegate.
     */
    nextCall(): Promise<P>
} {
    const resolvers: Array<PromiseResolver<P>> = []
    const promises: Array<Promise<P>> = []
    return {
        proxy(...args: P): R {
            // setTimeout ensures the promise is resolved after the invocation is complete.
            setTimeout(() => {
                const resolve = resolvers.shift();
                if (resolve) {
                    resolve(args)
                } else {
                    promises.push(Promise.resolve(args))
                }
            }, 0)
            return delegate(...args)
        },
        nextCall(): Promise<P> {
            return promises.shift() || new Promise(resolver => resolvers.push(resolver))
        }
    }
}