import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { isEmptyData } from '@learnway/shared';
import { useModal, useToast } from '@learnway/ui';
import {
  EnQuestionLevel,
  EnQuestionType,
  ExamQuestionGenType,
  QuestionItem,
  RandomQuestionCountInfo,
  RandomQuestionCountUpdateReq,
  TestPaperBasicInfoDetail,
} from '@types';
import {
  learningResourceQueryOptions,
  useUpdateExamPaperQuestionCount,
  useUpdateQuestionStatus,
} from '@entities/learning-resource';
import { LevelKey, QuestionStatisticRow, SelectedQuestionState } from '../-common/type';

export const useExamQuestionInfoInput = (basicInfo: TestPaperBasicInfoDetail) => {
  const { contentUuid, examPoolUuid, questionGenType, questionCount } = basicInfo;

  const { confirm } = useModal();
  const { open: openToast } = useToast();

  const { data: questionList = [], refetch } = useQuery(
    learningResourceQueryOptions.getQuestionItemList(examPoolUuid),
  );

  const { data: randomQuestionInfo = [] } = useQuery(
    learningResourceQueryOptions.getExamRandomQuestionCount(
      contentUuid,
      questionGenType as ExamQuestionGenType,
    ),
  );

  const questionCreateSuccessCallback = useCallback(async () => {
    openToast({
      title: t('저장되었습니다.'),
      type: 'success',
    });

    const { data: refetchResult } = await refetch();
    setSelectedQuestions(refetchResult?.filter((q) => q.isUsed) as QuestionItem[]);
  }, []);

  const { update: updateQuestionStatus } = useUpdateQuestionStatus({
    onSuccess: async (result: any) => {
      if (result) {
        const { data: refetchResult } = await refetch();
        setSelectedQuestions(refetchResult?.filter((q) => q.isUsed) as QuestionItem[]);
      }
    },
  });

  const [selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>([]);

  const [questionState, setQuestionState] = useState<SelectedQuestionState>({
    [EnQuestionType.SINGLE]: {},
    [EnQuestionType.MULTIPLE]: {},
    [EnQuestionType.OX]: {},
    [EnQuestionType.SHORT_ANSWER]: {},
    [EnQuestionType.ESSAY]: {},
  });

  const getQuestionStateByType = useCallback(
    (type: EnQuestionType): QuestionItem[] => {
      return selectedQuestions?.filter((q) => q.questionType === type) || [];
    },
    [selectedQuestions],
  );

  const getQuestionCountByLevel = useCallback(
    (list: QuestionItem[] = [], type: EnQuestionLevel): number => {
      return list.filter((q) => q.questionLevel === type).length;
    },
    [],
  );

  const getScorePerQuestion = useCallback((count?: number): number => {
    if (!count || isNaN(count) || Number(count) === 0) {
      return 100;
    }
    return Math.round((100 / count) * 10) / 10;
  }, []);

  const scorePerQuestion = getScorePerQuestion(questionCount);

  const levelCountByQuestionTypeAndLevel = useCallback(
    (type: EnQuestionType, key: LevelKey) => {
      return randomQuestionInfo?.find((q) => q.questionType === type)?.[key] ?? 0;
    },
    [randomQuestionInfo],
  );

  const [randomCountUpdateData, setRandomCountUpdateData] = useState<
    Record<EnQuestionType, Record<string, number>>
  >({
    [EnQuestionType.SINGLE]: {
      hardLevelCount: 0,
      mediumLevelCount: 0,
      easyLevelCount: 0,
    },
    [EnQuestionType.OX]: {
      hardLevelCount: 0,
      mediumLevelCount: 0,
      easyLevelCount: 0,
    },
    [EnQuestionType.MULTIPLE]: {
      hardLevelCount: 0,
      mediumLevelCount: 0,
      easyLevelCount: 0,
    },
    [EnQuestionType.SHORT_ANSWER]: {
      hardLevelCount: 0,
      mediumLevelCount: 0,
      easyLevelCount: 0,
    },
    [EnQuestionType.ESSAY]: {
      hardLevelCount: 0,
      mediumLevelCount: 0,
      easyLevelCount: 0,
    },
  });

  const handleCountInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      rowItem: QuestionStatisticRow,
      key: 'hard' | 'medium' | 'easy',
    ) => {
      const {
        target: { value },
      } = e;

      let parsedValue = isNaN(Number(value)) ? 0 : Number(value);

      if (parsedValue > rowItem[key]) {
        openToast({
          title: t(
            '각 유형별/난이도 별 출제 문항 수를 입력 시 각 문항의 갯수를 초과할 수 없습니다.',
          ),
          type: 'error',
        });
        parsedValue = rowItem[key];
      }

      setRandomCountUpdateData((prevState) => ({
        ...prevState,
        [rowItem.type]: {
          ...prevState[rowItem.type],
          [`${key}LevelCount`]: parsedValue,
        },
      }));
    },
    [],
  );

  const { update: updateQuestionCountInfo } = useUpdateExamPaperQuestionCount({
    onSuccess: (result: any) => {
      console.log(result);
      openToast({
        title: t('저장되었습니다.'),
        type: 'success',
      });
    },
  });

  const updateQuestionRandomCount = async () => {
    const countList = Object.entries(randomCountUpdateData).map(
      ([key, obj]) =>
        ({
          questionType: key as EnQuestionType,
          hardLevelCount: obj.hardLevelCount,
          mediumLevelCount: obj.mediumLevelCount,
          easyLevelCount: obj.easyLevelCount,
        }) satisfies RandomQuestionCountInfo,
    );

    const payload: RandomQuestionCountUpdateReq = {
      contentUuid,
      questionGenType: questionGenType ?? ExamQuestionGenType.RANDOM,
      questionTotalCount: questionCount,
      countList,
    };

    if (
      await confirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      })
    ) {
      updateQuestionCountInfo(payload);
    }
  };

  useEffect(() => {
    setSelectedQuestions(questionList.filter((q) => q.isUsed));
  }, [questionList]);

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
  }, [selectedQuestions]);

  useEffect(() => {
    if (!isEmptyData(randomQuestionInfo)) {
      setRandomCountUpdateData({
        [EnQuestionType.SINGLE]: {
          hardLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.SINGLE, 'hardLevelCount'),
          mediumLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.SINGLE,
            'mediumLevelCount',
          ),
          easyLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.SINGLE, 'easyLevelCount'),
        },
        [EnQuestionType.OX]: {
          hardLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.OX, 'hardLevelCount'),
          mediumLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.OX, 'mediumLevelCount'),
          easyLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.OX, 'easyLevelCount'),
        },
        [EnQuestionType.MULTIPLE]: {
          hardLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.MULTIPLE,
            'hardLevelCount',
          ),
          mediumLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.MULTIPLE,
            'mediumLevelCount',
          ),
          easyLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.MULTIPLE,
            'easyLevelCount',
          ),
        },
        [EnQuestionType.SHORT_ANSWER]: {
          hardLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.SHORT_ANSWER,
            'hardLevelCount',
          ),
          mediumLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.SHORT_ANSWER,
            'mediumLevelCount',
          ),
          easyLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.SHORT_ANSWER,
            'easyLevelCount',
          ),
        },
        [EnQuestionType.ESSAY]: {
          hardLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.ESSAY, 'hardLevelCount'),
          mediumLevelCount: levelCountByQuestionTypeAndLevel(
            EnQuestionType.ESSAY,
            'mediumLevelCount',
          ),
          easyLevelCount: levelCountByQuestionTypeAndLevel(EnQuestionType.ESSAY, 'easyLevelCount'),
        },
      });
    }
  }, [randomQuestionInfo]);

  return {
    questionList,
    selectedQuestions,
    questionState,
    scorePerQuestion,
    questionCreateSuccessCallback,
    updateQuestionStatus,
    randomCountUpdateData,
    setRandomCountUpdateData,
    handleCountInputChange,
    updateQuestionRandomCount,
  };
};
