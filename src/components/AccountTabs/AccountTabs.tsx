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
        <div key={`tab-${i}`}>
          <input
            id={`tab-${tab.label}`}
            type="radio"
            name={`tab-${tab.label}`}
            checked={accountType === tab.value.toLocaleLowerCase()}
            onChange={() =>
              navigate({
                pathname: generatePath("/:accountType?", {
                  accountType: tab.value.toLocaleLowerCase(),
                }),
              })
            }
          />
          <label htmlFor={`tab-${tab.label}`}>{tab.label}</label>
        </div>
      ))}
    </div>
  );
};
