import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { mutateOptions, queryOptions } from './label-messages.queries';
import { LabelMessage, LabelMessagesQueryParams, MutationHookOptions } from '@types';

/**
 * @tanstack/react-query 훅: 라벨 메시지 목록을 조회합니다.
 * 선택적 쿼리 파라미터를 사용하여 결과 필터링, 페이지네이션 등을 할 수 있습니다.
 *
 * @param {LabelMessagesQueryParams} [queryParam] - 라벨 메시지 목록 조회에 사용될 선택적 쿼리 파라미터 (페이지, 검색어 등).
 * @returns {UseQueryResult<LabelMessage[], Error>} 쿼리 결과를 담은 객체 (데이터, 로딩 상태, 에러 등 포함).
 * 성공 시 LabelMessage 객체 배열을 반환하며, 에러 타입은 Error입니다.
 */
export const useFetchLabelMessages = (queryParam?: LabelMessagesQueryParams) => {
  return useQuery(queryOptions.all(queryParam));
};

/**
 * @tanstack/react-query 훅: 특정 ID의 라벨 메시지 상세 정보를 조회합니다.
 * ID를 기반으로 캐시되거나 새로 데이터를 불러옵니다.
 *
 * @param {number} id - 조회할 라벨 메시지의 고유 ID.
 * @returns {UseQueryResult<LabelMessage, Error>} 쿼리 결과를 담은 객체 (데이터, 로딩 상태, 에러 등 포함).
 * 성공 시 LabelMessage 객체를 반환하며, 에러 타입은 Error입니다.
 */
export const useFetchLabelMessage = (id: number) => {
  return useQuery<LabelMessage>(queryOptions.detail(id));
};

/**
 * @tanstack/react-query 훅: 새로운 라벨 메시지를 생성하는 뮤테이션을 수행합니다.
 * MutationHookOptions를 통해 뮤테이션 옵션(onSuccess, onError 등)을 설정할 수 있습니다.
 *
 * @param {MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>} [options] - 뮤테이션 설정 옵션 (성공/실패 콜백, 재시도 설정 등).
 * @returns {UseMutationResult<LabelMessage, Error, LabelMessage, unknown>} 뮤테이션 결과를 담은 객체 (mutate 함수, 상태, 데이터, 에러 등 포함).
 * 성공 시 LabelMessage 객체를 변수로 받고 LabelMessage 객체를 반환하며, 에러 타입은 Error입니다.
 */
export const useCreateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 공통 로직 필요한 경우 onSuccess 수행 후 재호출
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

/**
 * @tanstack/react-query 훅: 기존 라벨 메시지를 업데이트하는 뮤테이션을 수행합니다.
 * MutationHookOptions를 통해 뮤테이션 옵션(onSuccess, onError 등)을 설정할 수 있습니다.
 *
 * @param {MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>} [options] - 뮤테이션 설정 옵션 (성공/실패 콜백, 재시도 설정 등).
 * @returns {UseMutationResult<LabelMessage, Error, LabelMessage, unknown>} 뮤테이션 결과를 담은 객체 (mutate 함수, 상태, 데이터, 에러 등 포함).
 * 성공 시 LabelMessage 객체를 변수로 받고 LabelMessage 객체를 반환하며, 에러 타입은 Error입니다.
 */
export const useUpdateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 공통 로직 필요한 경우 onSuccess 수행 후 재호출
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
