//TODO: npm run test -- --spec="./src/api/tests/Products/get.test.ts"

import { STATUS_CODES } from "../../../data/api/statusCodes";
import { validateResponse } from "../../../utils/validation/apiValidation";
import ProductsController from "../../controllers/products.controller";
import productApiService from "../../service/productApi.service";
import { SignInApiService } from "../../service/signInApiService.service";

describe("[API] [Products] Get", async function () {
  const signInApiService = new SignInApiService();

  beforeEach(async function () {
    const token = await signInApiService.signInAsAdmin();
    await productApiService.create(token);
  });

  it("Should get created product", async function () {
    const getProductResponse = await ProductsController.get(
      productApiService.getCreatedProduct()._id,
      signInApiService.getToken()
    );
    validateResponse(getProductResponse, STATUS_CODES.OK, true, null);
    const body = getProductResponse.body;
    const createdProduct = body.Product;
    expect(createdProduct).toMatchObject({ ...productApiService.getCreatedProduct() });
  });

  afterEach(async function () {
    await productApiService.delete(signInApiService.getToken());
  });
});
