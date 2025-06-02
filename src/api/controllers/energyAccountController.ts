import type { Context } from "openapi-backend";
import { Request, Response } from "express";

import type { ApiContext } from "./../context/apiContext";
import {
  type AccountType,
  //   accountTypeSchema,
} from "../../schemas/energyAccountsApi.schema";
import { logger } from "./../utils/logger";

interface FilterParams {
  accountType: AccountType;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getEnergyAccountsWithCharges(
  _ctx: Context<any, any, FilterParams>,
  req: Request<any, any, any, FilterParams>,
  res: Response,
  { services }: ApiContext,
) {
  //   const parsed = accountTypeSchema.safeParse(req.query.accountType);
  //   if (!parsed.success) {
  //     return res.status(400).json({ error: "Invalid account type" });
  //   }
  const type =
    typeof req.query.accountType === "string"
      ? (req.query.accountType.toUpperCase() as "GAS" | "ELECTRICITY")
      : undefined;

  if (type && !["GAS", "ELECTRICITY"].includes(type)) {
    return res.status(400).json({ error: "Invalid account type" });
  }

  try {
    const result = services.energyAccountService.getAccountsWithCharges({
      type, //: parsed.data,
    });
    res.json(result);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
