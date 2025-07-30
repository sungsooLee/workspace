import { useGetQuestionItemList } from '@entities/learning-resource';
import { useLearningResourceQuestionDetailForm } from '../learning-resource-question-detail-from.hook';

export const useQuestionBankInfoInput = () => {
  const { baseInfo } = useLearningResourceQuestionDetailForm();

  const { data: questionItemList } = useGetQuestionItemList(baseInfo?.contentUuid);

  return { baseInfo, questionItemList };
};
