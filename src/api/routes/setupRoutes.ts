import { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { createApiContext } from "../context/apiContext";
import { openApiDocument } from "./../openapi/document";
import { createApi } from "./api";

export async function setupRoutes(app: Express) {
  const api = createApi();
  const apiContext = await createApiContext();

  app.use("/api", (req, res) => {
    api.handleRequest(
      {
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query as Record<string, string | string[]>,
        headers: req.headers as Record<string, string | string[]>,
      },
      req,
      res,
      apiContext,
    );
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.get("/openapi.json", (_req, res) => {
    res.json(openApiDocument);
  });
}
