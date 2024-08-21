import { Error400 } from '@/shared/components/Sample/Error400';
import { Error401 } from '@/shared/components/Sample/Error401';
import { Error403 } from '@/shared/components/Sample/Error403';
import { MutationTest } from '@/shared/components/Sample/Mutation';

export const ErrorSample = () => {
  return (
    <>
      <div className='flex flex-col items-center space-y-5'>
        <Error400 />
        {/* <Error401 /> */}
        <Error403 />
        <MutationTest />
      </div>
    </>
  );
};
