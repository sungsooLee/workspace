import { FallbackProps, withErrorBoundary } from 'react-error-boundary';
import { FetchErrorFallback } from '../../error/FetchErrorFallback';
import { Error400WithoutBoundary } from './Error400withoutBoundary';

export const ErrorWithEB = withErrorBoundary(Error400WithoutBoundary, {
  FallbackComponent: (props: FallbackProps) => (
    <FetchErrorFallback {...props} />
  ),
  onError(error, info) {
    console.error(error);
  },
});
