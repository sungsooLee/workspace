import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { usePermissionStore } from './permission-store';
import { eventService, HTTP_EVENTS } from '@learnway/shared';

export function createAuthorizedQueryHook<
  TParams extends any[] = [],
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  apiKey: string,
  queryKeyFactory: (...params: TParams) => TQueryKey,
  queryFnFactory: (...params: TParams) => () => Promise<TQueryFnData>,
  defaultOptions: any = {},
) {
  return function useCustomHook(
    ...args: any[]
  ): UseQueryResult<TData, TError> & { hasPermission: boolean } {
    const hasApiAccess = usePermissionStore((state) => state.hasApiAccess);
    const initialized = usePermissionStore((state) => state.initialized);

    let params: TParams = [] as unknown as TParams;
    let options: Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryKey' | 'queryFn'
    > = {};

    // args 파싱하기
    if (args.length === 0) {
      // 인자 없음: params는 빈 배열, options는 빈 객체
    } else if (args.length === 1) {
      // 인자가 하나: 객체면 options, 아니면 params[0]로 처리
      if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
        options = args[0];
      } else {
        params = [args[0]] as unknown as TParams;
      }
    } else {
      // 인자가 여러 개: 마지막이 객체면 options, 나머지는 params
      const lastArg = args[args.length - 1];
      if (typeof lastArg === 'object' && !Array.isArray(lastArg)) {
        options = lastArg;
        params = args.slice(0, args.length - 1) as unknown as TParams;
      } else {
        params = args as unknown as TParams;
      }
    }

    const queryKey = queryKeyFactory(...params);
    console.log(queryKey);
    const queryFn = queryFnFactory(...params);
    const hasPermission = hasApiAccess(apiKey);

    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };

    const isEnabled = initialized && hasPermission && mergedOptions.enabled !== false;

    const queryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>({
      queryKey,
      queryFn,
      enabled: isEnabled,
      ...mergedOptions,
    });

    return { ...queryResult, hasPermission };
  };
}

export function createAuthorizedMutationHook<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  apiKey: string,
  mutationFnFactory: () => (variables: TVariables) => Promise<TData>,
  defaultInvalidation?: (
    queryClient: ReturnType<typeof useQueryClient>,
    data: TData,
    variables: TVariables,
    context: TContext,
    queryParams?: any,
  ) => Promise<void>,
  defaultOptions: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn' | 'onSuccess'
  > = {},
) {
  return function useAuthorizedMutation(
    options: Partial<{
      onSuccess: (data: TData, variables: TVariables, context: TContext) => void;
      onError: (error: TError, variables: TVariables, context: TContext) => void;
      queryParams?: any; // 컴포넌트에서 전달할 queryParams
    }> &
      Omit<
        UseMutationOptions<TData, TError, TVariables, TContext>,
        'mutationFn' | 'onSuccess' | 'onError'
      > = {},
  ) {
    const queryClient = useQueryClient();
    const hasApiAccess = usePermissionStore((state) => state.hasApiAccess);
    const initialized = usePermissionStore((state) => state.initialized);
    const hasPermission = hasApiAccess(apiKey);

    const { onSuccess, onError, queryParams, ...restOptions } = options;

    const handleSuccess = async (data: TData, variables: TVariables, context: TContext) => {
      if (defaultInvalidation) {
        await defaultInvalidation(queryClient, data, variables, context, queryParams);
      }

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    };

    const mergedOptions = {
      ...defaultOptions,
      ...restOptions,
      onSuccess: handleSuccess,
    };

    const mutationFn = hasPermission
      ? mutationFnFactory()
      : (_: TVariables) => Promise.reject(new Error(`'${apiKey}' 작업 권한이 없습니다`));

    const mutation = useMutation<TData, TError, TVariables, TContext>({
      mutationFn,
      ...mergedOptions,
    });

    const mutate = (
      variables: TVariables,
      mutateOptions?: MutateOptions<TData, TError, TVariables, TContext>,
    ) => {
      if (!initialized) {
        console.warn('권한 저장소가 초기화되지 않았습니다');
        return;
      }

      if (!hasPermission) {
        const error = new Error(`'${apiKey}' 작업 권한이 없습니다`) as TError;
        eventService.emit(HTTP_EVENTS.ERROR, {
          title: 'Request Error',
          message: `'${apiKey}' 작업 권한이 없습니다`,
        });
        if (mutateOptions?.onError) {
          mutateOptions.onError(error, variables, undefined as any);
        } else if (options.onError) {
          options.onError(error, variables, undefined as any);
        }
        return;
      }

      mutation.mutate(variables, mutateOptions);
    };

    const mutateAsync = async (
      variables: TVariables,
      mutateOptions?: MutateOptions<TData, TError, TVariables, TContext>,
    ) => {
      if (!initialized || !hasPermission) {
        return Promise.reject(new Error(`'${apiKey}' 작업 권한이 없습니다`));
      }

      return mutation.mutateAsync(variables, mutateOptions);
    };

    return {
      ...mutation,
      mutate,
      mutateAsync,
      hasPermission,
    };
  };
}
