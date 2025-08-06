import { useQuery } from '@tanstack/react-query';

import type { TermsType } from '../model/terms.types';

import { queryOptions } from './terms.queries';

export function useFetchTerms(termsType: TermsType, termsId?: number) {
  return useQuery(queryOptions.terms(termsType, termsId));
}

export function useFetchTermsVersions(termsType: TermsType) {
  return useQuery(queryOptions.versions(termsType));
}
