import { skipToken } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import VerificationsService from '../api/verifications';

export const queryKeys = {
  all: ['tenants'] as const,
  detail: (tenantId: number) => [...queryKeys.all, tenantId] as const,
  // 유저 ID 기반으로 특정 유저의 테넌트를 가져오는 쿼리 키
  byUser: (accountId: string) => ['tenants', 'byUser', accountId] as const,
};

export const queryOptions = {};

export const mutateOptions = {
  sendVerifyPhoneNumber: () => ({
    mutationFn: (payload: any) => VerificationsService.sendVerifyPhoneNumer(payload),
  }),
  sendVerifyEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.sendVerifyEmail(payload),
  }),
  verifyPhoneNumber: () => ({
    mutationFn: (payload: any) => VerificationsService.verifyPhoneNumer(payload),
  }),
  verifyEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.verifyEmail(payload),
  }),
};
