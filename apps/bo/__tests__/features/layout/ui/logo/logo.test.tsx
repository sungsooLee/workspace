import '@testing-library/jest-dom';
// Logo.test.tsx
import * as React from 'react';
// __tests__/features/layout/ui/logo/logo.test.tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Logo } from '../../../../../src/features/layout';

// @tanstack/react-router 모듈 모킹: Link를 간단한 <a> 태그로 대체
vi.mock('@tanstack/react-router', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

// @learnway/shared 모듈을 부분 모킹하여, 실제 모듈의 나머지 export들을 유지하면서 cn 함수만 오버라이드
vi.mock('@learnway/shared', async () => {
  const actual = await vi.importActual('@learnway/shared');
  return {
    ...actual,
    cn: (...args: string[]) => args.filter(Boolean).join(' '),
  };
});

describe('Logo 컴포넌트 렌더링 테스트', () => {
  // 테스트에서 사용할 QueryClient를 생성
  const queryClient = new QueryClient();

  // QueryClientProvider로 감싸주는 헬퍼 함수
  const renderWithClient = (ui: React.ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  };

  it('기본 테마(main)일 때 logo.png가 렌더링되어야 한다', () => {
    renderWithClient(<Logo />);
    const linkElement = screen.getByRole('link');
    const imgElement = screen.getByAltText('Logo') as HTMLImageElement;

    expect(linkElement).toHaveAttribute('href', '/');
    expect(imgElement.src).toContain('logo.png');
  });

  it('theme가 login이면 logo_auth.png가 렌더링되어야 한다', () => {
    renderWithClient(<Logo theme="login" />);
    const imgElement = screen.getByAltText('Logo') as HTMLImageElement;
    expect(imgElement.src).toContain('logo_auth.png');
  });
});
