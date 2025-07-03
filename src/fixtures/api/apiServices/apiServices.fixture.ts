import { SignInApiService, ProductApiService } from '../../../api/service/index.ts';
import { test as base } from '../controllers/controllers.fixture.ts';

export type ApiServicesFixtures = {
  signInApiService: typeof SignInApiService;
  productsApiService: typeof ProductApiService;
};

export const apiServicesFixtures = {
  signInApiService: SignInApiService,
  productsApiService: ProductApiService,
};

export const test = base.extend<ApiServicesFixtures>(apiServicesFixtures);
