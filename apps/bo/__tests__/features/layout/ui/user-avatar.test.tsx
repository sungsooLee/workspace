import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PopoverContent, UserAvatar } from '../../../../src/features/layout';

// spy/mock 함수 생성
const navigateMock = vi.fn();
const logoutMock = vi.fn();
const reissueMock = vi.fn();

// 모듈 모킹

// react-i18next: t 함수는 key 그대로 반환하도록 모킹
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// @tanstack/react-router: useRouter를 간단한 navigate mock으로 대체
vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({
    navigate: navigateMock,
  }),
}));

// 컴포넌트에서 import하는 모듈 경로와 동일하게 모킹(경로를 실제 경로와 맞춰주세요)
vi.mock('../../../../src/entities/auth', () => ({
  useFetchAuthUser: () => ({
    data: {
      email: 'test@example.com',
      tenants: [{ name: 'Tenant A' }],
      activeTenantId: 'tenant123',
    },
  }),
  useLogoutUser: () => ({
    logout: logoutMock,
  }),
  useReissue: () => ({
    reissue: reissueMock,
  }),
}));

// react-query 훅 사용을 위한 QueryClientProvider
const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe('UserAvatar 컴포넌트', () => {
  it('Avatar가 올바르게 렌더링되어야 한다', () => {
    renderWithProviders(<UserAvatar />);
    // Popover trigger는 버튼으로 렌더링됨
    const popoverTrigger = screen.getByRole('button');
    expect(popoverTrigger).toBeInTheDocument();
  });

  it('Avatar 클릭 시 팝오버 내용(프로필 메뉴 및 tenant)이 렌더링되어야 한다', async () => {
    renderWithProviders(<UserAvatar />);
    const popoverTrigger = screen.getByRole('button');
    fireEvent.click(popoverTrigger);

    // 기본 메뉴 항목 확인
    expect(await screen.findByText('PROFILE')).toBeInTheDocument();
    expect(screen.getByText('MY INFOMATION')).toBeInTheDocument();
    expect(screen.getByText('MY AUTH')).toBeInTheDocument();
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
    expect(screen.getByText('REISSUE')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Tenant A');
    // 스크린 컨텐츠 찍어보는 방법
    /*const tenantElement = screen.getByText((content, element) => {
      console.log(content);
      return content.trim() === 'Tenant A';
    });
    expect(tenantElement).toBeInTheDocument();
    */
  });
});

describe('PopoverContent 액션 테스트', () => {
  beforeEach(() => {
    // 각 테스트마다 mock 함수 초기화
    navigateMock.mockClear();
    logoutMock.mockClear();
    reissueMock.mockClear();
  });

  it('MY INFOMATION과 MY AUTH 클릭 시 router.navigate가 호출되어야 한다', () => {
    renderWithProviders(<PopoverContent />);
    const infoMenu = screen.getByText('MY INFOMATION');
    const authMenu = screen.getByText('MY AUTH');

    fireEvent.click(infoMenu);
    expect(navigateMock).toHaveBeenCalledTimes(1);

    fireEvent.click(authMenu);
    expect(navigateMock).toHaveBeenCalledTimes(2);
  });

  it('LOGOUT 클릭 시 logout 함수가 호출되어야 한다', () => {
    renderWithProviders(<PopoverContent />);
    const logoutMenu = screen.getByText('LOGOUT');
    fireEvent.click(logoutMenu);
    expect(logoutMock).toHaveBeenCalled();
  });

  it('REISSUE 클릭 시 reissue 함수가 호출되어야 한다', () => {
    renderWithProviders(<PopoverContent />);
    const reissueMenu = screen.getByText('REISSUE');
    fireEvent.click(reissueMenu);
    expect(reissueMock).toHaveBeenCalled();
  });
});
