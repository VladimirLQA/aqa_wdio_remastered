import { faker } from '@faker-js/faker';

type LengthParams =
  | { length: number; min?: never; max?: never }
  | { min: number; max: number; length?: never };

type StringGeneratorParams = LengthParams & { excludeSpace?: boolean };

const strGenerator
  = (method: 'alpha' | 'alphanumeric' | 'numeric') =>
  ({ min, max, length, excludeSpace = true }: StringGeneratorParams) =>
    faker.string[method]({
      length: length ? length : { min: min!, max: max! },
      exclude: excludeSpace ? ' ' : '',
    });

export const getStringAlpha = strGenerator('alpha');
export const getStringAlphanumeric = strGenerator('alphanumeric');
export const getStringNumeric = strGenerator('numeric');
