import * as dayjs from 'dayjs';

export const getToDayISO8601 = () => {
  return dayjs().toISOString();
};
