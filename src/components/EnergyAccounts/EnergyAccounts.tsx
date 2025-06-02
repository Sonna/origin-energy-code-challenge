import React from "react";
import { useSearchParams } from "react-router";

import { Loader } from "./../Loader/Loader";
// import { Card } from "./../../lib/PaperCss";
import { type AccountType, useGetEnergyAccounts } from "./queries.openapi";

export const EnergyAccounts = () => {
  const [params] = useSearchParams();
  const type = (params.get("accountType") as AccountType) || undefined;
  const { data, isFetching, error } = useGetEnergyAccounts(type);

  if (isFetching) return <Loader />;
  if (error) return <p>Error loading accounts</p>;

  return (
    <ul>
      {data &&
        data.map((account) => (
          <li key={account.id}>
            {account.type} at {account.address}
          </li>
        ))}
    </ul>
  );
};
