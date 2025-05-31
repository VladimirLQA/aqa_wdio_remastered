import homePageService from '../../../ui/services/homePage.service.ts';
import addNewProductPageService from '../../../ui/services/products/addNewProductPage.service.ts';
import productsPageService from '../../../ui/services/products/productsPage.service.ts';
import signInPageService from '../../../ui/services/signInPage.service.ts';
import { test as base } from '../pages/page.fixture.ts';

export type ServiceFixtures = {
  signInPageService: typeof signInPageService;
  homePageService: typeof homePageService;
  productsPageService: typeof productsPageService;
  addNewProductPageService: typeof addNewProductPageService;
};

export const test = base.extend<ServiceFixtures>({
  signInPageService,
  homePageService,
  productsPageService,
  addNewProductPageService,
});
