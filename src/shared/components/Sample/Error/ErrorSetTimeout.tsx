import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorTimeoutAndClick } from './ErrorTimeoutAndClick';

export const ErrorSetTimeout = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorTimeoutAndClick />
      </FetchBoundary>
    </>
  );
};
