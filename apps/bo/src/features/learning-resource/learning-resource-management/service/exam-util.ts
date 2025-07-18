import { t } from 'i18next';
import { EnQuestionLevel, EnQuestionType } from '@types';

export const QUESTION_TYPES: Record<EnQuestionType, string> = Object.freeze({
  [EnQuestionType.SINGLE]: t('객관식'),
  [EnQuestionType.MULTIPLE]: t('다답식'),
  [EnQuestionType.OX]: t('OX'),
  [EnQuestionType.SHORT_ANSWER]: t('단답식'),
  [EnQuestionType.ESSAY]: t('주관식'),
});

export const QUESTION_LEVELS: Record<EnQuestionLevel, string> = Object.freeze({
  [EnQuestionLevel.HARD]: t('상'),
  [EnQuestionLevel.MEDIUM]: t('중'),
  [EnQuestionLevel.EASY]: t('하'),
});
