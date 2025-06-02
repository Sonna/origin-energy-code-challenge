import { dueChargeSchema } from "./dueCharge.schema";
import {
  electricityAccountSchema,
  gasAccountSchema,
} from "./energyAccount.schema";
import { z } from "./utils";

export const accountTypeSchema = z
  .enum(["GAS", "ELECTRICITY"])
  .openapi({ ref: "AccountType" });

export type AccountType = z.infer<typeof accountTypeSchema>;

const withCharges = {
  dueCharges: z.array(dueChargeSchema),
  totalDue: z.number(),
};
const energyAccountWithChargesSchema = z
  .discriminatedUnion("type", [
    electricityAccountSchema.extend(withCharges),
    gasAccountSchema.extend(withCharges),
  ])
  .openapi({ ref: "EnergyAccountWithCharges", unionOneOf: true });

export const energyAccountsResponseSchema = z
  .array(energyAccountWithChargesSchema)
  .openapi({ ref: "EnergyAccountsResponse" });

export type EnergyAccountsResponse = z.infer<
  typeof energyAccountsResponseSchema
>;
