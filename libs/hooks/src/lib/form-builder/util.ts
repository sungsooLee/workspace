import { filter, isArray, isNil, mapValues, omitBy } from 'lodash';
import { DynamicFormConfig, FormConfig, GroupConfig, SearchBoxConfig } from './type';

/**
 * 기본값 추출 함수
 *
 * @param config - SearchConfig 객체
 * @returns name과 value를 기반으로 한 기본값 객체 반환
 */
export const extractSearchBoxDefaultValues = (config: SearchBoxConfig): Record<string, any> => {
  const defaultValues: Record<string, any> = {};

  /**
   * 재귀적으로 필드에서 name과 value 추출
   *
   * @param builders - FormConfig 또는 GroupConfig 배열
   */
  const extractValues = (builders: (FormConfig | GroupConfig)[]) => {
    builders.forEach((builder) => {
      if (builder.type === 'group') {
        // group 타입일 경우 하위 builder에서 재귀 처리
        if (builder.builders) {
          extractValues(builder.builders);
        }
      } else {
        // name이 존재할 경우 값 추출
        if (builder.name) {
          defaultValues[builder.name] = builder.value;
        }
      }
    });
  };

  config.builders.forEach((builderGroup) => extractValues(builderGroup));

  return defaultValues;
};

export const extractDynamicFormDefaultValues = (builders: FormConfig[]) => {
  const defaultValues: Record<string, any> = {};
  builders.forEach((builder) => {
    if (builder.name) {
      defaultValues[builder.name] = builder.value;
    }
  });
  return defaultValues;
};

/**
 * * value가 null(undefined, null, '') 인 경우 null을 리턴
 * * value가 array인 경우 null(undefined, null, '')인 값을 제거하고 리턴
 * * value가 object인 경우 각 value가 null(undefined, null, '')인 값을 제거하고 리턴
 * * 그외의 value는 그대로 리턴
 *
 * > compactValue({ a: '', b: undefined, c: null, d: 0, e: 'a', f: [0, null, '', 'a'] })
 * > => { d: 0, e: 'a', f: [0, 'a'] }
 *
 * @param {any} value 변환할 데이터 값
 * @param {boolean} keepEmptyString empty string('')은 삭제하지 않고 유지할지 여부
 * @returns {any}
 */
export const compactValues = (value: any, keepEmptyString = false): any => {
  const isNull = (value: any) => isNil(value) || (!keepEmptyString && value === '');

  if (isNull(value)) return null;

  if (typeof value === 'object') {
    if (isArray(value)) return filter(value, (v) => !isNull(v));
    return omitBy(
      mapValues(value, (v) => compactValues(v, keepEmptyString)),
      isNull,
    );
  }

  return value;
};
