import { productsController, signInController } from '../../../api/controllers/index.ts';
import { BaseFixtures } from '../../../lib/_fixture/fixture.ts';
import { test as base } from '../../base.fixture.ts';

export type ControllerFixtures = BaseFixtures & {
  productsController: typeof productsController;
  signInController: typeof signInController;
};

export const test = base.extend<ControllerFixtures>({
  productsController,
  signInController,
});
