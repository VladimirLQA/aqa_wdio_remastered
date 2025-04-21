import { SignInApiService } from '../api/service/index.ts';
import signInPageService from '../ui/services/signInPage.service.ts';

export async function globalAuthSetup() {
  await SignInApiService.signInAsAdmin();
  await signInPageService.openSalesPortal();
  await browser.setCookies({
    name: 'Authorization',
    value: SignInApiService.getToken({ type: 'raw' }).toString(),
  });
  await browser.refresh();
}
