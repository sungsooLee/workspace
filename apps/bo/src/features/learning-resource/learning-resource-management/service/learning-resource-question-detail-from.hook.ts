import { useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { EnFormMode } from '@types';
import { useCreateQuestionBankContent } from '@entities/learning-resource';
import { useDynamicForm2, UseDynamicFormResult } from '@learnway/hooks';
import { learningResourceQueryOptions } from '@entities/learning-resource/service/learning-resource.queries';

interface FunctionInfomation {
  saveBaseInfo: () => void;
}

interface QuestionBankDetailStoreData {
  baseInfo?: any;
  formMode: EnFormMode;
  funcInfo?: FunctionInfomation;

  setBaseInfo: (baseInfo: any) => void;
  setFuncInfo: (v: FunctionInfomation) => void;
}

const useQuestionDetailFormStore = create<QuestionBankDetailStoreData>((set, get) => ({
  baseInfo: undefined,
  formMode: EnFormMode.ADD,
  funcInfo: undefined,

  setBaseInfo: (baseInfo?: any) => {
    let formMode = EnFormMode.ADD;
    if (baseInfo) formMode = EnFormMode.VIEW;
    set((state: any) => ({ baseInfo, formMode }));
  },
  setFuncInfo(funcInfo?: FunctionInfomation) {
    set((state) => ({
      funcInfo,
    }));
  },
}));

export const useLearningResourceQuestionDetailForm = () => {
  const { baseInfo, formMode, funcInfo, setBaseInfo, setFuncInfo } = useQuestionDetailFormStore(
    (state) => state,
  );

  const { create, data } = useCreateQuestionBankContent();
  const queryClient = useQueryClient();

  const handleSaveButtonClick = () => {
    funcInfo?.saveBaseInfo();
  };

  const handleCreateQuestionBankContent = async (payload: any, onSuccess?: any, onError?: any) => {
    create(payload, { onSuccess, onError });
  };

  /**
   * contentUuid 값으로 baseInfo 및 formMode를 설정 함.
   * @param contentUuid
   */
  const handleGetQuestionBankContent = async (contentUuid?: string) => {
    if (contentUuid) {
      const data = await queryClient.fetchQuery(
        learningResourceQueryOptions.getContent(contentUuid),
      );
      setBaseInfo(data);
    } else {
      setBaseInfo(undefined);
    }
  };
  return {
    baseInfo,
    formMode,
    setFuncInfo,
    createQuestionBank: handleCreateQuestionBankContent,
    saveButtonClick: handleSaveButtonClick,
    setBaseInfo: handleGetQuestionBankContent,
  };
};
