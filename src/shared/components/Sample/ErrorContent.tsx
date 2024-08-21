import { useCallApi } from '@/shared/hooks/useCallApi';
import { errorGetData } from './SampleErrorApiFunc';

const sampleFunc = (getParam?: string) => errorGetData(getParam);

export const ErrorContent = ({ param }: { param: string }) => {
  const data = useCallApi(['api', param], () => sampleFunc(param));
  // const data = useCallApi(param);
  //   const res = data;
  return (
    <>
      {/* <h1>{res.data?.title}</h1>
      <h2>{res.data?.content}</h2> */}
    </>
  );
};
