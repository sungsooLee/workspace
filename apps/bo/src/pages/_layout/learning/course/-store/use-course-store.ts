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
  triggers: Record<TriggerKey, number>;
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null;
  saveStatus: SaveStatus;
  actions: {
    trigger: (key: TriggerKey, payload?: TriggerPayload) => void;
    setSaveStatus: (status: SaveStatus) => void;
  };
}

export const useCourseStore = create<TriggerState>((set) => ({
  triggers: { save: 0, list: 0, delete: 0 },
  lastTriggered: null,
  saveStatus: 'idle',
  actions: {
    trigger: (key, payload) =>
      set((state) => ({
        triggers: { ...state.triggers, [key]: state.triggers[key] + 1 },
        lastTriggered: { key, payload },
      })),
    setSaveStatus: (status) => set({ saveStatus: status }),
  },
}));

export const useCourseActions = () => useCourseStore((state) => state.actions);
