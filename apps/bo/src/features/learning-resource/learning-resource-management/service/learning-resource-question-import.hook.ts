import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDynamicForm2 } from '@learnway/hooks';
import {
  learningResourceQueryOptions,
  MutationResponse,
  QuestionListForRetrieveReq,
  QuestionListForRetrieveRes,
  QuestionsRetrieveReq,
  useImportQuestionsToExamPaper,
} from '@entities/learning-resource';
import { useModal } from '@learnway/ui/modal';
import { useToast } from '@learnway/ui/toast';

export const useQuestionImport = (examPoolUuid: string) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { closeModal } = useModal();
  const { open: openToast } = useToast();

  const [gridData, setGridData] = useState<QuestionListForRetrieveRes[]>([]);
  const [questionsToImport, setQuestionsToImport] = useState<string[]>([]);

  const { provider, onSubmit } = useDynamicForm2();

  const handleOnSearch = useCallback(async (params: Record<string, any>) => {
    Object.assign(params, { examPoolUuid });
    const response = await queryClient.fetchQuery(
      learningResourceQueryOptions.getQuestionListForRetrieve(params as QuestionListForRetrieveReq),
    );
    setGridData(response);
  }, []);

  const handleSelectQuestions = useCallback((data: QuestionListForRetrieveRes[]) => {
    setQuestionsToImport(data.map((item) => item.examQuestionUuid));
  }, []);

  const { retrieve: importQuestionsToExam } = useImportQuestionsToExamPaper({
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

  const handleRetrieveQuestions = useCallback(() => {
    const payload: QuestionsRetrieveReq = {
      examPoolContentUuid: examPoolUuid,
      questionUuidList: questionsToImport,
    };

    importQuestionsToExam(payload);
  }, [examPoolUuid, questionsToImport]);

  return {
    provider,
    onSubmit,
    handleOnSearch,
    gridData,
    questionsToImport,
    handleSelectQuestions,
    handleRetrieveQuestions,
  };
};
