import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { mutateOptions, queryOptions } from './label-messages.queries';
import { LabelMessage } from '@types';

/**
 * 공통 쿼리 훅 옵션을 위한 제네릭 인터페이스
 * useQuery를 래핑하는 커스텀 훅에서 사용되며,
 * 훅 자체에서 제공하는 속성(queryKey, queryFn)을 제외하고
 * 사용자가 전달할 수 있는 옵션들을 정의합니다.
 *
 * @template TQueryFnData - queryFn이 반환하는 원본 데이터 타입
 * @template TError - 쿼리 실패 시 반환되는 에러 타입
 * @template TData - select 옵션으로 변환된 최종 데이터 타입 (기본값: TQueryFnData)
 * @template TQueryKey - 쿼리 키 타입 (extends unknown[])
 */
export interface QueryHookOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends unknown[] = unknown[],
> extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    // 훅에서 자체적으로 제공할 속성 목록을 Omit으로 제외합니다.
    // queryKey와 queryFn이 해당됩니다.
    'queryKey' | 'queryFn'
  > {
  // 이 외에 모든 공통 쿼리 훅에 적용될 추가 옵션이 있다면 여기에 정의할 수 있습니다.
  // 예: 기본적으로 특정 필터를 적용할지 여부 등
  // applyDefaultFilter?: boolean;
}

/**
 * 공통 뮤테이션 훅 옵션을 위한 제네릭 인터페이스
 * useMutation을 래핑하는 커스텀 훅에서 사용되며,
 * 훅 자체에서 제공하거나 래핑하는 속성(mutationFn, 일부 콜백)을 제외하고
 * 사용자가 전달할 수 있는 옵션들을 정의합니다.
 *
 * @template TData - 뮤테이션 성공 시 반환되는 데이터 타입
 * @template TError - 뮤테이션 실패 시 반환되는 에러 타입
 * @template TVariables - 뮤테이션 실행 시 전달되는 변수(payload) 타입
 * @template TContext - 뮤테이션 컨텍스트 타입 (필요 없으면 unknown)
 */
export interface MutationHookOptions<TData, TError, TVariables, TContext>
  extends Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    // 훅에서 자체적으로 제공하거나 래핑할 속성 목록을 Omit으로 제외합니다.
    // 보통 mutationFn과, 훅 내부 로직과 결합하여 실행할 콜백들이 해당됩니다.
    'mutationFn' | 'onSuccess' | 'onError' | 'onSettled'
  > {
  // Omit으로 제외했지만 사용자가 훅 옵션으로 전달하고 싶은 콜백들을 다시 정의합니다.
  // 훅 내부에서는 이 콜백들을 가져와 자체 로직과 함께 실행하게 됩니다.
  onSuccess?: UseMutationOptions<TData, TError, TVariables, TContext>['onSuccess'];
  onError?: UseMutationOptions<TData, TError, TVariables, TContext>['onError'];
  onSettled?: UseMutationOptions<TData, TError, TVariables, TContext>['onSettled'];

  // 이 외에 모든 공통 뮤테이션 훅에 적용될 추가 옵션이 있다면 여기에 정의할 수 있습니다.
  // 예: 모든 뮤테이션 성공 시 기본적으로 보여줄 알림 메시지 여부 등
  // showDefaultSuccessAlert?: boolean;
}

export const useFetchLabelMessages = () => {
  return useQuery(queryOptions.all());
};

export const useFetchLabelMessage = (id: number) => {
  return useQuery(queryOptions.detail(id));
};

export const useCreateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.create(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

export const useUpdateLabelMessage = (
  options?: MutationHookOptions<LabelMessage, Error, LabelMessage, unknown>,
): UseMutationResult<LabelMessage, Error, LabelMessage, unknown> => {
  return useMutation({
    ...mutateOptions.update(),
    ...options,
    onSuccess: async (data, variables, context) => {
      // 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
