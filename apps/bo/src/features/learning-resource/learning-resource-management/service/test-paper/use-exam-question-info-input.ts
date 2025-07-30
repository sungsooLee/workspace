import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmptyData } from '@learnway/shared';
import { useModal, useToast } from '@learnway/ui';
import {
  EnQuestionLevel,
  EnQuestionType,
  ExamPaperQuestionCountUpdateReq,
  ExamQuestionGenType,
  QuestionItem,
  QuestionsCopyReq,
  RandomQuestionCountInfo,
  TestPaperBasicInfoDetail,
} from '@types';
import {
  learningResourceQueryOptions,
  useCopyQuestionsToExamPaper,
  useUpdateExamPaperQuestionCount,
  useUpdateQuestionStatus,
} from '@entities/learning-resource';
import { CopyResponse, LevelKey, QuestionStatisticRow, SelectedQuestionState } from './type';
import { useTranslation } from 'react-i18next';

export const useExamQuestionInfoInput = (basicInfo: TestPaperBasicInfoDetail) => {
  const { contentUuid, examPoolUuid, questionGenType, questionCount } = basicInfo;

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

  const handleCountInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      rowItem: QuestionStatisticRow,
      key: 'hard' | 'medium' | 'easy',
    ) => {
      const {
        target: { value },
      } = e;

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

  const { update } = useUpdateExamPaperQuestionCount({
    onSuccess: (result: unknown) => {
      openToast({
        title: t('저장되었습니다.'),
        type: 'success',
      });

      setTimeout(async () => {
        if (questionGenType === ExamQuestionGenType.RANDOM) {
          const { data: refetchedRandomInfo = [] } = await refetchRandomCountInfo();
          setSelectedRandomQuestionCount(
            refetchedRandomInfo.reduce(
              (acc, curr) =>
                acc +
                (curr.hardLevelCount ?? 0) +
                (curr.mediumLevelCount ?? 0) +
                (curr.easyLevelCount ?? 0),
              0,
            ),
          );
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
              }) satisfies RandomQuestionCountInfo,
          )
        : Object.entries(questionState).map(
            ([key, obj]) =>
              ({
                questionType: key as EnQuestionType,
                hardLevelCount: obj?.[EnQuestionLevel.HARD] || 0,
                mediumLevelCount: obj?.[EnQuestionLevel.MEDIUM] || 0,
                easyLevelCount: obj?.[EnQuestionLevel.EASY] || 0,
              }) satisfies RandomQuestionCountInfo,
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

  const [questionsToCopy, setQuestionsToCopy] = useState<QuestionItem[]>([]);

  const { copy: copyQuestions } = useCopyQuestionsToExamPaper({
    onSuccess: ({ result }: CopyResponse) => {
      openToast({
        title: t('복사되었습니다.'),
        type: 'success',
      });

      setTimeout(async () => {
        const { data: refetchResult } = await refetch();
        setSelectedQuestions(refetchResult?.filter((q) => q.isUsed) as QuestionItem[]);
      }, 100);
    },
  });

  const handleOnCopyAction = useCallback(() => {
    const payload: QuestionsCopyReq = {
      examPoolContentUuid: examPoolUuid as string,
      questionUuidList: questionsToCopy.map((q) => q.examQuestionUuid),
    };

    copyQuestions(payload);
  }, [examPoolUuid, questionsToCopy]);

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

    setSelectedRandomQuestionCount(
      randomQuestionInfo.reduce(
        (acc, curr) =>
          acc +
          (curr.hardLevelCount ?? 0) +
          (curr.mediumLevelCount ?? 0) +
          (curr.easyLevelCount ?? 0),
        0,
      ),
    );
  }, [randomQuestionInfo]);

  return {
    questionList,
    refetch,
    selectedQuestions,
    setSelectedQuestions,
    selectedRandomQuestionCount,
    questionState,
    scorePerQuestion,
    questionCreateSuccessCallback,
    updateQuestionStatus,
    randomCountUpdateData,
    setRandomCountUpdateData,
    handleCountInputChange,
    updateQuestionCountInfo,
    setQuestionsToCopy,
    handleOnCopyAction,
  };
};
