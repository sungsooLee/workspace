import { CODE_GROUP_TYPE } from './constants';
import { httpService } from '@learnway/shared';
import { Code, CodeApiType } from './types';
import { codeOptions } from './config';
import { PMSApiPrefix } from '@learnway/config';
import { useCodeStore } from './use-code-store';

/**
 * 기본 코드 조회 함수
 * @param group
 * @param filter
 */
const defaultFetchCodeGroup = async <K extends CODE_GROUP_TYPE>(
  group: K,
  filter = {},
): Promise<Code[K]> => {
  const response = await httpService.get<any>(`${PMSApiPrefix()}/enum/${group}`, filter);
  if (response && response[0] && response[0][group]) {
    return response[0][group].map((item: CodeApiType) => ({
      ...item,
      value: item.cdId,
      label:
        item.cdGroupId === 'pms.multilingual.LangCountryCode'
          ? item.multilingualKey
          : `SYSTEM_COMMON_CODE.${item.multilingualKey || item.cdName}`,
      multilingualKey: item.multilingualKey
        ? `SYSTEM_COMMON_CODE.${item.multilingualKey}`
        : item.cdName,
    }));
  }
  return [];
};

/**
 * 코드 조회 인터 페이스
 * api 등록여부에 따라 코드를 조회해서 반환한다.
 * @param group
 * @param filter
 */
export const fetchCodeGroup = async <K extends CODE_GROUP_TYPE>(
  group: K,
  filter?: Record<string, any>,
): Promise<Code[K]> => {
  // TODO: 테스트 용
  if (import.meta.env.VITE_DISABLE_AUTH === 'true') {
    return [];
  }
  const codeOption = codeOptions[group];
  let api;
  if (codeOption) {
    const codeOptionApiType = typeof codeOption.api;
    api = codeOption ? codeOption.api : defaultFetchCodeGroup;
    if (codeOptionApiType === 'string') {
      api = defaultFetchCodeGroup;
    }
  } else {
    api = defaultFetchCodeGroup;
  }

  const customOptions = codeOption?.options || [];
  try {
    if (api && typeof api === 'function') {
      const response = api ? await api(group, filter) : [];
      return [...customOptions, ...(response as Code[K])];
    }
    return customOptions;
  } catch (e: any) {
    console.error(e);
    return [...customOptions];
  }
};

/**
 * 캐시된 데이터만 확인하는 동기식 코드 라벨 반환 함수 (API 호출 없음)
 * @param codeGroup 코드 그룹 이름
 * @param codeValue 찾을 코드값
 * @param defaultValue 코드를 찾을 수 없을 때 반환할 기본값
 * @returns 코드 라벨 또는 기본값
 */
export const getCodeLabel = (
  codeGroup: CODE_GROUP_TYPE,
  codeValue: string,
  defaultValue = '',
): string => {
  if (!codeValue || !codeGroup) return defaultValue;

  try {
    const store = useCodeStore.getState();
    const cachedData = store.code[codeGroup];

    if (!cachedData?.length) return defaultValue;

    const foundItem = cachedData.find((item: any) => item.cdId === codeValue);

    return foundItem?.['cdName'] || defaultValue;
  } catch (error) {
    console.error('getCodeLabelSync error:', error);
    return defaultValue;
  }
};
