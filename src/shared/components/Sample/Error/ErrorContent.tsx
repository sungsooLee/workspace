import { useCallApi } from '@/shared/hooks/useCallApi';
import { errorGetData } from './SampleErrorApiFunc';

export const ErrorContent = ({
  param,
  className,
}: {
  param: string;
  className?: string;
}) => {
  const { data } = useCallApi(['api', param], () => errorGetData(param));

  return (
    <div className={className}>
      <h1>
        <h1>{data?.data?.title}</h1>
        <h2>{data?.data?.content}</h2>
      </h1>
    </div>
  );
};

Error;
