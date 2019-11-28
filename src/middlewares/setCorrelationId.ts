import { Request, Response, NextFunction } from 'express';
import errors from '../utils/errors';
import uuidV4 from 'uuid/v4';

const uuidValidator = (uuid: string) => {
  const uuidVersion = [
    // UUID v1:
    /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    // UUID v2:
    /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    // UUID v3:
    /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    // UUID v4:
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    // UUID v5:
    /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  ].findIndex(x => x.test(uuid));

  if (uuidVersion === -1) {
    return false;
  }

  return true;
};

export default (req: Request, res: Response, next: NextFunction) => {
  res.locals = res.locals || {};

  let xCorrelationID = req.header('x-correlation-id');
  if (!xCorrelationID) {
    xCorrelationID = uuidV4();
  } else {
    if (!uuidValidator(xCorrelationID)) {
      next(errors.createBadRequestError('Invalid x-correlation-id.'));
      return;
    }
  }

  res.set('x-correlation-id', xCorrelationID);
  next();
};
