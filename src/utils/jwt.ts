import { Request, Response, NextFunction } from 'express';
import jwt_decode from 'jwt-decode';

const getJWTFromHeader = (req: Request) => {
  const authHeader = req.header('Authorization');

  const bearerExp = /(?:Bearer\s)([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)/i;
  let jwt: string = undefined;

  if (authHeader) {
    const extracted = authHeader.match(bearerExp);
    if (authHeader.match(bearerExp)) {
      jwt = extracted[0].split(' ')[1];
    }
  }

  return jwt;
};

const getAuth0UserID = (req: Request) => {
  const jwt = req.header('Authorization');
  const { sub } = jwt_decode(jwt);
  return sub;
};

export default {
  getJWTFromHeader,
  getAuth0UserID
};
