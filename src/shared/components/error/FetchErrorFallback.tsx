import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { getErrorDataByCode } from './getErrorDataByCode';
import { Button } from '../Button/button';

type CustomFallbackProps = FallbackProps & {
  // Type Intersection
  className?: string;
};

export const FetchErrorFallback = ({
  error,
  resetErrorBoundary,
  className,
}: CustomFallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const errorData = getErrorDataByCode(error);

  //글로벌 바운더리로 이동 시키기 위함.
  if (errorData.requireLogin) throw error;

  const handleClickReset = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <>
      <div className={className}>
        <h1>{errorData?.code}</h1>
        <h2>{errorData?.message}</h2>
        <Button onClick={handleClickReset}>재시도 버튼 {className}</Button>
      </div>
    </>
  );
};
