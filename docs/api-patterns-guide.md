---
applyTo: '**/src/**'
---

# API 호출 패턴 가이드

## 📋 목차

- [API 계층 구조](#api-계층-구조)
- [React Query 패턴](#react-query-패턴)
- [API 클라이언트 설정](#api-클라이언트-설정)
- [에러 처리](#에러-처리)
- [타입 정의](#타입-정의)
- [캐싱 전략](#캐싱-전략)
- [페이지네이션](#페이지네이션)
- [최적화 기법](#최적화-기법)

## 🏗️ API 계층 구조

### 1. FSD 아키텍처에서의 API 위치

```
entities/
├── user/
│   ├── api/
│   │   └── user.ts          # API 서비스 레이어
│   ├── service/
│   │   ├── user.hook.ts     # React Query 훅
│   │   └── user.queries.ts  # Query 옵션 정의
│   └── index.ts
```

### 2. API 서비스 레이어 구조

```typescript
// ✅ entities/user/api/user.ts
import { apiClient } from '@shared/api';
import type { 
  User, 
  UserCreate, 
  UserUpdate, 
  UserSearchParams,
  PagedResponse 
} from '@shared/types';

export const userApi = {
  // 목록 조회
  getUsers: async (params?: UserSearchParams): Promise<PagedResponse<User>> => {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },

  // 상세 조회
  getUserById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  // 생성
  createUser: async (payload: UserCreate): Promise<User> => {
    const { data } = await apiClient.post('/users', payload);
    return data;
  },

  // 수정
  updateUser: async (id: number, payload: UserUpdate): Promise<User> => {
    const { data } = await apiClient.put(`/users/${id}`, payload);
    return data;
  },

  // 삭제
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  // 중복 체크
  checkUserExists: async (email: string): Promise<boolean> => {
    const { data } = await apiClient.get(`/users/exists`, { 
      params: { email } 
    });
    return data.exists;
  },
};

export default userApi;
```

## ⚛️ React Query 패턴

### 1. Query Keys 관리

```typescript
// ✅ entities/user/service/user.queries.ts
export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (params?: UserSearchParams) => 
    [...userQueryKeys.lists(), params] as const,
  details: () => [...userQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...userQueryKeys.details(), id] as const,
  search: (term: string) => [...userQueryKeys.all, 'search', term] as const,
};

export const userQueryOptions = {
  // 전체 목록 조회
  all: () => ({
    queryKey: userQueryKeys.all,
    queryFn: () => userApi.getUsers(),
    staleTime: 5 * 60 * 1000, // 5분
  }),

  // 조건부 목록 조회
  list: (params?: UserSearchParams) => ({
    queryKey: userQueryKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    enabled: !!params,
    keepPreviousData: true,
  }),

  // 상세 조회
  detail: (id: number) => ({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000, // 10분
  }),

  // 검색
  search: (term: string) => ({
    queryKey: userQueryKeys.search(term),
    queryFn: () => userApi.getUsers({ search: term }),
    enabled: term.length >= 2,
    debounceMs: 300,
  }),
};

export const userMutationOptions = {
  create: () => ({
    mutationFn: userApi.createUser,
  }),

  update: () => ({
    mutationFn: ({ id, data }: { id: number; data: UserUpdate }) =>
      userApi.updateUser(id, data),
  }),

  delete: () => ({
    mutationFn: userApi.deleteUser,
  }),
};
```

### 2. 커스텀 훅 구현

```typescript
// ✅ entities/user/service/user.hook.ts
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  useInfiniteQuery 
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// === 조회 훅 ===

export function useUsers(params?: UserSearchParams) {
  return useQuery({
    ...userQueryOptions.list(params),
    onError: (error) => {
      console.error('사용자 목록 조회 실패:', error);
      toast.error('사용자 목록을 불러오는데 실패했습니다.');
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    ...userQueryOptions.detail(id),
    onError: (error) => {
      console.error('사용자 상세 조회 실패:', error);
      toast.error('사용자 정보를 불러오는데 실패했습니다.');
    },
  });
}

export function useUserSearch(term: string) {
  return useQuery({
    ...userQueryOptions.search(term),
    onError: (error) => {
      console.error('사용자 검색 실패:', error);
    },
  });
}

// === 무한 스크롤 ===

export function useInfiniteUsers(params?: UserSearchParams) {
  return useInfiniteQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: ({ pageParam = 0 }) => 
      userApi.getUsers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { pageable, last } = lastPage;
      return last ? undefined : pageable.page + 1;
    },
    onError: (error) => {
      toast.error('사용자 목록을 불러오는데 실패했습니다.');
    },
  });
}

// === 뮤테이션 훅 ===

interface UseMutationCallbacks<TData = any, TVariables = any> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export function useCreateUser(callbacks?: UseMutationCallbacks<User, UserCreate>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...userMutationOptions.create(),
    onSuccess: (data, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
      
      // 성공 메시지
      toast.success('사용자가 생성되었습니다.');
      
      // 콜백 실행
      callbacks?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error('사용자 생성 실패:', error);
      toast.error('사용자 생성에 실패했습니다.');
      callbacks?.onError?.(error, variables);
    },
  });
}

export function useUpdateUser(callbacks?: UseMutationCallbacks<User, {id: number; data: UserUpdate}>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...userMutationOptions.update(),
    onSuccess: (data, variables) => {
      // 특정 사용자 캐시 업데이트
      queryClient.setQueryData(
        userQueryKeys.detail(variables.id), 
        data
      );
      
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ 
        queryKey: userQueryKeys.lists() 
      });
      
      toast.success('사용자 정보가 수정되었습니다.');
      callbacks?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error('사용자 수정 실패:', error);
      toast.error('사용자 수정에 실패했습니다.');
      callbacks?.onError?.(error, variables);
    },
  });
}

export function useDeleteUser(callbacks?: UseMutationCallbacks<void, number>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...userMutationOptions.delete(),
    onSuccess: (data, userId) => {
      // 삭제된 사용자 캐시 제거
      queryClient.removeQueries({ 
        queryKey: userQueryKeys.detail(userId) 
      });
      
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ 
        queryKey: userQueryKeys.lists() 
      });
      
      toast.success('사용자가 삭제되었습니다.');
      callbacks?.onSuccess?.(data, userId);
    },
    onError: (error, userId) => {
      console.error('사용자 삭제 실패:', error);
      toast.error('사용자 삭제에 실패했습니다.');
      callbacks?.onError?.(error, userId);
    },
  });
}

// === 최적화된 뮤테이션 (낙관적 업데이트) ===

export function useOptimisticUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdate }) =>
      userApi.updateUser(id, data),
    
    // 낙관적 업데이트
    onMutate: async ({ id, data }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ 
        queryKey: userQueryKeys.detail(id) 
      });

      // 이전 데이터 백업
      const previousUser = queryClient.getQueryData<User>(
        userQueryKeys.detail(id)
      );

      // 낙관적 업데이트
      if (previousUser) {
        queryClient.setQueryData<User>(
          userQueryKeys.detail(id),
          { ...previousUser, ...data }
        );
      }

      return { previousUser };
    },
    
    // 실패 시 롤백
    onError: (error, { id }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          userQueryKeys.detail(id),
          context.previousUser
        );
      }
      toast.error('사용자 수정에 실패했습니다.');
    },
    
    // 항상 캐시 동기화
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ 
        queryKey: userQueryKeys.detail(id) 
      });
    },
  });
}
```

## 🌐 API 클라이언트 설정

### 1. Axios 인스턴스 설정

```typescript
// ✅ shared/api/client.ts
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// API 클라이언트 생성
export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 로깅 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const { response, config } = error;

    // 에러 로깅
    console.error('[API Error]', {
      url: config?.url,
      method: config?.method,
      status: response?.status,
      data: response?.data,
    });

    // 401 Unauthorized - 토큰 갱신 시도
    if (response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && config) {
          const newToken = await refreshAccessToken(refreshToken);
          
          // 새 토큰으로 원래 요청 재시도
          config.headers.Authorization = `Bearer ${newToken}`;
          return apiClient.request(config);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 - 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 403 Forbidden
    if (response?.status === 403) {
      toast.error('접근 권한이 없습니다.');
    }

    // 404 Not Found
    if (response?.status === 404) {
      toast.error('요청한 리소스를 찾을 수 없습니다.');
    }

    // 500 Internal Server Error
    if (response?.status >= 500) {
      toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }

    return Promise.reject(error);
  }
);

// 토큰 갱신 함수
async function refreshAccessToken(refreshToken: string): Promise<string> {
  const { data } = await axios.post('/auth/refresh', {
    refreshToken,
  });
  
  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
}
```

### 2. API 응답 타입 표준화

```typescript
// ✅ shared/types/api.ts
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  pageable: {
    page: number;
    size: number;
    sort: string[];
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
  timestamp: string;
}

// 검색 파라미터 기본 인터페이스
export interface BaseSearchParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
}
```

## ⚠️ 에러 처리

### 1. 에러 타입 정의

```typescript
// ✅ shared/types/error.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, public fieldErrors: Record<string, string>) {
    super(400, 'VALIDATION_ERROR', message, fieldErrors);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource}을(를) 찾을 수 없습니다.`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, 'UNAUTHORIZED', '인증이 필요합니다.');
    this.name = 'UnauthorizedError';
  }
}
```

### 2. 에러 처리 유틸리티

```typescript
// ✅ shared/lib/error-handler.ts
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export function handleApiError(error: unknown, customMessage?: string) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || customMessage;

    switch (status) {
      case 400:
        toast.error(message || '잘못된 요청입니다.');
        break;
      case 401:
        toast.error('로그인이 필요합니다.');
        // 로그인 페이지로 리다이렉트
        break;
      case 403:
        toast.error('접근 권한이 없습니다.');
        break;
      case 404:
        toast.error(message || '요청한 데이터를 찾을 수 없습니다.');
        break;
      case 422:
        // 유효성 검사 오류 처리
        const fieldErrors = error.response?.data?.fieldErrors;
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        } else {
          toast.error(message || '입력 데이터를 확인해주세요.');
        }
        break;
      case 500:
        toast.error('서버 오류가 발생했습니다.');
        break;
      default:
        toast.error(message || '알 수 없는 오류가 발생했습니다.');
    }
  } else {
    toast.error(customMessage || '네트워크 오류가 발생했습니다.');
  }

  // 에러 로깅
  console.error('API Error:', error);
}

// React Query 에러 바운더리
export function createErrorHandler(defaultMessage: string) {
  return (error: unknown) => {
    handleApiError(error, defaultMessage);
  };
}
```

## 📊 페이지네이션

### 1. 기본 페이지네이션

```typescript
// ✅ entities/user/service/user-pagination.hook.ts
interface UsePaginationOptions {
  initialPage?: number;
  initialSize?: number;
  onPageChange?: (page: number) => void;
}

export function useUserPagination(
  searchParams?: UserSearchParams,
  options: UsePaginationOptions = {}
) {
  const [pagination, setPagination] = useState({
    page: options.initialPage || 0,
    size: options.initialSize || 20,
  });

  const queryParams = {
    ...searchParams,
    ...pagination,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: userQueryKeys.list(queryParams),
    queryFn: () => userApi.getUsers(queryParams),
    keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지
  });

  const goToPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
    options.onPageChange?.(page);
  }, [options]);

  const changePageSize = useCallback((size: number) => {
    setPagination({ page: 0, size }); // 페이지 크기 변경 시 첫 페이지로
  }, []);

  const nextPage = useCallback(() => {
    if (data && !data.last) {
      goToPage(pagination.page + 1);
    }
  }, [data, pagination.page, goToPage]);

  const prevPage = useCallback(() => {
    if (pagination.page > 0) {
      goToPage(pagination.page - 1);
    }
  }, [pagination.page, goToPage]);

  return {
    data: data?.content || [],
    pagination: data ? {
      currentPage: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      size: data.size,
      first: data.first,
      last: data.last,
    } : null,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
  };
}
```

### 2. 무한 스크롤 페이지네이션

```typescript
// ✅ entities/user/service/user-infinite.hook.ts
export function useInfiniteUserList(searchParams?: UserSearchParams) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: userQueryKeys.list(searchParams),
    queryFn: ({ pageParam = 0 }) =>
      userApi.getUsers({ ...searchParams, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  });

  // 플랫 배열로 변환
  const users = useMemo(() => {
    return data?.pages.flatMap(page => page.content) || [];
  }, [data?.pages]);

  // 교집합 관찰자를 사용한 자동 로드
  const { ref: loadMoreRef } = useIntersectionObserver({
    onChange: (isIntersecting) => {
      if (isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return {
    users,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    fetchNextPage,
  };
}

// 교집합 관찰자 훅
function useIntersectionObserver({
  onChange,
  threshold = 0.1,
}: {
  onChange: (isIntersecting: boolean) => void;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onChange(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [onChange, threshold]);

  return { ref };
}
```

## ⚡ 최적화 기법

### 1. 선택적 데이터 페칭

```typescript
// ✅ 조건부 쿼리 실행
export function useConditionalUser(userId?: number, shouldFetch: boolean = true) {
  return useQuery({
    queryKey: userQueryKeys.detail(userId!),
    queryFn: () => userApi.getUserById(userId!),
    enabled: !!userId && shouldFetch, // 조건이 만족될 때만 실행
  });
}

// ✅ 의존적 쿼리
export function useUserWithDepartment(userId: number) {
  // 1. 사용자 정보 조회
  const { data: user } = useUser(userId);

  // 2. 사용자의 부서 정보 조회 (사용자 정보가 있을 때만)
  const { data: department } = useQuery({
    queryKey: ['department', user?.departmentId],
    queryFn: () => departmentApi.getDepartment(user!.departmentId),
    enabled: !!user?.departmentId,
  });

  return { user, department };
}
```

### 2. 배치 요청 최적화

```typescript
// ✅ 여러 사용자 정보를 한 번에 조회
export function useBatchUsers(userIds: number[]) {
  return useQuery({
    queryKey: ['users', 'batch', userIds.sort()],
    queryFn: async () => {
      if (userIds.length === 0) return [];
      
      // 배치 API 호출
      const { data } = await apiClient.post('/users/batch', { ids: userIds });
      return data;
    },
    enabled: userIds.length > 0,
  });
}

// ✅ DataLoader 패턴 구현
class UserDataLoader {
  private batchLoadFn: (ids: number[]) => Promise<User[]>;
  private cache = new Map<number, Promise<User>>();
  private batch: number[] = [];
  private batchTimer: NodeJS.Timeout | null = null;

  constructor(batchLoadFn: (ids: number[]) => Promise<User[]>) {
    this.batchLoadFn = batchLoadFn;
  }

  load(id: number): Promise<User> {
    // 캐시에서 확인
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // 배치에 추가
    this.batch.push(id);

    // 프로미스 생성 및 캐시
    const promise = new Promise<User>((resolve, reject) => {
      this.scheduleBatch().then(users => {
        const user = users.find(u => u.id === id);
        if (user) {
          resolve(user);
        } else {
          reject(new Error(`User ${id} not found`));
        }
      });
    });

    this.cache.set(id, promise);
    return promise;
  }

  private async scheduleBatch(): Promise<User[]> {
    return new Promise(resolve => {
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
      }

      this.batchTimer = setTimeout(async () => {
        const idsToLoad = [...this.batch];
        this.batch = [];
        
        try {
          const users = await this.batchLoadFn(idsToLoad);
          resolve(users);
        } catch (error) {
          console.error('Batch load failed:', error);
          resolve([]);
        }
      }, 10); // 10ms 후 배치 실행
    });
  }
}
```

### 3. 캐시 최적화

```typescript
// ✅ 스마트 캐시 무효화
export function useSmartCacheInvalidation() {
  const queryClient = useQueryClient();

  const invalidateUserCaches = useCallback((userId?: number) => {
    if (userId) {
      // 특정 사용자 관련 캐시만 무효화
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.detail(userId),
      });
    } else {
      // 모든 사용자 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.lists(),
      });
    }
  }, [queryClient]);

  const prefetchUser = useCallback((userId: number) => {
    queryClient.prefetchQuery({
      queryKey: userQueryKeys.detail(userId),
      queryFn: () => userApi.getUserById(userId),
      staleTime: 5 * 60 * 1000, // 5분간 신선함 유지
    });
  }, [queryClient]);

  return {
    invalidateUserCaches,
    prefetchUser,
  };
}

