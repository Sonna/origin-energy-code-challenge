import { dueChargeSchema } from "./dueCharge.schema";
import {
  electricityAccountSchema,
  gasAccountSchema,
} from "./energyAccount.schema";
import { z } from "./utils";

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
