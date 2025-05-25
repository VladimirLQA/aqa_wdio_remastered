import SignInPage from '../ui/pages/signIn.page.ts';
import HomePage from '../ui/pages/home.page.ts';
import ProductsPage from '../ui/pages/products/products.page.ts';
import AddNewProductPage from '../ui/pages/products/addNewProduct.page.ts';
import signInPageService from '../ui/services/signInPage.service.ts';
import homePageService from '../ui/services/homePage.service.ts';
import productsPageService from '../ui/services/products/productsPage.service.ts';
import addNewProductPageService from '../ui/services/products/addNewProductPage.service.ts';
import ProductsController from '../api/controllers/products.controller.ts';
import SignInController from '../api/controllers/signIn.controller.ts';
// Note: Tag filtering is now handled by Mocha's grep in wdio.conf.ts

// Base fixture type - empty object that can be extended
export type BaseFixtures = Record<string, any>;

// Page fixtures
export type PageFixtures = BaseFixtures & {
  signInPage: SignInPage;
  homePage: HomePage;
};

export type ProductPageFixtures = PageFixtures & {
  productsPage: ProductsPage;
  addNewProductPage: AddNewProductPage;
};

// Service fixtures
export type ServiceFixtures = BaseFixtures & {
  signInPageService: typeof signInPageService;
  homePageService: typeof homePageService;
};

export type ProductServiceFixtures = ServiceFixtures & {
  productsPageService: typeof productsPageService;
  addNewProductPageService: typeof addNewProductPageService;
};

// Combined fixtures
export type FullFixtures = ProductPageFixtures & ProductServiceFixtures;

export type TestDetails = {
  tag?: string | string[];
  suite?: string;
  only?: boolean;
  skip?: boolean;
};

export interface SuiteFunction {
  (title: string, fn: () => void): void;
  (title: string, details: TestDetails, fn: () => void): void;
}

type HookFunction<T> = (fixtures: T) => Promise<void> | void;

// Base fixture factory - Playwright style
export const test = {
  // Extend method to create new test functions with additional fixtures
  extend<T extends Record<string, any>>(fixtures: {
    [K in keyof T]: T[K] | Promise<T[K]>;
  }) {
    return createTestFunction<BaseFixtures & T>(async () => {
      const fixtureObj = {} as BaseFixtures & T;

      // Initialize provided fixtures
      for (const [key, factory] of Object.entries(fixtures)) {
        fixtureObj[key as keyof (BaseFixtures & T)] = factory;
      }

      return fixtureObj;
    });
  },
};

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
function createTestFunction<T extends Record<string, any>>(fixtureFactory: () => T | Promise<T>) {
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

export type ApiFixtures = BaseFixtures & {
  productsController: ProductsController;
  signInController: SignInController;
};

export const apiFixture = test.extend<ApiFixtures>({
  productsController: new ProductsController(),
  signInController: new SignInController(),
});
// Pre-configured fixture sets for convenience
export const pageTest = test.extend<PageFixtures>({
  signInPage: new SignInPage(),
  homePage: new HomePage(),
});

// Default export for convenience (empty base test)

export default test;
