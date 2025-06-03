import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "../../modules/openapi-client";

export const useGetPaymentsHistory = (accountId: string) =>
  useQuery({
    queryKey: ["getPaymentsHistory", accountId],
    queryFn: () =>
      getApiClient()
        .then((client) => client.getPaymentsHistory(accountId))
        .then((res) => res.data),
  });
