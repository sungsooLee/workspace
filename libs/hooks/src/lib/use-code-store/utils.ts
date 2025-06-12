import { CODE_GROUP_TYPE } from './constants';
import { httpService } from '@learnway/shared';
import { Code, CodeApiType } from './types';
import { codeOptions } from './config';
import { PMSApiPrefix } from '@learnway/config';

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
      label: `SYSTEM_COMMON_CODE.${item.multilingualKey || item.cdName}`,
      multilingualKey: `SYSTEM_COMMON_CODE.${item.multilingualKey || item.cdName}`,
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
  const codeOption = codeOptions[group];
  let api;
  if (codeOption) {
    const codeOptionApiType = typeof codeOption.api;
    api = codeOption ? codeOption.api : defaultFetchCodeGroup;
    if (codeOptionApiType === 'string') {
      api = defaultFetchCodeGroup;
    }
  } else {
    console.log('group => ', group);
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
