import { z } from "./utils";

export const accountTypeSchema = z
  .enum(["GAS", "ELECTRICITY"])
  .openapi({ ref: "AccountType" });

export type AccountType = z.infer<typeof accountTypeSchema>;

const baseAccountSchema = z.object({
  id: z.string().regex(/^A-\d{4}$/, "Invalid account ID format"),
  type: accountTypeSchema,
  address: z.string().min(1, "Address is required"),
});

export const electricityAccountSchema = baseAccountSchema
  .extend({
    type: z.literal("ELECTRICITY"),
    meterNumber: z.string().regex(/^\d{10}$/, "Invalid meter number"),
  })
  .openapi({ ref: "ElectricityAccount" });

export const gasAccountSchema = baseAccountSchema
  .extend({
    type: z.literal("GAS"),
    volume: z.number().nonnegative(),
  })
  .openapi({ ref: "GasAccount" });

export const energyAccountSchema = z
  .discriminatedUnion("type", [electricityAccountSchema, gasAccountSchema])
  .openapi({ ref: "EnergyAccount", unionOneOf: true });

export type EnergyAccount = z.infer<typeof energyAccountSchema>;
