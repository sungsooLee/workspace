import { create } from 'zustand';
import { CourseTab } from '../-common/type';

// 저장 상태 타입 정의
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

// 트리거 키 enum
export enum TriggerKey {
  SAVE = 'save',
  LIST = 'list',
  COPY = 'copy',
  TRANSLATE = 'translate',
  DELETE = 'delete',
  VALUES = 'values',
}

// 컨텐츠 뷰 타입 enum
export enum ContentViewType {
  LIST = 'list',
  DETAIL = 'detail',
}

// 트리거 페이로드 타입
interface TriggerPayload {
  [key: string]: any;
}

// 코스 생성 정보 타입
export interface CourseCreateInfo {
  courseId: number;
  courseType: string;
  activeTab: CourseTab;
}

// 코스 상태 타입
export interface CourseState {
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null; // 마지막 트리거 정보
  saveStatus: SaveStatus; // 저장 상태
  contentViewType: ContentViewType; // 현재 컨텐츠 뷰 타입
  courseCreateInfo: CourseCreateInfo; // 코스 생성 정보
}

// 코스 액션 타입
export interface CourseActions {
  trigger: (key: TriggerKey, payload?: TriggerPayload) => void; // 트리거 실행
  setSaveStatus: (status: SaveStatus) => void; // 저장 상태 변경
  setContentViewType: (type: ContentViewType) => void; // 뷰 타입 변경
  setCourseCreateInfo: (info: Partial<CourseCreateInfo>) => void; // 코스 생성 정보 변경
  reset: () => void; // 상태 초기화
}

// 코스 스토어 타입 (상태 + 액션)
export type CourseStore = CourseState & CourseActions;

// 초기 상태 상수
const INITIAL_COURSE_STATE: CourseState = {
  lastTriggered: null,
  saveStatus: 'idle',
  contentViewType: ContentViewType.LIST,
  courseCreateInfo: {
    courseId: 0,
    courseType: '',
    activeTab: CourseTab.STEP1,
  },
};

// zustand 스토어 생성
export const useCourseStore = create<CourseStore>((set) => ({
  ...INITIAL_COURSE_STATE,
  trigger: (key, payload) => set({ lastTriggered: { key, payload } }), // 트리거 실행 시 lastTriggered 갱신
  setSaveStatus: (status) => set({ saveStatus: status }), // 저장 상태 변경
  setContentViewType: (type) => set({ contentViewType: type }), // 뷰 타입 변경
  setCourseCreateInfo: (info) =>
    set((state) => ({
      courseCreateInfo: { ...state.courseCreateInfo, ...info }, // 코스 생성 정보 병합
    })),
  reset: () => set(INITIAL_COURSE_STATE), // 상태 초기화
}));

// 셀렉터 훅 (각 상태별로 반환)
export const useCourseLastTriggered = () => useCourseStore((state) => state.lastTriggered);
export const useCourseSaveStatus = () => useCourseStore((state) => state.saveStatus);
export const useCourseContentViewType = () => useCourseStore((state) => state.contentViewType);
export const useCourseCreateInfo = () => useCourseStore((state) => state.courseCreateInfo);

// 액션 훅 (액션만 반환)
export const useCourseActions = () => {
  const trigger = useCourseStore((state) => state.trigger);
  const setSaveStatus = useCourseStore((state) => state.setSaveStatus);
  const setContentViewType = useCourseStore((state) => state.setContentViewType);
  const setCourseCreateInfo = useCourseStore((state) => state.setCourseCreateInfo);
  const reset = useCourseStore((state) => state.reset);
  return { trigger, setSaveStatus, setContentViewType, setCourseCreateInfo, reset };
};
