# API 호출 패턴 가이드

## 📋 목차

- [FSD 아키텍처에서의 API 구조](#fsd-아키텍처에서의-api-구조)
- [React Query 패턴](#react-query-패턴)
- [API 클라이언트 설정](#api-클라이언트-설정)
- [에러 처리](#에러-처리)
- [타입 정의](#타입-정의)
- [실제 사용 예시](#실제-사용-예시)

## 🏗️ FSD 아키텍처에서의 API 구조

### 계층별 역할

```
entities/
├── user/
│   ├── api/
│   │   └── user.ts          # API 호출 함수
│   ├── service/
│   │   └── user.hook.ts     # React Query 훅
│   ├── types/
│   │   └── user.types.ts    # 타입 정의
│   └── index.ts            # Public API
```

### 필수 구현 순서

1. **타입 정의** → 2. **API 함수** → 3. **React Query 훅** → 4. **Public API Export**

## 📝 타입 정의

### entities/user/types/user.types.ts

```typescript
// 도메인 모델
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

// API 요청/응답 타입
export interface UserListParams {
  page?: number;
  size?: number;
  sort?: string[];
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserListResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserUpdateRequest {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}
```

## 🌐 API 클라이언트 설정

### shared/api/client.ts

```typescript
import axios from 'axios';
import { toast } from '@learnway/ui';

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
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // 401 에러 처리
    if (response?.status === 401) {
      // 토큰 갱신 로직 또는 로그인 페이지로 이동
      window.location.href = '/login';
    }

    // 일반 에러 메시지
    if (response?.data?.message) {
      toast.error(response.data.message);
    }

    return Promise.reject(error);
  },
);
```

## 🔌 API 함수 구현

### entities/user/api/user.ts

```typescript
import { apiClient } from '@shared/api';
import type {
  User,
  UserListParams,
  UserListResponse,
  UserCreateRequest,
  UserUpdateRequest,
} from '../types';

export const userApi = {
  // 목록 조회
  getUsers: (params?: UserListParams) => apiClient.get<UserListResponse>('/users', { params }),

  // 상세 조회
  getUser: (id: string) => apiClient.get<User>(`/users/${id}`),

  // 생성
  createUser: (data: UserCreateRequest) => apiClient.post<User>('/users', data),

  // 수정
  updateUser: ({ id, ...data }: UserUpdateRequest) => apiClient.put<User>(`/users/${id}`, data),

  // 삭제
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};
```

## ⚛️ React Query 패턴

### entities/user/service/user.hook.ts

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@learnway/ui';
import { userApi } from '../api';
import type { UserListParams, UserCreateRequest, UserUpdateRequest } from '../types';

// Query Keys
export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (params?: UserListParams) => [...userQueryKeys.lists(), params] as const,
  details: () => [...userQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};

// Query Options
export const userQueryOptions = {
  getUsers: (params?: UserListParams) => ({
    queryKey: userQueryKeys.list(params),
    queryFn: async () => {
      const { data } = await userApi.getUsers(params);
      return data;
    },
  }),

  getUser: (id: string) => ({
    queryKey: userQueryKeys.detail(id),
    queryFn: async () => {
      const { data } = await userApi.getUser(id);
      return data;
    },
    enabled: !!id,
  }),
};

// 조회 훅
export const useUsers = (params?: UserListParams) => {
  return useQuery(userQueryOptions.getUsers(params));
};

export const useUser = (id: string) => {
  return useQuery(userQueryOptions.getUser(id));
};

// 생성 훅
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCreateRequest) => {
      const response = await userApi.createUser(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      toast.success('사용자가 생성되었습니다.');
    },
    onError: () => {
      toast.error('사용자 생성에 실패했습니다.');
    },
  });
};

// 수정 훅
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserUpdateRequest) => {
      const response = await userApi.updateUser(data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(variables.id) });
      toast.success('사용자 정보가 수정되었습니다.');
    },
    onError: () => {
      toast.error('사용자 수정에 실패했습니다.');
    },
  });
};

