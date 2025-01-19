import _ from 'lodash';
import { IProduct } from '../../../data/types/product.types';
import addNewProductPage from '../../pages/Products/addNewProduct.page';
import productsPage from '../../pages/Products/products.page';
import { SalesPortalPageService } from '../salesPortalPage.service';
import editProductPage from '../../pages/Products/editProduct.page';
import { logStep } from '../../../utils/reporter/decorators';

class ProductsPageService extends SalesPortalPageService {
  private productsPage = productsPage;
  private addNewProductPage = addNewProductPage;
  private editProductPage = editProductPage;

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
    expect(actualProductData).toEqual(expectedProductData);
  }

  @logStep('Delete Product via UI')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.productsPage['Delete Modal'].waitForPageOpened();
    await this.productsPage['Delete Modal'].clickOnDeleteButton();
    await this.productsPage['Delete Modal'].waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }
}

export default new ProductsPageService();
