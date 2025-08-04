import { t } from 'i18next';

export const LEARNING_STATUS_TYPE_KEYS = {
  ENROLLMENT_NOT_STARTED: '수강신청 전',
  ENROLLMENT_IN_PROGRESS: '수강신청중',
  LEARNING_NOT_STARTED: '학습 전',
  LEARNING_IN_PROGRESS: '학습중',
  LEARNING_COMPLETED: '학습완료',
} as const;

export type LearningStatusType = keyof typeof LEARNING_STATUS_TYPE_KEYS;

export function getLeaningStatusTypeName(status: unknown): string {
  if (typeof status !== 'string') return '';
  const key = status as LearningStatusType;

  if (!(key in LEARNING_STATUS_TYPE_KEYS)) return '';

  return t(LEARNING_STATUS_TYPE_KEYS[key]);
}
