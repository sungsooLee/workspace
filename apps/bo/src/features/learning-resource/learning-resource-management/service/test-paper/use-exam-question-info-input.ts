import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash-es';
import {
  learningResourceQueryOptions,
  useCopyQuestionsToExamPaper,
  useDeleteQuestionItemList,
  useUpdateExamPaperQuestionCount,
  useUpdateQuestionStatus,
} from '@entities/learning-resource';
import { isEmptyData } from '@learnway/shared';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import {
  ContentType,
  EnQuestionLevel,
  EnQuestionType,
  ExamPaperQuestionCountUpdateReq,
  ExamQuestionGenType,
  MutationResponse,
  QuestionCountInfo,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionsCopyReq,
  TestPaperBasicInfoDetail,
} from '@types';
import { LevelKey, QuestionStatisticRow, SelectedQuestionState } from './type';
import { useQuestionSort } from '../learning-resource-question-sort.hook';

export const useExamQuestionInfoInput = (basicInfo: TestPaperBasicInfoDetail) => {
  const { contentUuid = '', examPoolUuid = '', questionGenType, questionCount } = basicInfo;

  const { t } = useTranslation();
  const { confirm } = useModal();
  const { open: openToast } = useToast();

  const { data: questionList = [], refetch } = useQuery(
    learningResourceQueryOptions.getQuestionItemList(examPoolUuid),
  );

  const { data: randomQuestionInfo = [], refetch: refetchRandomCountInfo } = useQuery(
    learningResourceQueryOptions.getExamRandomQuestionCount(
      contentUuid,
      questionGenType as ExamQuestionGenType,
    ),
  );

  const handleQuestionMutationSuccessCallback = useCallback(async () => {
    const { data: refetchResult = [] } = await refetch();
    setQuestionItemList(refetchResult);
  }, []);

  const questionCreateSuccessCallback = useCallback(async () => {
    openToast({
      title: t('저장되었습니다.'),
      type: 'success',
    });

    await handleQuestionMutationSuccessCallback();
  }, []);

  const { update: updateQuestionStatus } = useUpdateQuestionStatus({
    onSuccess: async (result: any) => {
      if (result) {
        await handleQuestionMutationSuccessCallback();
      }
    },
  });

  const [questionItemList, setQuestionItemList] = useState<QuestionItem[]>([]);
  const [_selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>([]);
  const selectedQuestions = useMemo(
    () => questionItemList.filter((q) => q.isUsed),
    [questionItemList],
  );

  const { sensors, handleOnDragEnd } = useQuestionSort({
    contentUuid: examPoolUuid,
    contentType: ContentType.EXAM,
    questionItemList,
    setQuestionItemList,
  });

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
      return randomQuestionInfo?.find((q) => q.questionType === type)?.[key];
    },
    [randomQuestionInfo],
  );

  const [randomCountUpdateData, setRandomCountUpdateData] = useState<
    Record<EnQuestionType, Record<string, number | undefined>>
  >({
    [EnQuestionType.SINGLE]: {
      hardLevelCount: undefined,
      mediumLevelCount: undefined,
      easyLevelCount: undefined,
    },
    [EnQuestionType.OX]: {
      hardLevelCount: undefined,
      mediumLevelCount: undefined,
      easyLevelCount: undefined,
    },
    [EnQuestionType.MULTIPLE]: {
      hardLevelCount: undefined,
      mediumLevelCount: undefined,
      easyLevelCount: undefined,
    },
    [EnQuestionType.SHORT_ANSWER]: {
      hardLevelCount: undefined,
      mediumLevelCount: undefined,
      easyLevelCount: undefined,
    },
    [EnQuestionType.ESSAY]: {
      hardLevelCount: undefined,
      mediumLevelCount: undefined,
      easyLevelCount: undefined,
    },
  });
  const [selectedRandomQuestionCount, setSelectedRandomQuestionCount] = useState<number>(0);

  const getSelectedRandomQuestionCount = useCallback((list: QuestionCountInfo[] = []): number => {
    return list.reduce(
      (acc, curr) =>
        acc +
        (curr.hardLevelCount ?? 0) +
        (curr.mediumLevelCount ?? 0) +
        (curr.easyLevelCount ?? 0),
      0,
    );
  }, []);

  const handleCountInputChange = useCallback(
    (value: string, rowItem: QuestionStatisticRow, key: 'hard' | 'medium' | 'easy') => {
      let parsedValue =
        (value !== '' && isNaN(Number(value))) || Number(value) < 0
          ? 0
          : value === ''
            ? value
            : Number(value);

      if (typeof parsedValue === 'number' && parsedValue > rowItem[key]) {
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

  const debouncedUpdateRandomCount = useMemo(
    () =>
      debounce(
        (value: string, rowItem: QuestionStatisticRow, key: 'hard' | 'medium' | 'easy') =>
          handleCountInputChange(value, rowItem, key),
        2000,
      ),
    [],
  );

  const { update } = useUpdateExamPaperQuestionCount({
    onSuccess: (result: unknown) => {
      openToast({
        title: t('저장되었습니다.'),
        type: 'success',
      });

      setTimeout(async () => {
        if (questionGenType === ExamQuestionGenType.RANDOM) {
          const { data: refetchedRandomInfo = [] } = await refetchRandomCountInfo();
          setSelectedRandomQuestionCount(getSelectedRandomQuestionCount(refetchedRandomInfo));
        }
      }, 100);
    },
  });

  const updateQuestionCountInfo = async () => {
    const countList =
      questionGenType === ExamQuestionGenType.RANDOM
        ? Object.entries(randomCountUpdateData).map(
            ([key, obj]) =>
              ({
                questionType: key as EnQuestionType,
                hardLevelCount: obj.hardLevelCount || 0,
                mediumLevelCount: obj.mediumLevelCount || 0,
                easyLevelCount: obj.easyLevelCount || 0,
              }) satisfies QuestionCountInfo,
          )
        : Object.entries(questionState).map(
            ([key, obj]) =>
              ({
                questionType: key as EnQuestionType,
                hardLevelCount: obj?.[EnQuestionLevel.HARD] || 0,
                mediumLevelCount: obj?.[EnQuestionLevel.MEDIUM] || 0,
                easyLevelCount: obj?.[EnQuestionLevel.EASY] || 0,
              }) satisfies QuestionCountInfo,
          );

    const payload: ExamPaperQuestionCountUpdateReq = {
      contentUuid,
      questionGenType: questionGenType ?? ExamQuestionGenType.FIXED,
      questionTotalCount: questionCount,
      countList,
    };

    if (
      await confirm({
        title: t('LABEL.confirm.save.title'),
        content: t('LABEL.confirm.save.message'),
      })
    ) {
      update(payload);
    }
  };

  const [selectedQuestionRows, setSelectedQuestionRows] = useState<QuestionItem[]>([]);

  const { copy: copyQuestions } = useCopyQuestionsToExamPaper({
    onSuccess: ({ result }: MutationResponse) => {
      if (result) {
        openToast({
          title: t('복사되었습니다.'),
          type: 'success',
        });

        setTimeout(async () => {
          await handleQuestionMutationSuccessCallback();
        }, 100);
      }
    },
  });

  const handleOnCopyQuestion = useCallback(() => {
    if (!examPoolUuid) {
      return;
    }

    const payload: QuestionsCopyReq = {
      examPoolContentUuid: examPoolUuid,
      questionUuidList: selectedQuestionRows.map((q) => q.examQuestionUuid),
    };

    copyQuestions(payload);
  }, [examPoolUuid, selectedQuestionRows]);

  const { delete: deleteQuestion } = useDeleteQuestionItemList({
    onSuccess: ({ result }: MutationResponse) => {
      if (result) {
        openToast({
          title: t('삭제되었습니다.'),
          type: 'success',
        });

        setTimeout(async () => {
          await handleQuestionMutationSuccessCallback();
        }, 100);
      }
    },
  });

  const handleOnDeleteQuestion = useCallback(() => {
    const payload: QuestionItemDeleteParam = {
      contentUuid,
      contentType: ContentType.EXAM,
      questionUuidList: selectedQuestionRows.map((q) => q.examQuestionUuid),
    };

    deleteQuestion(payload);
  }, [contentUuid, selectedQuestionRows]);

  useEffect(() => {
    setQuestionItemList(questionList);
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

    setSelectedRandomQuestionCount(getSelectedRandomQuestionCount(randomQuestionInfo));
  }, [randomQuestionInfo]);

  return {
    questionList: questionItemList,
    selectedQuestions,
    selectedRandomQuestionCount,
    questionState,
    scorePerQuestion,
    questionCreateSuccessCallback,
    updateQuestionStatus,
    randomCountUpdateData,
    setRandomCountUpdateData,
    handleCountInputChange,
    debouncedUpdateRandomCount,
    updateQuestionCountInfo,
    selectedQuestionRows,
    setSelectedQuestionRows,
    handleOnCopyQuestion,
    handleOnDeleteQuestion,
    dragSensors: sensors,
    handleOnDragEnd,
    handleQuestionMutationSuccessCallback,
  };
};
