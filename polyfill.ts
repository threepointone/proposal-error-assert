declare global {
  interface Error {
    assert(value: boolean, message?: string): asserts value;
    assert<T>(
      value: T | null | undefined,
      message?: string
    ): asserts value is T;
  }
}

if (!("assert" in Error)) {
  function assert(value, message): void {
    if (value === false || value == null) {
      throw new Error(
        message != null ? `Assertion failed: ${message}` : "Assertion failed"
      );
    }
  }
  Error.assert = assert;
}

export {};
