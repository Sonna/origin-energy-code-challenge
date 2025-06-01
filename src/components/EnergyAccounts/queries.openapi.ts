import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "./../../modules/openapi-client";

export const useGetEnergyAccounts = () =>
  useQuery({
    queryKey: ["getEnergyAccounts"],
    queryFn: () =>
      getApiClient()
        .then((client) => client.getEnergyAccounts())
        .then((res) => res.data),
  });
