---
applyTo: '**/src/**'
---

# 코딩 스타일 가이드

## 📋 목차

- [TypeScript 타입 정의](#typescript-타입-정의)
- [React 컴포넌트 작성](#react-컴포넌트-작성)
- [Hook 작성 규칙](#hook-작성-규칙)
- [상태 관리](#상태-관리)
- [에러 처리](#에러-처리)
- [네이밍 컨벤션](#네이밍-컨벤션)
- [파일 구조](#파일-구조)
- [코드 포맷팅](#코드-포맷팅)

## 🏷️ TypeScript 타입 정의

### 1. 인터페이스 vs 타입

```typescript
// ✅ 객체 모양 정의는 interface 사용
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ 유니온, 조건부 타입은 type 사용
type Status = 'pending' | 'success' | 'error';
type ApiResponse<T> = T | { error: string };

// ✅ 컴포넌트 Props는 interface 사용
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}
```

### 2. 제네릭 활용

```typescript
// ✅ API 응답 타입
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ✅ 목록 페이징 타입
interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageable: {
    page: number;
    size: number;
  };
}

// ✅ 모달 컴포넌트 타입
interface ModalProps<T = any> {
  isOpen: boolean;
  onClose: () => void;
  data?: T;
}
```

### 3. 유틸리티 타입 활용

```typescript
// ✅ 부분 업데이트용 타입
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;

// ✅ 생성용 타입 (id 제외)
type UserCreate = Omit<User, 'id'>;

// ✅ 필수 필드만 추출
type UserRequired = Required<Pick<User, 'name' | 'email'>>;
```

## ⚛️ React 컴포넌트 작성

### 1. 함수형 컴포넌트 기본 구조

```typescript
// ✅ 기본 구조 템플릿
interface ComponentNameProps {
  // props 타입 정의
  title: string;
  description?: string;
  onAction?: (id: string) => void;
}

export function ComponentName({ 
  title, 
  description, 
  onAction 
}: ComponentNameProps) {
  // 1. 상태 및 훅
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. 이벤트 핸들러
  const handleAction = useCallback((id: string) => {
    setIsLoading(true);
    onAction?.(id);
    setIsLoading(false);
  }, [onAction]);
  
  // 3. 조건부 렌더링
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // 4. 메인 렌더링
  return (
    <div className="component-container">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <button onClick={() => handleAction('example')}>
        Action
      </button>
    </div>
  );
}
```

### 2. Props 기본값 처리

```typescript
// ✅ 추천: 구조분해 할당에서 기본값
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      {...props}
    />
  );
}

// ❌ 지양: defaultProps 사용 금지 (React 18+)
Button.defaultProps = {
  variant: 'primary'
};
```

### 3. forwardRef 사용

```typescript
// ✅ DOM 요소 ref 전달이 필요한 경우
interface InputProps extends 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className="input-group">
        <label>{label}</label>
        <input 
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

## 🎣 Hook 작성 규칙

### 1. 커스텀 훅 구조

```typescript
// ✅ 커스텀 훅 기본 템플릿
interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useApi<T>(
  url: string, 
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<T>(url);
      setData(response.data);
      options.onSuccess?.(response.data);
      
    } catch (err) {
      const error = err as Error;
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  useEffect(() => {
    if (options.enabled !== false) {
      fetch();
    }
  }, [fetch, options.enabled]);
  
  return {
    data,
    loading,
    error,
    refetch: fetch,
  };
}
```

### 2. React Query 훅 패턴

```typescript
// ✅ entities/user/service/user.hook.ts
export function useFetchUsers(params?: UserSearchParams) {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    enabled: !!params,
  });
}

export function useCreateUser(options?: UseMutationOptions<User, Error, UserCreate>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      options?.onSuccess?.(data);
    },
    ...options,
  });
}

export function useUpdateUser(options?: UseMutationOptions<User, Error, UserUpdate>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdate }) => 
      userApi.updateUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      queryClient.setQueryData(queryKeys.detail(variables.id), data);
      options?.onSuccess?.(data, variables);
    },
    ...options,
  });
}
```

## 🗄️ 상태 관리

### 1. useState 패턴

```typescript
// ✅ 객체 상태 관리
interface FormState {
  name: string;
  email: string;
  errors: Record<string, string>;
}

function UserForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    errors: {},
  });
  
  // ✅ 부분 업데이트 헬퍼
  const updateField = useCallback((field: keyof FormState, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);
  
  // ✅ 에러 상태 관리
  const setFieldError = useCallback((field: string, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  }, []);
}
```

### 2. Zustand 스토어 패턴

```typescript
// ✅ shared/store/auth-store.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (credentials) => {
    try {
      const user = await authApi.login(credentials);
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },
  
  logout: () => {
    authApi.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (data) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...data } });
    }
  },
}));
```

## ⚠️ 에러 처리

### 1. ErrorBoundary 활용

```typescript
// ✅ shared/ui/error-boundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>문제가 발생했습니다</h2>
          <details>
            {this.state.error?.message}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            다시 시도
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### 2. 에러 처리 패턴

```typescript
// ✅ API 에러 처리
async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string = '요청 처리 중 오류가 발생했습니다'
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || errorMessage;
      toast.error(message);
    } else {
      toast.error(errorMessage);
    }
    console.error('API Error:', error);
    return null;
  }
}

// ✅ 사용 예시
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      return handleApiCall(
        () => userApi.deleteUser(id),
        '사용자 삭제 중 오류가 발생했습니다'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('사용자가 삭제되었습니다');
    },
  });
}
```

## 📝 네이밍 컨벤션

### 1. 변수명

