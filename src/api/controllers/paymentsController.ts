import { Request, Response } from "express";
import type { Context } from "openapi-backend";

import type { ApiContext } from "./../context/apiContext";
import {
  MakePaymentInput,
  makePaymentInputSchema,
  MakePaymentResponse,
} from "../../schemas/makePaymentApi.schema";
import { logger } from "./../utils/logger";
import { PaymentsHistoryResponse } from "../openapi/openapi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function makePayment(
  _ctx: Context<MakePaymentInput>,
  req: Request<any, MakePaymentResponse, MakePaymentInput>,
  res: Response,
  { services }: ApiContext,
) {
  const parsed = makePaymentInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.format(),
    });
  }

  const { accountId, amount } = parsed.data;

  try {
    const dueCharge = services.paymentService.makePayment(accountId, amount);
    res.json(dueCharge);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

interface PaymentsHistoryParams {
  accountId: string;
}

export function paymentsHistory(
  ctx: Context<PaymentsHistoryParams>,
  _req: Request<PaymentsHistoryParams, PaymentsHistoryResponse>,
  res: Response,
  { repos }: ApiContext,
) {
  const accountId = ctx.request.params.accountId;

  try {
    repos.energyRepo.mustFindById(accountId);
    const dueCharges = repos.chargesRepo.findByAccountId(accountId);
    res.json(dueCharges);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
