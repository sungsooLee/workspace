import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error4001 = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorContent param='CUSTOM_ERROR' />
      </FetchBoundary>
    </>
  );
};
