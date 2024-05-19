import _ from 'lodash';

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
