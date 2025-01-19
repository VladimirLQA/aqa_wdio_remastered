import { SalesPortalPage } from "../salesPortal.page";

class DeleteProductModal extends SalesPortalPage {
  readonly ["Modal container"] = '//div[@role="dialog"]';
  readonly ["Delete button"] = `${this["Modal container"]}//button[@type="submit"]`;
  readonly ["Cancel button"] = `${this["Modal container"]}//button[contains(@class, "btn-secondary")]`;

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this["Modal container"]);
  }

  async waitForDisappeared() {
    await this.waitForDisplayed(this["Modal container"], true);
  }

  async clickOnDeleteButton() {
    await this.click(this["Delete button"]);
  }
}

export default new DeleteProductModal();
