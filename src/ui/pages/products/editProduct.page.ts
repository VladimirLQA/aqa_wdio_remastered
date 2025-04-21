import { AddEditProductPage } from './addEditProduct.page.ts';

class EditProductPage extends AddEditProductPage {
  readonly Title = 'h2.page-title-text';
  readonly uniqueElement = this.Title;
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
}

export default new EditProductPage();
