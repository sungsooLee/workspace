import * as React from 'react'; // React 모듈 가져오기
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'; // 에러 경계를 위한 ReactErrorBoundary 가져오기
import { ReactNode } from 'react'; // ReactNode 타입 가져오기

/**
 * ErrorBoundaryProps 타입 정의
 *
 * ErrorBoundary 컴포넌트의 props 타입을 정의
 * children: 자식 컴포넌트로 전달되는 React 요소
 * onError: 에러가 발생했을 때 호출되는 콜백 함수
 */
export type ErrorBoundaryProps = {
  children: ReactNode; // 자식 컴포넌트로 전달되는 React 요소
  onError: (error: Error) => void; // 에러 발생 시 호출되는 콜백 함수
};

/**
 * ErrorBoundary 컴포넌트
 *
 * 에러를 경계하고 발생한 에러를 처리하기 위한 ReactErrorBoundary를 래핑한 컴포넌트
 * 에러가 발생하면 'An error was thrown.' 메시지를 표시하는 기본 UI를 제공하며, onError 콜백을 통해 에러를 처리할 수 있음.
 *
 * @param {ErrorBoundaryProps} props - ErrorBoundary에 전달되는 props
 * @returns {JSX.Element} 에러 경계를 제공하는 JSX 엘리먼트
 */
export function ErrorBoundary({ children, onError }: ErrorBoundaryProps): JSX.Element {
  return (
    <ReactErrorBoundary
      // 에러 발생 시 fallback UI를 정의
      fallback={
        <div
          style={{
            border: '1px solid #f00',
            color: '#f00',
            padding: '8px',
          }}>
          An error was thrown. {/* 에러 발생 메시지 */}
        </div>
      }
      // 에러 발생 시 onError 콜백 호출
      onError={onError}>
      {children} {/* 자식 컴포넌트 렌더링 */}
    </ReactErrorBoundary>
  );
}

/**
 * @deprecated use the named export {@link ErrorBoundary}
 *
 * default export로의 접근은 더 이상 권장되지 않으므로, 명명된 export 사용을 권장
 */
// eslint-disable-next-line no-restricted-exports
export default ErrorBoundary;
