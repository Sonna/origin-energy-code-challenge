import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { App } from "./components/App/App";

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root")!,
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
