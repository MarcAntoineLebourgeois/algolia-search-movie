import { backEndHost } from "../data";

export const isBackendApiKey = (): Promise<boolean> =>
  fetch(`${backEndHost}api/v1/check_api_key`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => response !== 401);
