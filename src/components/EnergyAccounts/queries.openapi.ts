import { useQuery } from "@tanstack/react-query";

import type { Paths } from "./../../api/openapi/openapi.d.ts";
import { getApiClient } from "./../../modules/openapi-client";

export type AccountType = Paths.GetEnergyAccounts.Parameters.AccountType;

export const useGetEnergyAccounts = (accountType?: AccountType) =>
  useQuery({
    queryKey: ["getEnergyAccounts", accountType],
    queryFn: () =>
      getApiClient()
        .then((client) => client.getEnergyAccounts({ accountType }))
        .then((res) => res.data),
  });
