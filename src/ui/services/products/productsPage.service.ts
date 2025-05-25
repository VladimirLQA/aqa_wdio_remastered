/* eslint-disable new-cap */
import _ from 'lodash';
import { IProduct } from '../../../data/types/product.types.ts';
import addNewProductPage from '../../pages/products/addNewProduct.page.ts';
import productsPage from '../../pages/products/products.page.ts';
import { SalesPortalPageService } from '../salesPortalPage.service.ts';
import editProductPage from '../../pages/products/editProduct.page.ts';
import { logStep } from '../../../utils/reporter/decorators.ts';
import deleteProductModalPage from '../../pages/modals/delete.modal.page.ts';

class ProductsPageService extends SalesPortalPageService {
  private productsPage = new productsPage();
  private addNewProductPage = new addNewProductPage();
  private editProductPage = editProductPage;
  private deleteProductModalPage = deleteProductModalPage;

  protected get notificationPage() {
    return this.productsPage;
  }

  @logStep(`Open 'Add new product' page`)
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProductButton();
    await this.addNewProductPage.waitForPageOpened();
  }

  @logStep(`Open 'Edit product' page`)
  async openEditProductPage(productName: string) {
    await this.productsPage.clickOnEditActionButton(productName);
    await this.editProductPage.waitForPageOpened();
  }

  @logStep(`Check product in table`)
  async checkProductInTable(product: IProduct) {
    const actualProductData = await this.productsPage.getProductFromTable(product.name);
    const expectedProductData = _.pick(product, ['name', 'price', 'manufacturer']);
    await expect(actualProductData).toEqual(expectedProductData);
  }

  @logStep('Delete Product via UI')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteActionButton(productName);
    await this.deleteProductModalPage.clickOnDeleteButton();
    await this.deleteProductModalPage.waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }
}

export default new ProductsPageService();
