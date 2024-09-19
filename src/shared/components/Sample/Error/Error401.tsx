import { FetchBoundary } from '../../error/FetchErrorBoundary';
import { ErrorContent } from './ErrorContent';

export const Error401 = () => {
  return (
    <div className='p-10'>
      <FetchBoundary>
        <ErrorContent param='401' />
      </FetchBoundary>
    </div>
  );
};
