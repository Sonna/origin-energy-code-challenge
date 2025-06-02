import React from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";

const tabs = [
  { label: "All", value: "" },
  { label: "Gas", value: "GAS" },
  { label: "Electricity", value: "ELECTRICITY" },
];

export const AccountTabs = () => {
  const [params] = useSearchParams();
  const type = params.get("accountType") || "";
  const navigate = useNavigate();

  return (
    <div className="row flex-spaces tabs">
      {tabs.map((tab, i) => (
        <div key={`tab${i}`}>
          <input
            id={`tab${i}`}
            type="radio"
            name="tabs"
            checked={type === tab.value}
            onChange={() =>
              navigate({
                pathname: "/",
                search:
                  tab.label !== "All"
                    ? createSearchParams({ accountType: tab.value }).toString()
                    : undefined,
              })
            }
          />
          <label htmlFor={`tab${i}`}>{tab.label}</label>
        </div>
      ))}
    </div>
  );
};
