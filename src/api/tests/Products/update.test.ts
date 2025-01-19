import { STATUS_CODES } from "../../../data/api/statusCodes";
import { productResponseSchema } from "../../../data/jsonSchemas/product.schema";
import { generateProductData } from "../../../data/products/generateProduct";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import productsController from "../../controllers/products.controller";
import productApiService from "../../service/productApi.service";
import { SignInApiService } from "../../service/signInApiService.service";

describe("[API] [Products] Put", async function () {
  const signInApiService = new SignInApiService();
  beforeEach(async function () {
    await signInApiService.signInAsAdmin();
    await productApiService.create(signInApiService.getToken());
  });

  it("Should update created product", async function () {
    const newProductData = generateProductData();
    const response = await productsController.update(
      newProductData,
      productApiService.getCreatedProduct()._id,
      signInApiService.getToken()
    );
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(productResponseSchema, response);
    expect(response.body.Product).toMatchObject({ ...newProductData });
  });

  afterEach(async function () {
    await productApiService.delete(signInApiService.getToken());
  });
});
