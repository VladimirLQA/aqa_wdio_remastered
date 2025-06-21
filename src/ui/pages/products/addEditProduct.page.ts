import { IProduct } from '../../../data/types/product.types.ts';
import { SalesPortalPage } from '../salesPortal.page.ts';

export abstract class AddEditProductPage extends SalesPortalPage {
  abstract Title: string;
  readonly ['Name input'] = '#inputName';
  readonly ['Manufacturer dropdown'] = '#inputManufacturer';
  readonly ['Price input'] = '#inputPrice';
  readonly ['Amount input'] = '#inputAmount';
  readonly ['Notes textarea'] = '#textareaNotes';

  async fillInputs(product: IProduct) {
    await this.setValue(this['Name input'], product.name);
    await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    await this.setValue(this['Price input'], product.price);
    await this.setValue(this['Amount input'], product.amount);
    if (product.notes) {
      await this.setValue(this['Notes textarea'], product.notes);
    }
  }

  async getInputsText() {
    const [name, amount, price, manufacturer, notes] = await Promise.all([
      this.getValue(this['Name input']),
      this.getValue(this['Amount input']),
      this.getValue(this['Price input']),
      this.getValue(this['Manufacturer dropdown']),
      this.getText(this['Notes textarea']),
    ]);

    return {
      name,
      amount: +amount,
      price: +price,
      manufacturer,
      notes,
    };
  }
}
