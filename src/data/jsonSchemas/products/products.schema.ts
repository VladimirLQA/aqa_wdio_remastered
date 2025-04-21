import { MANUFACTURERS } from '../../types/product.types.ts';
import { baseSchemaPart } from '../base.schema.ts';

export const PRODUCTS_SCHEMA_RESPONSE = {
  type: 'object',
  properties: {
    Products: {
      type: 'array',
      items: {
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
          },
          notes: {
            type: 'string',
          },
        },
        required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
        additionalProperties: false,
      },
    },
    ...baseSchemaPart,
  },
};
