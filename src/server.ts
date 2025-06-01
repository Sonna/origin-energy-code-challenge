import express from "express";
import fs from "fs";
import path from "path";

import { setupRoutes } from "./api/routes/setupRoutes";
import { HTML } from "./HTML";

// Load Vite manifest
const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".vite/manifest.json"), "utf-8"),
);

async function serve() {
  const app = express();
  app.use(express.json());

  app.use(express.static(path.join(__dirname, "../dist")));

  await setupRoutes(app);

  app.use("/", (_req, res) => {
    const entry = manifest["src/client.tsx"];
    const css = entry.css.map((c: string) => path.basename(c));
    const html = HTML({
      title: "Hello, world!",
      clientCssPaths: css,
      clientScriptPath: path.basename(entry.file),
    });
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    console.log("Press Ctrl+C to quit.");
  });
}

serve();
