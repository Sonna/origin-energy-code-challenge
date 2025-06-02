import React from "react";
import { generatePath, useNavigate, useParams } from "react-router";

const tabs = [
  { label: "All", value: "" },
  { label: "Gas", value: "GAS" },
  { label: "Electricity", value: "ELECTRICITY" },
];

export const AccountTabs = () => {
  const { accountType = "" } = useParams();
  const navigate = useNavigate();

  return (
    <div className="row flex-spaces tabs">
      {tabs.map((tab, i) => (
        <div key={`tab${i}`}>
          <input
            id={`tab${i}`}
            type="radio"
            name={`tab${i}`}
            checked={accountType === tab.value.toLocaleLowerCase()}
            onChange={() =>
              navigate({
                pathname: generatePath("/:accountType?", {
                  accountType: tab.value.toLocaleLowerCase(),
                }),
              })
            }
          />
          <label htmlFor={`tab${i}`}>{tab.label}</label>
        </div>
      ))}
    </div>
  );
};
