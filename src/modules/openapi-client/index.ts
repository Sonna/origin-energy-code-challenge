import OpenAPIClientAxios from "openapi-client-axios";
import type { Document } from "openapi-client-axios";

import { openApiDocument } from "./../../api/openapi/document";
import type { Client } from "./../../api/openapi/openapi.d.ts";

const api = new OpenAPIClientAxios({
  definition: openApiDocument as Document,
  withServer: {
    url: "/api",
  },
});

export const getApiClient = async () => {
  const client = await api.getClient<Client>();
  return client;
};
