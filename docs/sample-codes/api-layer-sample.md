# API 레이어 샘플 코드

## 개요

이 샘플 코드는 FSD(Feature-Sliced Design) 아키텍처의 **entities** 레이어 구현 방법을 보여줍니다. 
프로젝트에서 실제 사용하는 **httpService**, **Query Options**, **React Query 훅** 패턴을 완전히 반영한 실용적인 예제입니다.

## 주요 특징

- **프로젝트 표준 API 패턴**: httpService + Service 클래스 패턴
- **Query Options 분리**: 쿼리 키와 옵션 중앙 관리
- **React Query 훅**: 표준 명명 규칙과 반환 값 구조
- **TypeScript 타입 안전성**: 완전한 타입 정의
- **GridBox 호환성**: useGridBox 훅과 완벽 호환

## 구현 구조

```
src/entities/user/
├── api/
│   └── user.ts              # API 서비스 클래스
├── service/
│   ├── user.queries.ts      # Query Options 정의
│   └── user.hook.ts         # React Query 훅
├── types/
│   └── user.types.ts        # 타입 정의
└── index.ts                 # 엔티티 익스포트
```

---

## 1. 타입 정의 (entities/user/types/user.types.ts)

```typescript
// 사용자 기본 정보 타입
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// 검색 파라미터 타입 (GridBox 표준 형식)
export interface UserSearchParams {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  page?: number;
  size?: number;
  sort?: string[];  // GridBox 표준 정렬 형식: ['field,direction']
}

// API 응답 타입 (Spring Data 표준 페이징 형식)
export interface UserListResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
    };
  };
  sort: {
    sorted: boolean;
  };
}

// 사용자 생성 요청 타입
export interface UserCreateRequest {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
}

// 사용자 수정 요청 타입
export interface UserUpdateRequest {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
}
```

---

## 2. API 서비스 클래스 (entities/user/api/user.ts)

```typescript
import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';
import { User, UserListResponse, UserSearchParams, UserCreateRequest, UserUpdateRequest } from '../types/user.types';

// 사용자 서비스 클래스 (프로젝트 표준 패턴)
export default class UserService {
  // 사용자 목록 조회 API
  static fetchUsers(params: UserSearchParams): Promise<UserListResponse> {
    return httpService.get(`${PMSApiPrefix()}/users`, {
      page: params.page ?? 0,
      size: params.size ?? 20,
      ...params,
      // GridBox 표준 정렬 형식 유지
      sort: params.sort?.length ? params.sort : ['createdAt,desc'],
    });
  }

  // 사용자 상세 조회 API
  static fetchUser(userId: string): Promise<User> {
    return httpService.get(`${PMSApiPrefix()}/users/${userId}`);
  }

  // 사용자 생성 API
  static createUser(data: UserCreateRequest): Promise<User> {
    return httpService.post(`${PMSApiPrefix()}/users`, data);
  }

  // 사용자 수정 API
  static updateUser(data: UserUpdateRequest): Promise<User> {
    return httpService.put(`${PMSApiPrefix()}/users/${data.id}`, data);
  }

  // 사용자 삭제 API
  static deleteUser(userId: string): Promise<number> {
    return httpService.delete(`${PMSApiPrefix()}/users/${userId}`);
  }
}
```

---

## 3. Query Options 정의 (entities/user/service/user.queries.ts)

```typescript
import { UserSearchParams } from '../types/user.types';
import UserService from '../api/user';

// Query Keys 정의 (프로젝트 표준 패턴)
export const queryKeys = {
  users: ['users'] as const,
  usersList: (params: UserSearchParams) => ['users', 'list', params] as const,
  userDetail: (userId: string) => ['users', 'detail', userId] as const,
};

// Query Options 정의 (GridBox useGridBox 훅과 호환)
export const userQueryOptions = {
  getUsers: (params: UserSearchParams) => ({
    queryKey: queryKeys.usersList(params),
    queryFn: () => UserService.fetchUsers(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: true,
  }),
  getUser: (userId: string) => ({
    queryKey: queryKeys.userDetail(userId),
    queryFn: () => UserService.fetchUser(userId),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!userId,
  }),
};

// Mutation Options 정의
export const mutateOptions = {
  createUser: () => ({
    mutationFn: UserService.createUser,
  }),
  updateUser: () => ({
    mutationFn: UserService.updateUser,
  }),
  deleteUser: () => ({
    mutationFn: UserService.deleteUser,
  }),
};
```

---

## 4. React Query 훅 (entities/user/service/user.hook.ts)

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { userQueryOptions, mutateOptions, queryKeys } from './user.queries';
import { UserCreateRequest, UserUpdateRequest, UserSearchParams } from '../types/user.types';

// 사용자 목록 조회 훅 (GridBox와 호환)
export const useGetUsers = (params: UserSearchParams, options?: any) => {
  return useQuery({ ...userQueryOptions.getUsers(params), ...options });
};

// 사용자 상세 조회 훅
export const useGetUser = (userId: string, options?: any) => {
  return useQuery({ ...userQueryOptions.getUser(userId), ...options });
};

