import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import html from "dedent";

import type { Paths } from "./api/openapi/openapi.d.ts";
import { App } from "./components/App/App";
import { getApiClient } from "./modules/openapi-client";

export type AccountType = Paths.GetEnergyAccounts.Parameters.AccountType;

interface Props {
  accountType?: AccountType;
  title: string;
  clientCssPaths: string[];
  clientScriptPath: string;
}

export const HTML = async ({
  accountType,
  title,
  clientCssPaths,
  clientScriptPath,
}: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getEnergyAccounts", accountType],
    queryFn: () =>
      getApiClient()
        .then((client) => client.getEnergyAccounts({ accountType }))
        .then((res) => res.data),
  });
  const dehydratedState = dehydrate(queryClient);
  const app = renderToString(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </HydrationBoundary>
    </QueryClientProvider>,
  );

  const stylesheets = renderToString(
    clientCssPaths.map((clientCssPath) => (
      <link rel="stylesheet" href={`/assets/${clientCssPath}`} />
    )),
  );

  const text = html/* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        ${stylesheets}
      </head>
      <body>
        <div id="root">${app}</div>
        <div id="modal-root"></div>
      </body>
      <script type="module" src="/assets/${clientScriptPath}"></script>
      <script>
        window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
      </script>
    </html>
  `;

  queryClient.clear();
  return text;
};
export default HTML;
