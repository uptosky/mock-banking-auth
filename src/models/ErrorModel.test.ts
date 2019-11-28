import ErrorModel from './ErrorModel';

describe('>>> Test ErrorModel object', () => {
  it('should confirm success of ErrorModel constructor', () => {
    const model = new ErrorModel({
      statusCode: 500,
      code: 'ERROR_CODE',
      message: 'error message'
    });
    expect(model.code).toBe('ERROR_CODE');
    expect(model.statusCode).toBe(500);
    expect(model.message).toBe('error message');
  });
});
