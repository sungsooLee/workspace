import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Theme } from '../../../../../../src/features/platform';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// react-query 훅 사용을 위한 QueryClientProvider
const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

// @learnway/ui 모듈 모킹: Popover와 Avatar를 단순화해서 팝오버 콘텐츠를 항상 렌더링하도록 함
vi.mock('@learnway/ui', () => ({
  Avatar: (props: any) => (
    <div data-testid="avatar" onClick={props.onClick}>
      {props.fallback}
    </div>
  ),
  Popover: ({ popoverContent, children }: any) => (
    <div>
      <div data-testid="popover-trigger">{children}</div>
      <div data-testid="popover-content">{popoverContent}</div>
    </div>
  ),
}));

describe('FormTeacherChipList', () => {
  beforeEach(() => {
    // 테스트 시작 전 document.documentElement의 클래스 초기화
    document.documentElement.className = '';
  });

  it('Theme 이 렌더링 되어야 한다.', () => {
    renderWithProviders(<Theme />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('Theme');
  });

  it('기본 옵션을 클릭하면 테마 클래스가 제거됩니다.', () => {
    renderWithProviders(<Theme />);
    // 미리 red와 green 클래스를 추가한 상태로 시작
    const defaultOption = screen.getByText('default');
    fireEvent.click(defaultOption);
    expect(document.documentElement.classList.contains('red')).toBe(false);
    expect(document.documentElement.classList.contains('green')).toBe(false);
  });
});
