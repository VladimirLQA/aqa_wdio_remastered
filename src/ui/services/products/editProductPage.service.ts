import { logStep } from '../../../utils/reporter/decorators.ts';
import editProductPage from '../../pages/products/editProduct.page.ts';
import { SalesPortalPageService } from '../salesPortalPage.service.ts';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types.ts';

class EditProductPageService extends SalesPortalPageService {
  private editProductPage = editProductPage;

  protected get notificationPage() {
    return this.editProductPage;
  }

  @logStep('Check Edit Product page title')
  async checkPageTitle(productName: string) {
    const actualTitle = await this.editProductPage.getTitleText();
    const expectedTitle = 'Edit ' + productName;

    await expect(actualTitle).toEqual(expectedTitle);
  }

  @logStep('Check text in input fields')
  async checkTextInInputFields(expected: Partial<IProduct | IProductFromResponse>) {
    const actualObject = await this.editProductPage.getInputsText();

    await expect(actualObject).toMatchObject(expected);
  }
}

export default new EditProductPageService();
