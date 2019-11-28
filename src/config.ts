import { LogLevelString } from "bunyan";

const path = require("path");
const rootPath = path.normalize(__dirname);

const NODE_ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.PORT || "5000";
const LOG_LEVEL = process.env.LOG_LEVEL || "debug";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "false";
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || "mock-banking-api.auth0.com";
const AUTH0_AUDIENCE =
  process.env.AUTH0_AUDIENCE || "https://mock-banking-api.auth0.com/api/v2/";

const APP_NAME = "mock-banking-auth";

const config = {
  appRoot: rootPath,
  app: {
    name: APP_NAME,
    port: Number(PORT).valueOf(),
    cors: {
      origin: CORS_ORIGIN
    },
    env: NODE_ENV
  },
  auth0: {
    AUTH0_DOMAIN,
    AUTH0_AUDIENCE
  },
  log: {
    name: `${APP_NAME}-${NODE_ENV}`,
    level: LOG_LEVEL as LogLevelString
  }
};

export default config;
