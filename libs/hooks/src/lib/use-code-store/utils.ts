import { CODE_GROUP_TYPE } from './constants';
import { httpService } from '@learnway/shared';
import { Code } from './types';
import { codeOptions } from './config';

/**
 * 기본 코드 조회 함수
 * @param group
 */
const defaultFetchCodeGroup = async <K extends CODE_GROUP_TYPE>(group: K): Promise<Code[K]> => {
  return await httpService.get(`/api/code/${group}`);
};

/**
 * 코드 조회 인터 페이스
 * api 등록여부에 따라 코드를 조회해서 반환한다.
 * @param group
 */
export const fetchCodeGroup = async <K extends CODE_GROUP_TYPE>(group: K): Promise<Code[K]> => {
  const { api = undefined, options = [] } = codeOptions[group];
  try {
    const response = api ? await api() : await defaultFetchCodeGroup(group);
    return [...options, ...(response as Code[K])];
  } catch (e: any) {
    console.error(e);
    return [...options];
  }
};
