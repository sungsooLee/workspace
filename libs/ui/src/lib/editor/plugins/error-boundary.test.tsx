import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary 컴포넌트', () => {
  it('정상적으로 렌더링 되어야 한다', () => {
    render(
      <ErrorBoundary onError={vi.fn()}>
        <div>정상 렌더링</div>
      </ErrorBoundary>
    );
  });

  it('에러 발생 시 fallback UI가 렌더링 되어야 한다', () => {
    const ThrowError = () => {
      throw new Error('테스트 에러');
    };

    const { getByText } = render(
      <ErrorBoundary onError={vi.fn()}>
        <ThrowError />
      </ErrorBoundary>
    );
  });

  it('에러 발생 시 onError 콜백이 호출 되어야 한다', () => {
    const mockOnError = vi.fn();

    // 에러를 발생시키는 가짜 컴포넌트
    const ThrowError = () => {
      throw new Error('테스트 에러');
    };

    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError />
      </ErrorBoundary>
    );

    // onError 콜백이 호출되었는지 확인
    expect(mockOnError).toHaveBeenCalledTimes(1);

    // mockOnError에 전달된 에러 객체의 내용 확인
    const calledError = mockOnError.mock.calls[0][0];
    expect(calledError.message).toBe('테스트 에러'); // 에러 메시지가 정확한지 확인
  });
});
