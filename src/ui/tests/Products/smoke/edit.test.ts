import _ from 'lodash';
import { SignInApiService, ProductApiService } from '../../../../api/service/index';
import { IProduct, MANUFACTURERS } from '../../../../data/types/product.types';
import homePageService from '../../../services/homePage.service';
import editProductPageService from '../../../services/Products/editProductPage.service';
import productsPageService from '../../../services/Products/productsPage.service';
import signInPageService from '../../../services/signInPage.service';
import { ObtainTypeValues } from '../../../../data/types/helper.types';
import { TAGS } from '../../../../utils/tags';

describe(`[UI] [Products] Smoke`, () => {

  beforeEach(async () => {
    const token = await SignInApiService.signInAsAdmin();
    await ProductApiService.create(token);
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  it('Should open Edit Product page with created product', async () => {
    await productsPageService.openEditProductPage(ProductApiService.getCreatedProduct().name);
    await editProductPageService.checkPageTitle(ProductApiService.getCreatedProduct().name);
  });

  it('Should validate Product data on Edit Product page', async () => {
    await productsPageService.openEditProductPage(ProductApiService.getCreatedProduct().name);
    const actualObject: IProduct = {
      name: await $('#inputName').getValue(),
      amount: +(await $('#inputAmount').getValue()),
      price: +(await $('#inputPrice').getValue()),
      manufacturer: (await $('#inputManufacturer').getValue()) as ObtainTypeValues<typeof MANUFACTURERS>,
      notes: await $('#textareaNotes').getValue(),
    };

    await expect(actualObject).toMatchObject({ ..._.omit(ProductApiService.getCreatedProduct(), ['_id', 'createdOn']) });
  });

  afterEach(async () => {
    await ProductApiService.delete(SignInApiService.getToken());
    await signInPageService.signOut();
  });
});
