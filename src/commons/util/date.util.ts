import * as dayjs from 'dayjs';

export const getToDayISO8601 = () => {
  return dayjs().toISOString();
};

export const getToDay = () => {
  return dayjs().toDate();
};

export const convertDayFormat = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm').toString();
};
