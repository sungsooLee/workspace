import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export const QUERY_KEY = ['resend'];

const fetcher = (param: string) => axios.get(`/error/${param}`);

const useResendQuery = (param: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetcher(param),
  });
};

export default useResendQuery;
