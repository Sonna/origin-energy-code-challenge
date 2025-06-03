import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  FieldLabel,
  Form,
  FormInput,
  FormGroup,
  Heading,
  Text,
} from "../DesignSystem";
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
    <Form onSubmit={handleSubmit((data) => mutate(data))}>
      <Heading level="h3">Make a Payment</Heading>

      <FormGroup className="margin-bottom-large">
        <Text>How much would you like to pay?</Text>
        <FieldLabel htmlFor="amount" className="visually-hidden">
          Amount
        </FieldLabel>
        <FormInput
          type="number"
          step="0.01"
          className="input-block"
          placeholder="Amount"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <Text as="small" className="text-danger">
            {errors.amount.message}
          </Text>
        )}
      </FormGroup>

      <FormGroup>
        <Text>How would you like to pay?</Text>
        <FieldLabel htmlFor="creditCard.cardNumber" className="visually-hidden">
          Card Number
        </FieldLabel>
        <FormInput
          type="text"
          className="input-block"
          placeholder="Card Number"
          {...register("creditCard.cardNumber")}
        />
        {errors.creditCard?.cardNumber && (
          <Text as="small" className="text-danger">
            {errors.creditCard.cardNumber.message}
          </Text>
        )}
      </FormGroup>

      <div className="row">
        <div className="sm-6">
          <FormGroup>
            <FieldLabel
              htmlFor="creditCard.expiryDate"
              className="visually-hidden"
            >
              Expiry Date (MM/YY)
            </FieldLabel>
            <FormInput
              type="text"
              className="input-block"
              placeholder="Expiry"
              {...register("creditCard.expiryDate")}
            />
            {errors.creditCard?.expiryDate && (
              <Text as="small" className="text-danger">
                {errors.creditCard.expiryDate.message}
              </Text>
            )}
          </FormGroup>
        </div>
        <div className="sm-6">
          <FormGroup>
            <FieldLabel htmlFor="creditCard.cvv" className="visually-hidden">
              CVV
            </FieldLabel>
            <FormInput
              type="text"
              className="input-block"
              placeholder="CVV"
              {...register("creditCard.cvv")}
            />
            {errors.creditCard?.cvv && (
              <Text as="small" className="text-danger">
                {errors.creditCard.cvv.message}
              </Text>
            )}
          </FormGroup>
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

      {isSuccess && <Text className="text-success">Payment successful!</Text>}
      {error && (
        <Text className="text-danger">
          Payment failed: {(error as Error).message}
        </Text>
      )}
    </Form>
  );
};
