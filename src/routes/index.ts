import { Express } from "express";
import health from "./health";

export default (app: Express) => {
  app.get("/health", health.get);
};
