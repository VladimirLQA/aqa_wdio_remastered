import _ from 'lodash';
import { TAGS } from '../../../../utils/tags';
import { test } from '../../../../fixtures';

test.describe('UI.Products edit page', { tag: [TAGS.GLOBAL_SETUP, TAGS.SMOKE, TAGS.REGRESSION] }, () => {
  test.beforeEach(async ({ homePageService, productsApiService }) => {
    await productsApiService.create();
    await homePageService.openProductsPage();
  });

  test('should contain created product name in page title',
    async ({ productsPageService, productsApiService, editProductPageService }) => {
      await productsPageService.openEditProductPage(productsApiService.getCreatedProduct().name);
      await editProductPageService.checkPageTitle(productsApiService.getCreatedProduct().name);
  });

  test('should contain data of created product in input fields',
    async ({ productsPageService, productsApiService, editProductPageService }) => {
      await productsPageService.openEditProductPage(productsApiService.getCreatedProduct().name);
      await editProductPageService.checkTextInInputFields({
        ..._.omit(productsApiService.getCreatedProduct(), ['_id', 'createdOn']),
    });
  });

  test.afterEach(async ({ productsApiService, signInPageService }) => {
    await productsApiService.delete();
    await signInPageService.clearStoragesAndSession();
  });
});
