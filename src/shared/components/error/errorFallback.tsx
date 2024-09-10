import { HTTP_ERROR_MESSAGE } from '@/shared/constants/httpError';
import { Button } from '../Button/button';

export const hasKeyInObject = <T extends object>(
  obj: T,
  key: string | number | symbol
): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export interface ErrorProps {
  statusCode?: number;
  resetError?: () => void;
}

const ErrorFallback = ({ statusCode, resetError }: ErrorProps) => {
  const currentStatusCode = statusCode as number;
  console.log(currentStatusCode);
  if (currentStatusCode === 401) {
    return (
      <div className='h-full w-full'>
        <h2>인증 실패</h2>
        <p>로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.</p>
        <Button onClick={() => (window.location.href = '/auth/login')}>
          로그인 페이지로 이동
        </Button>
      </div>
    );
  }

  const isHTTPError = hasKeyInObject(HTTP_ERROR_MESSAGE, currentStatusCode);

  if (!isHTTPError) {
    return (
      <div className='h-full w-full'>
        <div>오류가 발생했습니다.</div>
        <Button onClick={resetError}>다시 시도</Button>
      </div>
    );
  }

  return (
    <div className='h-full w-full'>
      <div>{HTTP_ERROR_MESSAGE[currentStatusCode].HEADING}</div>
      <div>{HTTP_ERROR_MESSAGE[currentStatusCode].BODY}</div>
      <Button onClick={resetError}>
        {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON}
      </Button>
    </div>
  );
};

export default ErrorFallback;
