import { SignInApiService, ProductApiService } from '../../../api/service/index.ts';
import { test as base } from '../controllers/controllers.fixture.ts';

export type ApiServicesFixtures = {
  signInApiService: typeof SignInApiService;
  productsApiService: typeof ProductApiService;
};

export const test = base.extend<ApiServicesFixtures>({
  signInApiService: SignInApiService,
  productsApiService: ProductApiService,
});
