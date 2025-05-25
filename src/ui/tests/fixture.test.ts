import { pageTest } from '../../fixtures/base.fixture.ts';
import { TAGS } from '../../utils/tags.ts';
import expect from '../../utils/expectWrapper.ts';

// // Example 1: Base test (empty fixture) - extend as needed
// const customTest = test.extend({
//   customService: () => ({ getData: () => 'custom data' }),
//   apiClient: () => ({ get: () => Promise.resolve({ status: 200 }) }),
// });

// customTest.describe('Custom Fixture Tests', { tag: [TAGS.TEST] }, () => {
//   customTest('Should work with custom fixtures', async ({ customService, apiClient }) => {
//     await expect(customService.getData()).toBe('custom data');
//     const response = await apiClient.get();
//     await expect(response.status).toBe(200);
//   });
// });

// // Example 2: Page fixtures
pageTest.describe('Page Fixture Tests', { tag: [TAGS.TEST] }, () => {
  pageTest.beforeEach(async ({ signInPage }) => {
    await signInPage.open();
    await signInPage.fillCredentials({ username: 'aqacourse@gmail.com', password: 'password' });
    await signInPage.clickOnLoginButton();
  });

  pageTest('Login flow with pages', { tag: [TAGS.REGRESSION] }, async ({ homePage }) => {
    await homePage.waitForPageOpened();
    await expect(
      await (await homePage.findElement(homePage['Welcome label'])).isDisplayed(),
      'Welcome label should be displayed',
    ).toBeTruthy();
    await homePage.clickOnMenuButton('Products');
  });

  pageTest('Login flow with pages 2', async ({ homePage }) => {
    await homePage.waitForPageOpened();
    await expect(
      await (await homePage.findElement(homePage['Welcome label'])).isDisplayed(),
      'Welcome label should be displayed',
    ).toBeTruthy();
    await homePage.clickOnMenuButton('Products');
  });

  pageTest.afterEach(async ({ signInPage }) => {
    await signInPage.deleteCookies(['Authorization']);
    await browser.refresh();
  });
});

// // Example 3: Extending page fixtures with additional fixtures
// const extendedPageTest = pageTest.extend({
//   testData: () => ({ productName: 'Test Product', price: 100 }),
// });

// extendedPageTest.describe('Extended Page Tests', { tag: [TAGS.SMOKE] }, () => {
//   extendedPageTest('Should have both pages and test data', async ({ signInPage, homePage, testData }) => {
//     expect(signInPage).toBeDefined();
//     expect(homePage).toBeDefined();
//     expect(testData.productName).toBe('Test Product');
//     expect(testData.price).toBe(100);
//   });
// });

// // Example 4: Product page fixtures
// productPageTest.describe('Product Page Fixture Tests', { tag: [TAGS.SMOKE] }, () => {
//   productPageTest(
//     'Should have all product pages',
//     async ({ productsPage, addNewProductPage, signInPage, homePage }) => {
//       expect(productsPage).toBeDefined();
//       expect(addNewProductPage).toBeDefined();
//       expect(signInPage).toBeDefined();
//       expect(homePage).toBeDefined();
//     },
//   );
// });

// // Example 5: Service fixtures
// serviceTest.describe('Service Fixture Tests', { tag: [TAGS.REGRESSION] }, () => {
//   serviceTest('Should have services available', async ({ signInPageService, homePageService }) => {
//     expect(signInPageService).toBeDefined();
//     expect(homePageService).toBeDefined();
//   });
// });

// // Example 6: Full fixtures (pages + services)
// fullTest.describe('Full Fixture Tests', { tag: [TAGS.SMOKE, TAGS.REGRESSION] }, () => {
//   fullTest('Should have both pages and services', async (fixtures) => {
//     expect(fixtures.signInPage).toBeDefined();
//     expect(fixtures.signInPageService).toBeDefined();
//     expect(fixtures.productsPage).toBeDefined();
//     expect(fixtures.productsPageService).toBeDefined();
//   });
// });

// // Example 7: Chain extensions - start with service and add more
// const chainedTest = serviceTest
//   .extend({
//     database: () => ({ connect: () => 'connected' }),
//   })
//   .extend({
//     logger: () => ({ log: (msg: string) => console.log(msg) }),
//   });

// chainedTest.describe('Chained Extensions', { tag: [TAGS.SMOKE] }, () => {
//   chainedTest(
//     'Should have all extended fixtures',
//     async ({ signInPageService, homePageService, database, logger }) => {
//       expect(signInPageService).toBeDefined();
//       expect(homePageService).toBeDefined();
//       expect(database.connect()).toBe('connected');
//       logger.log('Test executed successfully');
//     },
//   );
// });
