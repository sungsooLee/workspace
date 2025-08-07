import { create } from 'zustand';
import { CoursePackageDetailTab } from '../types/type';

// 트리거 키 enum
export enum TriggerKey {
  SAVE = 'save',
  LIST = 'list',
  DELETE = 'delete',
}

// 트리거 페이로드 타입
interface TriggerPayload {
  [key: string]: any;
}

// 생성 정보 타입
export interface CoursePackageCreateInfo {
  courseId: number;
  courseType: string;
  activeTab: CoursePackageDetailTab;
  //   contentViewType: ContentViewType;
}

// 코스 상태 타입
export interface CoursePackageState {
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null; // 마지막 트리거 정보
  coursePackageCreateInfo: CoursePackageCreateInfo; // 코스 생성 정보
  checkDirtyForm: (() => boolean) | null; // 폼 더티 체크 함수
}

// 코스 액션 타입
export interface CoursePackageActions {
  trigger: (key: TriggerKey, payload?: TriggerPayload) => void; // 트리거 실행
  setCoursePackageCreateInfo: (info: Partial<CoursePackageCreateInfo>) => void; // 코스 생성 정보 변경
  setCheckDirtyForm: (fn: (() => boolean) | null) => void; // 폼 더티 체크 함수 설정
  reset: () => void; // 상태 초기화
}

// 코스 스토어 타입 (상태 + 액션)
export type CoursePackageStore = CoursePackageState & CoursePackageActions;

// 초기 상태 상수
const INITIAL_COURSE_PACKAGE_STATE: CoursePackageState = {
  lastTriggered: null,
  coursePackageCreateInfo: {
    courseId: 0,
    courseType: '',
    activeTab: CoursePackageDetailTab.BASIC_INFO,
  },
  checkDirtyForm: null,
};

// zustand 스토어 생성
export const useCoursePackageStore = create<CoursePackageStore>((set) => ({
  ...INITIAL_COURSE_PACKAGE_STATE,
  trigger: (key, payload) => set({ lastTriggered: { key, payload } }), // 트리거 실행 시 lastTriggered 갱신
  setCoursePackageCreateInfo: (info) =>
    set((state) => ({
      coursePackageCreateInfo: { ...state.coursePackageCreateInfo, ...info }, // 코스 생성 정보 병합
    })),
  setCheckDirtyForm: (fn) => set({ checkDirtyForm: fn }), // 폼 더티 체크 함수 설정
  reset: () => set(INITIAL_COURSE_PACKAGE_STATE), // 상태 초기화
}));

// 셀렉터 훅 (각 상태별로 반환)
export const useCoursePackageLastTriggered = () =>
  useCoursePackageStore((state) => state.lastTriggered);
export const useCoursePackageCreateInfo = () =>
  useCoursePackageStore((state) => state.coursePackageCreateInfo);
export const useCheckDirtyForm = () => useCoursePackageStore((state) => state.checkDirtyForm);

// 액션 훅 (액션만 반환)
export const useCoursePackageActions = () => {
  const trigger = useCoursePackageStore((state) => state.trigger);
  const setCoursePackageCreateInfo = useCoursePackageStore(
    (state) => state.setCoursePackageCreateInfo,
  );
  const setCheckDirtyForm = useCoursePackageStore((state) => state.setCheckDirtyForm);
  const reset = useCoursePackageStore((state) => state.reset);
  return { trigger, setCoursePackageCreateInfo, setCheckDirtyForm, reset };
};
