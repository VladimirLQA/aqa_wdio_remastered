import { BaseModalPage } from '../modals/base.modal.page';

class DeleteProductModalPage extends BaseModalPage {
  readonly TtileName = 'Delete Product';
  readonly Title = `//${this.getModalTitleXPath()}`;
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Delete button'] = `//div[@class="modal-footer"]//*[@type="submit"]`;
  readonly ['Cancel button'] = `//button[.="Cancel"]`;

  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
  }

  async waitForDisappeared() {
    await this.waitForDisplayed(this['Modal container'], true);
  }
}

export default new DeleteProductModalPage();