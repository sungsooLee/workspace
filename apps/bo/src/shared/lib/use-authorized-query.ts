import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePermissionStore } from './permission-store';
import { eventService, HTTP_EVENTS, httpService } from '@learnway/shared';
import { PMSApiPrefix } from '../../../../../libs/config/src';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiDefinition<TResponse = any, TParams = any, TPayload = any> {
  key: string;
  method: ApiMethod;
  getFullUrl: (params?: TParams) => string;
  description?: string;
}

export type UrlFactory<TParams> = (params?: TParams) => string;

const API_REGISTRY: Record<string, ApiDefinition> = {};

export function registerApi<TResponse = any, TParams = any, TPayload = any>(
  key: string,
  method: ApiMethod,
  urlFactory: UrlFactory<TParams>,
  description?: string,
): ApiDefinition<TResponse, TParams, TPayload> {
  const api = {
    key,
    method,
    getFullUrl: urlFactory,
    description,
  };

  if (API_REGISTRY[key]) {
    console.warn(`API 키 '${key}'가 이미 등록되어 있습니다. 중복 등록은 무시됩니다.`);
    return API_REGISTRY[key] as ApiDefinition<TResponse, TParams, TPayload>;
  }

  API_REGISTRY[key] = api;
  return api;
}

export function getApiKey(key: string): ApiDefinition | undefined {
  return API_REGISTRY[key];
}

export function getAllApis(): Record<string, ApiDefinition> {
  return { ...API_REGISTRY };
}

// API 키 목록 타입
export type ApiKey = keyof typeof API_REGISTRY;

export function useApiQuery<TResponse = any, TParams = any, TError = Error>(
  api: ApiDefinition,
  params?: TParams,
  queryKey?: readonly unknown[],
  options?: any,
) {
  const hasApiAccess = usePermissionStore((state) => state.hasApiAccess);
  // const hasPermission = hasApiAccess(api.key);
  const hasPermission = true;

  const queryFn = async (): Promise<TResponse> => {
    if (!hasPermission) {
      eventService.emit(HTTP_EVENTS.REACT_QUERY_ERROR, {
        title: 'Permission Error',
        message: `'${api.key}' 작업 권한이 없습니다`,
      });
      throw new Error(`'${api.key}' 작업 권한이 없습니다`);
    }
    const url = api.getFullUrl(params);
    return httpService.get<TResponse>(url);
  };

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: options?.enabled !== false && hasPermission,
    ...options,
  });

  return {
    ...query,
    hasPermission,
  };
}

export function useApiMutation<TResponse = any, TPayload = any, TParams = any, TError = Error>(
  api: ApiDefinition,
  params?: TParams,
  options?: {
    onSuccess?: (data: TResponse, variables: TPayload, context: unknown) => void;
    onError?: (error: TError, variables: TPayload, context: unknown) => void;
    invalidateQueries?: readonly (readonly unknown[])[];
  },
) {
  const { onSuccess, onError, invalidateQueries, ...restOptions } = options || {};

  const queryClient = useQueryClient();
  const hasApiAccess = usePermissionStore((state) => state.hasApiAccess);
  const hasPermission = true;

  const customMutate = (payload: TPayload, mutationOptions?: any) => {
    if (!hasPermission) {
      eventService.emit(HTTP_EVENTS.REACT_QUERY_ERROR, {
        title: 'Permission Error',
        message: `'${api.key}' 작업 권한이 없습니다`,
      });

      const error = new Error(`API 키 '${api.key}'에 대한 권한이 없습니다.`) as TError;

      if (mutationOptions?.onError) {
        mutationOptions.onError(error, payload, undefined);
      } else if (onError) {
        onError(error, payload, undefined);
      }

      return;
    }
    console.log(mutationOptions);
    mutation.mutate(payload, mutationOptions);
  };

  const customMutateAsync = async (
    payload: TPayload,
    mutationOptions?: any,
  ): Promise<TResponse> => {
    if (!hasPermission) {
      eventService.emit(HTTP_EVENTS.REACT_QUERY_ERROR, {
        title: 'Permission Error',
        message: `'${api.key}' 작업 권한이 없습니다`,
      });

      const error = new Error(`API 키 '${api.key}'에 대한 권한이 없습니다.`) as TError;

      if (mutationOptions?.onError) {
        mutationOptions.onError(error, payload, undefined);
      } else if (onError) {
        onError(error, payload, undefined);
      }

      return Promise.reject(error);
    }

    return mutation.mutateAsync(payload, mutationOptions);
  };

  const mutationFn = async (payload: TPayload): Promise<TResponse> => {
    const urlPattern = api.getFullUrl({} as any);
    const paramMatches = urlPattern.match(/:[a-zA-Z0-9_]+/g) || [];

    const paramNames = paramMatches.map((param) => param.substring(1));
    console.log(paramNames);
    let actualParams = { ...(params as any) };
    let foundParams = false;

    if (payload && typeof payload === 'object' && paramNames.length > 0) {
      for (const name of paramNames) {
        if ((payload as any)[name] !== undefined) {
          actualParams[name] = (payload as any)[name];
          foundParams = true;
        }
      }
    }

    const url = foundParams ? api.getFullUrl(actualParams) : api.getFullUrl(params);

    try {
      let response: TResponse;

      switch (api.method) {
        case 'POST':
          response = await httpService.post<TResponse>(url, payload);
          break;
        case 'PUT':
          response = await httpService.put<TResponse>(url, payload);
          break;
        case 'DELETE':
          response = await httpService.delete<TResponse>(url);
          break;
        case 'PATCH':
          response = await httpService.patch<TResponse>(url, payload);
          break;
        default:
          throw new Error(`메소드 '${api.method}'는 mutation에 적합하지 않습니다.`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 성공 시 처리할 작업
  const handleSuccess = async (data: TResponse, variables: TPayload, context: unknown) => {
    // 캐시 무효화 처리
    if (invalidateQueries && invalidateQueries.length > 0) {
      for (const queryKey of invalidateQueries) {
        await queryClient.invalidateQueries({
          queryKey: queryKey as unknown[],
        });
      }
    }

    if (onSuccess) {
      onSuccess(data, variables, context);
    }
  };

  const handleError = (error: TError, variables: TPayload, context: unknown) => {
    if (onError) {
      onError(error, variables, context);
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
    ...restOptions,
  });

  return {
    ...mutation,
    mutate: customMutate,
    mutateAsync: customMutateAsync,
    hasPermission,
  };
}

export function buildUrl(baseUrl: string, path: string, params?: Record<string, any>): string {
  let urlPath = path;
  const queryParams: Record<string, any> = {};

  if (params) {
    // 경로 파라미터 처리 (예: /users/:id)
    Object.entries(params).forEach(([key, value]) => {
      const placeholder = `:${key}`;
      if (urlPath.includes(placeholder)) {
        urlPath = urlPath.replace(placeholder, encodeURIComponent(String(value)));
      } else if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = value;
      }
    });
  }

  let url = `${baseUrl}${urlPath}`;

  if (Object.keys(queryParams).length > 0) {
    const queryParts: string[] = [];

    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (key === 'sort') {
            queryParts.push(`${encodeURIComponent(key)}=${item}`);
          } else {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
          }
        });
      } else {
        if (key === 'sort') {
          queryParts.push(`${encodeURIComponent(key)}=${value}`);
        } else {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
        }
      }
    });

    if (queryParts.length > 0) {
      url += `?${queryParts.join('&')}`;
    }
  }

  console.log(url);
  return url;
}

export function createPmsUrl(path: string) {
  return (params?: Record<string, any>) => buildUrl(PMSApiPrefix(), path, params);
}
