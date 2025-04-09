import { GetTextMethod } from '../../data/types/base.types';
import { ObtainTypeValues } from '../../data/types/helper.types';
import { MANUFACTURERS } from '../../data/types/product.types';
import { ActionsPage } from './actions.page';

export abstract class SalesPortalPage extends ActionsPage {
  protected abstract uniqueElement: string;
  readonly ['Notification container'] = 'div.toast-container';
  readonly Notification = `${this['Notification container']} .toast-body`;
  readonly ['Toast close button'] = '.toast-container button';
  readonly Spinner = '.spinner-border';
  // | COUNTRIES | DELIVERY | string,
  readonly ['Dropdown option [last()]'] = (option: ObtainTypeValues<typeof MANUFACTURERS>) =>
    `(//option[text()="${option}"])[last()]`;

  async waitForPageOpened(page: string = this.constructor.name): Promise<void> {
    await this.waitForDisplayed(this.uniqueElement);
    await this.waitForSpinnersToBeHidden(page);
  }

  private isNotificationTextMatch(notificationText: string, text: string, method: GetTextMethod = 'with') {
    return method === 'contains' ? notificationText.includes(text) : notificationText === text;
  }

  private async findNotificationTextMatching(text: string, method: GetTextMethod = 'with') {
    const notifications = await this.findArrayOfElements(this.Notification);
    for (const n of notifications) {
      const notificationText = await this.getText(n);
      if (this.isNotificationTextMatch(notificationText, text, method)) return notificationText;
    }
    return null;
  }

  async waitUntilNotificationFoundAndGetItText(text: string, method: GetTextMethod = 'with') {
    let notificationText: string | null;
    await browser.waitUntil(
      async () => {
        notificationText = await this.findNotificationTextMatching(text, method);
        return !!notificationText;
      },
      {
        timeout: 10000,
        timeoutMsg: `Notification ${method} text ${text} not found`,
      },
    );
    return notificationText!;
  }

  async getNotificationText(text: string, method: GetTextMethod = 'with') {
    return await this.waitUntilNotificationFoundAndGetItText(text, method);
  }

  async waitForSpinnersToBeHidden(page: string) {
    await browser.waitUntil(
      async () => {
        const result = !(await this.findArrayOfElements(this.Spinner)).length;
        return result;
      },
      {
        timeout: 20000,
        timeoutMsg: `Spinners are still displayed on ${page} Page after 20 seconds`,
      },
    );
  }
}
