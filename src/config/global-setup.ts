import { SignInApiService } from '../api/service';
import signInPageService from '../ui/services/signInPage.service';

export async function globalAuthSetup() {
  await SignInApiService.signInAsAdmin();
  await signInPageService.openSalesPortal();
  await browser.setCookies({
    name: 'Authorization',
    value: SignInApiService.getToken({ type: 'raw' }).toString(),
  });
  await browser.refresh();
}
