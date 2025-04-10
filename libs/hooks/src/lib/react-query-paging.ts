import {
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  QueryClient,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
  skipToken,
} from '@tanstack/react-query';
import { isEmpty, isFunction } from 'lodash';

import { PageInfo, QueryFnPagingData } from '@learnway/shared';

type QueryOptionType<
  TQueryFnData = unknown,
  TError = unknown,
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn' | 'initialData'
> & {
  initialData?: () => undefined;
};

//const { data, pageInfo, isError, isLoading, refetch } = useQueryPaging<T>()

export function useQueryPaging<
  TContent = unknown,
  TQueryFnData = QueryFnPagingData<TContent>,
  TError = unknown,
  TData = TContent,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    convert?: (data: unknown) => TContent;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  pageInfo?: PageInfo;
} {
  const { select, convert, ...restQueryOptions } = options;

  const combindOptions: any = {
    keepPreviousData: true,
    ...(select ? { select: (data: any) => ({ ...data, content: select(data.content) }) } : {}),
    ...restQueryOptions,
  };

  const queryResult = useQuery<
    QueryFnPagingData<TContent>,
    TError,
    QueryFnPagingData<TContent>,
    TQueryKey
  >(
    {
      ...options,
      queryFn:
        options?.queryFn === undefined || options?.queryFn === skipToken
          ? skipToken
          : async (context: QueryFunctionContext<TQueryKey, any>) => {
              if (options?.queryFn === undefined || options?.queryFn === skipToken) {
                return Promise.resolve({});
              }
              try {
                const result = (await options.queryFn(context)) as QueryFnPagingData<TContent>;
                if (!result?.page?.first && result?.page?.last && isEmpty(result.content)) {
                  result.page = { ...result.page, number: (result.page?.number ?? 0) - 1 };
                }
                if (result.content && convert && Array.isArray(result.content)) {
                  result.content = result.content.map((data: any) =>
                    convert(data),
                  ) as unknown as TContent;
                }
                return result;
              } catch (e) {
                console.log(e);
              }
            },
      ...combindOptions,
    },
    queryClient,
  );

  return {
    ...queryResult,
    data: queryResult?.data?.content,
    pageInfo: queryResult?.data?.page,
  } as any;
}
