import { IProduct } from '../../../data/types/product.types.ts';
import { logStep } from '../../../utils/reporter/decorators.ts';
import addNewProductPage from '../../pages/products/addNewProduct.page.ts';
import productsPage from '../../pages/products/products.page.ts';
import { SalesPortalPageService } from '../salesPortalPage.service.ts';

class AddNewProductService extends SalesPortalPageService {
  private addNewProductPage = addNewProductPage;
  private productsPage = productsPage;

  protected get notificationPage() {
    return this.addNewProductPage;
  }
  @logStep('Create product via UI')
  async populate(product: IProduct) {
    await this.addNewProductPage.fillInputs(product);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
  }
}

export default new AddNewProductService();
