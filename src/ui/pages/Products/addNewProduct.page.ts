import { AddEditProductPage } from './addEditProduct.page';

class AddNewProductPage extends AddEditProductPage {
  readonly Title = '//h2[.="Add New Product "]';
  readonly ['Save New Product button'] = '#save-new-product';

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden('Products');
  }
}

export default new AddNewProductPage();
