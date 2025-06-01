import { Request, Response } from "express";

import { ApiContext } from "./../context/apiContext";

export async function getEnergyAccountsWithCharges(
  _req: Request,
  res: Response,
  context: ApiContext,
) {
  try {
    const result = await context.energyAccountService.getAccountsWithCharges();
    res.json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
