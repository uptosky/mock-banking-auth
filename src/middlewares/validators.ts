import moment from 'moment';
import _ from 'lodash';

export const dateFormatValidator = (dateString: string, format: string) => {
  return moment(dateString).format(format) === dateString;
};