// 삭제 훅
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await userApi.deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
      toast.success('사용자가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('사용자 삭제에 실패했습니다.');
    },
  });
};
```

## 📤 Public API Export

### entities/user/index.ts

```typescript
// API
export { userApi } from './api/user';

// Types
export type {
  User,
  UserListParams,
  UserListResponse,
  UserCreateRequest,
  UserUpdateRequest,
} from './types';

export { UserRole, UserStatus } from './types';

// Hooks
export {
  userQueryKeys,
  userQueryOptions,
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from './service/user.hook';
```

## 💡 실제 사용 예시

### 목록 화면에서 사용

```typescript
// features/user-management/ui/user-list.tsx
import { useUsers } from '@entities/user';
import { useGridBox } from '@learnway/ui';

export const UserList = () => {
  const [searchParams, setSearchParams] = useState({});
  const { data, isLoading } = useUsers(searchParams);

  const { config, gridFetch } = useGridBox({
    query: userQueryOptions.getUsers,
    rowId: 'id',
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <SearchBox onSearch={setSearchParams} />
      <GridBox
        config={config}
        columns={columns}
        data={data?.content || []}
      />
    </>
  );
};
```

### 상세/등록 화면에서 사용

```typescript
// features/user-management/ui/user-detail.tsx
import { useUser, useCreateUser, useUpdateUser } from '@entities/user';

export const UserDetail = ({ mode, userId }: Props) => {
  // 조회
  const { data: user } = useUser(userId);

  // 뮤테이션
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const handleSubmit = (formData: any) => {
    if (mode === 'CREATE') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: userId, ...formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  );
};
```

## ⚠️ 에러 처리

### 전역 에러 처리

```typescript
// shared/lib/query-error-handler.ts
export const queryErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || '오류가 발생했습니다.';
    toast.error(message);
  }
};

// app/providers/query-provider.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
```

### 개별 에러 처리

```typescript
const { mutate } = useCreateUser();

// 커스텀 에러 처리
mutate(data, {
  onError: (error) => {
    if (error.response?.status === 409) {
      toast.error('이미 존재하는 이메일입니다.');
    }
  },
});
```

## ✅ 체크리스트

### API 레이어 구현 체크리스트

- [ ] 타입이 명확하게 정의되어 있는가?
- [ ] API 함수가 일관된 패턴으로 작성되었는가?
- [ ] React Query 훅이 적절히 구현되었는가?
- [ ] Public API를 통해서만 export 되는가?
- [ ] 에러 처리가 구현되어 있는가?

### 성능 최적화 체크리스트

- [ ] 적절한 캐싱 전략을 사용하는가?
- [ ] 불필요한 API 호출이 없는가?
- [ ] 쿼리 키가 명확하고 일관되는가?
- [ ] enabled 옵션을 적절히 사용하는가?

## ❗️ 주의사항

### 하지 말아야 할 것

```typescript
// ❌ 컴포넌트에서 직접 API 호출
const data = await axios.get('/users');

// ❌ API 함수에서 에러 처리
const getUsers = async () => {
  try {
    const { data } = await apiClient.get('/users');
    return data;
  } catch (error) {
    toast.error('에러 발생'); // React Query에서 처리해야 함
  }
};

// ❌ 중복된 쿼리 키
useQuery(['users'], ...);
useQuery(['user-list'], ...); // 같은 데이터에 다른 키 사용
```

### 반드시 해야 할 것

```typescript
// ✅ React Query 훅 사용
const { data } = useUsers();

// ✅ 일관된 쿼리 키 관리
const userQueryKeys = {
  all: ['users'] as const,
  list: (params) => [...userQueryKeys.all, 'list', params] as const,
};

// ✅ 타입 안전성 보장
const { data } = useQuery<User[]>(userQueryOptions.getUsers());
```
