import { useQuery } from '@tanstack/react-query';

import type { TermsType, Terms, TermsVersion } from '../../../types';

import { queryOptions } from './terms.queries';

export function useFetchTerms(termsType: TermsType, termsId?: number) {
  console.log('useFetchTerms', termsType, termsId);
  return useQuery(queryOptions.terms(termsType, termsId));
}

export function useFetchTermsVersions(termsType: TermsType) {
  return useQuery(queryOptions.versions(termsType));
}
