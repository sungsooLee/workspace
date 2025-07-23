import { create } from 'zustand';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';
export enum TriggerKey {
  SAVE = 'save',
  LIST = 'list',
  COPY = 'copy',
  TRANSLATE = 'translate',
  DELETE = 'delete',
  VALUES = 'values',
}
export enum ContentViewType {
  LIST = 'list',
  DETAIL = 'detail',
}
interface TriggerPayload {
  [key: string]: any;
}

interface TriggerState {
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null;
  saveStatus: SaveStatus;
  contentViewType: ContentViewType;
  actions: {
    trigger: (key: TriggerKey, payload?: TriggerPayload) => void;
    setSaveStatus: (status: SaveStatus) => void;
    setContentViewType: (type: ContentViewType) => void;
  };
}

export const useCourseStore = create<TriggerState>((set) => ({
  lastTriggered: null,
  saveStatus: 'idle',
  contentViewType: ContentViewType.DETAIL,
  actions: {
    trigger: (key, payload) =>
      set((state) => ({
        lastTriggered: { key, payload },
      })),
    setSaveStatus: (status) => set({ saveStatus: status }),
    setContentViewType: (type) => set({ contentViewType: type }),
  },
}));

export const useCourseActions = () => useCourseStore((state) => state.actions);
