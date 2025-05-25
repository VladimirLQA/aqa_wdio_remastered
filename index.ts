/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace global {
  interface Expect {
    /**
     * The `expect` function is used every time you want to test a value.
     * You will rarely call `expect` by itself.
     *
     * @param actual    The value to apply matchers against.
     * @param message   An optional custom error message to provide if the test fails.
     */
    <T = any>(actual: T, message?: string): JestMatchers<T>;
  }
}
