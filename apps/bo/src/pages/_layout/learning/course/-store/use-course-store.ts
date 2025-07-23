import { create } from 'zustand';
import { CourseTab } from '../-common/type';

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
  courseCreateInfo: {
    courseId: number;
    courseType: string;
    activeTab: CourseTab;
  };
  actions: {
    trigger: (key: TriggerKey, payload?: TriggerPayload) => void;
    setSaveStatus: (status: SaveStatus) => void;
    setContentViewType: (type: ContentViewType) => void;
    setCourseCreateInfo: (info: {
      courseId: number;
      courseType: string;
      activeTab: CourseTab;
    }) => void;
  };
}

export const useCourseStore = create<TriggerState>((set) => ({
  lastTriggered: null,
  saveStatus: 'idle',
  contentViewType: ContentViewType.DETAIL,
  courseCreateInfo: {
    courseId: 0,
    courseType: '',
    activeTab: CourseTab.STEP1,
  },
  actions: {
    trigger: (key, payload) =>
      set((state) => ({
        lastTriggered: { key, payload },
      })),
    setSaveStatus: (status) => set({ saveStatus: status }),
    setContentViewType: (type) => set({ contentViewType: type }),
    setCourseCreateInfo: (info) => set({ courseCreateInfo: info }),
  },
}));

export const useCourseActions = () => useCourseStore((state) => state.actions);
