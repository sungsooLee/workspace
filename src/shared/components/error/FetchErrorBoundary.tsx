import { ErrorBoundary } from 'react-error-boundary';
import { FetchErrorFallback } from './FetchErrorFallback';
import { Suspense } from 'react';
import LoadingScreen from '../suspense/loading-screen';

export const FetchBoundary = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
