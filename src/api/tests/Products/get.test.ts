import { STATUS_CODES } from '../../../data/api/statusCodes';
import { validateResponse } from '../../../utils/validation/apiValidation';
import ProductsController from '../../controllers/products.controller';
import productApiService from '../../service/productApi.service';
import { SignInApiService } from '../../service/index';

describe('[API] [Products] Get', async () => {

  beforeEach(async () => {
    const token = await SignInApiService.signInAsAdmin();
    await productApiService.create(token);
  });

  it('Should get created product', async () => {
    const getProductResponse = await ProductsController.get(
      productApiService.getCreatedProduct()._id,
      SignInApiService.getToken()
    );
    validateResponse(getProductResponse, STATUS_CODES.OK, true, null);
    const body = getProductResponse.body;
    const createdProduct = body.Product;
    expect(createdProduct).toMatchObject({ ...productApiService.getCreatedProduct() });
  });

  afterEach(async () => {
    await productApiService.delete(SignInApiService.getToken());
  });
});
