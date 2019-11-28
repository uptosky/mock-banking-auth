import constants from '../constants';

import Error from '../models/ErrorModel';
import ErrorModel from '../models/ErrorModel';
import { Request, NextFunction } from 'express';

const createGenericError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_SERVER_ERROR,
    code: constants.ERROR_GENERIC,
    message
  });
};

const createResourceNotFoundError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_NOT_FOUND,
    code: constants.ERROR_RESOURCE_NOT_FOUND,
    message
  });
};

const createBadRequestError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_BAD_REQUEST,
    code: constants.ERROR_INVALID_REQUEST,
    message
  });
};

const createSecurityError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_UNAUTHORIZED,
    code: constants.ERROR_INVALID_TOKEN,
    message
  });
};

const createNotAcceptableError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_NOT_ACCEPTABLE,
    code: constants.ERROR_INVALID_ACCEPT,
    message
  });
};

const createForbiddenError = (message: string) => {
  return new Error({
    statusCode: constants.HTTP_FORBIDDEN,
    code: constants.ERROR_FORBIDDEN,
    message
  });
};

const nextError = (next: NextFunction, err: any) => {
  if (err instanceof ErrorModel) {
    next(err);
  } else {
    global.logger.error(err);
    next(ErrorModel.GeneralError);
  }
};

export default {
  createGenericError,
  createResourceNotFoundError,
  createBadRequestError,
  createSecurityError,
  createNotAcceptableError,
  createForbiddenError,
  nextError
};
