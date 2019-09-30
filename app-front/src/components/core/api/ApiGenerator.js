import queryString from "query-string";
import axios from "axios";
import { retrieveToken } from "../utils/Token";

const rax = require("retry-axios");

rax.attach();

export const requestGenerator = method => async (
  path,
  params,
  contentType = "application/json"
) => {
  const jwt = retrieveToken();
  let url = path;
  const headers = {
    "X-CORE-API-TOKEN": jwt.userToken,
    "X-CORE-API-USERNAME": jwt.userName
  };
  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  let requestParams = {
    method,
    headers: { ...headers },
    timeout: 60 * 1000,
    raxConfig: {
      retry: 3,
      noResponseRetries: 3,
      retryDelay: 600
    }
  };

  if (method !== "GET" && method !== "HEAD") {
    const data =
      contentType === "application/json" ? JSON.stringify(params) : params;
    requestParams = { ...requestParams, data };
  } else if (method === "GET" && params && Object.keys(params).length) {
    url = `${url}?${queryString.stringify(params)}`;
  }
  requestParams.url = url;

  const response = await axios(requestParams);

  const responseContentType = response.headers["content-type"];
  if (responseContentType && responseContentType.includes("application/json")) {
    return response.data;
  }
  throw new TypeError(`application/json expected, got ${contentType}`);
};

export const errorCatchWrapper = func => async (...args) => {
  try {
    return await func(...args);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [error.status, error];
  }
};

export const postApi = errorCatchWrapper(requestGenerator("POST"));
export const getApi = errorCatchWrapper(requestGenerator("GET"));
export const putApi = errorCatchWrapper(requestGenerator("PUT"));
export const deleteApi = errorCatchWrapper(requestGenerator("DELETE"));
