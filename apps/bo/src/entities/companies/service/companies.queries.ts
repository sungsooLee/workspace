import CompaniesService from '../api/companies';
import { getQuerySkipToken } from '@learnway/shared';
import { Company } from '../../../types';
import { skipToken } from '@tanstack/react-query';

export const queryKeys = {
  all: ['companies'] as const,
  detail: (companyId: number) => [...queryKeys.all, companyId] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async (): Promise<Company[]> => CompaniesService.fetchCompanies(),
  }),
  detail: (id?: number) =>
    id
      ? {
          queryKey: queryKeys.detail(id),
          queryFn: (): Promise<any> => CompaniesService.fetchCompany(id),
        }
      : getQuerySkipToken<Company>(),
  detailBrn: (id?: number) =>
    id
      ? {
          queryKey: queryKeys.detail(id),
          queryFn: (): Promise<any> => CompaniesService.fetchCompanyBrn(id),
        }
      : getQuerySkipToken<Company>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Company) => CompaniesService.createCompany(payload),
  }),
  update: () => ({
    mutationFn: (payload: Company) => CompaniesService.updateCompany(payload),
  }),
  delete: () => ({
    mutationFn: (id?: number) => (id ? CompaniesService.deleteCompany(id) : skipToken),
  }),
};
