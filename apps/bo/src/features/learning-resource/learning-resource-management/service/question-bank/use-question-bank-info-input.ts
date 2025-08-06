import {
  MutationResponse,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionsCopyReq,
  UpdateQuestionBankCountInfoReq,
  useCopyQuestionsToExamPaper,
  useDeleteQuestionItemList,
  useGetQuestionItemList,
  useUpdateQuestionBankQuestionCountInfo,
} from '@entities/learning-resource';
import { useToast } from '@learnway/ui/toast';
import { ContentType } from '@shared/types/enums';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuestionSort } from '../learning-resource-question-sort.hook';

export const useQuestionBankInfoInput = (contentUuid: string) => {
  const { t } = useTranslation();

  const { open: openToast } = useToast();

  const [questionItemList, setQuestionItemList] = useState<QuestionItem[]>([]);
  const [selectedQuestionRows, setSelectedQuestionRows] = useState<QuestionItem[]>([]);

  const { data: questionList = [], refetch } = useGetQuestionItemList(contentUuid);

  const { dragSensors, handleOnDragEnd } = useQuestionSort({
    contentUuid,
    contentType: ContentType.EXAM_POOL,
    questionItemList,
    setQuestionItemList,
  });

  const { update: updateCountInfo } = useUpdateQuestionBankQuestionCountInfo();

  const handleUpdateQuestionCountInfo = useCallback(() => {
    if (!contentUuid) {
      return;
    }

    const payload: UpdateQuestionBankCountInfoReq = {
      contentUuid,
      questionTotalCount: questionItemList.length,
    };

    updateCountInfo(payload);
  }, [contentUuid, questionItemList]);

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

  const questionDeleteSuccessCallback = useCallback(async () => {
    openToast({
      title: t('삭제되었습니다.'),
      type: 'success',
    });

    await handleQuestionMutationSuccessCallback();
  }, []);

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
    if (!contentUuid) {
      return;
    }

    const payload: QuestionsCopyReq = {
      examPoolContentUuid: contentUuid,
      questionUuidList: selectedQuestionRows.map((row) => row.examQuestionUuid),
    };

    copyQuestions(payload);
  }, [contentUuid, selectedQuestionRows]);

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
    if (!contentUuid) {
      return;
    }

    const payload: QuestionItemDeleteParam = {
      contentUuid,
      contentType: ContentType.EXAM_POOL,
      questionUuidList: selectedQuestionRows.map((q) => q.examQuestionUuid),
    };

    deleteQuestion(payload);
  }, [contentUuid, selectedQuestionRows]);

  useEffect(() => {
    if (questionList.length) {
      setQuestionItemList(questionList);
    }
  }, [questionList]);

  return {
    questionItemList,
    setQuestionItemList,
    selectedQuestionRows,
    setSelectedQuestionRows,
    handleUpdateQuestionCountInfo,
    questionCreateSuccessCallback,
    questionDeleteSuccessCallback,
    refetchQuestionItemList: refetch,
    handleOnCopyQuestion,
    handleOnDeleteQuestion,
    dragSensors,
    handleOnDragEnd,
  };
};
