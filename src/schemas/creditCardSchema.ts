import isCreditCard from "validator/lib/isCreditCard";

import { z } from "./utils";

function isFutureExpiryDate(value: string): boolean {
  const [monthStr, yearStr] = value.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(month) || isNaN(year)) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export const creditCardSchema = z.object({
  cardNumber: z.string().refine((val) => isCreditCard(val), {
    message: "Invalid credit card number",
  }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Expiry date must be in MM/YY format",
    })
    .refine((val) => isFutureExpiryDate(val), {
      message: "Card is expired",
    }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "CVV must be 3 or 4 digits",
  }),
});
