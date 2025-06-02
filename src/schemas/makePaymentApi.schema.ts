import { creditCardSchema } from "./creditCard.schema";
import { z } from "./utils";

export const makePaymentInputSchema = z
  .object({
    accountId: z.string().min(1, "Account ID is required"),
    creditCard: creditCardSchema,
    amount: z.number(),
  })
  .openapi({ ref: "MakePaymentInput" });

export type MakePaymentInput = z.infer<typeof makePaymentInputSchema>;

export const makePaymentResponseSchema = z
  .object({ success: z.boolean(), message: z.string() })
  .openapi({ ref: "MakePaymentResponse" });

export type MakePaymentResponse = z.infer<typeof makePaymentResponseSchema>;
