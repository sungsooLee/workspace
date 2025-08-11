import {
  ContentBaseInfo,
  QuestionBasicInfoDetail,
  TestPaperBasicInfoSaveRes,
  useCreateQuestionBankContent,
  useUpdateQuestionBankContent,
} from '@entities/learning-resource';
import { learningResourceQueryOptions } from '@entities/learning-resource/service/learning-resource.queries';
import { EnFormMode } from '@shared/types/enums';
import { useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

interface FunctionInformation {
  saveBaseInfo?: () => void;
}

interface QuestionBankDetailStoreData {
  baseInfo?: QuestionBasicInfoDetail;
  hasMapping?: boolean;
  formMode: EnFormMode;
  funcInfo?: FunctionInformation;
  contentUuid?: string;

  setContentUuid: (contentUuid: string) => void;
  setBaseInfo: (baseInfo: any) => void;
  setFuncInfo: (v: FunctionInformation) => void;
  setHasMapping: (hasMapping: boolean) => void;
  setFormMode: (contentUuid?: string) => void;
}

const useQuestionDetailFormStore = create<QuestionBankDetailStoreData>((set, get) => ({
  baseInfo: undefined,
  formMode: EnFormMode.ADD,
  funcInfo: undefined,
  contentUuid: undefined,

  setFormMode: (contentUuid?: string) => {
    let formMode = EnFormMode.ADD;
    if (contentUuid) {
      formMode = EnFormMode.VIEW;
    }
    set((state) => ({ formMode }));
  },
  setBaseInfo: (baseInfo?: any) => {
    let formMode = EnFormMode.ADD;
    if (baseInfo) formMode = EnFormMode.VIEW;
    set((state: any) => ({ baseInfo, formMode }));
  },
  setFuncInfo(funcInfo?: FunctionInformation) {
    set((state) => ({
      funcInfo,
    }));
  },
  setContentUuid(contentUuid?: string) {
    set((state) => ({
      contentUuid,
    }));
  },
  setHasMapping(hasMapping: boolean) {
    set((state) => ({ hasMapping }));
  },
}));

export const useLearningResourceQuestionDetailForm = () => {
  const {
    baseInfo,
    formMode,
    funcInfo,
    hasMapping,
    setBaseInfo,
    setFuncInfo,
    setHasMapping,
    setFormMode,
  } = useQuestionDetailFormStore((state) => state);

  const { create } = useCreateQuestionBankContent();
  const { update } = useUpdateQuestionBankContent();
  const queryClient = useQueryClient();

  const handleSaveButtonClick = () => {
    funcInfo?.saveBaseInfo?.();
  };

  const handleUpdateQuestionBankContent = async (payload: ContentBaseInfo) => {
    update(payload);
  };

  const handleCreateQuestionBankContent = async (payload: ContentBaseInfo) => {
    create(
      { ...payload, isOpened: true },
      {
        onSuccess: (data: TestPaperBasicInfoSaveRes) => {
          const contentUuid = data.examPoolUuid;
          if (contentUuid) handleGetQuestionBankContent(contentUuid);
        },
        onError: (error: any) => {
          console.log('question error', error);
        },
      },
    );
  };

  /**
   * contentUuid 값으로 baseInfo 및 formMode를 설정 함.
   * @param contentUuid
   */
  const handleGetQuestionBankContent = async (contentUuid?: string) => {
    console.log(contentUuid);
    if (contentUuid) {
      const data = await queryClient.fetchQuery(
        learningResourceQueryOptions.getContent<QuestionBasicInfoDetail>(contentUuid),
      );

      const hasMapping = await queryClient.fetchQuery(
        learningResourceQueryOptions.getCurriculumsMapping(contentUuid),
      );

      setBaseInfo(data);
      setHasMapping(hasMapping);
    } else {
      setBaseInfo(undefined);
    }
  };

  /**
   * contentUuid 값으로 formMode 설정 (ADD / VIEW)
   * @param contentUuid
   */
  const handleFormModeForTabChange = (contentUuid?: string) => {
    if (contentUuid) {
      setFormMode(contentUuid);
    } else {
      setFormMode(undefined);
    }
  };

  return {
    baseInfo,
    formMode,
    hasMapping,
    setFuncInfo,
    updateQuestionBank: handleUpdateQuestionBankContent,
    createQuestionBank: handleCreateQuestionBankContent,
    saveButtonClick: handleSaveButtonClick,
    setBaseInfo: handleGetQuestionBankContent,
    setFormMode: handleFormModeForTabChange,
  };
};
