export const COUNTRIES = {
  USA: 'USA',
  CANADA: 'Canada',
  BELARUS: 'Belarus',
  UKRAINE: 'Ukraine',
  GERMANY: 'Germany',
  FRANCE: 'France',
  GREAT_BRITAIN: 'Great Britain',
  RUSSIA: 'Russia',
} as const;

export const ORDER_STATUSES = {
  DRAFT: 'Draft',
  IN_PROCESS: 'In Process',
  PARTIALLY_RECEIVED: 'Partially Received',
  RECEIVED: 'Received',
  CANCELED: 'Canceled',
} as const;

export const ORDER_HISTORY_ACTIONS = {
  CREATED: 'Order created',
  CUSTOMER_CHANGED: 'Customer changed',
  REQUIRED_PRODUCTS_CHANGED: 'Requested products changed',
  PROCESSED: 'Order processing started',
  DELIVERY_SCHEDULED: 'Delivery Scheduled',
  DELIVERY_EDITED: 'Delivery Edited',
  RECEIVED: 'Received',
  RECEIVED_ALL: 'All products received',
  CANCELED: 'Order canceled',
} as const;

export const DELIVERY = {
  DELIVERY: 'Delivery',
  PICK_UP: 'Pickup',
} as const;
