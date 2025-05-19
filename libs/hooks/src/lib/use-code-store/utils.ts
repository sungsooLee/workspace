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
      value: item.cdId,
      label: item.multilingualKey || item.cdName,
      ...item,
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
  const codeOption = codeOptions[group] || [];
  const api = codeOption?.api || defaultFetchCodeGroup;
  const customOptions = codeOption?.options || [];
  try {
    if (api) {
      const response = await api(group, filter);
      return [...customOptions, ...(response as Code[K])];
    }
    return customOptions;
  } catch (e: any) {
    console.error(e);
    return [...customOptions];
  }
};
