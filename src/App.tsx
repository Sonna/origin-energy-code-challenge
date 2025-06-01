import React from "react";
import { Routes, Route } from "react-router";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello, TypeScript React!</h1>} />
    </Routes>
  );
};
export default App;
