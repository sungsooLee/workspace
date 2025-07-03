import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ManagerList } from '../../../../../../../../src/features/learning/ui/dialog/form-manager-input-button/manager-list';
// useModalContext를 모킹해서 closeModal 함수를 spy 함수로 반환하도록 함.
const closeModalMock = vi.fn();

vi.mock('@learnway/ui', () => {
  // 실제 모듈의 다른 부분이 필요하면 importActual을 사용해 결합할 수 있음
  return {
    // Button은 그대로 사용하거나 단순화할 수 있습니다.
    Button: (props: any) => (
      <button onClick={props.onClick} className={props.className}>
        {props.label || props.children}
      </button>
    ),
    useModalContext: () => ({
      closeModal: closeModalMock,
    }),
  };
});

describe('ManagerList Component', () => {
  beforeEach(() => {
    closeModalMock.mockClear();
  });
  it('ManagerList를 렌더링합니다.', () => {
    render(<ManagerList />);
  });

  /*it('Manager1 버튼을 클릭하면 Manager1 데이터로 closeModal을 호출합니다.', () => {
    render(<ManagerList />);
    const buttonManager1 = screen.getByRole('button', { name: /manager1/i });
    fireEvent.click(buttonManager1);
    expect(closeModalMock).toHaveBeenCalledWith({ id: '1', name: 'manager1' });
  });

  it('Manager2 버튼을 클릭하면 Manager2 데이터로 closeModal을 호출합니다.', () => {
    render(<ManagerList />);
    const buttonManager2 = screen.getByRole('button', { name: /manager2/i });
    fireEvent.click(buttonManager2);
    expect(closeModalMock).toHaveBeenCalledWith({ id: '2', name: 'manager2' });
  });

  it('"확인" 버튼을 클릭하면 확인 데이터와 함께 closeModal을 호출합니다.', () => {
    render(<ManagerList />);
    const confirmButton = screen.getByRole('button', { name: /확인/i });
    fireEvent.click(confirmButton);
    expect(closeModalMock).toHaveBeenCalledWith({ id: '1', name: 'name1' });
  });*/
});
