import cors from "cors";
import express from "express";

import { createApiContext } from "./../src/api/context/apiContext";
import { setupRoutes } from "./../src/api/routes/setupRoutes";

export async function createTestServer() {
  const app = express();
  // Enable CORS for all origins (development only)
  app.use(cors());
  app.use(express.json());

  const context = await createApiContext();
  setupRoutes(app, context);

  return app;
}
