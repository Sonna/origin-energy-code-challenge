import cors from "cors";
import express from "express";

import { setupRoutes } from "./../src/api/routes/setupRoutes";

export async function createTestServer() {
  const app = express();
  // Enable CORS for all origins (development only)
  app.use(cors());
  app.use(express.json());
  await setupRoutes(app);

  return app;
}
