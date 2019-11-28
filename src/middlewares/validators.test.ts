import { dateFormatValidator } from './validators';

describe('>>> Test validators middleware', () => {
  it('Test dateFormatValidator', () => {
    expect(dateFormatValidator('2019-08-13', 'YYYY-MM-DD')).toBeTruthy();
    expect(dateFormatValidator('2019-08-03', 'YYYY-MM-DD')).toBeTruthy();
    expect(
      dateFormatValidator('2019-08-03 01:01:01', 'YYYY-MM-DD HH:mm:ss')
    ).toBeTruthy();

    expect(dateFormatValidator('2019-08-03', 'YYYY-M-D')).toBeFalsy();
  });
});
