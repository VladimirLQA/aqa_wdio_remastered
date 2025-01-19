import { logStep } from "../../../utils/reporter/decorators";
import editProductPage from "../../pages/Products/editProduct.page";
import { SalesPortalPageService } from "../salesPortalPage.service";

class EditProductPageService extends SalesPortalPageService {
  private editProductPage = editProductPage;

  @logStep("Validate Edit Product page title")
  async checkPageTitle(productName: string) {
    const actualTitle = await this.editProductPage.getTitleText();
    const expectedTitle = "Edit " + productName;
    expect(actualTitle).toBe(expectedTitle);
  }
}

export default new EditProductPageService();
