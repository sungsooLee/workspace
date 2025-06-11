import { skipToken } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import CompaniesService from '../api/companies';
import { Company } from 'types';

export const queryKeys = {
  all: ['companies'] as const,
  list: ['companies-page'] as const,
  detail: (id: number) => [...queryKeys.all, id] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<any> => CompaniesService.fetchAll(),
  }),
  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => CompaniesService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (id?: number) =>
    id
      ? {
          queryKey: queryKeys.detail(id),
          queryFn: (): Promise<any> => CompaniesService.fetch(id),
        }
      : getQuerySkipToken<Company>(),
  detailBrn: (id?: number) =>
    id
      ? {
          queryKey: queryKeys.detail(id),
          queryFn: (): Promise<any> => CompaniesService.fetchBrn(id),
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
