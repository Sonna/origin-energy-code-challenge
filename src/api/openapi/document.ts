import { createDocument } from "zod-openapi";

import { energyAccountSchema } from "./../../schemas/energyAccount.schema";

export const openApiDocument = createDocument({
  openapi: "3.0.0",
  info: {
    title: "Mock API",
    version: "1.0.0",
  },
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
              type: "string",
              enum: ["GAS", "ELECTRICITY"],
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
