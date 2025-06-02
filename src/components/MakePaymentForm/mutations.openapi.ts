import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MakePaymentInput } from "./../../schemas/makePaymentApi.schema";
import { getApiClient } from "./../../modules/openapi-client";

interface Options {
  onSuccess?: () => void;
}

export const useMakePayment = (opts: Options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MakePaymentInput) =>
      getApiClient()
        .then((client) => client.makePayment(null, data))
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEnergyAccounts"] });
      opts.onSuccess?.(); // reset form on success
    },
  });
};
