import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error401 = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorContent param='401' />
      </FetchBoundary>
    </>
  );
};
