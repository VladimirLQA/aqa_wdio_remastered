import { GetTextMethod } from '../../data/types/base.types';
import { logStep } from '../../utils/reporter/decorators';
import basePage from '../pages/base.page';

export abstract class SalesPortalPageService {
  private basePage = basePage;

  @logStep('Validate Notification')
  async validateNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.basePage.getNotificationText(text, method);
    await expect(notification).toBe(text);
  }

  @logStep('Log out')
  async signOut() {
    await this.basePage.deleteCookies(['Authorization']);
    await browser.refresh();
  }

  async getToken() {
    const token = await this.basePage.getCookie('Authorization');
    return token.value;
  }
}
