import { COUNTRIES } from '../../orders/orders.data.ts';
import { baseSchemaPart } from '../base.schema.ts';

export const CUSTOMER_SCHEMA_RESPONSE = {
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
        name: {
          type: 'string',
          maxLength: 100,
        },
        country: {
          type: 'string',
          enum: Object.values(COUNTRIES),
        },
        city: {
          type: 'string',
          maxLength: 20,
        },
        street: {
          type: 'string',
          maxLength: 40,
        },
        house: {
          type: 'integer',
          minimum: 1,
          maximum: 999,
        },
        flat: {
          type: 'integer',
          minimum: 1,
          maximum: 9999,
        },
        phone: {
          type: 'string',
          pattern: '^\\+\\d{10,20}$',
        },
        createdOn: {
          type: 'string',
          format: 'date-time',
        },
        _id: {
          type: 'string',
          pattern: '^[a-fA-F0-9]{24}$',
        },
      },
      required: ['email', 'name', 'country', 'city', 'street', 'house', 'flat', 'phone', 'createdOn', '_id'],
      additionalProperties: false,
    },
    ...baseSchemaPart,
  },
};
