import { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { ApiContext } from "./../context/apiContext";
import { openApiDocument } from "./../openapi/document";
import { createApiRouter } from "./apiRouter";

export function setupRoutes(app: Express, context: ApiContext) {
  app.use("/api", createApiRouter(context));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.get("/openapi.json", (_req, res) => {
    res.json(openApiDocument);
  });
}
