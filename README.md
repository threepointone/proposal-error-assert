## `Error.assert(condition, message)`

Proposal for an `Error.assert()` method.

Author:

- [@threepointone](https://github.com/threepointone) (Sunil Pai, PartyKit)

## Motivation:

Today, it is very common to write a utility function like this:

```js
function assert(condition, message) {
  if (condition === false || condition == null) {
    throw new Error(
      message != null ? `Assertion failed: ${message}` : `Assertion failed`
    );
  }
}
```

And use it it like so:

```js
function add(a, b) {
  assert(typeof a === "number", "a must be a number");
  assert(typeof b === "number", "b must be a number");
  return a + b;
}
```

Additionally, this is useful in a typed language like typescript, where you can use it to assert type invariants and narrow the type of a variable:

```ts
function assert(value: boolean, message?: string): asserts value;
function assert<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T;
function assert(value: unknown, message?: string): void {
  if (value === false || value == null) {
    throw new Error(
      message != null ? `Assertion failed: ${message}` : "Assertion failed"
    );
  }
}

function add(a: number | void, b: number | void): number {
  assert(typeof a === "number", "a must be a number");
  assert(typeof b === "number", "b must be a number");
  return a + b; // a and b are now narrowed to number
}
```

There are a number of existing libraries that provide this functionality:

- [assert](https://www.npmjs.com/package/assert)
- [tiny-invariant](https://www.npmjs.com/package/tiny-invariant)
- [invariant](https://www.npmjs.com/package/invariant)
- Runtimes like node.js provide it as part of their standard library (as the `assert` module).

This proposal removes the userland implementation, and replaces it with a built-in method, `Error.assert()`.
