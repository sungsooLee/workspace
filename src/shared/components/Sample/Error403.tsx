import { FetchBoundary } from '../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error403 = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorContent param='403' />
      </FetchBoundary>
    </>
  );
};
