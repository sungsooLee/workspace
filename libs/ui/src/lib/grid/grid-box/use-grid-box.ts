import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, GridBoxState, useGridBoxConfig } from '../types';
import { UseFormReturn } from 'react-hook-form';

const useGridBoxHook = (config: useGridBoxConfig, getData?: UseFormReturn['getValues']) => {
  const queryClient = useQueryClient();

  const [gridConfig, setGridConfig] = useState<GridBoxConfig>(config as any);

  /**
   *
   * @param condition searchBox 조회 조건
   * @param paginationParams pageable (page, size, sort)
   */
  const handleExternalGridDataFetch = async (
    condition = {},
    paginationParams = { page: 0, size: 20, sort: [] }, // 검색버튼 눌러서 검색 하는 경우 초기화 하기 위해
  ) => {
    const params = { ...condition, ...paginationParams };
    const queryOptions = config.query(params);
    const result = (await queryClient.fetchQuery(queryOptions)) as any;

    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        data: result.content,
        hasData: !!result.content.length,
        totalRows: result?.totalPages || 0,
        totalElements: result?.totalElements || 0,
        // pagination 컴포넌트용 (테스트 후 위 내용 삭제..)
        pagination: {
          pageNumber: result.pageable?.pageNumber || 0,
          pageSize: result.pageable?.pageSize || 20,
          totalPages: result?.totalPages || 0,
          // totalElements: result?.totalElements || 0,
        },
        // sort
        onStateChange: handleGridStateChange,
      }));
    }
  };

  // grid state 변경 (useCallback으로 감싸서 안정화)
  const handleGridStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log('use-grid-box :: handleGridStateChange', newState);
      handleExternalGridDataFetch(getData?.(), newState);
    },
    [getData, handleExternalGridDataFetch],
  );

  // Grid 페이지네이션 변경 or Grid state 변경 (sort, column order, column visible)
  // 이 함수는 외부에서 paginationRequest를 명시적으로 전달받는 경우 사용
  const handleGridDataFetch = useCallback(
    (newState: GridBoxState) => {
      console.log('use-grid-box :: handleGridDataFetch', newState);
      handleExternalGridDataFetch(getData?.(), newState);
    },
    [getData, handleExternalGridDataFetch],
  );

  const handleGridDataChange = (data: any) => {
    setGridConfig((state: any) => ({ ...state, data }));
  };

  return {
    config: {
      ...gridConfig,
      getParams: getData,
      gridFetch: handleGridDataFetch,
      onDataChange: handleGridDataChange,
    },
    gridFetch: handleExternalGridDataFetch,
    data: gridConfig.data,
  };
};

export const useGridBox = useGridBoxHook;
