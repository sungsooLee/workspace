import { t } from 'i18next';

export const ENROLL_STATUS_KEYS = {
  ENROLL_DONE: t('결재/승인 완료'),
  ENROLL_REQUEST: t('신청중'),
  CANCEL_DONE: t('취소'),
  REJECT_DONE: t('반려') } as const;

export type EnrollStatusType = keyof typeof ENROLL_STATUS_KEYS;

export function getEnrollStatusName(status: unknown): string {
  if (typeof status !== 'string') return '';
  const key = status as EnrollStatusType;

  if (!(key in ENROLL_STATUS_KEYS)) return '';

  return t(ENROLL_STATUS_KEYS[key]);
}
