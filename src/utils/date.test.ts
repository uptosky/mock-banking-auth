import httpMocks from 'node-mocks-http';
import dateUtil from './date';
import moment = require('moment');

describe('>>> Test date utils', () => {
  it('should confirm getJWTFromHeader function returns false when no Authorization header', () => {
    let result = dateUtil.toUtcServerFormat('2019-08-01');
    expect(result).toBe('2019-08-01 00:00:00');

    result = dateUtil.toUtcServerFormat('2019-08-01T12:30:00+07:00');
    expect(result).toBe('2019-08-01 05:30:00');

    result = dateUtil.toUtcServerFormat('2019-08-01T12:30:00Z');
    expect(result).toBe('2019-08-01 12:30:00');

    result = dateUtil.toUtcServerFormat('2019-08-01T12:30:01');
    expect(result).toBe('2019-08-01 12:30:01');

    result = dateUtil.toUtcServerFormat('2019-08-01 12:30:38');
    expect(result).toBe('2019-08-01 12:30:38');

    result = dateUtil.toUtcServerFormat();
    expect(result).toBe(
      moment()
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')
    );
  });
});
