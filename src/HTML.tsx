import React from "react";
import { renderToString } from "react-dom/server";
import html from "dedent";

import { App } from "./App";

interface Props {
  title: string;
}

export const HTML = ({ title }: Props) => {
  const app = renderToString(<App />);

  return html/* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${app}</div>
      </body>
      <script src="/client.js"></script>
    </html>
  `;
};
export default HTML;
