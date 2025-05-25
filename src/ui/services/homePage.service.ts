import { logStep } from '../../utils/reporter/decorators.ts';
import homePage from '../pages/home.page.ts';
import productsPage from '../pages/products/products.page.ts';
import { SalesPortalPageService } from './salesPortalPage.service.ts';

class HomePageService extends SalesPortalPageService {
  private homePage = homePage;
  private productsPage = productsPage;

  protected get notificationPage() {
    return this.homePage;
  }

  @logStep('Open Products page')
  async openProductsPage() {
    await this.homePage.clickOnMenuButton('Products');
    await this.productsPage.waitForPageOpened();
  }

  @logStep('Open Customers page')
  async openCustomersPage() {
    await this.homePage.clickOnMenuButton('Customers');
    // await this.customersPage.waitForPageOpened();
  }
}

export default new HomePageService();
