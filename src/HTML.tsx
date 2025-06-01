import React from "react";
import { renderToString } from "react-dom/server";
import html from "dedent";

import { App } from "./App";

interface Props {
  title: string;
  clientScriptPath: string;
}

export const HTML = ({ title, clientScriptPath }: Props) => {
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
      <script type="module" src="/assets/${clientScriptPath}"></script>
    </html>
  `;
};
export default HTML;
