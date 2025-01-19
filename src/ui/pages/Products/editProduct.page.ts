import { SalesPortalPage } from '../salesPortal.page';

class EditProductPage extends SalesPortalPage {
  readonly ['Title'] = 'h2.page-title-text';

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden('Edit Product');
  }
}

export default new EditProductPage();
