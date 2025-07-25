import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { QuestionListForRetrieveReq, QuestionListForRetrieveRes } from '@types';
import { learningResourceQueryOptions } from '@entities/learning-resource';

export const useQuestionSearchForm = (examPoolUuid: string) => {
  const queryClient = useQueryClient();

  const [gridData, setGridData] = useState<QuestionListForRetrieveRes[]>([]);

  const handleOnSearch = useCallback(async (params: Record<string, any>) => {
    console.log(params);
    Object.assign(params, { examPoolUuid });
    const response = await queryClient.fetchQuery(
      learningResourceQueryOptions.getQuestionListForRetrieve(params as QuestionListForRetrieveReq),
    );
    console.log(response);
    setGridData(response);
  }, []);

  return { handleOnSearch, gridData };
};
