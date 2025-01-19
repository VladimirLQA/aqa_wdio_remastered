import { SalesPortalPage } from "../salesPortal.page";
import deleteProductModal from "./deleteProduct.modal";

class ProductsPage extends SalesPortalPage {
  readonly ["Delete Modal"] = deleteProductModal;
  readonly ["Add New Product"] = "button.page-title-button";
  readonly Title = '//h2[.="Products List "]';
  readonly ["Table row"] = (productName: string) => `//tr[./td[.="${productName}"]]`;
  readonly ["Product Name in table"] = (productName: string) => `${this["Table row"](productName)}/td[1]`;
  readonly ["Product Price in table"] = (productName: string) => `${this["Table row"](productName)}/td[2]`;
  readonly ["Product Manufacturer in table"] = (productName: string) => `${this["Table row"](productName)}/td[3]`;
  readonly ["Product Creation Date in table"] = (productName: string) => `${this["Table row"](productName)}/td[4]`;
  readonly ["Product Delete button in table"] = (productName: string) =>
    `${this["Table row"](productName)}//button[@title="Delete"]`;
  readonly ["Product Edit button in table"] = (productName: string) =>
    `${this["Table row"](productName)}//button[@title="Edit"]`;

  async clickOnAddNewProduct() {
    await this.click(this["Add New Product"]);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden("Products");
  }

  async getProductFromTable(productName: string) {
    const [name, price, manufacturer] = await Promise.all([
      this.getText(this["Product Name in table"](productName)),
      this.getText(this["Product Price in table"](productName)),
      this.getText(this["Product Manufacturer in table"](productName)),
    ]);

    return {
      name,
      price: +price.replace("$", ""),
      manufacturer,
    };
  }

  async clickOnDeleteProductButton(productName: string) {
    await this.click(this["Product Delete button in table"](productName));
  }

  async clickOnEditProductButton(productName: string) {
    await this.click(this["Product Edit button in table"](productName));
  }
}

export default new ProductsPage();
