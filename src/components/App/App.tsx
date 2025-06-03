import React from "react";
import { Routes, Route } from "react-router";

import { DueChargesHistory } from "../DueChargesHistory/DueChargesHistory";
import { EnergyAccountsSearch } from "../EnergyAccountsSearch/EnergyAccountsSearch";

export const App = () => {
  return (
    <Routes>
      <Route path="/:accountId/history" element={<DueChargesHistory />} />
      <Route path="/:accountType?" element={<EnergyAccountsSearch />} />
    </Routes>
  );
};
export default App;
