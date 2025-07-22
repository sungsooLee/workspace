import { create } from 'zustand';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';
export enum TriggerKey {
  SAVE = 'save',
  LIST = 'list',
  DELETE = 'delete',
  VALUES = 'values',
}
interface TriggerPayload {
  [key: string]: any;
}

interface TriggerState {
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null;
  saveStatus: SaveStatus;
  actions: {
    trigger: (key: TriggerKey, payload?: TriggerPayload) => void;
    setSaveStatus: (status: SaveStatus) => void;
  };
}

export const useCourseStore = create<TriggerState>((set) => ({
  lastTriggered: null,
  saveStatus: 'idle',
  actions: {
    trigger: (key, payload) =>
      set((state) => ({
        lastTriggered: { key, payload },
      })),
    setSaveStatus: (status) => set({ saveStatus: status }),
  },
}));

export const useCourseActions = () => useCourseStore((state) => state.actions);
