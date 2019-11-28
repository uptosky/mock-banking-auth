import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import * as http from 'http';

import routes from './routes';
import handleError from './middlewares/handleError';
import errors from './utils/errors';

import { getLogger } from './utils/logUtil';

export default function startServer() {
  const app = express();
  global.logger = getLogger();

  app.use(morgan('combined'));
  app.use(
    cors({
      exposedHeaders: ['Content-disposition']
    })
  );
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  routes(app);

  app.use(handleError);

  app.all('*', (req, res, next) => {
    handleError(
      errors.createResourceNotFoundError(
        `Bad endpoint/method requested. Path: ${req.path}`
      ),
      req,
      res,
      next
    );
  });

  app.set('trust proxy', true);
  const server = new http.Server(app);

  process.on('uncaughtException', (err: Error) => {
    global.logger.fatal('uncaughtException error', err);
  });

  return server;
}
