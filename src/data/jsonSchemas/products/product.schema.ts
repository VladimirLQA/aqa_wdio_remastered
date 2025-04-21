import { MANUFACTURERS } from '../../types/product.types.ts';
import { baseSchemaPart } from '../base.schema.ts';

export const PRODUCT_SCHEMA_RESPONSE = {
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        amount: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        manufacturer: {
          type: 'string',
          enum: Object.values(MANUFACTURERS),
        },
        createdOn: {
          type: 'string',
          // format: "date-time",
        },
        notes: {
          type: 'string',
        },
      },
      required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
      additionalProperties: false,
    },
    ...baseSchemaPart,
  },
};
