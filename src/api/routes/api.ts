import { type Document, OpenAPIBackend } from "openapi-backend";

import { getEnergyAccountsWithCharges } from "./../controllers/energyAccountController";
import { makePayment } from "./../controllers/paymentsController";
import { openApiDocument } from "./../openapi/document";

export function createApi() {
  const api = new OpenAPIBackend({
    definition: openApiDocument as Document,
    handlers: {
      notFound: () => ({ statusCode: 404, body: "Not found" }),
    },
  });

  api.register({ getEnergyAccounts: getEnergyAccountsWithCharges });
  api.register({ makePayment });

  return api;
}
