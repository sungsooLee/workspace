import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error403 = () => {
  const tmpStyleClassName = 'w-full bg-slate-400 items-center';

  const tmpLoadingStyleClassName =
    'w-full justify-center bg-green-500 flex items-center';

  return (
    <>
      <FetchBoundary
        errorFallbackClassName={tmpStyleClassName}
        loadingFallbackClassName={tmpLoadingStyleClassName}
      >
        <ErrorContent param='403' className={tmpStyleClassName} />
      </FetchBoundary>
    </>
  );
};
