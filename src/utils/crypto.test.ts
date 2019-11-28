import { hash_sha256, hash_md5 } from './crypto';

describe('>>> crypto utils', () => {
  it('hash_md5 function test', () => {
    const email = 'test@test.com';
    let password = '123456';
    expect(hash_md5(`${email}_$a!t_${password}`)).toBe(
      'db18bded9a02074cc8ff9d1abf10d5c9'
    );

    password = '1234567';
    expect(hash_md5(`${email}_$a!t_${password}`)).not.toBe(
      'db18bded9a02074cc8ff9d1abf10d5c9'
    );
  });

  it('hash_sha256 function test', () => {
    const email = 'test@test.com';
    let password = '123456';
    expect(hash_sha256(`${email}_$a!t_${password}`)).toBe(
      '85359c13cef0019acb40505ec192d430c49ee9c3e4ea6e7281731455ac643e53'
    );

    password = '1234567';
    expect(hash_sha256(`${email}_$a!t_${password}`)).not.toBe(
      '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
    );
  });
});
