import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import html from "dedent";

import { App } from "./components/App/App";

interface Props {
  title: string;
  clientCssPaths: string[];
  clientScriptPath: string;
}

export const HTML = ({ title, clientCssPaths, clientScriptPath }: Props) => {
  const queryClient = new QueryClient();

  const app = renderToString(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  const stylesheets = renderToString(
    clientCssPaths.map((clientCssPath) => (
      <link rel="stylesheet" href={`/assets/${clientCssPath}`} />
    )),
  );

  return html/* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        ${stylesheets}
      </head>
      <body>
        <div id="root">${app}</div>
      </body>
      <script type="module" src="/assets/${clientScriptPath}"></script>
    </html>
  `;
};
export default HTML;
