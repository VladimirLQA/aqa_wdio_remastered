import { test } from '../../fixtures/ui/pages/page.fixture.ts';
import { expect } from '../../fixtures/base.fixture.ts';
import { TAGS } from '../../utils/tags.ts';

test.describe('Page Fixture Tests', { tag: [TAGS.TEST] }, () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.open();
    await signInPage.fillCredentials({ username: 'aqacourse@gmail.com', password: 'password' });
    await signInPage.clickOnLoginButton();
  });

  test('Login flow with pages', { tag: [TAGS.REGRESSION] }, async ({ homePage }) => {
    await homePage.waitForPageOpened();
    await homePage.clickOnMenuButton('Products');
  });

  test('Login flow with pages 2', async ({ homePage }) => {
    await homePage.waitForPageOpened();
    await expect(
      await (await homePage.findElement(homePage['Welcome label'])).isDisplayed(),
      'Welcome label should be displayed',
    ).toBeTruthy();
    await homePage.clickOnMenuButton('Products');
  });

  test.afterEach(async ({ signInPage }) => {
    await signInPage.deleteCookies(['Authorization']);
    await browser.refresh();
  });
});
