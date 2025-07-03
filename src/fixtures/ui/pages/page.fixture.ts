import HomePage from '../../../ui/pages/home.page.ts';
import AddNewProductPage from '../../../ui/pages/products/addNewProduct.page.ts';
import ProductsPage from '../../../ui/pages/products/products.page.ts';
import SignInPage from '../../../ui/pages/signIn.page.ts';
import { test as base } from '../../base.fixture.ts';

export interface PageFixtures {
  signInPage: typeof SignInPage;
  homePage: typeof HomePage;
  productsPage: typeof ProductsPage;
  addNewProductPage: typeof AddNewProductPage;
};

export const pageFixtures: PageFixtures = {
  signInPage: SignInPage,
  homePage: HomePage,
  productsPage: ProductsPage,
  addNewProductPage: AddNewProductPage,
};

export const test = base.extend<PageFixtures>(pageFixtures);
