import { z } from "./utils";

import { dueChargeSchema } from "./dueCharge.schema";

export const paymentsHistoryResponseSchema = z
  .array(dueChargeSchema)
  .openapi({ ref: "PaymentsHistoryResponse" });

export type MakePaymentResponse = z.infer<typeof paymentsHistoryResponseSchema>;
