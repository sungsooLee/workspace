import { useQuery } from '@tanstack/react-query';

const useTableBox = (config: any) => {
  const { data, isPending, refetch, isFetching } = useQuery(config.query());
  const handleReFetch = () => {
    if (isFetching) return;
    refetch();
  };
  return { config: { ...config, data, isPending, isFetching }, fetch: handleReFetch };
};
export default useTableBox;
