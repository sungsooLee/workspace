import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { getErrorDataByCode } from './getErrorDataByCode';
import { Button } from '../Button/button';

export const FetchErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const errorData = getErrorDataByCode(error);
  console.log(error);
  console.log(errorData);

  if (errorData.requireLogin) throw error;

  const handleClickReset = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <>
      <h1>{errorData?.code}</h1>
      <h2>{errorData?.message}</h2>
      <Button onClick={handleClickReset}>재시도 버튼</Button>
    </>
  );
};
