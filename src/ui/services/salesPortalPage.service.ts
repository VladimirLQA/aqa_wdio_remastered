import { GetTextMethod } from '../../data/types/base.types.ts';
import { logStep } from '../../utils/reporter/decorators.ts';
import basePage from '../pages/base.page.ts';
import { SalesPortalPage } from '../pages/salesPortal.page.ts';

export abstract class SalesPortalPageService {
  private basePage = basePage;

  protected abstract get notificationPage(): SalesPortalPage;

  @logStep('Check Notification')
  async checkNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.notificationPage.getNotificationText(text, method);

    await expect(notification).toEqual(text);
  }

  @logStep('Clear storages and session')
  async clearStoragesAndSession() {
    await this.basePage.clearLocalStorage();
    await this.basePage.clearSessionStorage();
    await this.basePage.clearAllCookies();
  }
}
