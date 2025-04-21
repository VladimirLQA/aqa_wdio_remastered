import { SALES_PORTAL_URL } from '../../config/environment.ts';
import { ICredentials } from '../../data/types/signIn.types.ts';
import { logAction } from '../../utils/reporter/decorators.ts';
import { SalesPortalPage } from './salesPortal.page.ts';

class SignInPage extends SalesPortalPage {
  readonly ['Email input'] = '#emailinput';
  readonly ['Password input'] = '#passwordinput';
  readonly ['Login button'] = 'button[type="submit"]';
  readonly ['Page image'] = `[alt="Sample image"]`;
  protected readonly uniqueElement: string = this['Page image'];

  @logAction()
  async fillCredentials(credentials: ICredentials) {
    await this.setValue(this['Email input'], credentials.username);
    await this.setValue(this['Password input'], credentials.password, { isSecretValue: true });
  }

  @logAction()
  async clickOnLoginButton() {
    await this.click(this['Login button']);
  }

  @logAction(`open 'Sign in' page `)
  async open() {
    await this.openPage(SALES_PORTAL_URL);
  }
}

export default new SignInPage();
