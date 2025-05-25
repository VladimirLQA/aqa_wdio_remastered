import productsController from '../../../api/controllers/products.controller';
import signInController from '../../../api/controllers/signIn.controller';
import { BaseFixtures } from '../../../lib/_fixture/fixture';
import { test as base } from '../../base.fixture';

export type ControllerFixtures = BaseFixtures & {
  productsController: typeof productsController;
  signInController: typeof signInController;
};

export const test = base.extend<ControllerFixtures>({
  productsController,
  signInController,
});
