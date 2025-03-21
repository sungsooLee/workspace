import { isArray } from 'lodash';

/**
 * value 에 배열이 넘어오면 그대로 반환하고, 배열이 아닌 경우 하나의 값을 배열로 감싸서 반환한다. 값이 없는 경우는 빈 배열을 반환
 * @param value value
 * @return Array<any> | any
 */
export const toArray = (value: any) => {
  return isArray(value) ? value : value ? [value] : [];
};

/**
 * 특정 키 값을 기준으로 객체를 리스트에 추가하거나 제거하는 함수
 *
 * @param list 기존 리스트
 * @param item 추가하거나 제거할 객체
 * @param key 비교할 객체의 키 (ex: "id")
 * @returns 변경된 리스트
 *
 * @example
 * const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
 * addOrRemoveItemByKey(users, { id: 2, name: "Bob" }, "id");
 * // 결과: [{ id: 1, name: "Alice" }]
 */
export const addOrRemoveItemByKey = <T, K extends keyof T>(list: T[], item: T, key?: K): T[] => {
  if (!list || !item || !key) {
    return list;
  }
  const appendedList = [...list, item];
  const removedList = list.filter((d) => d[key] !== item[key]);
  const isRemove = list.find((d) => d[key] === item[key]);
  return isRemove ? removedList : appendedList;
};

/**
 * 특정 키의 값을 기준으로 리스트에서 일치하는 항목을 필터링하는 함수
 *
 * @template T - 리스트 요소의 타입
 * @param {T[] | null | undefined} list - 검색할 배열 (null 또는 undefined일 경우 빈 배열 반환)
 * @param {T[K] | T[K][]} item - 찾고자 하는 값 또는 값들의 배열
 * @param {K} key - 비교할 객체의 키 (기본값: 'value')
 * @returns {T[]} - 일치하는 요소들로 구성된 배열
 *
 * @example
 * const data = [
 *   { id: 1, value: 'apple' },
 *   { id: 2, value: 'banana' },
 *   { id: 3, value: 'cherry' }
 * ];
 *
 * getMatchingItemsByKey(data, 'banana');
 * // 반환값: [{ id: 2, value: 'banana' }]
 *
 * getMatchingItemsByKey(data, ['apple', 'cherry']);
 * // 반환값: [{ id: 1, value: 'apple' }, { id: 3, value: 'cherry' }]
 *
 */
export const getMatchingItemsByKey = <T, K extends keyof T>(
  list: T[] | null | undefined,
  item: T[K] | T[K][],
  key: K,
): T[] => {
  if (!list || !item) return [];

  const values = Array.isArray(item) ? item : [item];
  return list?.filter((d: any) => values.includes(d[key]));
};
