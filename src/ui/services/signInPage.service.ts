/* eslint-disable new-cap */
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment.ts';
import { ICredentials } from '../../data/types/signIn.types.ts';
import { logStep } from '../../utils/reporter/decorators.ts';
import homePage from '../pages/home.page.ts';
import signInPage from '../pages/signIn.page.ts';
import { SalesPortalPageService } from './salesPortalPage.service.ts';

class SignInPageService extends SalesPortalPageService {
  private signInPage = new signInPage();
  private homePage = new homePage();

  protected get notificationPage() {
    return this.signInPage;
  }

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.signInPage.open();
  }

  @logStep('Login to Sales Portal')
  async login(credentials: ICredentials) {
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLoginButton();
    await this.homePage.waitForPageOpened();
  }

  @logStep('Login as admin')
  async loginAsAdmin() {
    await this.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }
}

export default new SignInPageService();
