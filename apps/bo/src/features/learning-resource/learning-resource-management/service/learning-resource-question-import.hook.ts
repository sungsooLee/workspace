import {
  learningResourceQueryOptions,
  useCopyQuestionsToExamPaper,
} from '@entities/learning-resource';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  MutationResponse,
  QuestionListForRetrieveReq,
  QuestionListForRetrieveRes,
  QuestionsCopyReq,
} from '@types';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

export const useQuestionSearchAndCopy = (examPoolUuid: string) => {
  const queryClient = useQueryClient();

  const { closeModal } = useModal();
  const { open: openToast } = useToast();

  const [gridData, setGridData] = useState<QuestionListForRetrieveRes[]>([]);
  const [questionsToCopy, setQuestionsToCopy] = useState<string[]>([]);

  const handleOnSearch = useCallback(async (params: Record<string, any>) => {
    console.log(params);
    Object.assign(params, { examPoolUuid });
    const response = await queryClient.fetchQuery(
      learningResourceQueryOptions.getQuestionListForRetrieve(params as QuestionListForRetrieveReq),
    );
    setGridData(response);
  }, []);

  const handleSelectQuestions = useCallback((data: QuestionListForRetrieveRes[]) => {
    setQuestionsToCopy(data.map((item) => item.examQuestionUuid));
  }, []);

  const { copy: copyQuestionsToExam } = useCopyQuestionsToExamPaper({
    onSuccess: ({ result }: MutationResponse) => {
      if (result) {
        openToast({
          title: t('복사되었습니다.'),
          type: 'success',
        });

        setTimeout(() => {
          closeModal(result);
        }, 100);
      }
    },
  });

  const handleCopyQuestions = useCallback(() => {
    const payload: QuestionsCopyReq = {
      examPoolContentUuid: examPoolUuid,
      questionUuidList: questionsToCopy,
    };

    copyQuestionsToExam(payload);
  }, [examPoolUuid, questionsToCopy]);

  return {
    handleOnSearch,
    gridData,
    questionsToCopy,
    handleSelectQuestions,
    handleCopyQuestions,
  };
};
