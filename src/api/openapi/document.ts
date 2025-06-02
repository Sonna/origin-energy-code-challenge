import { createDocument } from "zod-openapi";

import {
  accountTypeSchema,
  energyAccountsResponseSchema,
} from "./../../schemas/energyAccountsApi.schema";

export const openApiDocument = createDocument({
  openapi: "3.0.0",
  info: {
    title: "Mock API",
    version: "1.0.0",
  },
  servers: [{ url: "/api" }],
  paths: {
    "/energy-accounts": {
      get: {
        operationId: "getEnergyAccounts",
        description: "Returns all energy accounts",
        parameters: [
          {
            in: "query",
            name: "accountType",
            required: false,
            schema: {
              $ref: "#/components/schemas/AccountType",
            },
            description: "Filter by account type",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EnergyAccountsResponse",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AccountType: accountTypeSchema,
      EnergyAccountsResponse: energyAccountsResponseSchema,
    },
  },
});
