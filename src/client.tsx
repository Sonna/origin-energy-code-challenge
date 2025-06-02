import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "papercss/dist/paper.min.css";

import "./client.css";
import { App } from "./components/App/App";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REACT_QUERY_STATE__: Record<"mutation" | "queries", any[]>;
  }
}
const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root")!,
  <QueryClientProvider client={queryClient}>
    <HydrationBoundary state={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HydrationBoundary>
  </QueryClientProvider>,
);
