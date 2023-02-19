import {expect, test} from "vitest";
import {awaitInvocation} from "./await-invocation";

const delegate = (random: number) => random

test('nextCall then invoke', async () => {
    const {proxy, nextCall} = awaitInvocation(delegate)
    const promise = nextCall()
    const random = Math.random()
    const result = proxy(random)
    expect(result).toBe(random)
    await expect(promise).resolves.toStrictEqual([random])
})

test('invoke then nextCall', async () => {
    const {proxy, nextCall} = awaitInvocation(delegate)
    const random = Math.random()
    const result = proxy(random)
    expect(result).toBe(random)
    const promise = nextCall()
    await expect(promise).resolves.toStrictEqual([random])
})

test('nextCall multiple times then invoke multiple times', async () => {
    const {proxy, nextCall} = awaitInvocation(delegate)
    const promise1 = nextCall()
    const promise2 = nextCall()
    const random1 = Math.random()
    const random2 = Math.random()
    const result1 = proxy(random1)
    const result2 = proxy(random2)
    expect(result1).toBe(random1)
    expect(result2).toBe(random2)
    await expect(promise1).resolves.toStrictEqual([random1])
    await expect(promise2).resolves.toStrictEqual([random2])
})

test('invoke multiple times then nextCall multiple times', async () => {
    const {proxy, nextCall} = awaitInvocation(delegate)
    const random1 = Math.random()
    const random2 = Math.random()
    const result1 = proxy(random1)
    const result2 = proxy(random2)
    expect(result1).toBe(random1)
    expect(result2).toBe(random2)
    const promise1 = nextCall()
    const promise2 = nextCall()
    await expect(promise1).resolves.toStrictEqual([random1])
    await expect(promise2).resolves.toStrictEqual([random2])
})
