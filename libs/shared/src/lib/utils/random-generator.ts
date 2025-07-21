import { v4 as uuidv4 } from 'uuid';

/**
 * 랜덤한 UUID(v4) 문자열을 반환합니다.
 * @returns {string} 랜덤 UUID
 */
export function getRandomId() {
  return uuidv4();
}

/**
 * min(포함) ~ max(포함) 사이의 임의의 정수를 반환합니다.
 * @param {number} min - 최소값(포함)
 * @param {number} max - 최대값(포함)
 * @returns {number} min 이상 max 이하의 랜덤 정수
 */
export function getRandomNumber(min = 1, max = 999999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
