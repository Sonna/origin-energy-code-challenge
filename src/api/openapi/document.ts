import { createDocument } from "zod-openapi";

import { energyAccountSchema } from "./../../schemas/energyAccount.schema";

export const openApiDocument = createDocument({
  openapi: "3.0.0",
  info: {
    title: "Mock API",
    version: "1.0.0",
  },
  paths: {
    "/api/energy-accounts": {
      get: {
        operationId: "getEnergyAccounts",
        description: "Returns all energy accounts",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/EnergyAccount" },
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
      EnergyAccount: energyAccountSchema,
    },
  },
});
