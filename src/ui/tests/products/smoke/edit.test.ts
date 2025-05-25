import _ from 'lodash';
import { SignInApiService, ProductApiService } from '../../../../api/service/index';
import homePageService from '../../../services/homePage.service';
import editProductPageService from '../../../services/products/editProductPage.service';
import productsPageService from '../../../services/products/productsPage.service';
import signInPageService from '../../../services/signInPage.service';
import { TAGS } from '../../../../utils/tags';

describe(`[UI] [Products edit page] Smoke ${TAGS.SMOKE} | ${TAGS.REGRESSION}`, () => {
  before(async () => {
    await signInPageService.openSalesPortal();
  });

  beforeEach(async () => {
    const token = await SignInApiService.signInAsAdmin();
    await ProductApiService.create({}, token);
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  it('should contain created product name in page title', async () => {
    await productsPageService.openEditProductPage(ProductApiService.getCreatedProduct().name);
    await editProductPageService.checkPageTitle(ProductApiService.getCreatedProduct().name);
  });

  it('should contain data of created product in input fields', async () => {
    await productsPageService.openEditProductPage(ProductApiService.getCreatedProduct().name);
    await editProductPageService.checkTextInInputFields({
      ..._.omit(ProductApiService.getCreatedProduct(), ['_id', 'createdOn']),
    });
  });

  afterEach(async () => {
    await ProductApiService.delete();
    await signInPageService.signOut();
  });
});
