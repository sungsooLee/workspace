import CompanyService from '../api/company';

export const queryKeys = {
  all: ['companies'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: (): Promise<any> => CompanyService.fetchCompanies(),
  }),
};
