import { useCallback, useEffect, useState } from 'react';
import { useCodeStore } from '../use-code-store/use-code-store';

export interface UseCodeGroupOptions {
  /** 의존성 배열 - 이 값들이 변경되면 다시 fetch */
  deps?: any[];
}

/**
 * 범용 코드 그룹 훅
 * @param groupName 코드 그룹 이름
 * @param options 옵션
 */
export const useCodeGroup = <T = any>(
  groupName: string,
  options: UseCodeGroupOptions = {},
  mockData?: any,
) => {
  const { deps = [] } = options;
  const { getCode } = useCodeStore();
  const [data, setData] = useState<T[]>([]);

  const fetchData = useCallback(async () => {
    if (!groupName) return;

    try {
      const result = await getCode(groupName);
      setData(result as T[]);
    } catch (err) {
      setData(mockData || []);
    }
  }, [getCode, groupName]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  return {
    data,
    refetch: fetchData,
  };
};

/**
/**
 * 이 훅은 코드 그룹 데이터에서 특정 코드 ID에 해당하는 항목을 찾을 때 사용합니다.
 * 예를 들어, 코드 그룹에서 특정 코드의 상세 정보가 필요할 때 활용할 수 있습니다.
 * @param groupName 코드 그룹 이름
 * @param codeId 찾을 코드 ID
 * @param options 옵션
 */
export const useCodeGroupItem = <T = any>(
  groupName: string,
  codeId: string,
  options: UseCodeGroupOptions = {},
) => {
  const { data, refetch } = useCodeGroup<T>(groupName, options);

  const item = data.find((code: any) => code.cdId === codeId || code.id === codeId);

  return {
    item,
    data,
    refetch,
  };
};
