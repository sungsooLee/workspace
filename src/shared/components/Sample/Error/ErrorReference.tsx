import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorJavascript } from './ErrorJavascript';

export const ErrorReference = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorJavascript />
      </FetchBoundary>
    </>
  );
};
