import { AddEditProductPage } from './addEditProduct.page';

class EditProductPage extends AddEditProductPage {
  readonly Title = 'h2.page-title-text';
  readonly ['Save changes button'] = '#save-product-changes';
  readonly ['Delete product button'] = '#delete-product-btn';

  async clickOnSaveButton() {
    await this.click(this['Save changes button']);
  }

  async clickOnDeleteButton() {
    await this.click(this['Save changes button']);
  }

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden('Edit Product');
  }
}

export default new EditProductPage();
