import { EnQuestionLevel, EnQuestionType } from '@types';

export const QUESTION_TYPES: Record<EnQuestionType, string> = Object.freeze({
  [EnQuestionType.SINGLE]: '객관식',
  [EnQuestionType.MULTIPLE]: '다답식',
  [EnQuestionType.OX]: 'OX',
  [EnQuestionType.SHORT_ANSWER]: '단답식',
  [EnQuestionType.ESSAY]: '주관식',
});

export const QUESTION_LEVELS: Record<EnQuestionLevel, string> = Object.freeze({
  [EnQuestionLevel.HARD]: '상',
  [EnQuestionLevel.MEDIUM]: '중',
  [EnQuestionLevel.EASY]: '하',
});
