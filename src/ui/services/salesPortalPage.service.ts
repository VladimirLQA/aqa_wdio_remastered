import { GetTextMethod } from '../../data/types/base.types';
import { logStep } from '../../utils/reporter/decorators';
import signInPage from '../pages/signIn.page';

export abstract class SalesPortalPageService {
  private basePage = signInPage;

  @logStep('Validate Notification')
  async validateNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.basePage.getNotificationText(text, method);
    await expect(notification).toBe(text);
  }

  @logStep('Log out')
  async signOut() {
    await this.basePage.deleteCookies(['Authorization']);
  }

  async getToken() {
    const token = await this.basePage.getCookie('Authorization');
    return token.value;
  }
}
