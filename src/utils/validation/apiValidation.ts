import Ajv from "ajv";
import { expect } from "chai";
import { IResponse, IResponseFields } from "../../data/types/api.types";

export function validateJsonSchema<T extends IResponseFields>(schema: object, response: IResponse<T>) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    console.log(validate.errors);
  }
  expect(isValidSchema).to.be.true;
}

export function validateResponse<T extends IResponseFields>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
) {
  expect(response.status).to.equal(status);
  expect(response.body.IsSuccess).to.equal(IsSuccess);
  expect(response.body.ErrorMessage).to.equal(ErrorMessage);
}
