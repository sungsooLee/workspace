/**
 * 웹 스토리지(localStorage 또는 sessionStorage)에 값을 안전하게 저장하고, 가져오고, 삭제하는
 * 헬퍼 함수를 생성합니다.
 * @param storage 사용할 웹 스토리지 객체 (e.g., window.localStorage, window.sessionStorage)
 *

  /////////////////////////////////////////////////////////////////////////
  // 1. 객체로 get, set 하는 방식
  /////////////////////////////////////////////////////////////////////////

  // 객체로 저장
  setLocalStorage('temp', { course: { courseId: 7 } });

  // 객체로 가져오기
  const tempData = getLocalStorage('temp'); // { course: { courseId: 7 } }
  const courseId = tempData?.course?.courseId; // 7

  // 객체 업데이트
  const existingTemp = getLocalStorage('temp') || {};
  const updatedTemp = { ...existingTemp, course: { ...existingTemp.course, title: 'React 강의' } };
  setLocalStorage('temp', updatedTemp);

  // 객체 삭제
  removeLocalStorage('temp');


  /////////////////////////////////////////////////////////////////////////
  // 2. 점(.) 포함된 string으로 get, set 하는 방식
  /////////////////////////////////////////////////////////////////////////

  // 중첩된 키로 저장
  setLocalStorage('temp.course.courseId', 7);
  setLocalStorage('temp.course.title', 'React 강의');
  setLocalStorage('temp.user.name', '홍길동');

  // 중첩된 키로 가져오기
  const courseId = getLocalStorage('temp.course.courseId'); // 7
  const courseTitle = getLocalStorage('temp.course.title'); // 'React 강의'
  const userName = getLocalStorage('temp.user.name'); // '홍길동'

  // 키 존재 확인
  const hasCourse = hasLocalStorage('temp.course.courseId'); // true

  // 삭제
  removeLocalStorage('temp.course.courseId');
*/

/**
 * 객체에 중첩된 경로(path)로 값을 설정합니다.
 * @param obj 원본 객체
 * @param path 'a.b.c' 형태의 경로 문자열
 * @param value 설정할 값
 * @returns 값이 설정된 새로운 객체(얕은 복사)
 */
function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * 객체에서 중첩된 경로(path)의 값을 가져옵니다.
 * @param obj 원본 객체
 * @param path 'a.b.c' 형태의 경로 문자열
 * @returns 해당 경로의 값, 없으면 undefined
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

/**
 * 객체에서 중첩된 경로(path)의 값을 삭제합니다.
 * @param obj 원본 객체
 * @param path 'a.b.c' 형태의 경로 문자열
 * @returns 값이 삭제된 새로운 객체(얕은 복사)
 */
function removeNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      return result; // 경로가 존재하지 않으므로 원본 객체 반환
    }
    current = current[key];
  }

  delete current[keys[keys.length - 1]];
  return result;
}

/**
 * Storage 객체(localStorage, sessionStorage 등)에 중첩 키 지원 set/get/remove/has 기능을 제공합니다.
 * @param storage Storage 객체
 * @returns set, get, remove, has 메서드를 가진 헬퍼 객체
 */
