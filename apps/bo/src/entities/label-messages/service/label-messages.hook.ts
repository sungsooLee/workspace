import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { mutateOptions, queryKeys, queryOptions } from './label-messages.queries';
import {
  LabelMessage,
  LabelMessagesQueryParams,
  MutationHookOptions,
  PaginationResponse,
} from '@types';
import { useModal } from '@learnway/ui';

/**
 * 라벨 메시지 목록을 가져오는 쿼리 훅.
 * 선택적 쿼리 파라미터를 사용하여 결과 필터링, 페이지네이션 등을 할 수 있습니다.
 * @param [queryParam] - 라벨 메시지 목록 조회에 사용될 선택적 쿼리 파라미터.
 * @returns 쿼리 결과를 담은 객체.
 */
export const useFetchLabelMessages = (
  queryParam?: LabelMessagesQueryParams,
): UseQueryResult<PaginationResponse<LabelMessage>, Error> => {
  return useQuery(queryOptions.all(queryParam));
};

/**
 * 특정 ID의 라벨 메시지 상세 정보를 가져오는 쿼리 훅.
 * ID를 기반으로 캐시되거나 새로 데이터를 불러옵니다.
 * @param id - 조회할 라벨 메시지의 고유 ID.
 * @returns 쿼리 결과를 담은 객체.
 */
export const useFetchLabelMessage = (id: number): UseQueryResult<LabelMessage, Error> => {
  return useQuery<LabelMessage>(queryOptions.detail(id));
};

/**
 * 새로운 라벨 메시지를 생성하는 뮤테이션 훅.
 * 성공 시 'showSaveComplete' 모달을 표시합니다.
 * @param [options] - 추가 뮤테이션 설정 옵션.
 * @returns 뮤테이션 결과를 담은 객체.
 */
export const useCreateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.detail(data.labelMessageId ?? Number(data.labelMessageId))],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.all],
      });

      // 추가적인 성공 처리 로직이 있다면 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

/**
 * 기존 라벨 메시지를 업데이트하는 뮤테이션 훅.
 * 성공 시 'showUpdateComplete' 모달을 표시합니다.
 * @param [options] - 추가 뮤테이션 설정 옵션.
 * @returns 뮤테이션 결과를 담은 객체.
 */
export const useUpdateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 추가적인 성공 처리 로직이 있다면 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
