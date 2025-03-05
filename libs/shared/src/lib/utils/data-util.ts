import { isArray } from 'lodash';

/**
 * value 에 배열이 넘어오면 그대로 반환하고, 배열이 아닌 경우 하나의 값을 배열로 감싸서 반환한다. 값이 없는 경우는 빈 배열을 반환
 * @param value value
 * @return Array<any> | any
 */
export const toArray = (value: any) => {
  return isArray(value) ? value : value ? [value] : [];
};
