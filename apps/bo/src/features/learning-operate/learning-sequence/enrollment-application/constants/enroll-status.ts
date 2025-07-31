import { t } from 'i18next';

export const ENROLL_STATUS_KEYS = {
  ENROLL_DONE: '결재/승인 완료',
  ENROLL_REQUEST: '신청중',
  CANCEL_DONE: '취소',
  REJECT_DONE: '반려',
} as const;

export type EnrollStatusType = keyof typeof ENROLL_STATUS_KEYS;

export function getEnrollStatusName(status: unknown): string {
  if (typeof status !== 'string') return '';
  const key = status as EnrollStatusType;

  if (!(key in ENROLL_STATUS_KEYS)) return '';

  return t(ENROLL_STATUS_KEYS[key]);
}
