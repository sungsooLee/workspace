import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 객체를 쿼리 스트링으로 변환하는 함수
 * 빈 값(undefined, null, 또는 빈 문자열)은 결과에 포함하지 않습니다.
 *
 * @param params - 변환할 객체
 * @returns URL 쿼리 스트링 (앞에 '?'는 포함되지 않음)
 */
function objectToQueryString(params: Record<string, any>): string {
  return (
    Object.entries(params)
      // 값이 있는 항목만 필터링 (배열인 경우 길이가 0보다 큰 경우만, 문자열인 경우 trim 후 빈 문자열이 아닌 경우만)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        if (typeof value === 'string') {
          return value.trim() !== '';
        }
        return value !== undefined && value !== null;
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // 배열인 경우 각 요소를 동일한 키로 반복
          return value
            .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
            .join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&')
  );
}

const useGridBoxHook = (config: any, getData?: any) => {
  const queryClient = useQueryClient();
  const [gridConfig, setGridConfig] = useState(config);
  const handleExternalGridDataFetch = async (params?: any, page?: any) => {
    const queryString = objectToQueryString({ ...params, ...page });
    const result = (await queryClient.fetchQuery(config.query(queryString))) as any;
    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        data: result.content,
        page: {
          ...state.page,
          pageSize: result.pageable.pageSize,
          pageIndex: result.pageable.number || 0,
          totalRows: result.totalElements,
        },
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
