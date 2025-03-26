import { SalesPortalPage } from '../salesPortal.page';

export abstract class BaseModalPage extends SalesPortalPage {
  abstract Title: string;
  protected abstract TtileName: string;
  readonly ['Close modal button'] = `//div[${this.getModalTitleXPath()}]/button`;

  protected getModalTitleXPath() {
    return `h5[normalize-space()="${this.TtileName}"]`;
  }

  async clickOnModalCloseButton() {
    await this.click(this['Close modal button']);
  }

}