import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorJavascript } from './ErrorJavascript';

export const ErrorJS = () => {
  return (
    <>
      <FetchBoundary>
        <ErrorJavascript />
      </FetchBoundary>
    </>
  );
};
