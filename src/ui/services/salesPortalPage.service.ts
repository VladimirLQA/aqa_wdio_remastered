import { GetTextMethod } from '../../data/types/base.types.ts';
import { logStep } from '../../utils/reporter/decorators.ts';
import basePage from '../pages/base.page.ts';
import { SalesPortalPage } from '../pages/salesPortal.page.ts';

export abstract class SalesPortalPageService {
  private basePage = basePage;

  protected abstract get notificationPage(): SalesPortalPage;

  @logStep('Validate Notification')
  async validateNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.notificationPage.getNotificationText(text, method);
    await expect(notification).toBe(text);
  }

  @logStep('Log out')
  async signOut() {
    await this.basePage.deleteCookies(['Authorization']);
    await browser.refresh();
  }
}
