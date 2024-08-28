import { useNavigate } from 'react-router-dom';
import { getErrorDataByCode } from './getErrorDataByCode';
import { Button } from '../Button/button';
import { FallbackProps } from 'react-error-boundary';

export const GlobalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();
  const navigatePage = (to: string) => {
    resetErrorBoundary();
    navigate(to);
  };

  const errorData = getErrorDataByCode(error);

  return (
    <>
      <h1>{errorData.code}</h1>
      <h2>{errorData.message}</h2>
      <Button
        onClick={() =>
          navigatePage(errorData.requireLogin ? '/auth/login' : '/')
        }
      >
        {errorData.requireLogin ? '로그인 이동' : '메인화면으로 이동'}
      </Button>
    </>
  );
};
