# 테스트 작성 가이드

## 📋 목차

- [테스트 전략](#테스트-전략)
- [단위 테스트](#단위-테스트)
- [통합 테스트](#통합-테스트)
- [E2E 테스트](#e2e-테스트)
- [테스트 유틸리티](#테스트-유틸리티)
- [React Query 테스트](#react-query-테스트)
- [접근성 테스트](#접근성-테스트)

## 🎯 테스트 전략

### 1. 테스트 피라미드

```
    /\
   /  \     E2E Tests (적음)
  /____\    - 사용자 플로우
 /      \   - 브라우저 환경
/__    __\  Integration Tests (보통)
   \  /     - 컴포넌트 + API
    \/      - React Query + MSW
   ____     Unit Tests (많음)
  |____|    - 유틸리티 함수
           - 커스텀 훅
```

### 2. 테스트 우선순위

```typescript
// 1순위: 비즈니스 로직 (반드시 테스트)
describe('user validation logic', () => {
  it('should validate email format', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });
});

// 2순위: API 통합 (높은 가치)
describe('user list integration', () => {
  it('should load and display users', async () => {
    // MSW + React Query 테스트
  });
});

// 3순위: UI 인터랙션 (중요한 기능만)
describe('user form interactions', () => {
  it('should submit form with valid data', async () => {
    // 사용자 액션 테스트
  });
});
```

## 🧪 단위 테스트

### 1. 유틸리티 함수 테스트

```typescript
// ✅ shared/lib/date-utils.test.ts
import { formatDate, calculateAge, isValidDate } from './date-utils';

describe('date-utils', () => {
  describe('formatDate', () => {
    it('should format ISO date to Korean format', () => {
      expect(formatDate('2023-12-25T10:30:00Z')).toBe('2023년 12월 25일');
    });

    it('should handle invalid date', () => {
      expect(formatDate('invalid')).toBe('유효하지 않은 날짜');
    });

    it('should handle null/undefined', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('calculateAge', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-12-25'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should calculate age correctly', () => {
      expect(calculateAge('1990-12-25')).toBe(33);
    });

    it('should handle birthday not yet passed', () => {
      expect(calculateAge('1990-12-26')).toBe(32);
    });
  });

  describe('isValidDate', () => {
    it.each([
      ['2023-12-25', true],
      ['2023-02-29', false], // 윤년 아님
      ['2024-02-29', true], // 윤년
      ['invalid', false],
      ['', false],
    ])('should validate %s as %s', (input, expected) => {
      expect(isValidDate(input)).toBe(expected);
    });
  });
});
```

### 2. 커스텀 훅 테스트

```typescript
// ✅ shared/hooks/use-local-storage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use-local-storage';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it('should return default value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('should return stored value when it exists', () => {
    mockLocalStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('stored');
  });

  it('should update stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});
```

### 3. 비즈니스 로직 테스트

```typescript
// ✅ entities/user/lib/user-validation.test.ts
import { userFormSchema, validateUserPermissions } from './user-validation';

describe('user-validation', () => {
  describe('userFormSchema', () => {
    it('should validate correct user data', () => {
      const validData = {
        name: '홍길동',
        email: 'hong@example.com',
        role: 'USER',
        status: 'ACTIVE',
      };

      const result = userFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: '홍길동',
        email: 'invalid-email',
        role: 'USER',
        status: 'ACTIVE',
      };

      const result = userFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['email']);
      }
    });

    it('should require minimum name length', () => {
      const invalidData = {
        name: 'a', // 너무 짧음
        email: 'test@example.com',
        role: 'USER',
        status: 'ACTIVE',
      };

      const result = userFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('validateUserPermissions', () => {
    it('should calculate admin permissions', () => {
      const user = {
        id: '1',
        role: 'ADMIN',
        status: 'ACTIVE',
      };

      const permissions = validateUserPermissions(user);

      expect(permissions).toEqual({
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canViewAll: true,
      });
    });

    it('should deny permissions for inactive users', () => {
      const user = {
        id: '1',
        role: 'ADMIN',
        status: 'INACTIVE',
      };

      const permissions = validateUserPermissions(user);

      expect(permissions.canCreate).toBe(false);
      expect(permissions.canEdit).toBe(false);
    });
  });
});
```

## 🔗 통합 테스트

### 1. 컴포넌트 + API 통합 테스트

```typescript
// ✅ features/user-management/ui/user-list.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserList } from './user-list';

// MSW 서버 설정
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    const search = req.url.searchParams.get('search');

    let users = [
      {
        id: '1',
        name: '홍길동',
        email: 'hong@example.com',
        role: 'USER',
        status: 'ACTIVE',
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: '2',
        name: '김철수',
        email: 'kim@example.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        createdAt: '2023-01-02T00:00:00Z',
      },
    ];

    if (search) {
      users = users.filter(user =>
        user.name.includes(search) || user.email.includes(search)
      );
    }

    return res(
      ctx.json({
        content: users,
        totalElements: users.length,
        totalPages: 1,
        size: 20,
        number: 0,
        first: true,
        last: true,
      })
    );
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

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

describe('UserList Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should load and display users', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    // 로딩 상태 확인
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // 사용자 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    expect(screen.getByText('kim@example.com')).toBeInTheDocument();
  });

  it('should filter users by search', async () => {
    const user = userEvent.setup();
    render(<UserList />, { wrapper: createWrapper() });

    // 초기 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    // 검색 입력
    const searchInput = screen.getByPlaceholderText('이름, 이메일로 검색');
    await user.type(searchInput, '홍길동');

    // 검색 실행
    const searchButton = screen.getByRole('button', { name: '검색' });
    await user.click(searchButton);

    // 필터링된 결과 확인
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.queryByText('김철수')).not.toBeInTheDocument();
    });
  });

  it('should handle API error gracefully', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: '서버 오류' }));
      })
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('데이터를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });
});
```

### 2. 폼 컴포넌트 통합 테스트

```typescript
// ✅ features/user-management/ui/user-form.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from './user-form';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('UserForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit valid form data', async () => {
    const user = userEvent.setup();

    render(
      <UserForm
        mode="CREATE"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // 폼 입력
    await user.type(screen.getByLabelText('이름 *'), '홍길동');
    await user.type(screen.getByLabelText('이메일 *'), 'hong@example.com');

    const roleSelect = screen.getByLabelText('역할 *');
    await user.selectOptions(roleSelect, 'USER');

    // 제출 버튼 클릭
    const submitButton = screen.getByRole('button', { name: '등록' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: '홍길동',
        email: 'hong@example.com',
        role: 'USER',
        status: 'ACTIVE', // 기본값
      });
    });
  });

  it('should show validation errors', async () => {
    const user = userEvent.setup();

    render(
      <UserForm
        mode="CREATE"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // 유효하지 않은 이메일 입력
    const emailInput = screen.getByLabelText('이메일 *');
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // blur 이벤트

    await waitFor(() => {
      expect(screen.getByText('유효한 이메일을 입력하세요.')).toBeInTheDocument();
    });

    // 제출 버튼이 비활성화되어야 함
    const submitButton = screen.getByRole('button', { name: '등록' });
    expect(submitButton).toBeDisabled();
  });

  it('should populate form in UPDATE mode', () => {
    const existingUser = {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      role: 'USER',
      status: 'ACTIVE',
    };

    render(
      <UserForm
        user={existingUser}
        mode="UPDATE"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('홍길동')).toBeInTheDocument();
    expect(screen.getByDisplayValue('hong@example.com')).toBeInTheDocument();
  });
});
```

## 🌐 E2E 테스트

### 1. Playwright 사용자 플로우 테스트

```typescript
// ✅ tests/e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
    await page.waitForSelector('[data-testid="user-list"]');
  });

  test('should create, edit, and delete user', async ({ page }) => {
    // 1. 사용자 생성
    await page.click('[data-testid="add-user-button"]');

    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();

    await page.fill('[data-testid="user-name"]', '테스트 사용자');
    await page.fill('[data-testid="user-email"]', 'test@example.com');
    await page.selectOption('[data-testid="user-role"]', 'USER');

    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('.toast-success')).toContainText('사용자가 생성되었습니다');
    await expect(page.locator('[data-testid="user-list"]')).toContainText('테스트 사용자');

    // 2. 사용자 수정
    await page.click(
      '[data-testid="user-row"]:has-text("테스트 사용자") [data-testid="edit-button"]',
    );

    await page.fill('[data-testid="user-name"]', '수정된 사용자');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('.toast-success')).toContainText('사용자 정보가 수정되었습니다');
    await expect(page.locator('[data-testid="user-list"]')).toContainText('수정된 사용자');

    // 3. 사용자 삭제
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('정말 삭제하시겠습니까?');
      await dialog.accept();
    });

    await page.click(
      '[data-testid="user-row"]:has-text("수정된 사용자") [data-testid="delete-button"]',
    );

    await expect(page.locator('.toast-success')).toContainText('사용자가 삭제되었습니다');
    await expect(page.locator('[data-testid="user-list"]')).not.toContainText('수정된 사용자');
  });

  test('should search and filter users', async ({ page }) => {
    // 검색
    await page.fill('[data-testid="search-input"]', '홍길동');
    await page.click('[data-testid="search-button"]');

    await page.waitForSelector('[data-testid="user-row"]');

    const userRows = page.locator('[data-testid="user-row"]');
    const count = await userRows.count();

    for (let i = 0; i < count; i++) {
      const userName = await userRows.nth(i).locator('[data-testid="user-name"]').textContent();
      expect(userName).toContain('홍길동');
    }
  });

  test('should handle pagination', async ({ page }) => {
    const pagination = page.locator('[data-testid="pagination"]');

    if (await pagination.isVisible()) {
      await page.click('[data-testid="next-page-button"]');
      await expect(page).toHaveURL(/page=1/);
      await page.waitForSelector('[data-testid="user-row"]');
    }
  });
});
```

## 🛠️ 테스트 유틸리티

### 1. 테스트 헬퍼 함수

```typescript
// ✅ src/test/test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialEntries = ['/'],
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    }),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock 데이터 생성
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    ...overrides,
  };
}

export function createMockUserList(count: number = 3): User[] {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: String(index + 1),
      name: `사용자${index + 1}`,
      email: `user${index + 1}@example.com`,
    })
  );
}

// 폼 테스트 헬퍼
export async function fillForm(
  screen: any,
  formData: Record<string, string>
) {
  const userEvent = (await import('@testing-library/user-event')).default;
  const user = userEvent.setup();

  for (const [fieldName, value] of Object.entries(formData)) {
    const field = screen.getByLabelText(new RegExp(fieldName, 'i'));

    if (field.tagName === 'SELECT') {
      await user.selectOptions(field, value);
    } else {
      await user.clear(field);
      await user.type(field, value);
    }
  }
}
```

### 2. MSW 핸들러

```typescript
// ✅ src/test/handlers.ts
import { rest } from 'msw';
import { createMockUser, createMockUserList } from './test-utils';

export const handlers = [
  // 사용자 목록 조회
  rest.get('/api/users', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 0;
    const size = Number(req.url.searchParams.get('size')) || 20;
    const search = req.url.searchParams.get('search');

    let users = createMockUserList(50);

    if (search) {
      users = users.filter((user) => user.name.includes(search) || user.email.includes(search));
    }

    const start = page * size;
    const end = start + size;
    const paginatedUsers = users.slice(start, end);

    return res(
      ctx.json({
        content: paginatedUsers,
        totalElements: users.length,
        totalPages: Math.ceil(users.length / size),
        size,
        number: page,
        first: page === 0,
        last: end >= users.length,
      }),
    );
  }),

  // 사용자 상세 조회
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = createMockUser({ id: String(id) });

    return res(ctx.json(user));
  }),

  // 사용자 생성
  rest.post('/api/users', async (req, res, ctx) => {
    const userData = await req.json();
    const user = createMockUser({ ...userData, id: String(Date.now()) });

    return res(ctx.json(user));
  }),

  // 사용자 수정
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const user = createMockUser({ id: String(id), ...updates });

    return res(ctx.json(user));
  }),

  // 사용자 삭제
  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
```

## ⚛️ React Query 테스트

### 1. Query 테스트

```typescript
// ✅ entities/user/service/user.hook.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from './user.hook';
import { createMockUserList } from '@test/test-utils';
import { setupServer } from 'msw/node';
import { handlers } from '@test/handlers';

const server = setupServer(...handlers);

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

describe('useUsers', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch users successfully', async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.content).toHaveLength(50);
    expect(result.current.error).toBeNull();
  });

  it('should handle search parameters', async () => {
    const { result } = renderHook(() => useUsers({ search: '사용자1' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.content).toHaveLength(11); // 사용자1, 사용자10-19
  });
});
```

### 2. Mutation 테스트

```typescript
// ✅ entities/user/service/user-mutations.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateUser } from './user.hook';
import { setupServer } from 'msw/node';
import { handlers } from '@test/handlers';

const server = setupServer(...handlers);

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

describe('useCreateUser', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should create user successfully', async () => {
    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    });

    const userData = {
      name: '새 사용자',
      email: 'new@example.com',
      role: 'USER' as const,
      status: 'ACTIVE' as const,
    };

    result.current.mutate(userData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toMatchObject(userData);
  });

  it('should handle creation error', async () => {
    server.use(
      rest.post('/api/users', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: '이미 존재하는 이메일입니다.' }));
      })
    );

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: '중복 사용자',
      email: 'duplicate@example.com',
      role: 'USER',
      status: 'ACTIVE',
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
```

## ♿ 접근성 테스트

### 1. Jest-axe 테스트

```typescript
// ✅ src/test/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { UserList } from '@features/user-management';
import { renderWithProviders } from './test-utils';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('UserList should have no accessibility violations', async () => {
    const { container } = renderWithProviders(<UserList />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('UserForm should have proper labels', async () => {
    const { container } = renderWithProviders(
      <UserForm
        mode="CREATE"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    const results = await axe(container, {
      rules: {
        'label-title-only': { enabled: true },
        'aria-required-attr': { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
```

### 2. 키보드 네비게이션 테스트

```typescript
// ✅ src/test/keyboard-navigation.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '@features/user-management';

describe('Keyboard Navigation', () => {
  it('should navigate through form fields with Tab', async () => {
    const user = userEvent.setup();

    render(
      <UserForm
        mode="CREATE"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    const nameField = screen.getByLabelText('이름 *');
    nameField.focus();
    expect(nameField).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('이메일 *')).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('역할 *')).toHaveFocus();

    // Shift+Tab으로 이전 필드로
    await user.tab({ shift: true });
    expect(screen.getByLabelText('이메일 *')).toHaveFocus();
  });

  it('should submit form with Ctrl+Enter', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();

    render(
      <UserForm
        mode="CREATE"
        onSubmit={mockOnSubmit}
        onCancel={jest.fn()}
      />
    );

    await user.type(screen.getByLabelText('이름 *'), '홍길동');
    await user.type(screen.getByLabelText('이메일 *'), 'hong@example.com');
    await user.selectOptions(screen.getByLabelText('역할 *'), 'USER');

    await user.keyboard('{Control>}{Enter}{/Control}');

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
```

## ✅ 테스트 체크리스트

### 단위 테스트 체크리스트

- [ ] 모든 유틸리티 함수가 테스트되었는가?
- [ ] 에지 케이스(null, undefined, 빈 값)가 처리되는가?
- [ ] 에러 상황이 적절히 테스트되었는가?
- [ ] 커스텀 훅의 모든 동작이 테스트되었는가?

### 통합 테스트 체크리스트

- [ ] 컴포넌트와 API의 상호작용이 테스트되었는가?
- [ ] 사용자 인터랙션이 올바르게 동작하는가?
- [ ] 로딩 및 에러 상태가 적절히 처리되는가?
- [ ] 폼 검증이 올바르게 동작하는가?

### E2E 테스트 체크리스트

- [ ] 주요 사용자 플로우가 테스트되었는가?
- [ ] 전체 CRUD 기능이 동작하는가?
- [ ] 검색과 필터링이 올바르게 동작하는가?
- [ ] 에러 상황에서 적절한 메시지가 표시되는가?

### React Query 테스트 체크리스트

- [ ] 성공적인 데이터 페칭이 테스트되었는가?
- [ ] API 에러가 적절히 처리되는가?
- [ ] 캐시 무효화가 올바르게 동작하는가?
- [ ] 낙관적 업데이트가 테스트되었는가?

### 접근성 테스트 체크리스트

- [ ] 자동화된 접근성 테스트가 통과하는가?
- [ ] 키보드 네비게이션이 올바르게 동작하는가?
- [ ] 스크린 리더 사용자를 고려했는가?
- [ ] 포커스 관리가 적절한가?

### 전반적인 품질 체크리스트

- [ ] 테스트 커버리지가 목표치를 달성했는가?
- [ ] 테스트가 안정적이고 신뢰할 수 있는가?
- [ ] CI/CD에서 모든 테스트가 통과하는가?
- [ ] 테스트 실행 시간이 적절한가?
