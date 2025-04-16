import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useGridBoxHook = (config: any, getData?: any) => {
  const queryClient = useQueryClient();
  const [gridConfig, setGridConfig] = useState(config);

  const handleExternalGridDataFetch = async (params?: any, page?: any) => {
    const result = (await queryClient.fetchQuery(config.query({ ...params, page }))) as any;
    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        data: result.content,
        ...(result.pageable && {
          // 조건부로 page가 존재할 때만 추가
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
  return {
    config: {
      ...gridConfig,
      getParams: getData,
      gridFetch: handleGridDataFetch,
    },
    gridFetch: handleExternalGridDataFetch,
  };
};

export const useGridBox = useGridBoxHook;
