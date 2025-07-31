import { useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import {
  ContentBaseInfo,
  EnFormMode,
  QuestionBasicInfoDetail,
  TestPaperBasicInfoSaveRes,
} from '@types';
import {
  useCreateQuestionBankContent,
  useUpdateQuestionBankContent,
} from '@entities/learning-resource';
import { learningResourceQueryOptions } from '@entities/learning-resource/service/learning-resource.queries';

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
}

const useQuestionDetailFormStore = create<QuestionBankDetailStoreData>((set, get) => ({
  baseInfo: undefined,
  formMode: EnFormMode.ADD,
  funcInfo: undefined,
  contentUuid: undefined,

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
  const { baseInfo, formMode, funcInfo, hasMapping, setBaseInfo, setFuncInfo, setHasMapping } =
    useQuestionDetailFormStore((state) => state);

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
  return {
    baseInfo,
    formMode,
    hasMapping,
    setFuncInfo,
    updateQuestionBank: handleUpdateQuestionBankContent,
    createQuestionBank: handleCreateQuestionBankContent,
    saveButtonClick: handleSaveButtonClick,
    setBaseInfo: handleGetQuestionBankContent,
  };
};