// ✅ 백그라운드 동기화
export function useBackgroundSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      // 활성 쿼리만 백그라운드에서 재페칭
      queryClient.refetchQueries({
        type: 'active',
        stale: true,
      });
    }, 5 * 60 * 1000); // 5분마다

    return () => clearInterval(interval);
  }, [queryClient]);
}
```

## 📋 사용 예시

### 1. 기본 CRUD 화면에서의 사용

```typescript
// ✅ features/user-management/ui/user-list.tsx
export function UserList() {
  const [searchParams, setSearchParams] = useState<UserSearchParams>({});
  
  // 페이지네이션과 함께 사용자 목록 조회
  const {
    data: users,
    pagination,
    isLoading,
    goToPage,
    changePageSize,
  } = useUserPagination(searchParams);

  // 사용자 삭제
  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      // 삭제 후 추가 로직
    },
  });

  const handleSearch = (params: UserSearchParams) => {
    setSearchParams(params);
  };

  const handleDelete = (userId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteUser(userId);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <UserSearchForm onSearch={handleSearch} />
      
      <UserTable 
        users={users}
        onDelete={handleDelete}
      />
      
      {pagination && (
        <Pagination
          current={pagination.currentPage}
          total={pagination.totalPages}
          onPageChange={goToPage}
          onSizeChange={changePageSize}
        />
      )}
    </div>
  );
}
```

### 2. 모달에서의 사용

```typescript
// ✅ features/user-management/ui/user-detail-modal.tsx
interface UserDetailModalProps {
  userId?: number;
  mode: 'view' | 'edit' | 'create';
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ 
  userId, 
  mode, 
  isOpen, 
  onClose 
}: UserDetailModalProps) {
  // 상세 정보 조회 (수정/조회 모드일 때만)
  const { data: user, isLoading } = useUser(userId!, {
    enabled: !!userId && mode !== 'create',
  });

  // 생성/수정 뮤테이션
  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
      toast.success('사용자가 생성되었습니다.');
      onClose();
    },
  });

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success('사용자 정보가 수정되었습니다.');
      onClose();
    },
  });

  const handleSubmit = (data: UserCreate | UserUpdate) => {
    if (mode === 'create') {
      createUser(data as UserCreate);
    } else if (mode === 'edit' && userId) {
      updateUser({ id: userId, data: data as UserUpdate });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <UserForm
          user={user}
          mode={mode}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
```

## ✅ 체크리스트

### API 설계 체크리스트
- [ ] RESTful API 규칙을 준수하는가?
- [ ] 적절한 HTTP 상태 코드를 사용하는가?
- [ ] 에러 응답 형식이 일관되는가?
- [ ] 페이지네이션이 적절히 구현되어 있는가?

### React Query 체크리스트
- [ ] Query Key가 명확하고 일관된가?
- [ ] 적절한 staleTime과 cacheTime을 설정했는가?
- [ ] 에러 처리가 구현되어 있는가?
- [ ] 낙관적 업데이트가 필요한 곳에 적용되었는가?

### 성능 체크리스트
- [ ] 불필요한 API 호출이 없는가?
- [ ] 적절한 캐싱 전략을 사용하는가?
- [ ] 배치 요청을 고려했는가?
- [ ] 무한 스크롤이 필요한 곳에 적용되었는가?