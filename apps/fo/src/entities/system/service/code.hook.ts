import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './code.queries';
import { Code } from '../model/code';

export function useFetchCodes() {
  return useQuery(queryOptions.all());
}
