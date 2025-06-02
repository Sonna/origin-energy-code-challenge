import { Request, Response } from "express";
import type { Context } from "openapi-backend";

import type { ApiContext } from "./../context/apiContext";
import {
  MakePaymentInput,
  makePaymentInputSchema,
  MakePaymentResponse,
} from "../../schemas/makePaymentApi.schema";
import { logger } from "./../utils/logger";

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
    services.paymentService.makePayment(accountId, amount);
    res.json({
      success: true,
      message: `Payment of $${amount} has been recorded for account ${accountId}.`,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
