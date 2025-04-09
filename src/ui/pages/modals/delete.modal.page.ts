import { BaseModalPage } from './base.modal.page';

class DeleteModalPage extends BaseModalPage {
  readonly TtileText = 'Delete Product';
  readonly uniqueElement = `//${this.getModalTitleXPath()}`;
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Delete button'] = `//div[@class="modal-footer"]//*[@type="submit"]`;
  readonly ['Cancel button'] = `//button[.="Cancel"]`;

  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  // async waitForPageOpened(): Promise<void> {
  //   await this.waitForDisplayed(this.Title);
  // }

  async waitForDisappeared() {
    await this.waitForDisplayed(this['Modal container'], true);
  }
}

export default new DeleteModalPage();
