import { generateProductData } from '../../../../data/products/generateProduct';
import { PRODUCTS_TOAST_MESSAGES } from '../../../../data/products/products.data';
import { TAGS } from '../../../../utils/tags';
import homePageService from '../../../services/homePage.service';
import addNewProductPageService from '../../../services/products/addNewProductPage.service';
import productsPageService from '../../../services/products/productsPage.service';
import signInPageService from '../../../services/signInPage.service';

describe(`[UI] [Products] Smoke (${TAGS.GLOBAL_SETUP})`, () => {
  beforeEach(async () => {
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
  });

  it('Should create product with smoke data', async () => {
    const newProductData = generateProductData();

    await addNewProductPageService.populate(newProductData);
    await productsPageService.validateNotification(PRODUCTS_TOAST_MESSAGES.CREATED);
    await productsPageService.checkProductInTable(newProductData);
  });

  afterEach(async () => {
    await signInPageService.signOut();
  });
});
