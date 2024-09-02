import { Button } from '@/shared/components/Button/button';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
import { Error400 } from '@/shared/components/Sample/Error/Error400';
import { Error4001 } from '@/shared/components/Sample/Error/Error4001';
import { ErrorWithEB } from '@/shared/components/Sample/Error/Error400WithEB';
import { Error401 } from '@/shared/components/Sample/Error/Error401';
import { Error403 } from '@/shared/components/Sample/Error/Error403';
import { ErrorReference } from '@/shared/components/Sample/Error/ErrorReference';
import { ErrorSetTimeout } from '@/shared/components/Sample/Error/ErrorSetTimeout';
import { MutationTest } from '@/shared/components/Sample/Mutation';
import { useState } from 'react';

export const ErrorSample = () => {
  const [error401, setError401] = useState(false);
  return (
    <>
      <div className='flex flex-col items-center space-y-5'>
        <ErrorReference />
        <Error400 />
        {/* <ErrorWithEB /> */}
        <Error4001 />
        {error401 ? (
          <>
            <Error401 />
          </>
        ) : (
          <>
            <Button onClick={() => setError401(true)}>401에러</Button>
          </>
        )}
        <Error403 />
        <ErrorSetTimeout />
        <FetchBoundary>
          <MutationTest />
        </FetchBoundary>
      </div>
    </>
  );
};
