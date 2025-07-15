import { create } from 'zustand';
import { EnFormMode } from '@types';

const useQuestionDetailFormStore = create<any>((set, get) => ({
  baseInfo: undefined,
  formMode: undefined,

  setBaseInfo(baseInfo?: any) {
    set((state: any) => ({ baseInfo }));
  },
}));

export const useQuestionDetailForm = () => {
  const { baseInfo, formMode, setBaseInfo } = useQuestionDetailFormStore((state) => state);

  return { baseInfo, formMode };
};
