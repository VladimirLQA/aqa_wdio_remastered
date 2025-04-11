import { SalesPortalPage } from './salesPortal.page';

class BasePage extends SalesPortalPage {
  protected readonly uniqueElement: string = '';
}

export default new BasePage();
