import { EnQuestionLevel, EnQuestionType, QuestionItem } from '@entities/learning-resource';
import { TFunction } from 'i18next';

export type QuestionStatisticRow = {
  title: string;
  hard: number;
  medium: number;
  easy: number;
};

export const initStatisticRow: (
  t: TFunction<'translation', undefined>,
) => QuestionStatisticRow[] = (t) => [
  { title: t('객관식'), hard: 0, medium: 0, easy: 0 },
  { title: t('OX'), hard: 0, medium: 0, easy: 0 },
  { title: t('다답식'), hard: 0, medium: 0, easy: 0 },
  { title: t('단답식'), hard: 0, medium: 0, easy: 0 },
  { title: t('주관식'), hard: 0, medium: 0, easy: 0 },
];

export function updateNewStatistics(item: QuestionItem, newStatistic: QuestionStatisticRow[]) {
  switch (item.questionType) {
    case EnQuestionType.SINGLE:
      increaseQuestionLavel(newStatistic[0], item.questionLevel);
      break;
    case EnQuestionType.OX:
      increaseQuestionLavel(newStatistic[1], item.questionLevel);
      break;
    case EnQuestionType.MULTIPLE:
      increaseQuestionLavel(newStatistic[2], item.questionLevel);
      break;
    case EnQuestionType.SHORT_ANSWER:
      increaseQuestionLavel(newStatistic[3], item.questionLevel);
      break;

    case EnQuestionType.ESSAY:
      increaseQuestionLavel(newStatistic[4], item.questionLevel);
      break;
  }
}

export function increaseQuestionLavel(item: QuestionStatisticRow, questionLevel: EnQuestionLevel) {
  switch (questionLevel) {
    case EnQuestionLevel.HARD:
      item.hard++;
      break;
    case EnQuestionLevel.MEDIUM:
      item.medium++;
      break;
    case EnQuestionLevel.EASY:
      item.easy++;
      break;
  }
}
