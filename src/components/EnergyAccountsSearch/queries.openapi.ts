import { useQuery } from "@tanstack/react-query";

import type { AccountType } from "../../schemas/energyAccountsApi.schema";
import { getApiClient } from "../../modules/openapi-client";

export const useGetEnergyAccounts = (params?: {
  accountType?: AccountType;
  q?: string;
}) =>
  useQuery({
    queryKey: ["getEnergyAccounts", params],
    queryFn: () =>
      getApiClient()
        .then((client) => client.getEnergyAccounts(params))
        .then((res) => res.data),
  });
