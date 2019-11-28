export const hash_md5 = (value: string) => {
  const crypto = require('crypto');
  return crypto
    .createHash('md5')
    .update(value)
    .digest('hex');
};

export const hash_sha256 = (value: string) => {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('hex');
};

export default {
  hash_md5,
  hash_sha256
};
