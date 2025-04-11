import { AddEditProductPage } from './addEditProduct.page';

class AddNewProductPage extends AddEditProductPage {
  readonly ['Save New Product button'] = '#save-new-product';
  readonly Title: string = '//h2[.="Add New Product "]';
  readonly uniqueElement = this['Title'];

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }
}

export default new AddNewProductPage();
