import { STATUS_CODES } from "../../../data/api/statusCodes";
import { ERROR_MESSAGES } from "../../../data/errorMessages";
import { validateResponse } from "../../../utils/validation/apiValidation";
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
    const id = productApiService.getCreatedProduct()._id;
    const response = await productsController.delete(id, signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.DELETED);
    const getResponse = await productsController.get(id, signInApiService.getToken());
    validateResponse(getResponse, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.PRODUCT_NOT_FOUND(id));
  });
});
