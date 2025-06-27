import Ajv from 'ajv';
import { IResponse, IResponseFields } from '../../data/types/api.types.ts';
import chaiExpect from '../../lib/_chai_expect/_chai_expect.ts';
import { STATUS_CODES } from '../../data/api/statusCodes.ts';

/**
 * Validates a JSON response against a given schema using Ajv.
 *
 * @template T - Type extending IResponseFields
 * @param {object} schema - JSON schema to validate against
 * @param {IResponse<T>} response - API response to validate
 * @throws {Error} - Throws if validation fails
 */
export function validateJsonSchema<T extends IResponseFields>(schema: object, response: IResponse<T>) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors); // eslint-disable-line no-console
  }
  chaiExpect(isValidSchema).to.equal(true);
}

/**
 * Type guard that checks if a response contains standard success fields.
 *
 * @param {IResponse<unknown>} response - API response to check
 * @returns {response is IResponse<IResponseFields>} - Type predicate
 *
 */
export const isWithIsSuccess = (response: IResponse<unknown>): response is IResponse<IResponseFields> => {
  const body = response.body;

  return (
    typeof body === 'object'
    && body !== null
    && 'IsSuccess' in body
    && 'ErrorMessage' in body
    && typeof body.IsSuccess === 'boolean'
    && (typeof body.ErrorMessage === 'string' || body.ErrorMessage === null)
  );
};

/**
 * Validates API response status and required success fields.
 *
 * @param {IResponse<IResponseFields>} response - API response to validate
 * @param {number} status - Expected HTTP status code
 * @param {boolean} IsSuccess - Expected IsSuccess value
 * @param {null | string} ErrorMessage - Expected ErrorMessage value
 *
 * @example
 * validateResponse(response, 200, true, null);
 */
export function validateResponse(
  response: IResponse<IResponseFields>,
  status: number,
  IsSuccess?: boolean,
  ErrorMessage?: null | string,
): void {
  chaiExpect(response.status).to.equal(status);
  if (status !== STATUS_CODES.DELETED) {
    chaiExpect(response.body.IsSuccess).to.equal(IsSuccess);
    chaiExpect(response.body.ErrorMessage).to.equal(ErrorMessage);
  }
}
