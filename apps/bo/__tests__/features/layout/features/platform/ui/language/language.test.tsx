import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Language } from '../../../../../../../src/features/platform';

// react-query 훅 사용을 위한 QueryClientProvider
const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

// react-i18next 모킹: t 함수는 key 그대로 반환, i18n.language는 'en'으로 설정
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

// 플랫폼 훅 모킹: useSetLanguage와 useLanguageSelectOptions
const setLanguageMock = vi.fn();
vi.mock('../../../platform', () => ({
  useSetLanguage: () => ({
    set: setLanguageMock,
  }),
  useLanguageSelectOptions: () => ({
    data: [
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
    ],
  }),
}));

// getDefaultLang 모킹: 'en' 반환
vi.mock('@learnway/config', async () => {
  const actual = await vi.importActual('@learnway/config');
  return {
    ...actual,
    CODE_GROUP: {
      LANGUAGE_CODE: 'LANGUAGE_CODE',
      // 필요한 다른 코드 그룹도 추가 가능
    },
    getDefaultLang: () => 'en',
  };
});

// @learnway/ui 모듈 모킹: Popover와 Button 컴포넌트를 단순화
vi.mock('@learnway/ui', () => ({
  Popover: ({ popoverContent, children, ...props }: any) => (
    <div data-testid="popover">
      <div data-testid="popover-trigger">{children}</div>
      <div data-testid="popover-content">{popoverContent}</div>
    </div>
  ),
  Button: (props: any) => (
    <button onClick={props.onClick} className={props.className}>
      {props.label || props.children}
    </button>
  ),
  Avatar: (props: any) => (
    <div data-testid="avatar" onClick={props.onClick}>
      {props.fallback}
    </div>
  ),
}));

// @learnway/icons 모킹: IcoArrowDown 단순 svg 컴포넌트
vi.mock('@learnway/icons', () => ({
  IcoArrowDown: (props: any) => <svg data-testid="ico-arrow-down" {...props} />,
}));

describe('FormTeacherChipList', () => {
  beforeEach(() => {
    setLanguageMock.mockClear();
  });

  it('Theme 이 렌더링 되어야 한다.', () => {
    renderWithProviders(<Language />);
    // 기본 언어(getDefaultLang() -> 'en')가 대문자로 표시되어야 함.
    expect(screen.getByTestId('ico-arrow-down')).toBeInTheDocument();
  });
});
