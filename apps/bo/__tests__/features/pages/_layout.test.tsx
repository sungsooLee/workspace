import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
// 실제 LayoutComponent와 Route를 import (경로는 실제 프로젝트 구조에 맞게 조정)
import { Route } from '../../../src/pages/_layout';
// __tests__/features/pages/_layout.test.tsx

// 모듈 모킹

// 1. react-i18next: t 함수는 key 그대로 반환하도록 모킹
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// 2. react-device-detect: BrowserView와 MobileView를 간단한 wrapper로 모킹
vi.mock('react-device-detect', () => ({
  BrowserView: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-view">{children}</div>
  ),
  MobileView: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mobile-view">{children}</div>
  ),
}));

// 3. Outlet, createFileRoute, useRouter를 모킹
vi.mock('@tanstack/react-router', () => {
  return {
    Outlet: () => <div data-testid="outlet">Outlet content</div>,
    // createFileRoute를 함수로 구현하여, 인자로 받은 설정 객체에서 component만 추출
    createFileRoute: (path: string) => (config: any) => ({ component: config.component, path }),
    useRouter: () => ({}),
  };
});

// 4. Layout, MobileLayout 모킹 (간단한 wrapper 컴포넌트)
vi.mock('../../../src/widgets/layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
  MobileLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mobile-layout">{children}</div>
  ),
}));

// 5. 엔티티 훅 모킹
vi.mock('../../../src/entities/auth', () => ({
  useFetchAuthUser: () => ({
    data: {
      email: 'test@example.com',
      activeTenantId: 'tenant123',
    },
  }),
}));

vi.mock('../../../src/entities/tenant', () => ({
  useFetchTenant: (tenantId: string) => ({
    data: tenantId ? { name: 'Tenant A', windowTitle: 'Tenant A Title' } : null,
  }),
}));

// 6. authConfig 모킹: 빈 객체 반환
vi.mock('../../../src/features/auth', () => ({
  authConfig: () => ({}),
}));

describe('LayoutComponent', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('tenant 데이터가 있을 경우 document.title이 tenant.windowTitle로 설정되어야 한다', async () => {
    /*@ts-expect-error Route.component  */
    render(<Route.component />);
    await waitFor(() => {
      expect(document.title).toBe('Tenant A Title');
    });
  });

  it('브라우저와 모바일 레이아웃 모두 Outlet을 렌더링해야 한다', () => {
    /*@ts-expect-error Route.component  */
    render(<Route.component />);
    // BrowserView 내의 Layout 확인
    expect(screen.getByTestId('browser-view')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();

    // Outlet은 두 개 렌더링되므로 getAllByTestId를 사용
    const outlets = screen.getAllByTestId('outlet');
    expect(outlets.length).toBe(2);
    outlets.forEach((outlet) => {
      expect(outlet).toHaveTextContent('Outlet content');
    });

    // MobileView 내의 MobileLayout 확인
    expect(screen.getByTestId('mobile-view')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-layout')).toBeInTheDocument();
  });
});
