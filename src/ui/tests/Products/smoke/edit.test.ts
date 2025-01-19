//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke/edit.test.ts"

import _ from 'lodash';
import productApiService from '../../../../api/service/productApi.service';
import { SignInApiService } from '../../../../api/service/signInApiService.service';
import { IProduct, MANUFACTURERS } from '../../../../data/types/product.types';
import homePageService from '../../../services/homePage.service';
import editProductPageService from '../../../services/Products/editProductPage.service';
import productsPageService from '../../../services/Products/productsPage.service';
import signInPageService from '../../../services/signInPage.service';

describe('[UI] [Products] Smoke', async function () {
  const signInApiService = new SignInApiService();

  beforeEach(async function () {
    const token = await signInApiService.signInAsAdmin();
    await productApiService.create(token);
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();

    await homePageService.openProductsPage();
  });

  it('Should open Edit Product page with created product', async function () {
    await productsPageService.openEditProductPage(productApiService.getCreatedProduct().name);
    await editProductPageService.checkPageTitle(productApiService.getCreatedProduct().name);
  });

  it('Should validate Product data on Edit Product page', async function () {
    await productsPageService.openEditProductPage(productApiService.getCreatedProduct().name);
    const actualObject: IProduct = {
      name: await $('#inputName').getValue(),
      amount: +(await $('#inputAmount').getValue()),
      price: +(await $('#inputPrice').getValue()),
      manufacturer: (await $('#inputManufacturer').getValue()) as MANUFACTURERS,
      notes: await $('#textareaNotes').getValue(),
    };

    expect(actualObject).toMatchObject({ ..._.omit(productApiService.getCreatedProduct(), ['_id', 'createdOn']) });
  });

  afterEach(async () => {
    await productApiService.delete(signInApiService.getToken());
    await signInPageService.signOut();
  });
});
