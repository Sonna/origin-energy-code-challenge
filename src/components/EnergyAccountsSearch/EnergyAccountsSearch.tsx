import React, { useState } from "react";
import {
  generatePath,
  NavLink,
  useParams,
  useSearchParams,
} from "react-router";
import { useDebounce } from "use-debounce";

import { AccountTabs } from "../AccountTabs/AccountTabs";
import { Card } from "../Card/Card";
import { CircleIcon } from "../CircleIcon/CircleIcon";
import { Loader } from "../Loader/Loader";
import { MakePaymentModal } from "../MakePaymentModal/MakePaymentModal";
import type { AccountType } from "../../schemas/energyAccount.schema";
import { Heading, Text } from "../DesignSystem";
import { getTotalColour } from "../utils/getTotalColour";

import { useGetEnergyAccounts } from "./queries.openapi";

export const EnergyAccountsSearch = () => {
  const { accountType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 300);
  const { data, isLoading, error } = useGetEnergyAccounts({
    accountType: accountType as AccountType,
    q: debouncedSearch,
  });

  if (error) return <p>Error loading accounts</p>;

  return (
    <div className="paper container container-lg">
      <div className="row flex-center form-group">
        <label htmlFor="search" className="visually-hidden">
          Search
        </label>
        <input
          name="search"
          type="search"
          placeholder="Search address..."
          className="input-block sm-11"
          value={searchInput}
          onChange={(e) => {
            const { name, value } = e.target;
            setSearchInput(value);
            setSearchParams({ [name]: value });
          }}
        />
        <button
          type="button"
          className="sm-1 paper-btn btn-primary-outline"
          onClick={() => {
            setSearchInput("");
            if (searchParams.has("search")) {
              searchParams.delete("search");
              setSearchParams(searchParams);
            }
          }}
        >
          Clear
        </button>
      </div>
      <AccountTabs />
      {isLoading && <Loader />}
      {data &&
        data.map((a) => (
          <div key={a.id} className="margin-bottom-small">
            <Card key={a.id} data={{ automation: "energy-account-card" }}>
              <div className="row">
                <div className="col-3 col">
                  <CircleIcon />
                </div>
                <div className="col-9 col">
                  <Heading level="h3" className="card-title">
                    {a.type}
                  </Heading>
                  <Text>{a.id}</Text>
                  <Text>{a.address}</Text>

                  <NavLink
                    to={generatePath("/:accountId/history", {
                      accountId: a.id,
                    })}
                  >
                    <div className="row">
                      <Text className="col-fill">Amount Due:</Text>
                      <Text color={getTotalColour(a.totalDue)}>
                        ${a.totalDue.toFixed(2)}
                      </Text>
                    </div>
                  </NavLink>

                  <MakePaymentModal accountId={a.id} />
                </div>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};
