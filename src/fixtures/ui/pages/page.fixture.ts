import { BaseFixtures } from '../../../lib/_fixture/fixture';
import HomePage from '../../../ui/pages/home.page';
import AddNewProductPage from '../../../ui/pages/products/addNewProduct.page';
import ProductsPage from '../../../ui/pages/products/products.page';
import SignInPage from '../../../ui/pages/signIn.page';
import { test as base } from '../../base.fixture';

export type PageFixtures = BaseFixtures & {
  signInPage: typeof SignInPage;
  homePage: typeof HomePage;
  productsPage: typeof ProductsPage;
  addNewProductPage: typeof AddNewProductPage;
};

export const test = base.extend<PageFixtures>({
  signInPage: SignInPage,
  homePage: HomePage,
  productsPage: ProductsPage,
  addNewProductPage: AddNewProductPage,
});
