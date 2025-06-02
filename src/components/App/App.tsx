import React from "react";
import { Routes, Route } from "react-router";

import { EnergyAccountsSearch } from "../EnergyAccountsSearch/EnergyAccountsSearch";

export const App = () => {
  return (
    <Routes>
      <Route path="/:accountType?" element={<EnergyAccountsSearch />} />
    </Routes>
  );
};
export default App;
