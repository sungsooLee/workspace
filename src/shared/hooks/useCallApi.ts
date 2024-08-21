import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { QueryKey } from '@tanstack/react-query';

export type ApiFunction<T> = (param?: string) => Promise<T>;

export const useCallApi = <T>(
  queryKey: QueryKey,
  apiFunction: ApiFunction<T>,
  param?: string
  //   options?: UseSuspenseQueryOptions<T>
) => {
  const data = useSuspenseQuery<T>({
    queryKey: param ? [...queryKey, param] : queryKey,
    queryFn: async () => {
      const response = await apiFunction(param);
      return response;
    },
    // ...options,
  });
  console.log(data);

  return data;
};

// import { useSuspenseQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export type DataType = {
//   code: string;
//   message: string;
//   payload?: { title: string; contents: string };
// };

// const getData = async (param: string) => {
//   const data = await axios.get<DataType>(`/error/${param}`);
//   return data.data;
// };

// export const useCallApi = (param: string) => {
//   const { data } = useSuspenseQuery({
//     queryKey: ['api', param],
//     queryFn: () => getData(param),
//     refetchOnWindowFocus: false,
//   });
//   return data;
// };
