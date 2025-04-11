/**
 * Type guard that checks if a value is a WebdriverIO Element.
 *
 * @template T - The type to check against WebdriverIO.Element
 * @param {T | string} value - The value to check (either Element or string selector)
 * @returns {value is WebdriverIO.Element} - Type predicate confirming if value is WebdriverIO.Element
 *
 * @example
 * const element = $('selector');
 * if (isWebElement(element)) {
 *   // element is confirmed as WebdriverIO.Element
 *   console.log(element.selector);
 * }
 */
export const isWebElement = (value: WebdriverIO.Element | string): value is WebdriverIO.Element => {
  return value !== undefined && value !== null && (value as WebdriverIO.Element).selector !== undefined;
};

/**
 * Safely extracts the selector string from either a WebdriverIO Element or string selector.
 *
 * @param {WebdriverIO.Element | string} item - Input to extract selector from
 * @returns {string} - The extracted selector string
 *
 * @example
 * // With Element
 * const el = $('button.submit');
 * getElementSelector(el); // Returns 'button.submit'
 *
 * // With string
 * getElementSelector('button.submit'); // Returns 'button.submit'
 */
export const getElementSelector = (item: WebdriverIO.Element | string) => {
  if (isWebElement(item)) {
    return item.selector.toString();
  } else {
    return item;
  }
};

/**
 * Enables single-file test bail behavior - skips all subsequent tests in a file
 * if any test fails. Uses Mocha's `this.skip()` internally.
 *
 * @example
 * describe('My Suite', () => {
 *   fileBailOnFailure(); // Apply to this suite
 *
 *   it('Test 1', () => {...});
 *   it('Test 2', () => {...}); // Will be skipped if Test 1 fails
 * });
 *
 * @typedef {Object} MochaContext
 * @property {Function} skip - Mocha's test skipping function
 * @property {Object} currentTest - Current test object
 * @property {string} [currentTest.state] - Test state ('passed', 'failed', etc.)
 *
 * @returns {void}
 */
export function fileBailOnFailure() {
  let suiteFailed = false;

  beforeEach(function () {
    if (suiteFailed) {
      this.skip();
    }
  });

  afterEach(function () {
    if (this.currentTest?.state === 'failed') {
      suiteFailed = true;
    }
  });
}

export const isID = (value: string) => /^[0-9a-fA-F]{24}$/.test(value);
