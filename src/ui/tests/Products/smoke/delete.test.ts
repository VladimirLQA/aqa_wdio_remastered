//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke/delete.test.ts"

import AllureReporter from "@wdio/allure-reporter";
import { NOFITICATIONS } from "../../../../data/notifications";
import homePageService from "../../../services/homePage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import signInPageService from "../../../services/signInPage.service";
import { SignInApiService } from "../../../../api/service/signInApiService.service";
import productApiService from "../../../../api/service/productApi.service";

describe("[UI] [Products] Smoke", async () => {
  const signInApiService = new SignInApiService();

  AllureReporter.addFeature("Products - Create");
  AllureReporter.addSuite("[UI] [Products]");

  beforeEach(async function () {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    // await signInApiService.signInAsAdmin();
    const token = await signInPageService.getToken();
    signInApiService.setToken(token);
    await productApiService.create(signInApiService.getToken());
    await homePageService.openProductsPage();
  });

  it("Should delete created product", async function () {
    AllureReporter.addSeverity("Blocker");
    AllureReporter.addStory("US-124837");
    AllureReporter.addTag("Smoke");
    await productsPageService.deleteProduct(productApiService.getCreatedProduct().name);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_DELETED);
    productApiService.removeStoredProduct();
  });

  afterEach(async () => {
    await productApiService.delete(signInApiService.getToken());
    await signInPageService.signOut();
  });
});
