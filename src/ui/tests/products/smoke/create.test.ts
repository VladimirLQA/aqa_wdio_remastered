import { generateProductData } from '../../../../data/products/generateProduct';
import { PRODUCTS_TOAST_MESSAGES } from '../../../../data/products/products.data';
import { test } from '../../../../fixtures/index';
import { TAGS } from '../../../../utils/tags';

test.describe(`UI.Products`, { tag: [TAGS.GLOBAL_SETUP, TAGS.SMOKE, TAGS.REGRESSION] },  () => {
  test.beforeEach(async ({ homePageService, productsPageService  }) => {
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
  });

  test.afterEach(async ({ signInPageService }) => {
    await signInPageService.clearStoragesAndSession();
  });

  test('Should create product with valid data', async ({ addNewProductPageService, productsPageService }) => {
    const newProductData = generateProductData();

    await addNewProductPageService.createProduct(newProductData);
    await productsPageService.checkNotification(PRODUCTS_TOAST_MESSAGES.CREATED);
    await productsPageService.checkProductInTable(newProductData);
  });
});
