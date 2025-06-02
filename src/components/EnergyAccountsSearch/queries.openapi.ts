import { useQuery } from "@tanstack/react-query";

import type { Paths } from "../../api/openapi/openapi.js";
import { getApiClient } from "../../modules/openapi-client/index.js";

export type AccountType = Paths.GetEnergyAccounts.Parameters.AccountType;

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
