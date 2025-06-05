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
  const fetchGridData = async (
    condition = {},
    gridBoxState: GridBoxState = { page: 0, size: 20, sort: [] }, // 검색버튼 눌러서 검색 하는 경우 초기화 하기 위해
  ) => {
    const params = { ...condition, ...gridBoxState };
    const queryOptions = config.query(params);
    const result = (await queryClient.fetchQuery(queryOptions)) as any;

    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        gridData: result,
        onStateChange: handleGridStateChange,
      }));
    }
  };

  // grid-box 에서
  const handleGridStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log('use-grid-box :: handleGridStateChange', newState);
      fetchGridData(getData?.(), newState);
    },
    [getData, fetchGridData],
  );

  const handleGridDataChange = (data: any) => {
    setGridConfig((state: any) => ({ ...state, data }));
  };

  return {
    config: {
      ...gridConfig,
      getParams: getData,
      onDataChange: handleGridDataChange,
    },
    gridFetch: fetchGridData,
    data: gridConfig.data,
  };
};

export const useGridBox = useGridBoxHook;
