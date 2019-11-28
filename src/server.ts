import app from "./app";
import config from "./config";

const server = app();
server.listen(config.app.port, () => {
  global.logger.info(`server is listening on port ${config.app.port}`);
});
