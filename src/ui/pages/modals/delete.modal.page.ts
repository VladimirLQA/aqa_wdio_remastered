import { logAction } from '../../../utils/reporter/decorators.ts';
import { BaseModalPage } from './base.modal.page.ts';

class DeleteModalPage extends BaseModalPage {
  readonly TtileText = 'Delete Product';
  readonly uniqueElement = `//${this.getModalTitleXPath()}`;
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Delete button'] = `//div[@class="modal-footer"]//*[@type="submit"]`;
  readonly ['Cancel button'] = `//button[.="Cancel"]`;

  @logAction()
  async clickOnDeleteButton() {
    await this.click(this['Delete button']);
  }

  @logAction()
  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  @logAction()
  async waitForDisappeared() {
    await this.waitForDisplayed(this['Modal container'], true);
  }
}

export default new DeleteModalPage();
