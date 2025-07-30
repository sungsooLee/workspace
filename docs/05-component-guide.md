# 컴포넌트 작성 가이드

## 📋 목차

- [FSD에서의 컴포넌트 분류](#fsd에서의-컴포넌트-분류)
- [컴포넌트 설계 원칙](#컴포넌트-설계-원칙)
- [Props 설계 패턴](#props-설계-패턴)
- [프로젝트 표준 컴포넌트 활용](#프로젝트-표준-컴포넌트-활용)
- [상태 관리](#상태-관리)
- [렌더링 최적화](#렌더링-최적화)
- [접근성](#접근성)
- [테스팅 전략](#테스팅-전략)

## 🏗️ FSD에서의 컴포넌트 분류

### 1. Shared UI 컴포넌트

```typescript
// ✅ shared/ui/button/button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};
```

### 2. Feature 컴포넌트

```typescript
// ✅ features/user-management/ui/user-list.tsx
interface UserListProps {
  searchParams?: UserSearchParams;
  onUserSelect?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  searchParams,
  onUserSelect
}) => {
  // API 호출
  const { data: users, isLoading } = useUsers(searchParams);

  // 로컬 상태
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 이벤트 핸들러
  const handleUserClick = useCallback((user: User) => {
    setSelectedId(user.id);
    onUserSelect?.(user);
  }, [onUserSelect]);

  if (isLoading) return <LoadingSpinner />;

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
```

### 3. Widget 컴포넌트

```typescript
// ✅ widgets/user-management/ui/user-management-widget.tsx
export const UserManagementWidget: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'detail'>('list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="user-management-widget">
      <div className="widget-header">
        <h2>사용자 관리</h2>
        <Button onClick={() => setMode('detail')}>
          사용자 추가
        </Button>
      </div>

      <div className="widget-content">
        {mode === 'list' ? (
          <UserList onUserSelect={(user) => {
            setSelectedUser(user);
            setMode('detail');
          }} />
        ) : (
          <UserDetailForm
            user={selectedUser}
            onClose={() => setMode('list')}
          />
        )}
      </div>
    </div>
  );
};
```

## 🎯 컴포넌트 설계 원칙

### 1. 단일 책임 원칙

```typescript
// ✅ 올바른 분리
// 데이터 로직과 UI 분리
export const useUserList = (searchParams?: UserSearchParams) => {
  const { data, isLoading, error } = useUsers(searchParams);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return {
    users: data || [],
    isLoading,
    error,
    selectedIds,
    toggleSelection,
  };
};

// UI 컴포넌트
export const UserList: React.FC<UserListProps> = ({ onUserSelect }) => {
  const { users, isLoading, selectedIds, toggleSelection } = useUserList();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={selectedIds.has(user.id)}
          onToggle={() => toggleSelection(user.id)}
          onSelect={() => onUserSelect?.(user)}
        />
      ))}
    </div>
  );
};
```

### 2. 컴포지션 패턴

```typescript
// ✅ 복합 컴포넌트 패턴
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
} = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

Card.Header = ({ children }) => (
  <div className="card-header">{children}</div>
);

Card.Content = ({ children }) => (
  <div className="card-content">{children}</div>
);

Card.Footer = ({ children }) => (
  <div className="card-footer">{children}</div>
);

// 사용 예시
export const UserCard: React.FC<{ user: User }> = ({ user }) => {
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
};
```

## 🎛️ Props 설계 패턴

### 1. 기본 Props 인터페이스

```typescript
// ✅ 표준 Props 패턴
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface UserFormProps extends BaseProps {
  user?: User;
  mode: 'CREATE' | 'UPDATE' | 'VIEW';
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// 기본값 처리
export const UserForm: React.FC<UserFormProps> = ({
  user,
  mode,
  onSubmit,
  onCancel,
  disabled = false,
  loading = false,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  return (
    <form
      className={`user-form ${className}`}
      data-testid={testId}
      {...props}
    >
      {/* 폼 내용 */}
    </form>
  );
};
```

### 2. 제네릭 Props

```typescript
// ✅ 재사용 가능한 제네릭 컴포넌트
interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value?: T;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: T) => void;
  renderOption?: (option: SelectOption<T>) => React.ReactNode;
}

export function Select<T>({
  options,
  value,
  placeholder,
  disabled = false,
  onChange,
  renderOption,
}: SelectProps<T>) {
  return (
    <select disabled={disabled} onChange={(e) => {
      const selectedOption = options.find(opt =>
        String(opt.value) === e.target.value
      );
      if (selectedOption) {
        onChange(selectedOption.value);
      }
    }}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={String(option.value)}>
          {renderOption ? renderOption(option) : option.label}
        </option>
      ))}
    </select>
  );
}
```

## 🛠️ 프로젝트 표준 컴포넌트 활용

### 1. SearchBox + Divider + GridBox 패턴

```typescript
// ✅ 표준 목록 화면 패턴
export const UserManagementPage: React.FC = () => {
  // 검색 폼
  const searchForm = useDynamicForm2({
    builders: searchFields,
    defaultValues: {},
  });

  // 그리드 설정
  const { config: gridConfig, gridFetch } = useGridBox({
    query: userQueryOptions.getUsers,
    rowId: 'id',
    gridState: {
      page: 0,
      size: 20,
      sort: ['createdAt,desc'],
    },
  }, searchForm.getValues);

  const handleSearch = useCallback((searchData: any) => {
    gridFetch(searchData);
  }, [gridFetch]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button variant="primary" onClick={() => openCreateModal()}>
          사용자 등록
        </Button>
      </ContentsButtons>

      <MainContents>
        <SearchBox
          provider={searchForm.provider}
          onSearch={handleSearch}
        />
        <Divider />
        <GridBox
          config={gridConfig}
          columns={columns}
          showNumberingColumn
          multiple
          onRowDoubleClick={handleRowDoubleClick}
        />
      </MainContents>
    </PageContainer>
  );
};
```

### 2. FormRow2와 ContentsRow 활용

```typescript
// ✅ 표준 폼 레이아웃 패턴
export const UserDetailForm: React.FC<UserDetailFormProps> = ({
  form,
  mode,
  userInfo,
}) => {
  const { provider } = form;

  return (
    <div className="user-detail-form">
      {/* 첫 번째 행 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="name"
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          validation={{ required: '사용자명은 필수입니다.' }}
          element={<Input />}
        />
        <FormRow2
          provider={provider}
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          validation={{
            required: '이메일은 필수입니다.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식을 입력하세요.'
            }
          }}
          element={<Input />}
        />
      </ContentsRow>

      {/* 두 번째 행 */}
      <ContentsRow>
        <FormRow2
          provider={provider}
          name="role"
          label="역할"
          validation={{ required: '역할은 필수입니다.' }}
          element={<Select options={roleOptions} />}
        />
        <FormRow2
          provider={provider}
          name="status"
          label="상태"
          validation={{ required: '상태는 필수입니다.' }}
          element={<Select options={statusOptions} />}
        />
      </ContentsRow>
    </div>
  );
};
```

## 🗄️ 상태 관리

### 1. 로컬 상태 관리

```typescript
// ✅ 복합 상태 관리 훅
interface UseFormStateOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validationSchema,
}: UseFormStateOptions<T>) {
  const [state, setState] = useState({
    values: initialValues,
    errors: {} as Record<keyof T, string>,
    touched: {} as Record<keyof T, boolean>,
    isSubmitting: false,
  });

  const setValue = useCallback((name: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: '' },
    }));
  }, []);

  const validate = useCallback(() => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(state.values);
      setState((prev) => ({ ...prev, errors: {} }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce(
          (acc, err) => {
            const path = err.path[0] as keyof T;
            acc[path] = err.message;
            return acc;
          },
          {} as Record<keyof T, string>,
        );

        setState((prev) => ({ ...prev, errors }));
      }
      return false;
    }
  }, [state.values, validationSchema]);

  return {
    ...state,
    setValue,
    validate,
    reset: () =>
      setState({
        values: initialValues,
        errors: {},
        touched: {},
        isSubmitting: false,
      }),
  };
}
```

### 2. 상태 끌어올리기

```typescript
// ✅ 상태 공유가 필요한 컴포넌트 구조
interface FilterState {
  category?: string;
  status?: string;
  dateRange?: [Date, Date];
}

interface ProductListPageState {
  searchQuery: string;
  filters: FilterState;
  selectedItems: Set<string>;
}

export const ProductListPage: React.FC = () => {
  const [state, setState] = useState<ProductListPageState>({
    searchQuery: '',
    filters: {},
    selectedItems: new Set(),
  });

  const updateSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const updateFilters = useCallback((filters: Partial<FilterState>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  }, []);

  const updateSelection = useCallback((itemIds: string[]) => {
    setState(prev => ({
      ...prev,
      selectedItems: new Set(itemIds),
    }));
  }, []);

  return (
    <div className="product-list-page">
      <ProductSearchBar
        query={state.searchQuery}
        onQueryChange={updateSearchQuery}
      />

      <ProductFilters
        filters={state.filters}
        onChange={updateFilters}
      />

      <ProductList
        searchQuery={state.searchQuery}
        filters={state.filters}
        selectedItems={Array.from(state.selectedItems)}
        onSelectionChange={updateSelection}
      />
    </div>
  );
};
```

## ⚡ 렌더링 최적화

### 1. React.memo 활용

```typescript
// ✅ 적절한 React.memo 사용
interface UserCardProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
}

export const UserCard = React.memo<UserCardProps>(({
  user,
  isSelected,
  onSelect,
  onEdit,
}) => {
  // 이벤트 핸들러를 memoization하여 불필요한 리렌더링 방지
  const handleSelect = useCallback(() => {
    onSelect(user.id);
  }, [onSelect, user.id]);

  const handleEdit = useCallback(() => {
    onEdit(user.id);
  }, [onEdit, user.id]);

  return (
    <div className={`user-card ${isSelected ? 'selected' : ''}`}>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <Button size="sm" onClick={handleSelect}>
          {isSelected ? '선택 해제' : '선택'}
        </Button>
        <Button size="sm" variant="secondary" onClick={handleEdit}>
          수정
        </Button>
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';
```

### 2. useMemo와 useCallback 최적화

```typescript
// ✅ 계산 비용이 높은 작업의 메모이제이션
interface DataTableProps {
  data: TableRow[];
  filters: FilterConfig;
  sortConfig: SortConfig;
  onRowClick: (row: TableRow) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  filters,
  sortConfig,
  onRowClick,
}) => {
  // 필터링과 정렬된 데이터 메모이제이션
  const processedData = useMemo(() => {
    let result = [...data];

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
      result.sort((a, b) => {
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

  // 행 클릭 핸들러 메모이제이션
  const handleRowClick = useCallback((row: TableRow) => {
    onRowClick(row);
  }, [onRowClick]);

  return (
    <div className="data-table">
      {processedData.map(row => (
        <TableRow
          key={row.id}
          data={row}
          onClick={() => handleRowClick(row)}
        />
      ))}
    </div>
  );
};
```

## ♿ 접근성

### 1. ARIA 속성과 시맨틱 HTML

```typescript
// ✅ 접근 가능한 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // 포커스 트랩과 ESC 키 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // 첫 번째 포커스 가능한 요소에 포커스
    const focusableElement = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    focusableElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
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
};
```

### 2. 키보드 네비게이션

```typescript
// ✅ 키보드 접근 가능한 드롭다운
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const itemsRef = useRef<HTMLElement[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = focusedIndex < itemsRef.current.length - 1
            ? focusedIndex + 1
            : 0;
          setFocusedIndex(nextIndex);
          itemsRef.current[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = focusedIndex > 0
          ? focusedIndex - 1
          : itemsRef.current.length - 1;
        setFocusedIndex(prevIndex);
        itemsRef.current[prevIndex]?.focus();
        break;
    }
  };

  return (
    <div className="dropdown">
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
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child as React.ReactElement, {
              ref: (el: HTMLElement) => itemsRef.current[index] = el,
              role: 'menuitem',
              tabIndex: index === focusedIndex ? 0 : -1,
            })
          )}
        </div>
      )}
    </div>
  );
};
```

## 🧪 테스팅 전략

### 1. 컴포넌트 단위 테스트

```typescript
// ✅ UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './user-card';

const mockUser: User = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
  role: 'USER',
  status: 'ACTIVE',
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
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });

  it('선택된 상태일 때 적절한 스타일이 적용된다', () => {
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

### 2. 통합 테스트

```typescript
// ✅ UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserList } from './user-list';
import { userApi } from '@entities/user';

// API 모킹
jest.mock('@entities/user', () => ({
  userApi: {
    getUsers: jest.fn(),
  },
  useUsers: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserList', () => {
  it('사용자 목록을 올바르게 렌더링한다', async () => {
    const mockUsers = [
      { id: '1', name: '홍길동', email: 'hong@example.com' },
      { id: '2', name: '김철수', email: 'kim@example.com' },
    ];

    (useUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: null,
    });

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.getByText('김철수')).toBeInTheDocument();
    });
  });

  it('로딩 상태를 올바르게 표시한다', () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<UserList />, { wrapper: createWrapper() });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

## ✅ 체크리스트

### 컴포넌트 설계 체크리스트

- [ ] 단일 책임 원칙을 따르고 있는가?
- [ ] Props가 명확하고 타입이 정의되어 있는가?
- [ ] 적절한 기본값이 설정되어 있는가?
- [ ] FSD 아키텍처 레이어에 올바르게 위치하고 있는가?

### 프로젝트 표준 체크리스트

- [ ] 목록 화면에서 SearchBox + Divider + GridBox 패턴을 사용했는가?
- [ ] 폼에서 useDynamicForm2와 FormRow2를 활용했는가?
- [ ] 레이아웃에서 ContentsRow를 적절히 사용했는가?
- [ ] 표준 컴포넌트(Button, Input, Select 등)를 활용했는가?

### 성능 체크리스트

- [ ] 불필요한 리렌더링이 발생하지 않는가?
- [ ] React.memo, useMemo, useCallback이 적절히 사용되었는가?
- [ ] 큰 데이터셋에 대해 가상화를 고려했는가?

### 접근성 체크리스트

- [ ] 키보드로 모든 기능에 접근할 수 있는가?
- [ ] 적절한 ARIA 속성이 설정되어 있는가?
- [ ] 시맨틱 HTML을 사용했는가?
- [ ] 스크린 리더 사용자를 고려했는가?

### 테스트 체크리스트

- [ ] 주요 사용자 상호작용이 테스트되었는가?
- [ ] 에러 상태와 로딩 상태가 테스트되었는가?
- [ ] 접근성 관련 기능이 테스트되었는가?
- [ ] Props 변경에 따른 렌더링이 테스트되었는가?
