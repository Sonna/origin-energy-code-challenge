import type { Context } from "openapi-backend";
import { Request, Response } from "express";

import type { ApiContext } from "./../context/apiContext";
import type { AccountType } from "../../schemas/energyAccount.schema";
import { logger } from "./../utils/logger";

interface FilterParams {
  q: string;
  accountType: AccountType;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getEnergyAccountsWithCharges(
  _ctx: Context<any, any, FilterParams>,
  req: Request<any, any, any, FilterParams>,
  res: Response,
  { services }: ApiContext,
) {
  const q = typeof req.query.q === "string" ? req.query.q : undefined;
  const type =
    typeof req.query.accountType === "string"
      ? (req.query.accountType.toUpperCase() as AccountType)
      : undefined;

  if (type && !["GAS", "ELECTRICITY"].includes(type)) {
    return res.status(400).json({ error: "Invalid account type" });
  }

  try {
    const result = services.energyAccountService.getAccountsWithCharges({
      type,
      address: q,
    });
    res.json(result);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
