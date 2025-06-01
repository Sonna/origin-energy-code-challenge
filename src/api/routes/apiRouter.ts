import express from "express";

import { ApiContext } from "./../context/apiContext";
import { getEnergyAccountsWithCharges } from "./../controllers/energyAccountController";

export function createApiRouter(context: ApiContext) {
  const router = express.Router();

  router.get("/energy-accounts", (req, res) => {
    getEnergyAccountsWithCharges(req, res, context);
  });

  return router;
}
