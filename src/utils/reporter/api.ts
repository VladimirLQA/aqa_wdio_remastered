import AllureReporter from "@wdio/allure-reporter";
import { Status } from "allure-js-commons";
import { IRequestOptions, IResponse, IResponseFields } from "../../data/types/api.types";

export function reportApiRequest<T extends IResponseFields>(requestOptions: IRequestOptions, response: IResponse<T>) {
  logApiRequest(requestOptions);
  logApiResponse(requestOptions, response);
}

export function logApiRequest(requestOptions: IRequestOptions) {
  AllureReporter.startStep(`Request: ${requestOptions?.method?.toUpperCase()} ${requestOptions?.url}`);
  AllureReporter.addAttachment("Request Headers", JSON.stringify(requestOptions?.headers, null, 2), "application/json");
  AllureReporter.addAttachment(
    "Request Body",
    requestOptions?.data ? JSON.stringify(requestOptions?.data, null, 2) : {},
    "application/json"
  );
  AllureReporter.endStep();
}

export function logApiResponse<T extends IResponseFields>(requestOptions: IRequestOptions, response: IResponse<T>) {
  AllureReporter.startStep(`Response: ${response?.status} ${requestOptions?.url}`);
  AllureReporter.addAttachment("Response Headers", JSON.stringify(response?.headers, null, 2), "application/json");
  AllureReporter.addAttachment("Response Body", JSON.stringify(response?.body, null, 2), "application/json");
  AllureReporter.endStep(response && response.status >= 400 ? Status.FAILED : Status.PASSED);
}
