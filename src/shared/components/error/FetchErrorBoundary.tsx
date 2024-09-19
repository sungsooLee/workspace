import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary';
import { FetchErrorFallback } from './FetchErrorFallback';
import { Suspense, SuspenseProps } from 'react';
import LoadingScreen from '../ui/loading-screen';

type FetchBoundaryProps = {
  children: React.ReactElement;
  errorFallbackClassName?: string;
  loadingFallbackClassName?: string;
  errorFallbackComponent?: boolean;
};
export const FetchBoundary = ({
  children,
  errorFallbackClassName,
  loadingFallbackClassName,
}: FetchBoundaryProps) => {
  const errorBoundaryOptions: ErrorBoundaryProps = {
    FallbackComponent: (props) => {
      return (
        <FetchErrorFallback
          {...props}
          className={errorFallbackClassName as string}
        />
      );
    },
  };

  const loadingFallback = (
    <LoadingScreen className={loadingFallbackClassName as string} />
  );

  return (
    <ErrorBoundary {...errorBoundaryOptions}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
