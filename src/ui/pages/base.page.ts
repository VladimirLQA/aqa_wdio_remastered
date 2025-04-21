import { SalesPortalPage } from './salesPortal.page.ts';

class BasePage extends SalesPortalPage {
  protected readonly uniqueElement: string = '';
}

export default new BasePage();
