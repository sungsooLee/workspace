import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { useModal } from '@learnway/ui';
import {
  EnQuestionLevel,
  EnQuestionType,
  QuestionItem,
  SelectedQuestionState,
  TestPaperBasicInfoDetail,
} from '@types';
import { learningResourceQueryOptions, useCreateQuestionItem } from '@entities/learning-resource';

export const useExamQuestionInfoInput = (basicInfo: TestPaperBasicInfoDetail) => {
  const { contentUuid, examPoolUuid, questionGenType, questionCount } = basicInfo;

  const { alert } = useModal();

  const { data: questionList, refetch } = useQuery(
    learningResourceQueryOptions.getQuestionItemList(examPoolUuid),
  );

  const { create: createQuestionItem } = useCreateQuestionItem({
    onSuccess: async (result: any) => {
      if (result) {
        const { data: refetchResult } = await refetch();
        console.log(refetchResult);
        setSelectedQuestions(refetchResult?.filter((q) => q.isUsed) as QuestionItem[]);
      }
    },
    onError: async (e: Error) => {
      await alert(t('문항 등록 중 오류가 발생하였습니다.'));
      return;
    },
  });

  const [selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>(
    questionList?.filter((q) => q.isUsed) || [],
  );

  const [questionState, setQuestionState] = useState<SelectedQuestionState>({
    [EnQuestionType.SINGLE]: {},
    [EnQuestionType.MULTIPLE]: {},
    [EnQuestionType.OX]: {},
    [EnQuestionType.SHORT_ANSWER]: {},
    [EnQuestionType.ESSAY]: {},
  });

  const getQuestionStateByType = useCallback(
    (type: EnQuestionType): QuestionItem[] => {
      return questionList?.filter((q) => q.questionType === type) || [];
    },
    [questionList],
  );

  const getQuestionCountByLevel = useCallback(
    (list: QuestionItem[] = [], type: EnQuestionLevel): `${number}` => {
      return `${list.filter((q) => q.questionLevel === type).length}`;
    },
    [],
  );

  useEffect(() => {
    const singleQuestionState = getQuestionStateByType(EnQuestionType.SINGLE);
    const multiQuestionState = getQuestionStateByType(EnQuestionType.MULTIPLE);
    const oxQuestionState = getQuestionStateByType(EnQuestionType.OX);
    const shortAnswerQuestionState = getQuestionStateByType(EnQuestionType.SHORT_ANSWER);
    const essayQuestionState = getQuestionStateByType(EnQuestionType.ESSAY);

    setQuestionState({
      [EnQuestionType.SINGLE]: {
        [EnQuestionLevel.EASY]: getQuestionCountByLevel(singleQuestionState, EnQuestionLevel.EASY),
        [EnQuestionLevel.MEDIUM]: getQuestionCountByLevel(
          singleQuestionState,
          EnQuestionLevel.MEDIUM,
        ),
        [EnQuestionLevel.HARD]: getQuestionCountByLevel(singleQuestionState, EnQuestionLevel.HARD),
      },
      [EnQuestionType.MULTIPLE]: {
        [EnQuestionLevel.EASY]: getQuestionCountByLevel(multiQuestionState, EnQuestionLevel.EASY),
        [EnQuestionLevel.MEDIUM]: getQuestionCountByLevel(
          multiQuestionState,
          EnQuestionLevel.MEDIUM,
        ),
        [EnQuestionLevel.HARD]: getQuestionCountByLevel(multiQuestionState, EnQuestionLevel.HARD),
      },
      [EnQuestionType.OX]: {
        [EnQuestionLevel.EASY]: getQuestionCountByLevel(oxQuestionState, EnQuestionLevel.EASY),
        [EnQuestionLevel.MEDIUM]: getQuestionCountByLevel(oxQuestionState, EnQuestionLevel.MEDIUM),
        [EnQuestionLevel.HARD]: getQuestionCountByLevel(oxQuestionState, EnQuestionLevel.HARD),
      },
      [EnQuestionType.SHORT_ANSWER]: {
        [EnQuestionLevel.EASY]: getQuestionCountByLevel(
          shortAnswerQuestionState,
          EnQuestionLevel.EASY,
        ),
        [EnQuestionLevel.MEDIUM]: getQuestionCountByLevel(
          shortAnswerQuestionState,
          EnQuestionLevel.MEDIUM,
        ),
        [EnQuestionLevel.HARD]: getQuestionCountByLevel(
          shortAnswerQuestionState,
          EnQuestionLevel.HARD,
        ),
      },
      [EnQuestionType.ESSAY]: {
        [EnQuestionLevel.EASY]: getQuestionCountByLevel(essayQuestionState, EnQuestionLevel.EASY),
        [EnQuestionLevel.MEDIUM]: getQuestionCountByLevel(
          essayQuestionState,
          EnQuestionLevel.MEDIUM,
        ),
        [EnQuestionLevel.HARD]: getQuestionCountByLevel(essayQuestionState, EnQuestionLevel.HARD),
      },
    });
  }, [questionList]);

  const getScorePerQuestion = useCallback((count?: number): number => {
    if (!count || isNaN(count) || Number(count) === 0) {
      return 100;
    }
    return Math.round((100 / count) * 10) / 10;
  }, []);

  const scorePerQuestion = getScorePerQuestion(questionCount);

  return { questionList, selectedQuestions, questionState, scorePerQuestion, createQuestionItem };
};
