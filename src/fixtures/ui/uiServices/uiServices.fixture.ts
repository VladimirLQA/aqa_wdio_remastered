import homePageService from '../../../ui/services/homePage.service.ts';
import addNewProductPageService from '../../../ui/services/products/addNewProductPage.service.ts';
import productsPageService from '../../../ui/services/products/productsPage.service.ts';
import signInPageService from '../../../ui/services/signInPage.service.ts';
import { test as base } from '../../base.fixture.ts';

export interface ServiceFixtures {
  signInPageService: typeof signInPageService;
  homePageService: typeof homePageService;
  productsPageService: typeof productsPageService;
  addNewProductPageService: typeof addNewProductPageService;
};

export const uiServicesFixtures: ServiceFixtures = {
  signInPageService,
  homePageService,
  productsPageService,
  addNewProductPageService,
};

export const test = base.extend<ServiceFixtures>(uiServicesFixtures);
