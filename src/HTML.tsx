import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import html from "dedent";

import { App } from "./App";

interface Props {
  title: string;
  clientScriptPath: string;
}

export const HTML = ({ title, clientScriptPath }: Props) => {
  const queryClient = new QueryClient();

  const app = renderToString(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );

  return html/* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${app}</div>
      </body>
      <script type="module" src="/assets/${clientScriptPath}"></script>
    </html>
  `;
};
export default HTML;
