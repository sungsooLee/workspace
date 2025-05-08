import { CODE_GROUP_TYPE } from './constants';
import { httpService } from '@learnway/shared';
import { Code, CodeApiType } from './types';
import { codeOptions } from './config';
import { PMSApiPrefix } from '@learnway/config';

/**
 * 기본 코드 조회 함수
 * @param group
 */
const defaultFetchCodeGroup = async <K extends CODE_GROUP_TYPE>(group: K): Promise<Code[K]> => {
  const response = await httpService.get<any>(`${PMSApiPrefix()}/enum/${group}`);
  console.log('response => ', response);
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
 */
export const fetchCodeGroup = async <K extends CODE_GROUP_TYPE>(group: K): Promise<Code[K]> => {
  const codeOption = codeOptions[group];
  const customApi = codeOption?.api;
  const customOptions = codeOption?.options || [];
  try {
    const response = customApi ? await customApi() : await defaultFetchCodeGroup(group);
    return [...customOptions, ...(response as Code[K])];
  } catch (e: any) {
    console.error(e);
    return [...customOptions];
  }
};
