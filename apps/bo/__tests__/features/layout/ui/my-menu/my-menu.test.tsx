import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MyMenu } from '../../../../../src/features/layout';

// react-i18next 모킹: t 함수는 key 그대로 반환
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// 엔티티 훅 모킹: useFetchAuthUser가 더미 데이터를 반환하도록 설정
vi.mock('../../../../../src/entities/auth', () => ({
  useFetchAuthUser: () => ({
    data: { email: 'test@example.com' },
  }),
}));

// 아이콘 컴포넌트 모킹: IcoStar를 간단한 svg 컴포넌트로 대체
vi.mock('@learnway/icons', () => ({
  IcoStar: (props: any) => <svg data-testid="ico-star" {...props} />,
}));

// CSS 모듈 모킹: 단순 문자열로 대체
vi.mock('../../../../../src/features/layout/ui/my-menu/my-menu.module.css', () => ({
  default: {
    btn_menu: 'btn_menu',
    btn_text: 'btn_text',
  },
}));

// (필요시) Popover 컴포넌트는 실제 구현을 사용하거나, 별도 모킹 가능
// 여기서는 @learnway/ui의 Popover를 그대로 사용한다고 가정합니다.
describe('MyMenu component', () => {
  it('버튼은 아이콘과 텍스트와 함께 렌더링 되어야 한다.', () => {
    render(<MyMenu />);
    const buttons = screen.getAllByRole('button', { name: /MY MENU/i });
    const button = buttons[0];
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('ico-star')).toBeInTheDocument();
  });

  it('버튼 클릭시 팝오버 컨텐츠가 표시 되어야 한다.', async () => {
    render(<MyMenu />);
    const buttons = screen.getAllByRole('button', { name: /MY MENU/i });
    const myMenuButton = buttons[0];
    fireEvent.click(myMenuButton);

    // PopoverContent에 포함된 텍스트들이 렌더링되어야 함
    expect(await screen.findByText('RECENT MENU')).toBeInTheDocument();
    expect(screen.getByText('최근 메뉴 목록')).toBeInTheDocument();
    expect(screen.getByText('FAVORITES')).toBeInTheDocument();
    expect(screen.getByText('즐겨찾기 목록')).toBeInTheDocument();
  });
});
