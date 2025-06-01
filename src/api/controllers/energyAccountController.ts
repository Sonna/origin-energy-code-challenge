import type { Context } from "openapi-backend";
import { Request, Response } from "express";

import type { ApiContext } from "./../context/apiContext";
import { logger } from "./../utils/logger";

export async function getEnergyAccountsWithCharges(
  _ctx: Context,
  _req: Request,
  res: Response,
  { services }: ApiContext,
) {
  try {
    const result = await services.energyAccountService.getAccountsWithCharges();
    res.json(result);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
