import { FetchBoundary } from '../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error400 = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorContent param='400' />
      </FetchBoundary>
    </>
  );
};
