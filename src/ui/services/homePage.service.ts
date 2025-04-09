import { logStep } from '../../utils/reporter/decorators';
import homePage from '../pages/home.page';
import productsPage from '../pages/products/products.page';
import { SalesPortalPageService } from './salesPortalPage.service';

class HomePageService extends SalesPortalPageService {
  private homePage = homePage;
  private productsPage = productsPage;

  @logStep('Open Products Page')
  async openProductsPage() {
    await this.homePage.clickOnMenuButton('Products');
    await this.productsPage.waitForPageOpened();
  }

  @logStep('Open Customers Page')
  async openCustomersPage() {
    await this.homePage.clickOnMenuButton('Customers');
    // await this.customersPage.waitForPageOpened();
  }
}

export default new HomePageService();
