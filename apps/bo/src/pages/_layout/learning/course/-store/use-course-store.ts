import { create } from 'zustand';
import { CourseTab } from '../-common/type'; // 경로는 실제 프로젝트에 맞게 수정하세요.

// --- Types ---
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

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

/**
 * Trigger 액션 발생 시 전달되는 페이로드의 타입입니다.
 * 현재는 유연성을 위해 모든 키에 대해 'any' 타입을 허용합니다.
 * 특정 TriggerKey에 따라 페이로드의 구조가 정해져 있다면,
 * 예를 들어 `SAVE` 시에는 `{ data: MySaveData }`, `DELETE` 시에는 `{ id: string }` 등
 * 유니온 타입이나 오버로딩을 통해 더 구체적으로 정의할 수 있습니다.
 */
interface TriggerPayload {
  [key: string]: any;
}

interface CourseCreateInfo {
  courseId: number;
  courseType: string;
  activeTab: CourseTab;
}

// 스토어의 상태 타입
interface CourseState {
  lastTriggered: { key: TriggerKey; payload?: TriggerPayload } | null;
  saveStatus: SaveStatus;
  contentViewType: ContentViewType;
  courseCreateInfo: CourseCreateInfo;
}

// 스토어의 액션 타입
interface CourseActions {
  trigger: (key: TriggerKey, payload?: TriggerPayload) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setContentViewType: (type: ContentViewType) => void;
  setCourseCreateInfo: (info: CourseCreateInfo) => void;
  reset: () => void;
}

// 전체 스토어 타입 (상태 + 액션)
type CourseStore = CourseState & { actions: CourseActions };

// --- Initial State ---
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

// --- Store ---
export const useCourseStore = create<CourseStore>((set) => ({
  ...INITIAL_COURSE_STATE, // 초기 상태 적용
  actions: {
    trigger: (key, payload) =>
      set({
        lastTriggered: { key, payload },
      }),
    setSaveStatus: (status) => set({ saveStatus: status }),
    setContentViewType: (type) => set({ contentViewType: type }),
    setCourseCreateInfo: (info) => set({ courseCreateInfo: info }),
    reset: () => set(INITIAL_COURSE_STATE), // 초기 상태로 리셋
  },
}));

// --- Custom Hooks for Consumers ---

/**
 * 코스 관련 상태를 선택적으로 조회하는 훅 컬렉션입니다.
 * 필요한 상태만 구독하여 불필요한 컴포넌트 리렌더링을 방지할 수 있습니다.
 * @example
 * const saveStatus = useCourseSelectors.useSaveStatus();
 * const { courseId, activeTab } = useCourseSelectors.useCourseCreateInfo();
 */
export const useCourseSelectors = {
  useLastTriggered: () => useCourseStore((state) => state.lastTriggered),
  useSaveStatus: () => useCourseStore((state) => state.saveStatus),
  useContentViewType: () => useCourseStore((state) => state.contentViewType),
  useCourseCreateInfo: () => useCourseStore((state) => state.courseCreateInfo),
};

/**
 * 코스 관련 액션을 호출하는 훅입니다.
 * 컴포넌트에서 상태 변경 로직을 트리거할 때 사용합니다.
 * @example
 * const { trigger, setSaveStatus } = useCourseActions();
 * setSaveStatus('saving');
 */
export const useCourseActions = () => useCourseStore((state) => state.actions);
