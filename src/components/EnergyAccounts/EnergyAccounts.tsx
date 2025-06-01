import React from "react";

import { Loader } from "./../Loader/Loader";
import { useGetEnergyAccounts } from "./queries.openapi";

export const EnergyAccounts = () => {
  const { data, isFetching, error } = useGetEnergyAccounts();

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
