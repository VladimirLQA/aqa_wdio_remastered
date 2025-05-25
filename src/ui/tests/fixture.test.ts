import { pageTest } from '../../fixtures/base.fixture.ts';
import { TAGS } from '../../utils/tags.ts';
import expect from '../../utils/expectWrapper.ts';

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
