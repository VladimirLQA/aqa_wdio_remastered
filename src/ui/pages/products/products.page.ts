import { logAction } from '../../../utils/reporter/decorators.ts';
import { ListPage } from '../list.page.ts';

class ProductsPage extends ListPage {
  readonly ['Add New Product'] = '[name="add-button"]';
  readonly Title = '#title h2';

  protected readonly uniqueElement = this.Title;

  readonly ['Product Name in table'] = (productName: string) => `${this['Table row'](productName)}/td[1]`;

  readonly ['Product Price in table'] = (productName: string) => `${this['Table row'](productName)}/td[2]`;

  readonly ['Product Manufacturer in table'] = (productName: string) =>
    `${this['Table row'](productName)}/td[3]`;

  readonly ['Product Creation Date in table'] = (productName: string) =>
    `${this['Table row'](productName)}/td[4]`;

  @logAction()
  async clickOnAddNewProductButton() {
    await this.click(this['Add New Product']);
  }

  @logAction()
  async getProductFromTable(productName: string) {
    const [name, price, manufacturer] = await Promise.all([
      this.getText(this['Product Name in table'](productName)),
      this.getText(this['Product Price in table'](productName)),
      this.getText(this['Product Manufacturer in table'](productName)),
    ]);

    return {
      name,
      price: +price.replace('$', ''),
      manufacturer,
    };
  }
}

export default new ProductsPage();
