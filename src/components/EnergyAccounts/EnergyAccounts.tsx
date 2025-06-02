import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

import { AccountTabs } from "./../AccountTabs/AccountTabs";
import { CircleIcon } from "../CircleIcon/CircleIcon";
import { Loader } from "./../Loader/Loader";
import { MakePaymentModal } from "./../MakePaymentModal/MakePaymentModal";
import { Card, Text } from "./../../lib/PaperCss";

import { getTotalColour } from "./getTotalColour";
import { type AccountType, useGetEnergyAccounts } from "./queries.openapi";

export const EnergyAccounts = () => {
  const { accountType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 300);
  const { data, isFetching, error } = useGetEnergyAccounts({
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
      {isFetching && <Loader />}
      {data &&
        data.map((a) => (
          <div key={a.id} className="margin-bottom-small">
            <Card key={a.id}>
              <div className="row">
                <div className="col-3 col">
                  <CircleIcon />
                </div>
                <div className="col-9 col">
                  <h3 className="card-title">{a.type}</h3>
                  <Text>{a.id}</Text>
                  <Text>{a.address}</Text>

                  <div className="row">
                    <Text className="col-fill">Amount Due:</Text>
                    <Text color={getTotalColour(a.totalDue)}>
                      ${a.totalDue.toFixed(2)}
                    </Text>
                  </div>

                  <MakePaymentModal accountId={a.id} />
                </div>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};
