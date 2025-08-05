import { EnQuestionLevel, EnQuestionType } from '@entities/learning-resource';
import { TFunction } from 'i18next';

export const QUESTION_TYPES: (
  t: TFunction<'translation', undefined>,
) => Record<EnQuestionType, string> = (t) =>
  Object.freeze({
    [EnQuestionType.SINGLE]: t('객관식'),
    [EnQuestionType.MULTIPLE]: t('다답식'),
    [EnQuestionType.OX]: t('OX'),
    [EnQuestionType.SHORT_ANSWER]: t('단답식'),
    [EnQuestionType.ESSAY]: t('주관식'),
  });

export const QUESTION_LEVELS: (
  t: TFunction<'translation', undefined>,
) => Record<EnQuestionLevel, string> = (t) =>
  Object.freeze({
    [EnQuestionLevel.HARD]: t('상'),
    [EnQuestionLevel.MEDIUM]: t('중'),
    [EnQuestionLevel.EASY]: t('하'),
  });
