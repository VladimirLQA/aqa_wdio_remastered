import { getRandomObjectValue } from '../../utils/enum/random.ts';
import { IProduct, MANUFACTURERS } from '../types/product.types.ts';
import { faker } from '@faker-js/faker';

export function generateProductData(customData?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomObjectValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...customData,
  };
}

type LengthParams =
  | { length: number; min?: never; max?: never }
  | { min: number; max: number; length?: never };

type StringGeneratorParams = LengthParams & { excludeSpace?: boolean };

const createStringGenerator =
  (method: 'alpha' | 'alphanumeric' | 'numeric') =>
  ({ min, max, length, excludeSpace = true }: StringGeneratorParams) =>
    faker.string[method]({
      length: length ? length : { min: min!, max: max! },
      exclude: excludeSpace ? ' ' : '',
    });

const getStringAlpha = createStringGenerator('alpha');
// const getStringAlphanumeric = createStringGenerator('alphanumeric');
// const getStringNumeric = createStringGenerator('numeric');

const at = getStringAlpha({ length: 10 });
console.log(at);
