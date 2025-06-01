import React from "react";
import { Routes, Route } from "react-router";

import { EnergyAccounts } from "./../EnergyAccounts/EnergyAccounts";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EnergyAccounts />} />
    </Routes>
  );
};
export default App;
