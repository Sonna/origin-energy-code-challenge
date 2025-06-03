import { createDocument } from "zod-openapi";

import { accountTypeSchema } from "./../../schemas/energyAccount.schema";
import { energyAccountsResponseSchema } from "./../../schemas/energyAccountsApi.schema";
import {
  makePaymentInputSchema,
  makePaymentResponseSchema,
} from "./../../schemas/makePaymentApi.schema";
import { paymentsHistoryResponseSchema } from "./../../schemas/paymentsHistoryApi.schema";

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
          {
            in: "query",
            name: "q",
            required: false,
            schema: {
              type: "string",
            },
            description: "Search/Filter by address",
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
    "/payment": {
      post: {
        operationId: "makePayment",
        summary: "Make a payment and apply it to an account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MakePaymentInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Payment processed and charge recorded",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MakePaymentResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid request",
          },
        },
      },
    },
    "/payments/{accountId}": {
      get: {
        operationId: "getPaymentsHistory",
        description: "Returns history of payments for energy account",
        parameters: [
          {
            in: "path",
            name: "accountId",
            required: true,
            schema: {
              type: "string",
            },
            example: "A-0001",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaymentsHistoryResponse",
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
      MakePaymentInput: makePaymentInputSchema,
      MakePaymentResponse: makePaymentResponseSchema,
      PaymentsHistoryResponse: paymentsHistoryResponseSchema,
    },
  },
});
