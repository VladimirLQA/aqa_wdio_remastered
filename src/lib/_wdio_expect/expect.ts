/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect as baseExpect } from 'expect-webdriverio';

export const isFn = (value: any): value is (...args: any[]) => any =>
  typeof value === 'function' && value.constructor.name !== 'AsyncFunction';

type MathcherFn = (...args: any[]) => any;

const wrapMatcher = (fn: MathcherFn, message?: string) => {
  return (...args: any[]) => {
    try {
      return fn(...args);
    } catch (err: any) {
      const result = err.matcherResult;
      const matcherName = result?.matcherName || '';
      const rawMessage = isFn(result.message) ? result.message() : err.message;
      const errorMessage = message ? `${message}\n→ ${matcherName} failed: ${rawMessage}` : rawMessage;

      throw new Error(errorMessage);
    }
  };
};

const makeHandler = (message?: string): ProxyHandler<any> => {
  return {
    get(target, prop, receiver) {
      const originalProp = Reflect.get(target, prop, receiver);
      if (!isFn(originalProp)) {
        return originalProp;
      }
      return wrapMatcher(originalProp.bind(target), message);
    },
  };
};

const expectWrapper = <T>(
  actual: T,
  message?: string,
): ExpectWebdriverIO.Matchers<void | Promise<void>, T> => {
  const expect = baseExpect(actual) as unknown as ExpectWebdriverIO.Expect;
  const positive = new Proxy(expect, makeHandler(message));
  const negative = new Proxy(expect.not, makeHandler(message));

  Object.defineProperty(positive, 'not', {
    get: () => negative,
    configurable: true,
  });

  return positive;
};

const expect = Object.assign(expectWrapper, baseExpect);

export default expect;
