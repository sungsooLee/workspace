import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, useGridBoxConfig } from './types';

const useGridBoxHook = (config: useGridBoxConfig, getData?: any) => {
  const queryClient = useQueryClient();
  const [gridConfig, setGridConfig] = useState<GridBoxConfig>(config);

  const handleExternalGridDataFetch = async (params?: any, page?: any) => {
    const result = (await queryClient.fetchQuery(config.query({ ...params, ...page }))) as any;
    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        data: result.content,
        hasData: !!result.content.length,
        // 조건부로 pageable 존재할 때만 추가
        ...(result.pageable && {
          page: {
            ...state.page,
            pageSize: result.pageable.pageSize,
            pageIndex: result.pageable.number || 0,
            totalRows: result.totalPages,
          },
        }),
        totalRows: result?.totalPages ? result.totalPages : result.content.length,
      }));
    }
  };
  const handleGridDataFetch = (page: any) => {
    handleExternalGridDataFetch(getData(), page);
  };

  const onDataChange = (data: any) => {
    setGridConfig((state: any) => ({ ...state, data }));
  };
  return {
    config: {
      ...gridConfig,
      getParams: getData,
      gridFetch: handleGridDataFetch,
      onDataChange,
    },
    gridFetch: handleExternalGridDataFetch,
    data: gridConfig.data,
  };
};

export const useGridBox = useGridBoxHook;