function createStorage(storage: Storage) {
  return {
    /**
     * 값을 저장합니다. (중첩 키 지원)
     * @param key 저장할 키 ('.' 포함 시 중첩 저장)
     * @param value 저장할 값
     * @returns 정상 저장 시 true, 실패 시 undefined
     */
    set<T>(key: string, value: T): true | undefined {
      try {
        // 점(.)이 포함된 키인지 확인
        if (key.includes('.')) {
          const rootKey = key.split('.')[0];
          const existingData = storage.getItem(rootKey);
          const existingObj = existingData ? JSON.parse(existingData) : {};
          const updatedObj = setNestedValue(existingObj, key, value);
          storage.setItem(rootKey, JSON.stringify(updatedObj));
        } else {
          const serialized = JSON.stringify(value);
          storage.setItem(key, serialized);
        }
        return true;
      } catch (error) {
        console.error(`Failed to set storage item with key "${key}":`, error);
        return undefined;
      }
    },

    /**
     * 값을 가져옵니다. (중첩 키 지원)
     * @param key 가져올 키 ('.' 포함 시 중첩 조회)
     * @returns 저장된 값 또는 undefined
     */
    get<T>(key: string): T | undefined {
      try {
        // 점(.)이 포함된 키인지 확인
        if (key.includes('.')) {
          const rootKey = key.split('.')[0];
          const item = storage.getItem(rootKey);
          if (item === null) return undefined;
          const obj = JSON.parse(item);
          return getNestedValue(obj, key) as T;
        } else {
          const item = storage.getItem(key);
          if (item === null) return undefined;
          return JSON.parse(item) as T;
        }
      } catch (error) {
        console.error(`Failed to get storage item with key "${key}":`, error);
        return undefined;
      }
    },

    /**
     * 값을 삭제합니다. (중첩 키 지원)
     * @param key 삭제할 키 ('.' 포함 시 중첩 삭제)
     * @returns 정상 삭제 시 true, 실패 시 undefined
     */
    remove(key: string): true | undefined {
      try {
        // 점(.)이 포함된 키인지 확인
        if (key.includes('.')) {
          const rootKey = key.split('.')[0];
          const item = storage.getItem(rootKey);
          if (item === null) return true; // 이미 존재하지 않음
          const obj = JSON.parse(item);
          const updatedObj = removeNestedValue(obj, key);
          storage.setItem(rootKey, JSON.stringify(updatedObj));
        } else {
          storage.removeItem(key);
        }
        return true;
      } catch (error) {
        console.error(`Failed to remove storage item with key "${key}":`, error);
        return undefined;
      }
    },

    /**
     * 키의 존재 여부를 확인합니다. (중첩 키 지원)
     * @param key 확인할 키 ('.' 포함 시 중첩 확인)
     * @returns 존재하면 true, 없으면 false
     */
    has(key: string): boolean {
      try {
        // 점(.)이 포함된 키인지 확인
        if (key.includes('.')) {
          const rootKey = key.split('.')[0];
          const item = storage.getItem(rootKey);
          if (item === null) return false;
          const obj = JSON.parse(item);
          return getNestedValue(obj, key) !== undefined;
        } else {
          return storage.getItem(key) !== null;
        }
      } catch (error) {
        console.error(`Failed to check storage item with key "${key}":`, error);
        return false;
      }
    },
  };
}

// -----------------------------------------------------------
// 기존 함수 이름 유지 및 export

const localStorageHelper = createStorage(localStorage);
const sessionStorageHelper = createStorage(sessionStorage);

/**
 * localStorage에 값을 저장합니다.
 * @param key 저장할 키
 * @param value 저장할 값 (객체, 배열, 문자열 등)
 * @returns 에러 발생 시 undefined 반환, 정상 저장 시 true 반환
 */
export function setLocalStorage<T = any>(key: string, value: T): true | undefined {
  return localStorageHelper.set(key, value);
}

/**
 * localStorage에서 값을 가져옵니다.
 * @param key 가져올 키
 * @returns 저장된 값 또는 undefined (에러 발생 시)
 */
export function getLocalStorage<T = any>(key: string): T | undefined {
  return localStorageHelper.get(key);
}

/**
 * localStorage에서 값을 삭제합니다.
 * @param key 삭제할 키
 * @returns 에러 발생 시 undefined 반환, 정상 삭제 시 true 반환
 */
export function removeLocalStorage(key: string): true | undefined {
  return localStorageHelper.remove(key);
}

/**
 * localStorage에 특정 키가 존재하는지 확인합니다.
 * @param key 확인할 키
 * @returns 키가 존재하면 true, 존재하지 않거나 에러 발생 시 false
 */
export function hasLocalStorage(key: string): boolean {
  return localStorageHelper.has(key);
}

// -----------------------------------------------------------

/**
 * sessionStorage에 값을 저장합니다.
 * @param key 저장할 키
 * @param value 저장할 값 (객체, 배열, 문자열 등)
 * @returns 에러 발생 시 undefined 반환, 정상 저장 시 true 반환
 */
export function setSessionStorage<T = any>(key: string, value: T): true | undefined {
  return sessionStorageHelper.set(key, value);
}

/**
 * sessionStorage에서 값을 가져옵니다.
 * @param key 가져올 키
 * @returns 저장된 값 또는 undefined (에러 발생 시)
 */
export function getSessionStorage<T = any>(key: string): T | undefined {
  return sessionStorageHelper.get(key);
}

/**
 * sessionStorage에서 값을 삭제합니다.
 * @param key 삭제할 키
 * @returns 에러 발생 시 undefined 반환, 정상 삭제 시 true 반환
 */
export function removeSessionStorage(key: string): true | undefined {
  return sessionStorageHelper.remove(key);
}

/**
 * sessionStorage에 특정 키가 존재하는지 확인합니다.
 * @param key 확인할 키
 * @returns 키가 존재하면 true, 존재하지 않거나 에러 발생 시 false
 */
export function hasSessionStorage(key: string): boolean {
  return sessionStorageHelper.has(key);
}
