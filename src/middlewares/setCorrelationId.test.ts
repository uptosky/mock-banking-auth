import httpMocks from 'node-mocks-http';
import setCorrelationId from './setCorrelationId';

describe('>>> Test Correlation ID headers middleware', () => {
  it('should confirm x-correlation-id added to response header', done => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    setCorrelationId(req as any, res, err => {
      expect(err).toBeUndefined();
      const id = res.header('x-correlation-id');
      expect(!!id).toBeTruthy();
      done();
    });
  });

  it('should confirm existing x-correlation-id request header returned in response', done => {
    const req = httpMocks.createRequest({
      headers: { 'x-correlation-id': '251b7a80-cf89-433b-8a8d-7bd9d36ad5cc' }
    });
    const res = httpMocks.createResponse();

    setCorrelationId(req as any, res, err => {
      expect(err).toBeUndefined();
      const id = res.header('x-correlation-id');
      expect(id).not.toBeNull();
      expect(!!id).toBeTruthy();
      done();
    });
  });
});