```typescript
// ✅ 변수명 규칙
const userName = 'john_doe';           // camelCase
const MAX_RETRY_COUNT = 3;             // 상수는 UPPER_SNAKE_CASE
const API_BASE_URL = process.env.API_URL;

// ✅ Boolean 변수
const isLoading = true;
const hasError = false; 
const canEdit = user.role === 'admin';
const shouldRender = data.length > 0;

// ✅ 배열/컬렉션
const users = [];           // 복수형
const userList = [];        // 또는 List 접미사
const activeUsers = [];     // 형용사 + 복수형
```

### 2. 함수명

```typescript
// ✅ 함수명 규칙
function getUser(id: number) {}         // get: 조회
function createUser(data: UserCreate) {} // create: 생성
function updateUser(id: number, data: UserUpdate) {} // update: 수정
function deleteUser(id: number) {}      // delete: 삭제

// ✅ 이벤트 핸들러
function handleSubmit() {}
function handleUserClick(user: User) {}
function handleFormChange(field: string, value: any) {}

// ✅ Boolean 반환 함수
function isValidEmail(email: string): boolean {}
function hasPermission(user: User, permission: string): boolean {}
function canAccessPage(user: User, page: string): boolean {}
```

### 3. 컴포넌트명

```typescript
// ✅ 컴포넌트명 (PascalCase)
export function UserList() {}
export function UserDetailModal() {}
export function CreateUserForm() {}

// ✅ 파일명 (kebab-case)
// user-list.tsx
// user-detail-modal.tsx  
// create-user-form.tsx
```

## 📁 파일 구조

### 1. 컴포넌트 파일 구조

```typescript
// ✅ features/user-management/ui/user-list.tsx
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// 1. 타입 정의 (인터페이스)
interface UserListProps {
  onUserSelect?: (user: User) => void;
}

interface UserListState {
  selectedId: number | null;
  searchTerm: string;
}

// 2. 메인 컴포넌트
export function UserList({ onUserSelect }: UserListProps) {
  // 2-1. 상태
  const [state, setState] = useState<UserListState>({
    selectedId: null,
    searchTerm: '',
  });
  
  // 2-2. 쿼리/뮤테이션
  const { data: users, isLoading } = useQuery({
    queryKey: ['users', state.searchTerm],
    queryFn: () => fetchUsers({ search: state.searchTerm }),
  });
  
  // 2-3. 이벤트 핸들러
  const handleUserClick = useCallback((user: User) => {
    setState(prev => ({ ...prev, selectedId: user.id }));
    onUserSelect?.(user);
  }, [onUserSelect]);
  
  const handleSearch = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  }, []);
  
  // 2-4. 렌더링
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="user-list">
      <SearchInput onSearch={handleSearch} />
      <div className="user-grid">
        {users?.map(user => (
          <UserCard 
            key={user.id}
            user={user}
            isSelected={state.selectedId === user.id}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </div>
    </div>
  );
}

// 3. 서브 컴포넌트 (같은 파일 내)
interface UserCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

function UserCard({ user, isSelected, onClick }: UserCardProps) {
  return (
    <div 
      className={`user-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

### 2. 파일 정리 및 Export

```typescript
// ✅ features/user-management/index.ts
export { UserList } from './ui/user-list';
export { UserDetailModal } from './ui/user-detail-modal';
export { CreateUserForm } from './ui/create-user-form';

export { useCreateUser, useUpdateUser, useDeleteUser } from './hooks/user-mutations';

export type { UserListProps, UserDetailModalProps } from './ui/types';
```

## 🎨 코드 포맷팅

### 1. Prettier 설정 준수

```typescript
// ✅ 올바른 포맷팅
const longObject = {
  firstName: 'John',
  lastName: 'Doe', 
  email: 'john.doe@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zipCode: '12345',
  },
};

// ✅ 함수 매개변수 포맷팅
function createUser({
  name,
  email,
  role,
  permissions,
}: {
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}) {
  // 함수 내용
}
```

### 2. Import 정리

```typescript
// ✅ Import 순서
// 1. 외부 라이브러리
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// 2. 내부 라이브러리 (@learnway)
import { Button, Input } from '@learnway/ui';
import { useModal } from '@learnway/hooks';

// 3. 프로젝트 내부 (FSD 계층 순서)
import { UserDetailModal } from '@widgets/user';
import { useCreateUser } from '@features/user-management';
import { User } from '@entities/user';
import { formatDate } from '@shared/lib';

// 4. 상대 경로
import { UserCard } from './user-card';
import { validateUser } from '../lib/validation';

// 5. 타입 import (별도 그룹)
import type { UserListProps } from './types';
import type { ComponentProps } from 'react';
```

## ✅ 코드 리뷰 체크리스트

### TypeScript 체크리스트
- [ ] 모든 함수와 변수에 적절한 타입이 정의되어 있는가?
- [ ] `any` 타입을 사용하지 않았는가?
- [ ] 제네릭을 적절히 활용했는가?
- [ ] 유틸리티 타입을 효과적으로 사용했는가?

### React 체크리스트
- [ ] 컴포넌트가 단일 책임 원칙을 따르고 있는가?
- [ ] Props 타입이 명확히 정의되어 있는가?
- [ ] useCallback, useMemo를 적절히 사용했는가?
- [ ] 조건부 렌더링이 명확한가?

### 코드 품질 체크리스트
- [ ] 함수와 변수명이 명확하고 의도를 나타내는가?
- [ ] 매직 넘버나 하드코딩된 문자열이 없는가?
- [ ] 에러 처리가 적절히 구현되어 있는가?
- [ ] 코드가 ESLint와 Prettier 규칙을 준수하는가?

### 성능 체크리스트
- [ ] 불필요한 리렌더링이 발생하지 않는가?
- [ ] 무한 루프나 메모리 누수 위험이 없는가?
- [ ] 이벤트 리스너가 적절히 정리되고 있는가?