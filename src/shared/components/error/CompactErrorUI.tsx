import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '../Button/button';

export const CompactErrorUI: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { reset } = useQueryErrorResetBoundary();

  const handleRetry = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <div className='relative'>
      <div className='absolute left-0 top-10 rounded-md border border-gray-300 bg-white p-4 shadow-md'>
        <p className='text-sm font-medium text-gray-900'>An error occurred:</p>
        <p className='mt-1 text-sm text-gray-500'>{error.message}</p>
        <div className='mt-4'>
          <Button
            onClick={handleRetry}
            className='rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600'
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};
