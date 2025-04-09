import { logStep } from '../../../utils/reporter/decorators';
import editProductPage from '../../pages/products/editProduct.page';
import { SalesPortalPageService } from '../salesPortalPage.service';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types';

class EditProductPageService extends SalesPortalPageService {
  private editProductPage = editProductPage;

  @logStep('Check Edit Product page title')
  async checkPageTitle(productName: string) {
    const actualTitle = await this.editProductPage.getTitleText();
    const expectedTitle = 'Edit ' + productName;
    await expect(actualTitle).toBe(expectedTitle);
  }

  @logStep('Check text in input fields')
  async checkTextInInputFields(expected: Partial<IProduct | IProductFromResponse>) {
    const actualObject = await this.editProductPage.getInputsText();
    await expect(actualObject).toMatchObject(expected);
  }
}

export default new EditProductPageService();
