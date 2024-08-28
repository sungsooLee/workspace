import { Suspense } from 'react';
import { ErrorContent } from './ErrorContent';
import LoadingScreen from '../../suspense/loading-screen';

export const Error400WithoutBoundary = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <ErrorContent param='400' />
      </Suspense>
    </>
  );
};
