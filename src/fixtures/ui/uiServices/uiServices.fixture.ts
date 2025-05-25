import { BaseFixtures } from '../../../lib/_fixture/fixture';
import homePageService from '../../../ui/services/homePage.service';
import addNewProductPageService from '../../../ui/services/products/addNewProductPage.service';
import productsPageService from '../../../ui/services/products/productsPage.service';
import signInPageService from '../../../ui/services/signInPage.service';
import { test as base } from '../../base.fixture';

export type ServiceFixtures = BaseFixtures & {
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
