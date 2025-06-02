import React from "react";
import { useSearchParams } from "react-router";

import { AccountTabs } from "./../AccountTabs/AccountTabs";
import { CircleIcon } from "../CircleIcon/CircleIcon";
import { Loader } from "./../Loader/Loader";
import { MakePaymentModal } from "./../MakePaymentModal/MakePaymentModal";
import { Card, Text } from "./../../lib/PaperCss";

import { getTotalColour } from "./getTotalColour";
import { type AccountType, useGetEnergyAccounts } from "./queries.openapi";

export const EnergyAccounts = () => {
  const [params] = useSearchParams();
  const type = (params.get("accountType") as AccountType) || undefined;
  const { data, isFetching, error } = useGetEnergyAccounts(type);

  if (error) return <p>Error loading accounts</p>;

  return (
    <div className="paper container container-lg">
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
                  <h3 className="card-title">{`${a.type} Account — ${a.id}`}</h3>
                  <Text>{a.address}</Text>

                  {"meterNumber" in a && <Text>Meter: {a.meterNumber}</Text>}
                  {"volume" in a && <Text>Volume: {a.volume} kWh</Text>}

                  {"totalDue" in a && (
                    <Text color={getTotalColour(a.totalDue)}>
                      Amount Due: ${a.totalDue.toFixed(2)}
                    </Text>
                  )}

                  <MakePaymentModal accountId={a.id} />
                </div>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};
