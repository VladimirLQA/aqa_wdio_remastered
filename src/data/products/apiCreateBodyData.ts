import { getStringAlpha } from '../../utils/random-data.ts';
import { TAGS } from '../../utils/tags.ts';
import { STATUS_CODES } from '../api/statusCodes.ts';

export const PRODUCTS_CREATE_VALIDATIONS = [
  {
    description: 'Should create product with minimal valid name length',
    params: { name: getStringAlpha({ length: 3 }) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with maximal valid name length',
    params: { name: getStringAlpha({ length: 40 }) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with minimal valid price length',
    params: { price: 1 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with maximal valid price length',
    params: { price: 99999 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with minimal valid amount length',
    params: { amount: 0 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with maximal valid amount length',
    params: { amount: 999 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with minimal valid notes length',
    params: { notes: '' },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should create product with maximal valid notes length',
    params: { notes: 'A'.repeat(250) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION],
  },
  //Negative tests
  {
    description: 'Should not create product with Name with invalid characters (special symbols)',
    params: {
      name: 'Prod.uct123',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Name shorter than 3 characters',
    params: {
      name: 'aa',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Name longer than 40 characters',
    params: {
      name: 'swijloatmetxnalxkgvbetgreeqfgcgcwywhmuxek',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Name with repeating spaces',
    params: {
      name: 'swijl  fgcgcw',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with empty Name',
    params: {
      name: '',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Invalid manufacturer (not in the allowed list)',
    params: {
      manufacturer: 'Huawei',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with price greater than 99999',
    params: {
      price: 100000,
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with price smaller than 1',
    params: {
      price: 0,
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with price value which is not a number',
    params: {
      price: 'one',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with amount greater than 999',
    params: {
      amount: 1000,
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with amount smaller than 0',
    params: {
      amount: -1,
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with amount value which is not a number',
    params: {
      amount: 'one',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Notes with more than 250 characters',
    params: {
      notes: 'a'.repeat(251),
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
  {
    description: 'Should not create product with Notes with invalid characters <>',
    params: {
      notes: 'rvurnns<>labtqqj',
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION],
  },
];
