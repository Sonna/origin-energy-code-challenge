import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { Text } from "./../Text/Text";
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

      <div className="form-group margin-bottom-large">
        <Text>How much would you like to pay?</Text>
        <label htmlFor="amount" className="visually-hidden">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          className="input-block"
          placeholder="Amount"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <small className="text-danger">{errors.amount.message}</small>
        )}
      </div>

      <div className="form-group">
        <Text>How would you like to pay?</Text>
        <label htmlFor="creditCard.cardNumber" className="visually-hidden">
          Card Number
        </label>
        <input
          type="text"
          className="input-block"
          placeholder="Card Number"
          {...register("creditCard.cardNumber")}
        />
        {errors.creditCard?.cardNumber && (
          <small className="text-danger">
            {errors.creditCard.cardNumber.message}
          </small>
        )}
      </div>

      <div className="row">
        <div className="sm-6">
          <div className="form-group">
            <label htmlFor="creditCard.expiryDate" className="visually-hidden">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              className="input-block"
              placeholder="Expiry"
              {...register("creditCard.expiryDate")}
            />
            {errors.creditCard?.expiryDate && (
              <small className="text-danger">
                {errors.creditCard.expiryDate.message}
              </small>
            )}
          </div>
        </div>
        <div className="sm-6">
          <div className="form-group">
            <label htmlFor="creditCard.cvv" className="visually-hidden">
              CVV
            </label>
            <input
              type="text"
              className="input-block"
              placeholder="CVV"
              {...register("creditCard.cvv")}
            />
            {errors.creditCard?.cvv && (
              <small className="text-danger">
                {errors.creditCard.cvv.message}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="row flex-center">
        <button
          type="submit"
          className="paper-btn btn-danger-outline"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Pay"}
        </button>
      </div>

      {isSuccess && <p className="text-success">Payment successful!</p>}
      {error && (
        <p className="text-danger">
          Payment failed: {(error as Error).message}
        </p>
      )}
    </form>
  );
};
