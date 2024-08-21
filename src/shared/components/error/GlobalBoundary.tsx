import { Suspense } from 'react';
import { GlobalErrorFallback } from './GlobalErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingScreen from '../suspense/loading-screen';

export const GlobalBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
