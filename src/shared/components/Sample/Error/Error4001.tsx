import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error4001 = () => {
  return (
    <div className='p-10'>
      <FetchBoundary>
        <ErrorContent param='CUSTOM_ERROR' />
      </FetchBoundary>
    </div>
  );
};
