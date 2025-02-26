/* step1.  무조건 입력 해야 하는 부분 */
import '@testing-library/jest-dom';
import * as React from 'react';
/* 테스트 조건에 따라 더 추가 될 수는 있다. */
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

/* step2. 테스트를 해야할 컴포넌트를 불러온다.*/
import { MyMenu, Notification } from '../../../../../src/features/layout';

/* step3. 변수 또는 hooks 에 대한 mocking */
/* step4. 렌더링 된 컴포넌트 중 외부 컴포넌트에 대한 mocking*/
vi.mock('@learnway/icons', () => ({
  IcoAlarmFill: (props: any) => <svg data-testid="ico-alarm-fill" {...props} />,
}));

/* step5. css module mocking  */
// CSS 모듈 모킹: 단순 문자열로 대체 , test file 기준 상대 경로
// 사용한 클래스명만 입력해주면 된다.
// mock 은 export default 가 있어야 하기 때문에 강제로 만들어준다.
vi.mock('../../../../../src/features/layout/ui/notification/notification.module.css', () => ({
  default: {
    btn_alarm: 'btn_alarm',
    count_view: 'count_view',
  },
}));

// 컴포넌트 시나리오 확인
describe('Notification component', () => {
  it('버튼은 아이콘과 텍스트와 함께 렌더링 되어야 한다.', () => {
    render(<Notification />);
    const buttons = screen.getAllByRole('button', { name: /99/i });
    const button = buttons[0];
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('ico-alarm-fill')).toBeInTheDocument();
  });

  it('버튼 클릭시 팝오버 컨텐츠가 표시 되어야 한다.', async () => {
    render(<Notification />);
    const buttons = screen.getAllByRole('button', { name: /99/i });
    const notificationButton = buttons[0];
    fireEvent.click(notificationButton);

    // PopoverContent에 포함된 텍스트들이 렌더링되어야 함
    expect(await screen.findByText('PopoverContent')).toBeInTheDocument();
  });
});
