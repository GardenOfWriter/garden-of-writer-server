// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');
/**
 * 데이터가 비어있는지 확인합니다.
 * 배열, 객체, 문자열, 숫자, null, undefined 등을 확인합니다.
 *
 * @param {*} data
 * @returns {*}
 */
export const isEmpty = (data: any): boolean => {
  return _.isEmpty(data);
};

// /**
//  * 배열의 길이를 반환합니다.
//  *
//  * @param {*} data
//  * @returns {*}
//  */
export const getSize = (data: any) => {
  return _.size(data);
};

export const sortBy = (data: any, key: string) => {
  return _.sortBy(data, key);
};
