import type { Context } from "openapi-backend";
import { Request, Response } from "express";

import type { ApiContext } from "./../context/apiContext";
import { logger } from "./../utils/logger";

export async function getEnergyAccountsWithCharges(
  _ctx: Context,
  req: Request,
  res: Response,
  { services }: ApiContext,
) {
  const type =
    typeof req.query.accountType === "string"
      ? (req.query.accountType.toUpperCase() as "GAS" | "ELECTRICITY")
      : undefined;

  if (type && !["GAS", "ELECTRICITY"].includes(type)) {
    return res.status(400).json({ error: "Invalid account type" });
  }

  try {
    const result = await services.energyAccountService.getAccountsWithCharges({
      type,
    });
    res.json(result);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
