import { Request, Response, NextFunction } from 'express';

import jwt from 'express-jwt';
import jwksRSA from 'jwks-rsa';
import jwtDecode from 'jwt-decode';
import errors from '../utils/errors';
import constants from '../constants';

import jwtUtil from '../utils/jwt';
import config from '../config';

const auth0Domain = config.auth0.AUTH0_DOMAIN;
const auth0Audience = config.auth0.AUTH0_AUDIENCE;
const expectedScopes = ['openid'];
const jwtClient = jwksRSA.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${auth0Domain}/.well-known/jwks.json`
});

export default (req: Request, res: Response, next: NextFunction) => {
  res.locals = res.locals || {};

  const jwtRaw = jwtUtil.getJWTFromHeader(req);
  if (jwtRaw) {
    res.locals.jwt = jwtRaw;
  } else {
    next(errors.createSecurityError('Token was empty'));
    return;
  }

  const jwtObj: any = jwtDecode(jwtRaw);

  if (process.env.NODE_ENV === 'test') {
    if (jwtRaw === constants.TEST_JWT) {
      next();
      return;
    }
  }

  if (!jwtObj.scope) {
    next(errors.createSecurityError('Token did not contain scope property'));
    return;
  }

  // check expired
  if (jwtObj.exp && jwtObj.exp * 1000 < Date.now()) {
    next(errors.createSecurityError('Token is expired'));
  }

  const scopes = jwtObj.scope.split(' ');

  const allowed = expectedScopes.some(scope => scopes.indexOf(scope) !== -1);

  if (!allowed) {
    next(errors.createSecurityError('Token did not contain required scope(s)'));
    return;
  }

  jwt({
    secret: jwtClient,
    audience: auth0Audience,
    issuer: `https://${auth0Domain}/`,
    algorithms: ['RS256']
  })(req, res, next);
};
