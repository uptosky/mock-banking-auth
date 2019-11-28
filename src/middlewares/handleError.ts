import { Request, Response, NextFunction } from 'express';

import _ from 'lodash';
import ErrorModel from '../models/ErrorModel';
import logUtil from '../utils/logUtil';

const constants = require('../constants');

export default (
  err: ErrorModel,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const xCorrelationID = res.getHeader('x-correlation-id');

  const errorRet = {
    'x-correlation-id': xCorrelationID,
    statusCode:
      err.statusCode ||
      _.get(err, 'response.status') ||
      err.statusCode ||
      _.get(res, 'locals.statusCode') ||
      constants.HTTP_SERVER_ERROR,
    code: err.code || '',
    message: err.message || 'unknown'
  };

  global.logger.error(errorRet);

  if (err instanceof ErrorModel) {
    return res.status(errorRet.statusCode || 500).send(errorRet);
  } else {
    logUtil.getLogger().error(err);
    errorRet.message = ErrorModel.GeneralError.message;
    return res.status(errorRet.statusCode || 500).send(errorRet);
  }
};
