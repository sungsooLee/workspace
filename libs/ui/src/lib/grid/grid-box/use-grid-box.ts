import { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, GridBoxState, useGridBoxConfig } from '../types';
import { UseFormReturn } from 'react-hook-form';
import { gridStateToSortQueryParams } from '@learnway/shared';

const useGridBoxHook = (config: useGridBoxConfig, getData?: UseFormReturn['getValues']) => {
  const queryClient = useQueryClient();

  const [gridConfig, setGridConfig] = useState<GridBoxConfig>(config as any);

  // 마지막으로 페치에 사용된 params를 저장하는 useRef
  const lastFetchedParamsRef = useRef<any>({ page: 0, size: 20, sort: [] }); // 초기값 설정

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

    // params를 업데이트하기 전에 ref에 저장
    lastFetchedParamsRef.current = params;

    if (result) {
      setGridConfig((state: any) => ({
        ...state,
        data: result.content,
        hasData: !!result.content.length,
        // 조건부로 pageable 존재할 때만 추가
        // ...(result.pageable && {
        //   page: {
        //     ...state.page,
        //     pageSize: result.pageable.pageSize,
        //     pageIndex: result.pageable.pageNumber || 0,
        //     pageNumber: result.pageable.pageNumber || 0,
        //     totalRows: result.totalPages,
        //   },
        // }),
        totalRows: result?.totalPages || 0,
        totalElements: result?.totalElements || 0,
        // pagination 컴포넌트용 (테스트 후 위 내용 삭제..)
        pagination: {
          pageNumber: result.pageable?.pageNumber || 0,
          pageSize: result.pageable?.pageSize || 10,
          totalPages: result?.totalPages || 0,
          // totalElements: result?.totalElements || 0,
          // onPageChange: (newPage: number) => handleGridPaginationChange({ page: newPage }),
        },
        // sort
        onStateChange: handleGridStateChange,
      }));
    }
  };

  // grid 페이지네이션 변경 (useCallback으로 감싸서 안정화)
  const handleGridPaginationChange = useCallback(
    (page: any) => {
      // 마지막 조회 조건을 기반으로 새로운 페이지 정보를 병합
      const currentParams = lastFetchedParamsRef.current;
      const params = {
        ...getData?.(), // 폼 데이터
        ...currentParams, // 이전 페이지, 사이즈, 정렬 정보 등
        ...page, // 새로 받은 페이지 정보 (page, size)
      };
      handleExternalGridDataFetch(params);
    },
    [getData, handleExternalGridDataFetch], // handleExternalGridDataFetch가 useCallback으로 감싸져야 함.
  );

  // grid state 변경 (useCallback으로 감싸서 안정화)
  const handleGridStateChange = useCallback(
    (newState: GridBoxState) => {
      console.log('use-grid-box :: ', newState);
      const sort = gridStateToSortQueryParams(newState);
      const currentParams = lastFetchedParamsRef.current; // ref에서 최신 params 가져오기
      const params = {
        ...getData?.(),
        ...currentParams,
        sort, // 새로 받은 정렬 정보
      };
      handleExternalGridDataFetch(params);
    },
    [getData, handleExternalGridDataFetch],
  );

  // Grid 페이지네이션 변경 or Grid state 변경 (sort, column order, column visible)
  // 이 함수는 외부에서 paginationRequest를 명시적으로 전달받는 경우 사용
  const handleGridDataFetch = useCallback(
    (paginationRequest: GridBoxState) => {
      // 마지막 조회 조건에 내용을 설정하고 새로 받은 조건이 있으면 설정
      const currentParams = lastFetchedParamsRef.current; // ref에서 최신 params 가져오기
      const newPaginationParams = {
        page: currentParams?.page, // 이전 페이지 값
        size: currentParams?.size, // 이전 사이즈 값
        sort: currentParams?.sort, // 이전 정렬 값
        ...paginationRequest, // 새로 받은 페이지네이션 요청 (덮어쓰기)
      };
      handleExternalGridDataFetch(getData?.(), newPaginationParams);
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
