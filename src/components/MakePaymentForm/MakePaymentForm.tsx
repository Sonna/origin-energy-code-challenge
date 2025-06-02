import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  makePaymentInputSchema,
  MakePaymentInput,
} from "./../../schemas/makePaymentApi.schema";

import { useMakePayment } from "./mutations.openapi";

interface Props {
  accountId: string;
  onSuccess?: () => void;
}

export const MakePaymentForm = ({ accountId, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MakePaymentInput>({
    resolver: zodResolver(makePaymentInputSchema),
    defaultValues: {
      accountId,
      amount: 0,
      creditCard: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
    },
  });

  const { mutate, isPending, isSuccess, error } = useMakePayment({
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="form-group"
    >
      <h3>Make a Payment</h3>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <small className="text-danger">{errors.amount.message}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" {...register("creditCard.cardNumber")} />
        {errors.creditCard?.cardNumber && (
          <small className="text-danger">
            {errors.creditCard.cardNumber.message}
          </small>
        )}
      </div>

      <div className="row">
        <div className="col sm-6">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
            <input type="text" {...register("creditCard.expiryDate")} />
            {errors.creditCard?.expiryDate && (
              <small className="text-danger">
                {errors.creditCard.expiryDate.message}
              </small>
            )}
          </div>
        </div>
        <div className="col sm-6">
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" {...register("creditCard.cvv")} />
            {errors.creditCard?.cvv && (
              <small className="text-danger">
                {errors.creditCard.cvv.message}
              </small>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? "Processing..." : "Pay"}
      </button>

      {isSuccess && <p className="text-success">Payment successful!</p>}
      {error && (
        <p className="text-danger">
          Payment failed: {(error as Error).message}
        </p>
      )}
    </form>
  );
};
