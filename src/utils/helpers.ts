import { faker } from '@faker-js/faker';

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
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
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
export function fileBailOnFailure(): void {
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

/**
 * Converts a camelCase string to a human-readable string by inserting spaces before uppercase letters
 * and converting them to lowercase (except for the last character).
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The converted, human-readable string.
 *
 * @example
 * camelCaseToReadableString('myCamelCaseString'); // "my camel case string"
 */
export const camelCaseToReadableString = (str: string) =>
  [...str].reduce(
    (readableStr, char, idx) => (
      /[A-Z]/.test(char) && idx !== str.length - 1
        ? (readableStr += ` ${char.toLowerCase()}`)
        : (readableStr += `${char}`),
      readableStr
    ),
    '',
  );

/**
 * Type guard that checks if a value is an async function.
 *
 * @param {any} value - The value to check.
 * @returns {value is (...args: any[]) => Promise<any>} - Type predicate
 * confirming if value is an async function.
 *
 * @example
 * isAsyncFn(myAsyncFunction); // true
 * isAsyncFn(mySyncFunction); // false
 */
export const isAsyncFn = (value: any): value is (...args: any[]) => Promise<any> =>
  typeof value === 'function' && value.constructor.name === 'AsyncFunction';
/**
 * Type guard that checks if a value is a function (but not an async function).
 *
 * @param {any} value - The value to check.
 * @returns {value is (...args: any[]) => any} - Type predicate confirming if value is a function.
 *
 * @example
 * const add = (a: number, b: number) => a + b;
 * if (isFn(add)) {
 *   // add is confirmed as a function
 *   console.log(add(2, 3));
 * }
 */

export const isFn = (value: any): value is (...args: any[]) => any =>
  typeof value === 'function' && value.constructor.name !== 'AsyncFunction';

export const getCliArgs = () => globalThis.process.argv.slice(2);

/**
 * Parses CLI arguments and returns an array of values for the given options.
 *
 * @param {string[]} args - CLI arguments.
 * @param {string[]} option - CLI options to parse. The values for these options will be returned.
 * @returns {string[]} An array of values for the given options.
 *
 * @example
 * const CLI_ARGS = ['--foo', 'bar', '--baz', 'qux', '--foo', 'quux'];
 * const OPTIONS = ['--foo', '--baz'];
 * const values = parseCliArgs(CLI_ARGS, OPTIONS); // ['bar', 'qux']
 */
export const pasrseCliArgs = (args: string[], option: string[]) => {
  const values: string[] = [];

  for (let i = 0; i < args.length; i += 1) {
    if (option.includes(args[i])) {
      values.push(args[i + 1]);
      i++;
    }
  }

  return values;
};

export const escapeRegExpCharacters = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Creates a regular expression pattern that matches any of the given tags.
 *
 * @param {string[]} tags - An array of strings to match as tags.
 * @returns {RegExp} A regular expression pattern that matches any of the given tags.
 *
 * @example
 * // Assuming the following tags array: ['@tag1', '@tag2', '@tag3']
 * const pattern = createTagRegex(tags);
 * // pattern will be a RegExp matching '@tag1', '@tag2', or '@tag3'
 */
export const createTagRegex = (tags: string[]): RegExp => {
  const escapedTags = tags.map(escapeRegExpCharacters);
  return new RegExp(escapedTags.join('|'));
};

/**
 * Generates a regular expression pattern based on command-line arguments.
 *
 * @param {string[]} options - An array of string options to parse from the CLI arguments.
 * @returns {RegExp | undefined} - A regular expression pattern created from the parsed
 * CLI arguments, or undefined if no matching tags are found.
 *
 * @example
 * // Assuming CLI arguments contain '--tags @tag1 @tag2'
 * const pattern = createGrepPattern(['--tags']);
 * // pattern will be a RegExp matching '@tag1' or '@tag2'
 */

export const createGrepPattern = (options: string[]): RegExp | undefined => {
  const args = getCliArgs();

  const tagValues = pasrseCliArgs(args, options);

  if (tagValues.length === 0) {
    return;
  }

  return createTagRegex(tagValues);
};

type LengthParams =
  | { length: number; min?: never; max?: never }
  | { min: number; max: number; length?: never };

type StringGeneratorParams = LengthParams & { excludeSpace?: boolean };

const createStringGenerator =
  (method: 'alpha' | 'alphanumeric' | 'numeric') =>
  ({ min, max, length, excludeSpace = true }: StringGeneratorParams) =>
    faker.string[method]({
      length: length ? length : { min: min!, max: max! },
      exclude: excludeSpace ? ' ' : '',
    });

export const getStringAlpha = createStringGenerator('alpha');
export const getStringAlphanumeric = createStringGenerator('alphanumeric');
export const getStringNumeric = createStringGenerator('numeric');
