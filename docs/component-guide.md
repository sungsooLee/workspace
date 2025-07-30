---
applyTo: '**/src/**'
---

# 컴포넌트 작성 가이드

## 📋 목차

- [컴포넌트 아키텍처](#컴포넌트-아키텍처)
- [Props 설계](#props-설계)
- [상태 관리](#상태-관리)
- [이벤트 처리](#이벤트-처리)
- [렌더링 최적화](#렌더링-최적화)
- [접근성](#접근성)
- [테스팅](#테스팅)
- [스타일링](#스타일링)

## 🏗️ 컴포넌트 아키텍처

### 1. 컴포넌트 분류

```typescript
// ✅ 1. Presentation Component (UI만 담당)
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant, 
  size, 
  disabled = false, 
  children, 
  onClick 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ 2. Container Component (로직 담당)
export function UserListContainer() {
  const { data: users, isLoading } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (userId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteUser(userId);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <UserList 
      users={users || []}
      onDelete={handleDelete}
    />
  );
}

// ✅ 3. Compound Component (복합 컴포넌트)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
}

interface CardFooterProps {
  children: React.ReactNode;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <div className="card-header">{children}</div>;
};

Card.Content = function CardContent({ children }: CardContentProps) {
  return <div className="card-content">{children}</div>;
};

Card.Footer = function CardFooter({ children }: CardFooterProps) {
  return <div className="card-footer">{children}</div>;
};

// 사용 예시
function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <Card.Header>
        <h3>{user.name}</h3>
      </Card.Header>
      <Card.Content>
        <p>{user.email}</p>
        <p>{user.department}</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">수정</Button>
        <Button variant="danger">삭제</Button>
      </Card.Footer>
    </Card>
  );
}
```

### 2. HOC 패턴 (고차 컴포넌트)

```typescript
// ✅ 권한 확인 HOC
interface WithPermissionProps {
  permission: string;
  fallback?: React.ReactNode;
}

export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: string,
  fallback?: React.ReactNode
) {
  return function WithPermissionComponent(props: P) {
    const { hasPermission } = useAuth();

    if (!hasPermission(permission)) {
      return fallback || <div>접근 권한이 없습니다.</div>;
    }

    return <Component {...props} />;
  };
}

// 사용 예시
const ProtectedUserForm = withPermission(
  UserForm, 
  'USER_WRITE',
  <div>사용자 관리 권한이 필요합니다.</div>
);

// ✅ 로딩 상태 HOC
export function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(
    props: P & { isLoading?: boolean; loadingComponent?: React.ReactNode }
  ) {
    const { isLoading, loadingComponent, ...restProps } = props;

    if (isLoading) {
      return loadingComponent || <LoadingSpinner />;
    }

    return <Component {...(restProps as P)} />;
  };
}
```

### 3. Render Props 패턴

```typescript
// ✅ 데이터 페칭 컴포넌트
interface DataFetcherProps<T> {
  url: string;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return children({ data, loading, error });
}

// 사용 예시
function UserProfile({ userId }: { userId: number }) {
  return (
    <DataFetcher<User> url={`/api/users/${userId}`}>
      {({ data: user, loading, error }) => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage error={error} />;
        if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

        return (
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        );
      }}
    </DataFetcher>
  );
}
```

## 🎛️ Props 설계

### 1. Props 인터페이스 설계

```typescript
// ✅ 기본 Props 설계
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

interface UserFormProps extends BaseComponentProps {
  user?: User;
  mode: 'create' | 'edit' | 'view';
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// ✅ 제네릭 Props
interface SelectProps<T> extends BaseComponentProps {
  options: Array<{
    value: T;
    label: string;
    disabled?: boolean;
  }>;
  value?: T;
  placeholder?: string;
  multiple?: boolean;
  onChange: (value: T | T[]) => void;
  renderOption?: (option: { value: T; label: string }) => React.ReactNode;
}

export function Select<T>({ 
  options, 
  value, 
  placeholder, 
  multiple = false,
  onChange,
  renderOption,
  ...props 
}: SelectProps<T>) {
  // 구현...
}
```

### 2. Props 유효성 검사

```typescript
// ✅ 런타임 Props 검증 (Zod 활용)
import { z } from 'zod';

const UserFormDataSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  email: z.string().email('유효한 이메일을 입력하세요'),
  age: z.number().min(0).max(150),
  department: z.string().optional(),
});

type UserFormData = z.infer<typeof UserFormDataSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}

export function UserForm({ initialData, onSubmit }: UserFormProps) {
  const handleSubmit = (formData: unknown) => {
    try {
      const validatedData = UserFormDataSchema.parse(formData);
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 유효성 검사 오류 처리
        console.error('Validation errors:', error.errors);
      }
    }
  };

  // 폼 렌더링...
}
```

### 3. Polymorphic Props

```typescript
// ✅ 다형성 컴포넌트 (as prop)
type As<Props = any> = React.ElementType<Props>;

interface PolymorphicProps<T extends As> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
}

type ComponentProps<T extends As> = PolymorphicProps<T> &
  Omit<React.ComponentProps<T>, keyof PolymorphicProps<T>>;

export function Text<T extends As = 'span'>({
  as,
  children,
  className = '',
  ...props
}: ComponentProps<T>) {
  const Component = as || 'span';
  
  return (
    <Component className={`text ${className}`} {...props}>
      {children}
    </Component>
  );
}

// 사용 예시
function Example() {
  return (
    <>
      <Text>기본 span</Text>
      <Text as="h1">제목으로 사용</Text>
      <Text as="p">문단으로 사용</Text>
      <Text as="button" onClick={() => {}}>버튼으로 사용</Text>
    </>
  );
}
```

## 🗄️ 상태 관리

### 1. 로컬 상태 관리

```typescript
// ✅ 복합 상태 관리
interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

export function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: z.ZodSchema<T>
) {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const setValue = useCallback((name: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: '' }, // 에러 클리어
    }));
  }, []);

  const setTouched = useCallback((name: keyof T) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const validate = useCallback(() => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(state.values);
      setState(prev => ({ ...prev, errors: {} }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => {
          const path = err.path.join('.');
          acc[path] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        setState(prev => ({ ...prev, errors }));
      }
      return false;
    }
  }, [state.values, validationSchema]);

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  return {
    ...state,
    setValue,
    setTouched,
    validate,
    reset,
    setSubmitting: (isSubmitting: boolean) =>
      setState(prev => ({ ...prev, isSubmitting })),
  };
}
```

### 2. 상태 끌어올리기

```typescript
// ✅ 상태 공유가 필요한 경우
interface SearchState {
  query: string;
  filters: {
    category?: string;
    status?: string;
    dateRange?: [Date, Date];
  };
  results: SearchResult[];
  isLoading: boolean;
}

// 부모 컴포넌트에서 상태 관리
export function SearchPage() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: {},
    results: [],
    isLoading: false,
  });

  const updateQuery = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  }, []);

  const updateFilters = useCallback((filters: Partial<SearchState['filters']>) => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  }, []);

  return (
    <div className="search-page">
      <SearchInput 
        value={searchState.query}
        onChange={updateQuery}
      />
      
      <SearchFilters
        filters={searchState.filters}
        onChange={updateFilters}
      />
      
      <SearchResults
        results={searchState.results}
        isLoading={searchState.isLoading}
      />
    </div>
  );
}
```

## 🎯 이벤트 처리

### 1. 이벤트 핸들러 패턴

```typescript
// ✅ 이벤트 핸들러 네이밍과 구조
interface UserListProps {
  users: User[];
  onUserClick?: (user: User, event: React.MouseEvent) => void;
  onUserEdit?: (userId: number) => void;
  onUserDelete?: (userId: number) => void;
  onSelectionChange?: (selectedIds: number[]) => void;
}

export function UserList({
  users,
  onUserClick,
  onUserEdit,
  onUserDelete,
  onSelectionChange,
}: UserListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // ✅ 이벤트 핸들러 생성 팩토리
  const createUserClickHandler = (user: User) => (event: React.MouseEvent) => {
    onUserClick?.(user, event);
  };

  const createEditHandler = (userId: number) => () => {
    onUserEdit?.(userId);
  };

  const createDeleteHandler = (userId: number) => () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUserDelete?.(userId);
    }
  };

  // ✅ 선택 상태 관리
  const handleSelectionToggle = (userId: number) => {
    setSelectedIds(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      
      onSelectionChange?.(Array.from(newSelection));
      return newSelection;
    });
  };

  return (
    <div className="user-list">
      {users.map(user => (
        <div 
          key={user.id}
          className="user-item"
          onClick={createUserClickHandler(user)}
        >
          <input
            type="checkbox"
            checked={selectedIds.has(user.id)}
            onChange={() => handleSelectionToggle(user.id)}
            onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
          />
          
          <span>{user.name}</span>
          
          <div className="user-actions">
            <button onClick={createEditHandler(user.id)}>
              수정
            </button>
            <button onClick={createDeleteHandler(user.id)}>
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 2. 폼 이벤트 처리

```typescript
// ✅ 폼 이벤트 처리 패턴
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({ onSubmit }: { onSubmit: (data: ContactFormData) => void }) {
  const { values, errors, setValue, validate, isSubmitting } = useFormState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  // ✅ 입력 변경 핸들러
  const handleInputChange = (name: keyof ContactFormData) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, event.target.value);
    };

  // ✅ 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  // ✅ 키보드 이벤트 처리
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      handleSubmit(event as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="form-field">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleInputChange('name')}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={handleInputChange('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="message">메시지</label>
        <textarea
          id="message"
          value={values.message}
          onChange={handleInputChange('message')}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '전송 중...' : '전송'}
      </button>
    </form>
  );
}
```

## ⚡ 렌더링 최적화

### 1. React.memo 활용

```typescript
// ✅ React.memo 적용 기준
interface UserCardProps {
  user: User;
  isSelected: boolean;
  onSelect: (userId: number) => void;
  onEdit: (userId: number) => void;
}

// 단순 props 비교로 충분한 경우
export const UserCard = React.memo(function UserCard({
  user,
  isSelected,
  onSelect,
  onEdit,
}: UserCardProps) {
  return (
    <div className={`user-card ${isSelected ? 'selected' : ''}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onSelect(user.id)}>선택</button>
      <button onClick={() => onEdit(user.id)}>수정</button>
    </div>
  );
});

// ✅ 커스텀 비교 함수가 필요한 경우
interface ComplexComponentProps {
  data: ComplexData;
  config: ComponentConfig;
  onAction: (action: Action) => void;
}

export const ComplexComponent = React.memo(
  function ComplexComponent({ data, config, onAction }: ComplexComponentProps) {
    // 컴포넌트 구현...
  },
  (prevProps, nextProps) => {
    // 데이터의 특정 필드만 비교
    return (
      prevProps.data.id === nextProps.data.id &&
      prevProps.data.version === nextProps.data.version &&
      prevProps.config.theme === nextProps.config.theme
    );
  }
);
```

### 2. useMemo와 useCallback 최적화

```typescript
// ✅ 계산 비용이 높은 작업의 메모이제이션
interface DataTableProps {
  data: TableRow[];
  filters: FilterConfig;
  sortConfig: SortConfig;
}

export function DataTable({ data, filters, sortConfig }: DataTableProps) {
  // ✅ 필터링과 정렬이 비싼 연산인 경우
  const processedData = useMemo(() => {
    let result = data;
    
    // 필터링
    if (filters.category) {
      result = result.filter(item => item.category === filters.category);
    }
    if (filters.searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    // 정렬
    if (sortConfig.field) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        
        if (sortConfig.direction === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    return result;
  }, [data, filters, sortConfig]);

  // ✅ 이벤트 핸들러 메모이제이션
  const handleSort = useCallback((field: string) => {
    // 정렬 로직...
  }, [sortConfig]);

  const handleFilter = useCallback((filterName: string, value: any) => {
    // 필터 로직...
  }, [filters]);

  return (
    <div>
      <DataTableHeader
        onSort={handleSort}
        onFilter={handleFilter}
        sortConfig={sortConfig}
      />
      <DataTableBody data={processedData} />
    </div>
  );
}
```

### 3. 가상화 (Virtualization)

```typescript
// ✅ 대용량 리스트 가상화
import { FixedSizeList as List } from 'react-window';

interface VirtualizedListProps {
  items: ListItem[];
  itemHeight: number;
  height: number;
}

export function VirtualizedList({ items, itemHeight, height }: VirtualizedListProps) {
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    
    return (
      <div style={style} className="list-item">
        <ListItemComponent item={item} />
      </div>
    );
  }, [items]);

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

## ♿ 접근성

### 1. ARIA 속성 활용

```typescript
// ✅ 접근 가능한 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // 포커스 트랩
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="modal-close"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 2. 키보드 네비게이션

```typescript
// ✅ 키보드 접근 가능한 드롭다운
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({ trigger, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        }
        // 다음 항목으로 포커스 이동 로직
        break;
      case 'ArrowUp':
        // 이전 항목으로 포커스 이동 로직
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-menu"
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </div>
      )}
    </div>
  );
}
```

## 🧪 테스팅

### 1. 컴포넌트 테스트 구조

```typescript
// ✅ UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './user-card';

const mockUser: User = {
  id: 1,
  name: '홍길동',
  email: 'hong@example.com',
  department: '개발팀',
};

describe('UserCard', () => {
  const mockOnSelect = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('사용자 정보를 올바르게 렌더링한다', () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onSelect={mockOnSelect}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
    expect(screen.getByText('개발팀')).toBeInTheDocument();
  });

  it('선택 버튼 클릭 시 onSelect 콜백이 호출된다', () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onSelect={mockOnSelect}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '선택' }));
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it('선택된 상태일 때 적절한 클래스가 적용된다', () => {
    const { container } = render(
      <UserCard
        user={mockUser}
        isSelected={true}
        onSelect={mockOnSelect}
        onEdit={mockOnEdit}
      />
    );

    expect(container.firstChild).toHaveClass('selected');
  });
});
```

### 2. 사용자 상호작용 테스트

```typescript
// ✅ SearchForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('검색어 입력 후 엔터 키를 누르면 검색이 실행된다', async () => {
    const user = userEvent.setup();
    
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
    
    await user.type(searchInput, '홍길동');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('홍길동');
  });

  it('검색 버튼 클릭 시 검색이 실행된다', async () => {
    const user = userEvent.setup();
    
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
    const searchButton = screen.getByRole('button', { name: '검색' });
    
    await user.type(searchInput, '홍길동');
    await user.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('홍길동');
  });

  it('디바운스된 검색이 올바르게 동작한다', async () => {
    const user = userEvent.setup();
    
    render(<SearchForm onSearch={mockOnSearch} debounceMs={300} />);
    
    const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
    
    // 빠르게 여러 글자 입력
    await user.type(searchInput, '홍길동');
    
    // 디바운스 시간 대기
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('홍길동');
    }, { timeout: 500 });
    
    // 한 번만 호출되어야 함
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
```

## 🎨 스타일링

### 1. CSS-in-JS 패턴

```typescript
// ✅ Tailwind CSS를 활용한 조건부 스타일링
import { clsx } from 'clsx';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant,
  size,
  fullWidth = false,
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const className = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 2. CSS 변수와 테마

```typescript
// ✅ CSS 변수를 활용한 테마 시스템
interface ThemeProviderProps {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`theme-${theme}`}>
      {children}
    </div>
  );
}

// CSS에서 테마 변수 정의
/*
:root {
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-text: #111827;
}

.dark {
  --color-primary: #60a5fa;
  --color-background: #111827;
  --color-text: #f9fafb;
}

.themed-component {
  background-color: var(--color-background);
  color: var(--color-text);
}
*/
```

## ✅ 체크리스트

### 컴포넌트 설계 체크리스트
- [ ] 단일 책임 원칙을 따르는가?
- [ ] Props가 명확하고 타입이 정의되어 있는가?
- [ ] 재사용 가능하게 설계되었는가?
- [ ] 적절한 기본값이 설정되어 있는가?

### 성능 체크리스트
- [ ] 불필요한 리렌더링이 발생하지 않는가?
- [ ] React.memo, useMemo, useCallback이 적절히 사용되었는가?
- [ ] 큰 데이터셋에 대해 가상화를 고려했는가?

### 접근성 체크리스트
- [ ] 키보드로 모든 기능에 접근할 수 있는가?
- [ ] 적절한 ARIA 속성이 설정되어 있는가?
- [ ] 스크린 리더 사용자를 고려했는가?
- [ ] 색상만으로 정보를 전달하지 않는가?

### 테스트 체크리스트
- [ ] 주요 사용자 상호작용이 테스트되었는가?
- [ ] 에러 상태와 로딩 상태가 테스트되었는가?
- [ ] 접근성 관련 기능이 테스트되었는가?