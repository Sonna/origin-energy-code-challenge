import { type Document, OpenAPIBackend } from "openapi-backend";

import { getEnergyAccountsWithCharges } from "./../controllers/energyAccountController";
import { openApiDocument } from "./../openapi/document";

export async function createApi() {
  const api = new OpenAPIBackend({
    definition: openApiDocument as Document,
    handlers: {
      notFound: () => ({ statusCode: 404, body: "Not found" }),
    },
  });

  api.register({ getEnergyAccounts: getEnergyAccountsWithCharges });

  return api;
}
