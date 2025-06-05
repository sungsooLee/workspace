import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, useGridBoxConfig } from '../types';
import { UseFormReturn } from 'react-hook-form';

const useGridBoxHook = (config: useGridBoxConfig, getData?: any) => {
  const queryClient = useQueryClient();

  const [gridConfig, setGridConfig] = useState<GridBoxConfig>(config as any);

  const handleExternalGridDataFetch = async (params?: any, page?: any) => {
    const options = config.query({ ...params, ...page });
    const result = (await queryClient.fetchQuery(options)) as any;
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
            pageIndex: result.pageable.pageNumber || 0,
            pageNumber: result.pageable.pageNumber || 0,
            totalRows: result.totalPages,
          },
        }),
        totalRows: result?.totalPages || 0,
        totalElements: result?.totalElements || 0,
        // pagination 컴포넌트용 (테스트 후 위 내용 삭제..)
        pagination: {
          pageNumber: result.pageable?.pageNumber || 0,
          pageSize: result.pageable?.pageSize || 10,
          totalPages: result?.totalPages || 0,
          totalElements: result?.totalElements || 0,
          onPageChange: (newPage: number) => handleGridDataFetch({ page: newPage }),
        },
      }));
    }
  };
  const handleGridDataFetch = (page: any) => {
    handleExternalGridDataFetch(getData ? getData() : {}, page);
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
