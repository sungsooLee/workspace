import { CompactErrorUI } from '../../error/CompactErrorUI';
import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error400Compact = () => {
  return (
    <>
      <FetchBoundary errorFallbackComponent={true}>
        <ErrorContent param='400' />
      </FetchBoundary>
    </>
  );
};
