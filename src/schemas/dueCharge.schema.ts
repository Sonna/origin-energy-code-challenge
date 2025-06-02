import { z } from "./utils";

export const dueChargeSchema = z
  .object({
    id: z.string().regex(/^D-\d{4}$/, "Invalid charge ID format"),
    accountId: z.string().regex(/^A-\d{4}$/, "Invalid account ID format"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    amount: z.number(),
  })
  .openapi({ ref: "DueCharge" });

export type DueCharge = z.infer<typeof dueChargeSchema>;
