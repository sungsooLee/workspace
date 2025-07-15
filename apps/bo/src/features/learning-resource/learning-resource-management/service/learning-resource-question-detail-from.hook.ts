import { create } from 'zustand';
import { EnFormMode } from '@types';
import { useCreateQuestionBankContent } from '@entities/learning-resource';
import { useDynamicForm2, UseDynamicFormResult } from '@learnway/hooks';

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
  formMode: EnFormMode.NONE,
  funcInfo: undefined,

  setBaseInfo: (baseInfo?: any) => {
    set((state: any) => ({ baseInfo }));
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

  const handleSaveButtonClick = () => {
    funcInfo?.saveBaseInfo();
  };

  const handleCreateQuestionBankContent = async (payload: any, onSuccess?: any, onError?: any) => {
    create(payload, { onSuccess, onError });
  };
  return {
    baseInfo,
    formMode,
    setFuncInfo,
    createQuestionBank: handleCreateQuestionBankContent,
    saveButtonClick: handleSaveButtonClick,
  };
};
