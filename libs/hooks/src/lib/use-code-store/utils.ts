import { PMSApiPrefix } from '@learnway/config';
import { getMockCodeGroupOption, httpService } from '@learnway/shared';
import { codeOptions } from './config';
import { CODE_GROUP_TYPE } from './constants';
import { Code, CodeApiType } from './types';
import { useCodeStore } from './use-code-store';

/**
 * 기본 코드 조회 함수
 * @param group
 * @param filter
 */
const defaultFetchCodeGroup = async <K extends CODE_GROUP_TYPE>(
  group: K,
  filter: Record<string, any> = {},
): Promise<Code[K]> => {
  try {
    const response = await httpService.get<any>(`${PMSApiPrefix()}/enum/${group}`, filter);

    const groupData = response?.[0]?.[group];
    if (!Array.isArray(groupData)) {
      return [];
    }

    return groupData.map((item: CodeApiType) => {
      const isLangCountryCode = item.cdGroupId === 'pms.multilingual.LangCountryCode';
      const multilingualKey = item.multilingualKey
        ? `SYSTEM_COMMON_CODE.${item.multilingualKey}`
        : item.cdName;

      return {
        ...item,
        value: item.cdId,
        label: isLangCountryCode ? item.multilingualKey : multilingualKey,
        multilingualKey,
      };
    });
  } catch (error) {
    console.error('defaultFetchCodeGroup error:', error);
    return [];
  }
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
  codeValue: string | number | boolean,
  defaultValue = '',
): string => {
  if (!codeGroup || codeValue === null || codeValue === undefined || codeValue === '') {
    return defaultValue;
  }

  // mock code group 처리
  const mockGroups = ['test', 'mock.options.use', 'mock.options.possible'];
  if (mockGroups.includes(codeGroup)) {
    return getCodeLabelByMockCode(codeGroup, codeValue, defaultValue);
  }

  try {
    const { code } = useCodeStore.getState();
    const cachedData = code[codeGroup];

    if (!Array.isArray(cachedData) || cachedData.length === 0) {
      return defaultValue;
    }

    const foundItem = cachedData.find((item: any) => item.cdId === codeValue);

    return foundItem?.cdName ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * mock code group 에서 코드 라벨을 반환하는 함수
 * @param codeGroup
 * @param codeValue
 * @param defaultValue
 * @returns
 */
export const getCodeLabelByMockCode = (
  codeGroup: CODE_GROUP_TYPE,
  codeValue: string | number | boolean,
  defaultValue = '',
): string => {
  const data = getMockCodeGroupOption(codeGroup);
  const foundItem = data.find((item: any) => item.value === codeValue);
  return (foundItem as any)?.label || defaultValue;
};
