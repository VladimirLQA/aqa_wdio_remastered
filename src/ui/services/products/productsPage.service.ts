import _ from 'lodash';
import { IProduct } from '../../../data/types/product.types';
import addNewProductPage from '../../pages/products/addNewProduct.page';
import productsPage from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortalPage.service';
import editProductPage from '../../pages/products/editProduct.page';
import { logStep } from '../../../utils/reporter/decorators';
import deleteProductModalPage from '../../pages/modals/delete.modal.page';

class ProductsPageService extends SalesPortalPageService {
  private productsPage = productsPage;
  private addNewProductPage = addNewProductPage;
  private editProductPage = editProductPage;
  private deleteProductModalPage = deleteProductModalPage;

  @logStep('Open Add New Product Page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForPageOpened();
  }

  @logStep('Open Edit Product Page')
  async openEditProductPage(productName: string) {
    await this.productsPage.clickOnEditProductButton(productName);
    await this.editProductPage.waitForPageOpened();
  }

  @logStep('Check Product In Table')
  async checkProductInTable(product: IProduct) {
    const actualProductData = await this.productsPage.getProductFromTable(product.name);
    const expectedProductData = _.pick(product, ['name', 'price', 'manufacturer']);
    await expect(actualProductData).toEqual(expectedProductData);
  }

  @logStep('Delete Product via UI')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.deleteProductModalPage.waitForPageOpened();
    await this.deleteProductModalPage.clickOnDeleteButton();
    await this.deleteProductModalPage.waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }
}

export default new ProductsPageService();
