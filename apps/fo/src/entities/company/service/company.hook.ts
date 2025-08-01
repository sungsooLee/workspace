import { useQuery } from '@tanstack/react-query';

import { SelectOption } from '@learnway/ui/type';
import { Company } from '../model/company';
import { queryOptions } from './company.queries';

export function useFetchCompanies() {
  return useQuery(queryOptions.all());
}

export function useFetchCompanySelectOptions() {
  return useQuery<Company[], unknown, SelectOption[]>({
    ...queryOptions.all(),
    select: (data: Company[]) =>
      data?.map(
        (d: Company) => ({ label: d.orgName, value: String(d.orgId), extra: d }) as SelectOption,
      ),
  });
}
