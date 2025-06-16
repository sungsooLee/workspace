import { skipToken } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import CompaniesService from '../api/companies';
import { Company } from '@learnway/types';

export const queryKeys = {
  all: ['companies'] as const,
  list: ['companies-page'] as const,
  detail: (code: string) => [...queryKeys.all, code] as const,
};

export const queryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<any> => CompaniesService.fetchAll(params),
  }),
  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => CompaniesService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (code?: string) =>
    code
      ? {
          queryKey: queryKeys.detail(code),
          queryFn: (): Promise<any> => CompaniesService.fetch(code),
        }
      : getQuerySkipToken<any>(),
  detailBrn: (brn?: string) =>
    brn
      ? {
          queryKey: queryKeys.detail(brn),
          queryFn: (): Promise<any> => CompaniesService.fetchBrn(brn),
        }
      : getQuerySkipToken<Company>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Company) => CompaniesService.create(payload),
  }),
  update: () => ({
    mutationFn: (payload: Company) => CompaniesService.update(payload),
  }),
  delete: () => ({
    mutationFn: (id?: number) => (id ? CompaniesService.delete(id) : skipToken),
  }),
  checkExists: () => ({
    mutationFn: (payload: any) => CompaniesService.existsCode(payload),
  }),
};
