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

  const updateFormData = useCallback(async () => {
    if (!groupName) return;

    try {
      const response = await getCode(groupName);
      setData(response as T[]);
    } catch (err) {
      setData(mockData || []);
    }
  }, [getCode, groupName]);

  useEffect(() => {
    updateFormData();
  }, [updateFormData, ...deps]);

  return {
    data,
    refetch: updateFormData,
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

/**
 * @description 코드 스토어 탭간 공유
 */
export const useCodeStoreShare = () => {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'code-store' && event.newValue) {
        try {
          const { state: newState } = JSON.parse(event.newValue);
          useCodeStore.setState((currentState) => {
            // 현재 스토어의 함수들을 보존하고,
            // persist된 새 상태의 데이터(newPersistedState)로 'code' 부분을 업데이트합니다.
            return {
              ...currentState, // 현재 스토어의 모든 상태와 함수를 복사
              code: newState.code, // 새로운 'code' 데이터로 덮어쓰기
            };
          });
        } catch (e) {
          console.error('@@@ Error parsing shared state from storage event:', e);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};
