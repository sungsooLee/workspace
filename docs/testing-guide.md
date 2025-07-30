---
applyTo: '**/src/**'
---

# 테스트 작성 가이드

## 📋 목차

- [테스트 전략](#테스트-전략)
- [단위 테스트](#단위-테스트)
- [통합 테스트](#통합-테스트)
- [E2E 테스트](#e2e-테스트)
- [테스트 유틸리티](#테스트-유틸리티)
- [모킹 전략](#모킹-전략)
- [접근성 테스트](#접근성-테스트)
- [성능 테스트](#성능-테스트)

## 🎯 테스트 전략

### 1. 테스트 피라미드

```
    /\
   /  \     E2E Tests (적음)
  /____\    - 실제 사용자 플로우
 /      \   - 브라우저 환경
/__    __\  Integration Tests (보통)
   \  /     - 컴포넌트 + API
    \/      - React Query + MSW
   ____     Unit Tests (많음)
  |____|    - 순수 함수, 훅
           - 빠른 실행, 격리
```

### 2. 테스트 분류

```typescript
// 단위 테스트 - 개별 함수/컴포넌트
describe('utils/formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2023-01-01')).toBe('2023년 1월 1일');
  });
});

// 통합 테스트 - 여러 컴포넌트 + API
describe('UserList Integration', () => {
  it('should load and display users', async () => {
    // MSW로 API 모킹
    // 실제 데이터 플로우 테스트
  });
});

// E2E 테스트 - 전체 사용자 플로우
describe('User Management Flow', () => {
  it('should create, edit, and delete user', () => {
    // Playwright로 브라우저 테스트
  });
});
```

## 🧪 단위 테스트

### 1. 순수 함수 테스트

```typescript
// src/shared/lib/date-utils.test.ts
import { formatDate, calculateAge, isValidDate } from './date-utils';

describe('date-utils', () => {
  describe('formatDate', () => {
    it('should format ISO date string to Korean format', () => {
      const input = '2023-12-25T10:30:00Z';
      const expected = '2023년 12월 25일';
      
      expect(formatDate(input)).toBe(expected);
    });

    it('should handle invalid date', () => {
      const input = 'invalid-date';
      
      expect(formatDate(input)).toBe('유효하지 않은 날짜');
    });

    it('should handle null/undefined', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('calculateAge', () => {
    beforeEach(() => {
      // 현재 날짜를 고정하여 테스트 안정성 확보
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-12-25'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should calculate age correctly', () => {
      const birthDate = '1990-12-25';
      
      expect(calculateAge(birthDate)).toBe(33);
    });

    it('should handle birthday not yet passed this year', () => {
      const birthDate = '1990-12-26'; // 생일이 지나지 않음
      
      expect(calculateAge(birthDate)).toBe(32);
    });
  });

  describe('isValidDate', () => {
    it.each([
      ['2023-12-25', true],
      ['2023-02-29', false], // 윤년이 아닌 해의 2/29
      ['2024-02-29', true],  // 윤년의 2/29
      ['invalid', false],
      ['', false],
      [null, false],
    ])('should validate date %s as %s', (input, expected) => {
      expect(isValidDate(input)).toBe(expected);
    });
  });
});
```

### 2. 커스텀 훅 테스트

```typescript
// src/shared/hooks/use-local-storage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use-local-storage';

// localStorage 모킹
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

  it('should return default value when no stored value exists', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default-value')
    );

    expect(result.current[0]).toBe('default-value');
  });

  it('should return stored value when it exists', () => {
    mockLocalStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default-value')
    );

    expect(result.current[0]).toBe('stored-value');
  });

  it('should update stored value when setValue is called', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => 
      useLocalStorage('counter', 0)
    );

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
```

### 3. 비즈니스 로직 테스트

```typescript
// src/entities/user/lib/user-validation.test.ts
import { userFormSchema, validateUserEmail, calculateUserPermissions } from './user-validation';

describe('user-validation', () => {
  describe('userFormSchema', () => {
    it('should validate correct user data', () => {
      const validData = {
        name: '홍길동',
        email: 'hong@example.com',
        department: 'development',
        status: 'active' as const,
        startDate: '2023-01-01',
      };

      const result = userFormSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: '홍길동',
        email: 'invalid-email',
        department: 'development',
        status: 'active' as const,
        startDate: '2023-01-01',
      };

      const result = userFormSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['email']);
        expect(result.error.errors[0].message).toBe('유효한 이메일 주소를 입력해주세요');
      }
    });

    it('should require minimum name length', () => {
      const invalidData = {
        name: 'a', // 너무 짧음
        email: 'test@example.com',
        department: 'development',
        status: 'active' as const,
        startDate: '2023-01-01',
      };

      const result = userFormSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
    });
  });

  describe('validateUserEmail', () => {
    it('should validate email format', () => {
      expect(validateUserEmail('valid@example.com')).toBe(true);
      expect(validateUserEmail('invalid-email')).toBe(false);
      expect(validateUserEmail('')).toBe(false);
    });

    it('should reject disposable email domains', () => {
      expect(validateUserEmail('test@tempmail.com')).toBe(false);
      expect(validateUserEmail('test@10minutemail.com')).toBe(false);
    });
  });

  describe('calculateUserPermissions', () => {
    it('should calculate admin permissions', () => {
      const user = {
        id: 1,
        role: 'admin',
        department: 'development',
        status: 'active',
      };

      const permissions = calculateUserPermissions(user);
      
      expect(permissions).toEqual({
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canViewAll: true,
        canManageUsers: true,
      });
    });

    it('should calculate regular user permissions', () => {
      const user = {
        id: 1,
        role: 'user',
        department: 'development',
        status: 'active',
      };

      const permissions = calculateUserPermissions(user);
      
      expect(permissions).toEqual({
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canViewAll: false,
        canManageUsers: false,
      });
    });

    it('should deny permissions for inactive users', () => {
      const user = {
        id: 1,
        role: 'admin',
        department: 'development',
        status: 'inactive',
      };

      const permissions = calculateUserPermissions(user);
      
      expect(permissions.canCreate).toBe(false);
      expect(permissions.canEdit).toBe(false);
    });
  });
});
```

## 🔗 통합 테스트

### 1. 컴포넌트 + API 통합 테스트

```typescript
// src/features/user-management/ui/user-list.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { UserList } from './user-list';

// Mock 서버 설정
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '0';
    const search = req.url.searchParams.get('search');

    let users = [
      {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
        department: 'development',
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: '김철수',
        email: 'kim@example.com',
        department: 'design',
        status: 'active',
        createdAt: '2023-01-02T00:00:00Z',
      },
    ];

    // 검색 필터링
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
        number: parseInt(page),
        first: true,
        last: true,
      })
    );
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

// 테스트 래퍼 생성
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
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    // 사용자 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    expect(screen.getByText('kim@example.com')).toBeInTheDocument();
    expect(screen.getByText('development')).toBeInTheDocument();
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

    // 검색 버튼 클릭
    const searchButton = screen.getByRole('button', { name: '검색' });
    await user.click(searchButton);

    // 필터링된 결과 확인
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.queryByText('김철수')).not.toBeInTheDocument();
    });
  });

  it('should delete user when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    // confirm 모킹
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    
    render(<UserList />, { wrapper: createWrapper() });

    // 초기 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    // 삭제 버튼 클릭
    const deleteButtons = screen.getAllByText('삭제');
    await user.click(deleteButtons[0]);

    // 확인 다이얼로그 표시 확인
    expect(confirmSpy).toHaveBeenCalledWith('정말 삭제하시겠습니까?');

    // 성공 메시지 확인
    await waitFor(() => {
      expect(screen.getByText('사용자가 삭제되었습니다.')).toBeInTheDocument();
    });

    confirmSpy.mockRestore();
  });

  it('should handle API error gracefully', async () => {
    // 에러 응답 설정
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: '서버 오류' }));
      })
    );

    render(<UserList />, { wrapper: createWrapper() });

    // 에러 메시지 확인
    await waitFor(() => {
      expect(screen.getByText('데이터를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });

  it('should show empty state when no users', async () => {
    // 빈 응답 설정
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.json({
            content: [],
            totalElements: 0,
            totalPages: 0,
            size: 20,
            number: 0,
            first: true,
            last: true,
          })
        );
      })
    );

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  });
});
```

### 2. 폼 컴포넌트 통합 테스트

```typescript
// src/features/user-management/ui/user-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from './user-form';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('UserForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create Mode', () => {
    it('should submit valid form data', async () => {
      const user = userEvent.setup();
      
      render(
        <UserForm
          mode="create"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 폼 입력
      await user.type(screen.getByLabelText('이름 *'), '홍길동');
      await user.type(screen.getByLabelText('이메일 *'), 'hong@example.com');
      
      const departmentSelect = screen.getByLabelText('부서 *');
      await user.selectOptions(departmentSelect, 'development');
      
      await user.type(screen.getByLabelText('입사일 *'), '2023-01-01');

      // 제출 버튼 클릭
      const submitButton = screen.getByRole('button', { name: '등록' });
      await user.click(submitButton);

      // onSubmit 호출 확인
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: '홍길동',
          email: 'hong@example.com',
          department: 'development',
          status: 'active',
          phone: '',
          position: '',
          startDate: '2023-01-01',
        });
      });
    });

    it('should show validation errors for invalid data', async () => {
      const user = userEvent.setup();
      
      render(
        <UserForm
          mode="create"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 유효하지 않은 이메일 입력
      const emailInput = screen.getByLabelText('이메일 *');
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // blur 이벤트 발생

      // 에러 메시지 확인
      await waitFor(() => {
        expect(screen.getByText('유효한 이메일 주소를 입력해주세요')).toBeInTheDocument();
      });

      // 제출 버튼이 비활성화되었는지 확인
      const submitButton = screen.getByRole('button', { name: '등록' });
      expect(submitButton).toBeDisabled();
    });

    it('should reset form when cancel is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <UserForm
          mode="create"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 데이터 입력
      await user.type(screen.getByLabelText('이름 *'), '홍길동');

      // 취소 버튼 클릭
      const cancelButton = screen.getByRole('button', { name: '취소' });
      await user.click(cancelButton);

      // onCancel 호출 확인
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  describe('Edit Mode', () => {
    const existingUser = {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      department: 'development',
      status: 'active' as const,
      phone: '010-1234-5678',
      position: 'senior',
      startDate: '2023-01-01',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    it('should populate form with existing user data', () => {
      render(
        <UserForm
          user={existingUser}
          mode="edit"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 기존 데이터가 채워져 있는지 확인
      expect(screen.getByDisplayValue('홍길동')).toBeInTheDocument();
      expect(screen.getByDisplayValue('hong@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('010-1234-5678')).toBeInTheDocument();
    });

    it('should only submit changed data', async () => {
      const user = userEvent.setup();
      
      render(
        <UserForm
          user={existingUser}
          mode="edit"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 이름만 변경
      const nameInput = screen.getByDisplayValue('홍길동');
      await user.clear(nameInput);
      await user.type(nameInput, '김길동');

      // 제출
      const submitButton = screen.getByRole('button', { name: '수정' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: '김길동',
            email: 'hong@example.com', // 기존 값 유지
          })
        );
      });
    });
  });

  describe('View Mode', () => {
    const existingUser = {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      department: 'development',
      status: 'active' as const,
      phone: '010-1234-5678',
      position: 'senior',
      startDate: '2023-01-01',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    it('should display data in read-only mode', () => {
      render(
        <UserForm
          user={existingUser}
          mode="view"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // 모든 입력 필드가 비활성화되어 있는지 확인
      expect(screen.getByDisplayValue('홍길동')).toBeDisabled();
      expect(screen.getByDisplayValue('hong@example.com')).toBeDisabled();
      
      // 수정/등록 버튼이 없고 닫기 버튼만 있는지 확인
      expect(screen.queryByText('수정')).not.toBeInTheDocument();
      expect(screen.queryByText('등록')).not.toBeInTheDocument();
      expect(screen.getByText('닫기')).toBeInTheDocument();
    });
  });
});
```

## 🌐 E2E 테스트

### 1. Playwright 설정

```typescript
// tests/setup/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // 테스트용 브라우저 실행
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 로그인 처리 (필요한 경우)
  await page.goto('http://localhost:3000/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');

  // 인증 상태 저장
  await context.storageState({ path: 'tests/auth-state.json' });

  await browser.close();
}

export default globalSetup;
```

### 2. 사용자 관리 E2E 테스트

```typescript
// tests/e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // 사용자 관리 페이지로 이동
    await page.goto('/users');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="user-list"]');
  });

  test('should create new user', async ({ page }) => {
    // 사용자 추가 버튼 클릭
    await page.click('[data-testid="add-user-button"]');

    // 모달 열림 확인
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();

    // 폼 입력
    await page.fill('[data-testid="user-name"]', '테스트 사용자');
    await page.fill('[data-testid="user-email"]', 'test@example.com');
    await page.selectOption('[data-testid="user-department"]', 'development');
    await page.fill('[data-testid="user-start-date"]', '2023-01-01');

    // 등록 버튼 클릭
    await page.click('[data-testid="submit-button"]');

    // 성공 메시지 확인
    await expect(page.locator('.toast-success')).toContainText('사용자가 생성되었습니다');

    // 목록에 새 사용자가 표시되는지 확인
    await expect(page.locator('[data-testid="user-list"]')).toContainText('테스트 사용자');
  });

  test('should edit existing user', async ({ page }) => {
    // 첫 번째 사용자의 수정 버튼 클릭
    await page.click('[data-testid="user-row"]:first-child [data-testid="edit-button"]');

    // 모달 열림 확인
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();

    // 이름 수정
    await page.fill('[data-testid="user-name"]', '수정된 이름');

    // 수정 버튼 클릭
    await page.click('[data-testid="submit-button"]');

    // 성공 메시지 확인
    await expect(page.locator('.toast-success')).toContainText('사용자 정보가 수정되었습니다');

    // 목록에서 수정된 이름 확인
    await expect(page.locator('[data-testid="user-list"]')).toContainText('수정된 이름');
  });

  test('should delete user', async ({ page }) => {
    // 사용자 목록에서 첫 번째 사용자 확인
    const firstUserName = await page.locator('[data-testid="user-row"]:first-child [data-testid="user-name"]').textContent();

    // 삭제 버튼 클릭
    await page.click('[data-testid="user-row"]:first-child [data-testid="delete-button"]');

    // 확인 다이얼로그 처리
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('정말 삭제하시겠습니까?');
      await dialog.accept();
    });

    // 성공 메시지 확인
    await expect(page.locator('.toast-success')).toContainText('사용자가 삭제되었습니다');

    // 목록에서 사용자가 제거되었는지 확인
    await expect(page.locator('[data-testid="user-list"]')).not.toContainText(firstUserName!);
  });

  test('should search users', async ({ page }) => {
    // 검색어 입력
    await page.fill('[data-testid="search-input"]', '홍길동');

    // 검색 버튼 클릭
    await page.click('[data-testid="search-button"]');

    // 검색 결과 확인 (로딩 완료 대기)
    await page.waitForSelector('[data-testid="user-list"] [data-testid="user-row"]');

    // 검색된 결과에 '홍길동'이 포함되어 있는지 확인
    const userRows = page.locator('[data-testid="user-row"]');
    const count = await userRows.count();

    for (let i = 0; i < count; i++) {
      const userName = await userRows.nth(i).locator('[data-testid="user-name"]').textContent();
      expect(userName).toContain('홍길동');
    }
  });

  test('should handle pagination', async ({ page }) => {
    // 페이지네이션이 있는지 확인
    const pagination = page.locator('[data-testid="pagination"]');
    
    if (await pagination.isVisible()) {
      // 다음 페이지 버튼 클릭
      await page.click('[data-testid="next-page-button"]');

      // URL 변경 확인
      await expect(page).toHaveURL(/page=1/);

      // 새로운 데이터 로드 확인
      await page.waitForSelector('[data-testid="user-list"] [data-testid="user-row"]');
    }
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // 네트워크 요청 차단
    await page.route('/api/users**', route => {
      route.abort('failed');
    });

    // 페이지 새로고침
    await page.reload();

    // 에러 메시지 확인
    await expect(page.locator('[data-testid="error-message"]')).toContainText('데이터를 불러오는 중 오류가 발생했습니다');
  });
});
```

## 🛠️ 테스트 유틸리티

### 1. 테스트 헬퍼 함수

```typescript
// src/test/test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// 커스텀 렌더 함수
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

// Mock 데이터 생성기
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    department: 'development',
    status: 'active',
    phone: '010-1234-5678',
    position: 'senior',
    startDate: '2023-01-01',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    ...overrides,
  };
}

export function createMockUserList(count: number = 3): User[] {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: index + 1,
      name: `사용자${index + 1}`,
      email: `user${index + 1}@example.com`,
    })
  );
}

// API 모킹 헬퍼
export function mockApiSuccess<T>(data: T) {
  return {
    data,
    message: 'Success',
    success: true,
    timestamp: new Date().toISOString(),
  };
}

export function mockApiError(message: string, status: number = 400) {
  return {
    message,
    code: 'API_ERROR',
    status,
    timestamp: new Date().toISOString(),
  };
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

// 테이블 테스트 헬퍼
export function getTableData(screen: any) {
  const rows = screen.getAllByTestId('user-row');
  
  return rows.map((row: any) => ({
    name: row.querySelector('[data-testid="user-name"]')?.textContent,
    email: row.querySelector('[data-testid="user-email"]')?.textContent,
    department: row.querySelector('[data-testid="user-department"]')?.textContent,
  }));
}
```

### 2. MSW 핸들러

```typescript
// src/test/handlers.ts
import { rest } from 'msw';
import { createMockUser, createMockUserList, mockApiSuccess } from './test-utils';

export const handlers = [
  // 사용자 목록 조회
  rest.get('/api/users', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 0;
    const size = Number(req.url.searchParams.get('size')) || 20;
    const search = req.url.searchParams.get('search');
    const department = req.url.searchParams.get('department');

    let users = createMockUserList(50); // 50개의 사용자 생성

    // 필터링
    if (search) {
      users = users.filter(user =>
        user.name.includes(search) || user.email.includes(search)
      );
    }

    if (department) {
      users = users.filter(user => user.department === department);
    }

    // 페이징
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
      })
    );
  }),

  // 사용자 상세 조회
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = createMockUser({ id: Number(id) });
    
    return res(ctx.json(mockApiSuccess(user)));
  }),

  // 사용자 생성
  rest.post('/api/users', async (req, res, ctx) => {
    const userData = await req.json();
    const user = createMockUser({ ...userData, id: Date.now() });
    
    return res(ctx.json(mockApiSuccess(user)));
  }),

  // 사용자 수정
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const user = createMockUser({ id: Number(id), ...updates });
    
    return res(ctx.json(mockApiSuccess(user)));
  }),

  // 사용자 삭제
  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 에러 핸들러 (테스트용)
  rest.get('/api/users/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: '서버 오류가 발생했습니다',
        code: 'INTERNAL_ERROR',
      })
    );
  }),
];
```

## 🎭 모킹 전략

### 1. API 모킹

```typescript
// src/test/mocks/api.ts
import { jest } from '@jest/globals';

// API 모듈 모킹
export const mockUserApi = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

// React Query 훅 모킹
export const mockUseUsers = jest.fn();
export const mockUseCreateUser = jest.fn();
export const mockUseUpdateUser = jest.fn();
export const mockUseDeleteUser = jest.fn();

// 모킹 설정 헬퍼
export function setupSuccessfulUserMocks() {
  mockUseUsers.mockReturnValue({
    data: {
      content: createMockUserList(3),
      totalElements: 3,
      totalPages: 1,
    },
    isLoading: false,
    error: null,
  });

  mockUseCreateUser.mockReturnValue({
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  });
}

export function setupLoadingUserMocks() {
  mockUseUsers.mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  });
}

export function setupErrorUserMocks() {
  mockUseUsers.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: new Error('API Error'),
  });
}
```

### 2. React Query 모킹

```typescript
// src/test/mocks/react-query.ts
import { QueryClient } from '@tanstack/react-query';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });
}

// 특정 쿼리 결과 모킹
export function mockQueryData(queryClient: QueryClient, queryKey: any[], data: any) {
  queryClient.setQueryData(queryKey, data);
}

// 뮤테이션 모킹
export function mockMutation(queryClient: QueryClient, mutationKey: any[], mockFn: any) {
  queryClient.setMutationDefaults(mutationKey, {
    mutationFn: mockFn,
  });
}
```

## ♿ 접근성 테스트

### 1. Jest-axe를 사용한 접근성 테스트

```typescript
// src/test/accessibility.test.tsx
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

  it('UserForm should have proper labels and ARIA attributes', async () => {
    const { container } = renderWithProviders(
      <UserForm
        mode="create"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    const results = await axe(container, {
      rules: {
        'label-title-only': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-valid-attr': { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });

  it('Modal should trap focus properly', async () => {
    const { container } = renderWithProviders(
      <UserDetailModal
        mode="create"
        isOpen={true}
        onClose={jest.fn()}
      />
    );

    // 포커스 트랩 확인
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(0);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 2. 키보드 네비게이션 테스트

```typescript
// src/test/keyboard-navigation.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '@features/user-management';

describe('Keyboard Navigation', () => {
  it('should navigate through form fields with Tab key', async () => {
    const user = userEvent.setup();
    
    render(
      <UserForm
        mode="create"
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    // 첫 번째 필드에 포커스
    const nameField = screen.getByLabelText('이름 *');
    nameField.focus();
    expect(nameField).toHaveFocus();

    // Tab으로 다음 필드로 이동
    await user.tab();
    expect(screen.getByLabelText('이메일 *')).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText('전화번호')).toHaveFocus();

    // Shift+Tab으로 이전 필드로 이동
    await user.tab({ shift: true });
    expect(screen.getByLabelText('이메일 *')).toHaveFocus();
  });

  it('should submit form with Enter key', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(
      <UserForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={jest.fn()}
      />
    );

    // 필수 필드 입력
    await user.type(screen.getByLabelText('이름 *'), '홍길동');
    await user.type(screen.getByLabelText('이메일 *'), 'hong@example.com');
    await user.selectOptions(screen.getByLabelText('부서 *'), 'development');
    await user.type(screen.getByLabelText('입사일 *'), '2023-01-01');

    // Ctrl+Enter로 제출
    await user.keyboard('{Control>}{Enter}{/Control}');

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should close modal with Escape key', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();
    
    render(
      <UserDetailModal
        mode="create"
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // ESC 키 누르기
    await user.keyboard('{Escape}');

    expect(mockOnClose).toHaveBeenCalled();
  });
});
```

## 🚀 성능 테스트

### 1. React 컴포넌트 성능 테스트

```typescript
// src/test/performance.test.tsx
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';
import { UserList } from '@features/user-management';
import { createMockUserList } from './test-utils';

describe('Performance Tests', () => {
  it('should render large user list efficiently', () => {
    const largeUserList = createMockUserList(1000);
    
    const startTime = performance.now();
    
    render(
      <UserList 
        users={largeUserList}
        loading={false}
      />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // 1초 이내에 렌더링되어야 함
    expect(renderTime).toBeLessThan(1000);
  });

  it('should not cause memory leaks in component updates', () => {
    const { rerender } = render(
      <UserList 
        users={createMockUserList(10)}
        loading={false}
      />
    );

    const initialMemory = process.memoryUsage().heapUsed;

    // 100번 리렌더링
    for (let i = 0; i < 100; i++) {
      rerender(
        <UserList 
          users={createMockUserList(10)}
          loading={false}
        />
      );
    }

    // 가비지 컬렉션 강제 실행
    if (global.gc) {
      global.gc();
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;

    // 메모리 증가량이 10MB 이하여야 함
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
  });
});
```

### 2. API 응답 시간 테스트

```typescript
// src/test/api-performance.test.ts
import { userApi } from '@entities/user/api/user';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

describe('API Performance Tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch users within acceptable time', async () => {
    const startTime = performance.now();
    
    await userApi.getUsers({ page: 0, size: 20 });
    
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    // 500ms 이내에 응답해야 함
    expect(responseTime).toBeLessThan(500);
  });

  it('should handle concurrent requests efficiently', async () => {
    const startTime = performance.now();
    
    const promises = Array.from({ length: 10 }, (_, i) =>
      userApi.getUsers({ page: i, size: 10 })
    );
    
    await Promise.all(promises);
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    // 동시 요청 10개가 2초 이내에 완료되어야 함
    expect(totalTime).toBeLessThan(2000);
  });
});
```

## 📊 테스트 커버리지

### 1. Jest 설정

```javascript
// jest.config.js
module.exports = {
  // ... 기본 설정
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**',
    '!src/**/*.stories.tsx',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // 중요한 모듈에 대한 높은 커버리지 요구
    './src/entities/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    // 유틸리티 함수는 100% 커버리지
    './src/shared/lib/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json-summary',
  ],
};
```

### 2. 커버리지 보고서 활용

```bash
# 커버리지 측정과 함께 테스트 실행
npm run test:coverage

# HTML 리포트 확인
open coverage/lcov-report/index.html

# 특정 파일의 커버리지 확인
npm run test:coverage -- --collectCoverageFrom="src/entities/user/**/*.ts"
```

## ✅ 테스트 체크리스트

### 단위 테스트
- [ ] 모든 순수 함수가 테스트되었는가?
- [ ] 에지 케이스가 모두 다뤄졌는가?
- [ ] 에러 상황이 적절히 테스트되었는가?
- [ ] 커스텀 훅의 모든 동작이 테스트되었는가?

### 통합 테스트
- [ ] 컴포넌트와 API의 상호작용이 테스트되었는가?
- [ ] 사용자 인터랙션이 올바르게 동작하는가?
- [ ] 로딩 및 에러 상태가 적절히 처리되는가?
- [ ] 폼 검증이 올바르게 동작하는가?

### E2E 테스트
- [ ] 주요 사용자 플로우가 모두 테스트되었는가?
- [ ] 크로스 브라우저 호환성이 확인되었는가?
- [ ] 반응형 디자인이 올바르게 동작하는가?
- [ ] 접근성 요구사항이 충족되는가?

### 성능 테스트
- [ ] 대용량 데이터 렌더링 성능이 확인되었는가?
- [ ] 메모리 누수가 없는가?
- [ ] API 응답 시간이 허용 범위 내인가?
- [ ] 번들 크기가 적절한가?

### 전반적인 품질
- [ ] 테스트 커버리지가 목표치를 달성했는가?
- [ ] 테스트가 안정적이고 신뢰할 수 있는가?
- [ ] 테스트 실행 시간이 적절한가?
- [ ] CI/CD 파이프라인에서 모든 테스트가 통과하는가?