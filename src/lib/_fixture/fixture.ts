export type BaseFixtures = Record<string, any>;

export type TestDetails = {
  tag?: string | string[];
};

export interface SuiteFunction {
  (title: string, fn: () => void): void;
  (title: string, details: TestDetails, fn: () => void): void;
}

type HookFunction<T> = (fixtures: T) => Promise<void> | void;

export const getTagsFromDetails = (details: TestDetails): string[] => {
  const tags: string[] = [];
  if (details.tag) {
    if (Array.isArray(details.tag)) {
      tags.push(...details.tag);
    } else {
      tags.push(details.tag);
    }
  }
  return tags;
};

export const getFullTitle = (title: string, details: TestDetails): string => {
  const tags = getTagsFromDetails(details);
  const tagSuffix = tags.length > 0 ? ` ${tags.join(' ')}` : '';
  return `${title}${tagSuffix}`;
};
// Create test function factory
function createTestFunction<T extends Record<string, any>>(
  fixtureFactory: () => T | Promise<T> = () => ({}) as T,
) {
  const testFn = (
    title: string,
    detailsOrFn: TestDetails | ((fixtures: T) => Promise<void>),
    fn?: (fixtures: T) => Promise<void>,
  ) => {
    const actualDetails = typeof detailsOrFn === 'function' ? {} : detailsOrFn;
    const actualFn = typeof detailsOrFn === 'function' ? detailsOrFn : fn!;
    const fullTitle = getFullTitle(title, actualDetails);

    it(fullTitle, async () => {
      const fixtures = await fixtureFactory();
      await actualFn(fixtures);
    });
  };

  testFn.describe = (title: string, detailsOrFn: TestDetails | (() => void), fn?: () => void) => {
    const actualDetails = typeof detailsOrFn === 'function' ? {} : detailsOrFn;
    const actualFn = typeof detailsOrFn === 'function' ? detailsOrFn : fn!;
    const fullTitle = getFullTitle(title, actualDetails);

    describe(fullTitle, actualFn);
  };

  testFn.beforeEach = (fn: HookFunction<T>) => {
    beforeEach(async () => {
      const fixtures = await fixtureFactory();
      await fn(fixtures);
    });
  };

  testFn.afterEach = (fn: HookFunction<T>) => {
    afterEach(async () => {
      const fixtures = await fixtureFactory();
      await fn(fixtures);
    });
  };

  testFn.before = (fn: HookFunction<T>) => {
    before(async () => {
      const fixtures = await fixtureFactory();
      await fn(fixtures);
    });
  };

  testFn.after = (fn: HookFunction<T>) => {
    after(async () => {
      const fixtures = await fixtureFactory();
      await fn(fixtures);
    });
  };

  // Add extend method to any test function
  testFn.extend = <U extends Record<string, any>>(newFixtures: {
    [K in keyof U]: U[K] | Promise<U[K]>;
  }) => {
    return createTestFunction<T & U>(async () => {
      const baseFixtures = await fixtureFactory();
      const extendedFixtures = { ...baseFixtures } as T & U;

      // Initialize new fixtures
      for (const [key, factory] of Object.entries(newFixtures)) {
        extendedFixtures[key as keyof (T & U)] = factory;
      }

      return extendedFixtures;
    });
  };

  return testFn;
}

const test = createTestFunction<BaseFixtures>();

export default test;
