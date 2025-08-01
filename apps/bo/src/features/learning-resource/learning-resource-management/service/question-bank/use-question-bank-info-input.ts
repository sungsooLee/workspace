import { useCallback, useEffect, useState } from 'react';
import {
  useCopyQuestionsToExamPaper,
  useDeleteQuestionItemList,
  useGetQuestionItemList,
  useUpdateQuestionBankQuestionCountInfo,
} from '@entities/learning-resource';
import { useLearningResourceQuestionDetailForm } from '../learning-resource-question-detail-from.hook';
import {
  ContentType,
  MutationResponse,
  QuestionItem,
  QuestionItemDeleteParam,
  QuestionsCopyReq,
  UpdateQuestionBankCountInfoReq,
} from '@types';
import { useToast } from '@learnway/ui/toast';
import { useTranslation } from 'react-i18next';

export const useQuestionBankInfoInput = () => {
  const { t } = useTranslation();

  const { open: openToast } = useToast();

  const { baseInfo } = useLearningResourceQuestionDetailForm();

  const [questionItemList, setQuestionItemList] = useState<QuestionItem[]>([]);
  const [selectedQuestionRows, setSelectedQuestionRows] = useState<QuestionItem[]>([]);

  const { data: questionList = [], refetch } = useGetQuestionItemList(baseInfo?.contentUuid);
  const contentUuid = baseInfo?.contentUuid;

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

  const questionCreateSuccessCallback = useCallback(async () => {
    openToast({
      title: t('저장되었습니다.'),
      type: 'success',
    });

    const { data: refetchResult = [] } = await refetch();
    setQuestionItemList(refetchResult);
  }, []);

  const { copy: copyQuestions } = useCopyQuestionsToExamPaper({
    onSuccess: ({ result }: MutationResponse) => {
      if (result) {
        openToast({
          title: t('복사되었습니다.'),
          type: 'success',
        });

        setTimeout(async () => {
          const { data: refetchResult = [] } = await refetch();
          setQuestionItemList(refetchResult);
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
          const { data: refetchResult = [] } = await refetch();
          setQuestionItemList(refetchResult);
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
    setQuestionItemList(questionList);
  }, [questionList]);

  return {
    baseInfo,
    questionItemList,
    setQuestionItemList,
    selectedQuestionRows,
    setSelectedQuestionRows,
    handleUpdateQuestionCountInfo,
    questionCreateSuccessCallback,
    refetchQuestionItemList: refetch,
    handleOnCopyQuestion,
    handleOnDeleteQuestion,
  };
};
