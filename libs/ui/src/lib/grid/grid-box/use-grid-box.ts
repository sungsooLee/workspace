import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, GridBoxState, useGridBoxConfig, UseGridBoxReturn } from '../types';

/**
 * 커스텀 훅: 서버 기반 GridBox의 데이터와 상태를 관리
 * - react-query를 사용하여 서버에서 데이터를 가져오고 상태에 반영
 * - Grid 컴포넌트와 결합하여 서버 기반 페이징, 정렬 등을 처리
 */
export const useGridBox = (
  initialConfig: useGridBoxConfig,
  getParams?: () => void,
): UseGridBoxReturn => {
  const queryClient = useQueryClient();

  // Grid에 표시할 데이터를 저장
  const [gridData, setGridData] = useState<any>([]);

  /**
   * 서버로부터 데이터를 가져오는 함수
   * @param condition - 검색 조건 (예: form 입력값)
   * @param state - 페이징/정렬 정보 (page, size, sort)
   */
  const fetchGridData = useCallback(
    async (
      condition: Record<string, any> = {},
      state: GridBoxState = { page: 0, size: 20, sort: [] },
    ) => {
      const mergedParams = { ...condition, ...state };
      const queryOptions = initialConfig.query(mergedParams);

      const result = await queryClient.fetchQuery(queryOptions);
      if (result) {
        setGridData(result);
      }
    },
    [initialConfig, queryClient],
  );

  /**
   * Grid 내부에서 페이지 변경, 정렬 변경 등이 발생할 때 호출됨
   * @param newState - 변경된 GridBoxState
   */
  const handleGridStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log('use-grid-box :: handleGridStateChange', newState);
      const condition = getParams?.() ?? {};
      fetchGridData(condition, newState);
    },
    [fetchGridData, getParams],
  );

  /**
   * GridBoxConfig을 memoize 하여 Grid 컴포넌트에 전달
   * - gridData: 현재 표시할 데이터
   * - onStateChange: 상태 변경 핸들러
   * - getParams: 검색 조건 getter
   * - onDataChange: 외부에서 데이터 수동 업데이트 용도
   */
  const config = useMemo<GridBoxConfig>(
    () => ({
      ...initialConfig,
      gridData,
      onStateChange: handleGridStateChange,
      getParams: getParams,
      onDataChange: setGridData,
    }),
    [initialConfig, gridData, handleGridStateChange, getParams],
  );

  return {
    config,
    gridFetch: fetchGridData,
    data: gridData,
  };
};
