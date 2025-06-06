import { creditCardSchema } from "./creditCard.schema";
import { dueChargeSchema } from "./dueCharge.schema";
import { z } from "./utils";

export const makePaymentInputSchema = z
  .object({
    accountId: z.string().min(1, "Account ID is required"),
    creditCard: creditCardSchema,
    amount: z
      .number()
      .positive({ message: "Payment amount must be positive" })
      .openapi({ exclusiveMinimum: undefined }), // unfortunately this breaks in OpenAPI 3.0
  })
  .openapi({ ref: "MakePaymentInput" });

export type MakePaymentInput = z.infer<typeof makePaymentInputSchema>;

export const makePaymentResponseSchema = dueChargeSchema
  .extend({})
  .openapi({ ref: "MakePaymentResponse" });

export type MakePaymentResponse = z.infer<typeof makePaymentResponseSchema>;
