---
applyTo: '**/src/**'
---

# 코딩 스타일 가이드

## 📋 목차

- [TypeScript 타입 정의](#typescript-타입-정의)
- [React 컴포넌트 작성](#react-컴포넌트-작성)
- [Hook 작성 규칙](#hook-작성-규칙)
- [프로젝트 표준 훅 활용](#프로젝트-표준-훅-활용)
- [상태 관리](#상태-관리)
- [에러 처리](#에러-처리)
- [네이밍 컨벤션](#네이밍-컨벤션)
- [Import 규칙](#import-규칙)

## 🏷️ TypeScript 타입 정의

### 1. 기본 타입 정의 원칙

```typescript
// ✅ 객체 구조 정의는 interface 사용
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

// ✅ 유니온 타입, 조건부 타입은 type 사용
type UserRole = 'ADMIN' | 'MANAGER' | 'USER';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
type ApiResponse<T> = T | { error: string };

// ✅ 컴포넌트 Props는 interface 사용
interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact';
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

### 2. 유틸리티 타입 활용

```typescript
// ✅ CRUD 타입 정의 패턴
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

// 생성용 타입 (id, 시간 필드 제외)
type UserCreateRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// 수정용 타입 (id는 필수, 나머지는 선택)
type UserUpdateRequest = Pick<User, 'id'> & Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// 필수 필드만 추출
type UserRequired = Required<Pick<User, 'name' | 'email'>>;
```

### 3. 제네릭 타입 활용

````typescript
// ✅ API 응답 공통 타입
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// ✅ 페이지네이션 공통 타입
export interface PaginationResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<T>;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  sort?: SortResponse;
  pageable?: {
    offset: number;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
    sort: SortResponse;
  };
}


## ⚛️ React 컴포넌트 작성

### 1. 기본 컴포넌트 구조

```
typescript
// ✅ 표준 컴포넌트 템플릿
interface UserListProps {
  searchParams?: UserSearchParams;
  onUserSelect?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  searchParams,
  onUserSelect
}) => {
  // 1. 상태 관리
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 2. API 호출 (React Query)
  const { data: users, isLoading, error } = useUsers(searchParams);

  // 3. 이벤트 핸들러
  const handleUserClick = useCallback((user: User) => {
    setSelectedId(user.id);
    onUserSelect?.(user);
  }, [onUserSelect]);

  // 4. 조건부 렌더링
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  // 5. 메인 렌더링
  return (
    <div className="user-list">
      {users?.map(user => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedId === user.id}
          onClick={() => handleUserClick(user)}
        />
      ))}
    </div>
  );
};
````

### 2. Props 기본값 처리

```typescript
// ✅ 구조분해 할당에서 기본값 설정
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// ❌ defaultProps 사용 금지 (React 18+)
```

### 3. forwardRef 패턴

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

### 1. 비즈니스 로직 훅

```typescript
// ✅ features/user-management/service/use-user-form.ts
interface UseUserFormOptions {
  mode: 'CREATE' | 'UPDATE';
  userId?: string;
  onSuccess?: (user: User) => void;
}

export const useUserForm = ({ mode, userId, onSuccess }: UseUserFormOptions) => {
  // React Query 뮤테이션
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        if (mode === 'CREATE') {
          const user = await createMutation.mutateAsync(data);
          onSuccess?.(user);
        } else if (userId) {
          const user = await updateMutation.mutateAsync({ id: userId, ...data });
          onSuccess?.(user);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [mode, userId, createMutation, updateMutation, onSuccess],
  );

  return {
    handleSubmit,
    isLoading: createMutation.isLoading || updateMutation.isLoading,
    error: createMutation.error || updateMutation.error,
  };
};
```

### 2. UI 상태 관리 훅

```typescript
// ✅ shared/hooks/use-toggle.ts
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse }] as const;
};

// ✅ 사용 예시
const [isOpen, { toggle, setTrue: open, setFalse: close }] = useToggle();
```

## 🛠️ 프로젝트 표준 훅 활용

### 1. useDynamicForm2 활용

```typescript
// ✅ 검색 폼
const searchFields = [
  [
    {
      name: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력하세요',
    },
    {
      name: 'role',
      label: '역할',
      type: 'select',
      options: [
        { value: '', label: '전체' },
        { value: 'admin', label: '관리자' },
        { value: 'user', label: '사용자' },
      ],
    },
  ],
];

export const UserSearchBox = ({ onSearch }: Props) => {
  const form = useDynamicForm2({
    builders: searchFields,
    defaultValues: {},
  });

  return (
    <SearchBox
      provider={form.provider}
      onSearch={onSearch}
    />
  );
};
```

### 2. useGridBox 활용

```typescript
// ✅ 목록 그리드
const gridConfig = {
  query: userQueryOptions.getUsers,
  rowId: 'id',
  gridState: {
    page: 0,
    size: 20,
    sort: ['createdAt,desc'],
  },
};

export const UserList = () => {
  const { provider, getValues } = useDynamicForm2();
  const { config: gConfig, gridFetch } = useGridBox<User>(gridConfig, getValues);

  const handleSearch = useCallback((data: any) => {
    gridFetch(data);
  }, [gridFetch]);

  return (
    <>
      <UserSearchBox onSearch={handleSearch} />
      <Divider />
      <GridBox
        config={gConfig}
        columns={columns}
        showNumberingColumn
        multiple
      />
    </>
  );
};
```

## 🗄️ 상태 관리

### 1. 로컬 상태 (useState)

```typescript
// ✅ 단순 상태
const [isLoading, setIsLoading] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);

// ✅ 객체 상태
interface FormState {
  name: string;
  email: string;
  errors: Record<string, string>;
}

const [formState, setFormState] = useState<FormState>({
  name: '',
  email: '',
  errors: {},
});

// 부분 업데이트 헬퍼
const updateField = useCallback((field: keyof FormState, value: any) => {
  setFormState((prev) => ({ ...prev, [field]: value }));
}, []);
```

### 2. 전역 상태 (Zustand)

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
    const user = await authApi.login(credentials);
    set({ user, isAuthenticated: true });
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

### 1. React Query 에러 처리

```typescript
// ✅ 전역 에러 처리
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || '오류가 발생했습니다.';
          toast.error(message);
        }
      },
    },
  },
});

// ✅ 개별 에러 처리
const { mutate } = useCreateUser({
  onError: (error) => {
    if (error.response?.status === 409) {
      toast.error('이미 존재하는 이메일입니다.');
    }
  },
});
```

### 2. ErrorBoundary 활용

```typescript
// ✅ shared/ui/error-boundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean; error?: Error }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}
```

## 📝 네이밍 컨벤션

### 1. 변수명

```typescript
// ✅ 기본 규칙
const userName = 'john_doe'; // camelCase
const MAX_RETRY_COUNT = 3; // 상수는 UPPER_SNAKE_CASE
const API_BASE_URL = process.env.API_URL;

// ✅ Boolean 변수
const isLoading = true;
const hasError = false;
const canEdit = user.role === 'admin';
const shouldRender = data.length > 0;

// ✅ 배열/컬렉션
const users = []; // 복수형
const userList = []; // 또는 List 접미사
const activeUsers = []; // 형용사 + 복수형
```

### 2. 함수명

```typescript
// ✅ CRUD 함수
const getUser = (id: string) => {}; // get: 조회
const createUser = (data: UserCreate) => {}; // create: 생성
const updateUser = (data: UserUpdate) => {}; // update: 수정
const deleteUser = (id: string) => {}; // delete: 삭제

// ✅ 이벤트 핸들러
const handleSubmit = () => {};
const handleUserClick = (user: User) => {};
const handleFormChange = (field: string, value: any) => {};

// ✅ Boolean 반환 함수
const isValidEmail = (email: string): boolean => {};
const hasPermission = (user: User, permission: string): boolean => {};
const canAccessPage = (user: User, page: string): boolean => {};
```

### 3. 컴포넌트 및 파일명

```typescript
// ✅ 컴포넌트명 (PascalCase)
export const UserList = () => {};
export const UserDetailModal = () => {};
export const CreateUserForm = () => {};

// ✅ 파일명 (kebab-case)
// user-list.tsx
// user-detail-modal.tsx
// create-user-form.tsx

// ✅ 훅 파일명
// use-user-form.ts
// use-user-list.ts
```

## 📦 Import 규칙

### Import 순서 및 그룹화

```typescript
// ✅ 표준 Import 순서
// 1. 외부 라이브러리
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// 2. 내부 라이브러리 (@learnway)
import { Button, Input, GridBox } from '@learnway/ui';
import { useDynamicForm2, useGridBox } from '@learnway/hooks';

// 3. FSD 계층 (상위 → 하위)
import { SomeWidget } from '@widgets/some-widget';
import { useUserForm } from '@features/user-management';
import { User, useUsers } from '@entities/user';
import { formatDate } from '@shared/lib';

// 4. 상대 경로
import { UserCard } from './user-card';
import { validateUser } from '../lib/validation';

// 5. 타입 import (별도 그룹)
import type { User, UserRole } from '@entities/user';
import type { ComponentProps } from 'react';
```

## ✅ 코드 품질 체크리스트

### TypeScript 체크리스트

- [ ] 모든 함수와 변수에 적절한 타입이 정의되어 있는가?
- [ ] `any` 타입을 사용하지 않았는가?
- [ ] 제네릭을 적절히 활용했는가?
- [ ] 유틸리티 타입을 효과적으로 사용했는가?

### React 컴포넌트 체크리스트

- [ ] 컴포넌트가 단일 책임 원칙을 따르고 있는가?
- [ ] Props 타입이 명확히 정의되어 있는가?
- [ ] useCallback, useMemo를 적절히 사용했는가?
- [ ] 프로젝트 표준 훅(useDynamicForm2, useGridBox)을 사용했는가?

### 네이밍 체크리스트

- [ ] 함수와 변수명이 명확하고 의도를 나타내는가?
- [ ] Boolean 변수에 is, has, can, should 접두사를 사용했는가?
- [ ] 이벤트 핸들러에 handle 접두사를 사용했는가?
- [ ] 컴포넌트명이 PascalCase, 파일명이 kebab-case인가?

### 코드 구조 체크리스트

- [ ] Import 순서가 올바른가?
- [ ] FSD 아키텍처 규칙을 준수하고 있는가?
- [ ] Public API를 통해서만 모듈을 import하고 있는가?
- [ ] 에러 처리가 적절히 구현되어 있는가?

## ❗️ 주의사항

### 하지 말아야 할 것

```typescript
// ❌ any 타입 사용
const data: any = await fetchData();

// ❌ 직접 API 호출
const data = await axios.get('/users');

// ❌ 컴포넌트 내 복잡한 비즈니스 로직
const UserList = () => {
  const handleSave = async () => {
    const result = await axios.post('/users', data);
    // 복잡한 로직...
  };
};

// ❌ 상대 경로로 FSD 경계 넘나들기
import { Button } from '../../../shared/ui';
```

### 반드시 해야 할 것

```typescript
// ✅ 명확한 타입 정의
const data: User[] = await fetchUsers();

// ✅ React Query 사용
const { data } = useUsers();

// ✅ 비즈니스 로직은 훅으로 분리
const useUserForm = () => {
  const { mutate } = useCreateUser();
  return { handleSave: mutate };
};

// ✅ 절대 경로 사용
import { Button } from '@shared/ui';
```
