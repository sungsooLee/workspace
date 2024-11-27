import { useQuery } from '@tanstack/react-query';

import { SelectOption } from '@learnway/ui';

import { queryOptions } from './company.queries';
import { Company } from '../model/company';

export function useCompanies() {
  return useQuery(queryOptions.all());
}

export function useCompanySelectOptions() {
  return useQuery<Company[], unknown, SelectOption[]>({
    ...queryOptions.all(),
    select: (data: Company[]) =>
      data?.map((d: Company) => ({ label: d.orgName, value: d.orgId, extra: d } as SelectOption)),
  });
}
