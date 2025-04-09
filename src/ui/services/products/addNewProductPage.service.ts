import { IProduct } from '../../../data/types/product.types';
import { logStep } from '../../../utils/reporter/decorators';
import addNewProductPage from '../../pages/products/addNewProduct.page';
import productsPage from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortalPage.service';

class AddNewProductService extends SalesPortalPageService {
  private addNewProductPage = addNewProductPage;
  private productsPage = productsPage;

  @logStep('Create product via UI')
  async populate(product: IProduct) {
    await this.addNewProductPage.fillInputs(product);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
  }
}

export default new AddNewProductService();
