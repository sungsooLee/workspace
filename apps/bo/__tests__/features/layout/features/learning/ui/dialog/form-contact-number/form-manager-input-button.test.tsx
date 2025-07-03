import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { FormContactNumber } from '../../../../../../../../src/features/learning/ui/dialog/form-contact-number/form-manager-input-button';

// @learnway/ui의 Input 컴포넌트를 단순 input으로 모킹
vi.mock('@learnway/ui', () => ({
  Input: (props: any) => <input {...props} />,
}));

describe('FormContactNumber', () => {
  const initialValue = '+82-10-1234-5678'; // 전달될 초기 값
  let onChangeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChangeMock = vi.fn();
  });

  it('초기 렌더링 시 파싱된 전화번호가 각 Input에 표시되어야 한다', () => {
    render(<FormContactNumber value={initialValue} onChange={onChangeMock} />);
    // parsePhoneNumber 로직에 따라:
    // countryCode: "+82", areaCode: "10", number: "1234-5678"

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('+82');
    expect(inputs[1]).toHaveValue('10');
    expect(inputs[2]).toHaveValue('1234-5678');
  });

  it('각 input onBlur 이벤트 후 onChange가 호출되어야 한다', async () => {
    render(<FormContactNumber value={initialValue} onChange={onChangeMock} />);
    const inputs = screen.getAllByRole('textbox');
    // 시뮬레이션: 각 input의 값을 변경
    fireEvent.blur(inputs[0], { target: { value: '+1' } });
    fireEvent.blur(inputs[1], { target: { value: '212' } });
    fireEvent.blur(inputs[2], { target: { value: '555-1212' } });

    // 내부적으로 useEffect가 동작하여 세 값을 단순히 이어붙임: "+1" + "212" + "555-1212"
    // onChangeMock가 호출되어야 함.
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('+1212555-1212');
    });
  });
});
