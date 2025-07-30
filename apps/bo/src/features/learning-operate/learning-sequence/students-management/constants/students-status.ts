import { t } from 'i18next';

export const STUDENTS_STATUS_KEYS = {
  LEARNING: t('학습 중'),
  ASSIGNMENT_DONE: t('과제 완료'),
  QUIZ_DONE: t('평가 완료'),
  SURVEY_DONE: t('설문 완료'),
} as const;

export const STUDENTS_COURSE_TYPE_KEYS = {
  ELEARNING1: t('이러닝1'),
  ELEARNING2: t('이러닝2'),
  CLASS: t('클래스'),
  LIVE: t('라이브'),
  EXAM: t('시험'),
  SURVEY: t('설문'),
} as const;

export type StudentsStatusType = keyof typeof STUDENTS_STATUS_KEYS;
export type StudentCourseType = keyof typeof STUDENTS_COURSE_TYPE_KEYS;

export function getStudentsStatusName(status: unknown): string {
  if (typeof status !== 'string') return '';
  const key = status as StudentsStatusType;
  if (!(key in STUDENTS_STATUS_KEYS)) return '';

  return STUDENTS_STATUS_KEYS[key];
}

export function getStudentCourseTypeName(courseType: unknown): string {
  if (typeof courseType !== 'string') return '';
  const key = courseType as StudentCourseType;

  if (!(key in STUDENTS_COURSE_TYPE_KEYS)) return '';

  return STUDENTS_COURSE_TYPE_KEYS[key];
}
