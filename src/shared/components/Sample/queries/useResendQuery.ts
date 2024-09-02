import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export const QUERY_KEY = ['resend'];

const fetcher = (param: number) => axios.get(`/error/${param}`);

const useResendQuery = (param: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(param),
  });
};

export default useResendQuery;
