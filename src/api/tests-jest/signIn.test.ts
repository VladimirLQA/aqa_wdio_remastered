import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment.ts';
import { STATUS_CODES } from '../../data/api/statusCodes.ts';
import { generateProductData } from '../../data/products/generateProduct.ts';
import { apiFixture } from '../../fixtures/base.fixture.ts';
import expect from '../../utils/expectWrapper.ts';
import { TAGS } from '../../utils/tags.ts';

apiFixture.describe('Products controller', { tag: [TAGS.REGRESSION] }, () => {
  apiFixture('should get all products', async ({ productsController, signInController }) => {
    const token = await (
      await signInController.login({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      })
    ).headers['authorization'];

    const product = generateProductData();
    const products = await productsController.create(product, `Bearer ${token}`);
    await expect(products.status, 'Should create product').toEqual(STATUS_CODES.CREATED);
  });
});
