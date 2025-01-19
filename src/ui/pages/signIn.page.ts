import { SALES_PORTAL_URL } from "../../config/environment";
import { ICredentials } from "../../data/types/signIn.types";
import { SalesPortalPage } from "./salesPortal.page";

class SignInPage extends SalesPortalPage {
  readonly ["Email input"] = "#emailinput";
  readonly ["Password input"] = "#passwordinput";
  readonly ["Login button"] = 'button[type="submit"]';

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this["Login button"]);
  }

  async fillCredentials(credentials: ICredentials) {
    await this.setValue(this["Email input"], credentials.username);
    await this.setValue(this["Password input"], credentials.password, { isSecretValue: true });
  }

  async clickOnLoginButton() {
    await this.click(this["Login button"]);
  }

  async open() {
    await this.openPage(SALES_PORTAL_URL);
  }
}

export default new SignInPage();