// 사용자 생성 훅
export const useCreateUser = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.createUser(),
    onSuccess: (data) => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('사용자가 등록되었습니다.');
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error('사용자 생성 실패:', error);
      toast.error('사용자 등록에 실패했습니다.');
    },
    ...options,
  });

  return {
    create: (payload: UserCreateRequest) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
};

// 사용자 수정 훅
export const useUpdateUser = (options?: { onSuccess?: (data: any) => void }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.updateUser(),
    onSuccess: (data) => {
      // 상세 및 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.userDetail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('사용자 정보가 수정되었습니다.');
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error('사용자 수정 실패:', error);
      toast.error('사용자 수정에 실패했습니다.');
    },
    ...options,
  });

  return {
    update: (payload: UserUpdateRequest) => mutation.mutate(payload as any),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
};

// 사용자 삭제 훅
export const useDeleteUser = (options?: any) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.deleteUser(),
    onSuccess: (data) => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('사용자가 삭제되었습니다.');
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error('사용자 삭제 실패:', error);
      toast.error('사용자 삭제에 실패했습니다.');
    },
    ...options,
  });

  return {
    ...mutation,
    delete: (userId: string) => mutation.mutate(userId as any),
  };
};
```

---

## 5. 엔티티 익스포트 (entities/user/index.ts)

```typescript
// API 서비스
export { default as UserService } from './api/user';

// React Query 훅
export {
  useGetUsers,
  useGetUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from './service/user.hook';

// Query Options (필요시 직접 사용)
export { userQueryOptions, queryKeys } from './service/user.queries';

// 타입 정의
export type {
  User,
  UserSearchParams,
  UserListResponse,
  UserCreateRequest,
  UserUpdateRequest,
} from './types/user.types';
```

---

## 사용법

### 1. GridBox에서 사용

```typescript
import { userQueryOptions } from '@entities/user';
import { useGridBox } from '@learnway/ui';

const gridConfig = {
  query: userQueryOptions.getUsers,
  rowId: 'id',
  gridState: {
    page: 0,
    size: 20,
    sort: ['createdAt,desc'],
  },
};

const { config: gConfig, gridFetch } = useGridBox<User>(gridConfig, getValues);
```

### 2. 컴포넌트에서 직접 사용

```typescript
import { useGetUsers, useCreateUser } from '@entities/user';

function UserComponent() {
  const { data: users, isLoading } = useGetUsers({ page: 0, size: 20 });
  const { create, isSuccess } = useCreateUser({
    onSuccess: (data) => {
      console.log('사용자 생성 성공:', data);
    }
  });

  const handleCreate = () => {
    create({
      name: '홍길동',
      email: 'hong@example.com',
      role: 'user',
      status: 'active',
    });
  };

  return (
    <div>
      {/* UI 구현 */}
    </div>
  );
}
```

### 3. 서비스 클래스 직접 사용

```typescript
import { UserService } from '@entities/user';

// 비동기 함수에서 직접 API 호출
async function fetchUserData() {
  try {
    const users = await UserService.fetchUsers({ page: 0, size: 10 });
    const user = await UserService.fetchUser('user-id');
    return { users, user };
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
}
```

## 핵심 포인트

### 1. 프로젝트 표준 준수
- **httpService** 사용으로 일관된 HTTP 통신
- **PMSApiPrefix()** 활용한 API 엔드포인트 관리
- **Service 클래스** 패턴으로 정적 메서드 구조

### 2. GridBox 완벽 호환
- **userQueryOptions.getUsers** 형태로 GridBox config에서 직접 사용 가능
- **GridBox 표준 파라미터** 형식 준수 (page, size, sort)
- **Spring Data 페이징** 응답 구조 지원

### 3. React Query 최적화
- **queryKeys** 중앙 관리로 캐시 키 일관성 확보
- **cacheTime: 0, staleTime: 0** 설정으로 실시간 데이터 보장
- **invalidateQueries** 활용한 효율적 캐시 관리

### 4. 개발자 경험 향상
- **명확한 반환 값 구조**: create, update, delete 메서드와 상태 값들
- **타입 안전성**: 완전한 TypeScript 지원
- **에러 처리**: toast 메시지와 콘솔 로깅 기본 제공

## 체크리스트

### API 레이어 구현
- [ ] httpService와 적절한 ApiPrefix 사용
- [ ] Service 클래스 패턴 적용
- [ ] 프로젝트 표준 타입 정의
- [ ] Spring Data 페이징 응답 구조 준수

### Query Options 구현  
- [ ] queryKeys 중앙 관리
- [ ] GridBox 호환 Query Options
- [ ] 적절한 cacheTime/staleTime 설정
- [ ] enabled 조건 정의

### React Query 훅 구현
- [ ] useGet prefix 명명 규칙 적용
- [ ] mutation 훅 표준 반환 값 구조
- [ ] queryClient invalidation 구현
- [ ] 에러 처리 및 사용자 피드백

### 엔티티 완성도
- [ ] 적절한 export 구조
- [ ] 타입 정의 완전성
- [ ] 사용 예제 문서화
- [ ] 실제 프로젝트 패턴 반영