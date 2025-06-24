import { useCallback, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GridBoxConfig, GridBoxState, useGridBoxConfig, UseGridBoxReturn } from '../types';
import { PaginationResponse } from '../../type';
import { DEFAULT_GRID_BOX_STATE } from './grid-box';

/**
 * 커스텀 훅: 서버 기반 GridBox의 데이터와 상태를 관리
 * - react-query를 사용하여 서버에서 데이터를 가져오고 상태에 반영
 * - Grid 컴포넌트와 결합하여 서버 기반 페이징, 정렬 등을 처리
 */
export const useGridBox = <T = any>(
  initialConfig: useGridBoxConfig,
  getParams?: () => void,
): UseGridBoxReturn => {
  const queryClient = useQueryClient();

  // Grid에 표시할 데이터를 저장
  const [gridData, setGridData] = useState<PaginationResponse<T>>();

  // 마지막 state 저장
  const lastStateRef = useRef<GridBoxState>();

  /**
   * 서버로부터 데이터를 가져오는 함수
   * @param params - 검색 조건 (예: form 입력값)
   * @param state - 페이징/정렬 정보 (page, size, sort)
   */
  const fetchGridData = useCallback(
    async (params: Record<string, any> = {}, state?: GridBoxState) => {
      const queryState = getQueryState(state, lastStateRef.current, initialConfig.gridState);
      const mergedParams = { ...params, ...queryState };
      const queryOptions = initialConfig.query(mergedParams);
      const result = convertPaginationResponse(
        await queryClient.fetchQuery(queryOptions),
      ) as PaginationResponse<T>;
      if (result) {
        setGridData(result);
        lastStateRef.current = queryState;
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
      const params = getParams?.() ?? {};
      fetchGridData(params, newState);
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
      getParams: getParams,
      onStateChange: handleGridStateChange,
      onDataChange: (newData: T[]) => {
        if (gridData) {
          setGridData({ ...gridData, content: newData });
        }
      },
    }),
    [initialConfig, gridData, handleGridStateChange, getParams],
  );

  return {
    config,
    gridFetch: fetchGridData,
    data: gridData,
  };
};

/**
 * PaginationResponse 타입이 아닌 response 데이터를 PaginationResponse 타입으로 변환
 * @param response
 */
const convertPaginationResponse = <T>(response: any): PaginationResponse<T> => {
  if (response?.pageable) {
    return response as PaginationResponse<T>;
  }
  const content = response?.content ?? response?.data ?? response ?? [];
  return {
    content,
    totalElements: 1000,
    totalPages: 0,
    size: 20,
    number: 1,
    numberOfElements: 20,
  } as PaginationResponse<T>;
};

/**
 * 다양한 GridBoxState 값들 중 최종적으로 사용할 쿼리 상태를 결정합니다.
 * 우선순위는 `state` -> `lastState`와 `initState`의 조합 -> `DEFAULT_GRID_BOX_STATE` 입니다.
 *
 * @param {GridBoxState} [state] - 현재 변경된 그리드 상태 (가장 높은 우선순위). 일반적으로 사용자가 직접 페이지를 변경하거나 정렬을 클릭했을 때의 상태입니다.
 * @param {GridBoxState} [lastState] - 이전에 사용되었던 그리드 상태 (두 번째 우선순위). 주로 페이지 사이즈와 같이 마지막 상태를 유지하고 싶은 값에 사용될 수 있습니다.
 * @param {GridBoxState} [initState] - 그리드의 초기 상태 (세 번째 우선순위). 주로 검색 조건을 변경했을 때 페이지를 0으로 리셋하는 등 초기 상태로 돌아갈 때 사용될 수 있습니다.
 * @returns {GridBoxState} 최종적으로 결정된 그리드 쿼리 상태 객체.
 */
const getQueryState = (
  state?: GridBoxState,
  lastState?: GridBoxState,
  initState?: GridBoxState,
) => {
  // 사용자가 페이지를 변경하거나 정렬을 클릭했을 때
  if (state) {
    return state;
  }
  // 재조회 (최초 조회 이후 조회 버튼 눌러서 실행...)
  if (lastState && initState) {
    return {
      page: initState.page ?? 0,
      size: lastState.size ?? 0, // size (한 페이지 조회 개수)는 직전 size 사용 (사용자 개수 변경 했을때 유지 하기위헤)
      sort: [], //initState.sort ?? [], // sort는 재조회시 초기화, 최초에만 initState 사용
    };
  }
  // 최초 조회시 사용
  return initState ?? DEFAULT_GRID_BOX_STATE;
};
