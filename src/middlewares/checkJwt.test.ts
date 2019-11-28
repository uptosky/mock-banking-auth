import httpMocks from 'node-mocks-http';
import checkJWT from './checkJwt';
import constants from '../constants';

const testJwt = constants.TEST_JWT;

describe('>>> Test check-jwt middleware', () => {
  it('should confirm JWT check fails without JWT token', done => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    checkJWT(req, res, err => {
      expect(err).not.toBeNull();
      expect(typeof err).toEqual('object');
      expect(err.statusCode).toEqual(constants.HTTP_UNAUTHORIZED);
      done();
    });
  });

  it('should not confirm JWT check with invalid token', done => {
    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer invalid_token` }
    });
    const res = httpMocks.createResponse();

    checkJWT(req, res, err => {
      expect(err).not.toBeNull();
      expect(typeof err).toEqual('object');
      expect(err.statusCode).toEqual(constants.HTTP_UNAUTHORIZED);
      done();
    });
  });
});
