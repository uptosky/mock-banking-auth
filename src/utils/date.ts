import moment from 'moment-timezone';
import config from '../config';

const toUtcServerFormat = (date?: Date | string) => {
  if (date === undefined) {
    date = moment()
      .utc()
      .toDate();
  }
  return moment.utc(date).format('YYYY-MM-DD HH:mm:ss');
};

const getCurrentTime = (): Date => {
  return moment().toDate();
};

export default {
  toUtcServerFormat,
  getCurrentTime
};
