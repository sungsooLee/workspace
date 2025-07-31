import { TreeNode } from '@learnway/ui/tree-view';
import { MAPPING_CURRICULUM_TYPE } from '@types';
// TODO: Fix unknown imports:  from '@learnway/ui'

export const NODE_CHILDREN_MAP = {
  [MAPPING_CURRICULUM_TYPE.CURRICULUM]: [
    MAPPING_CURRICULUM_TYPE.MODULE,
    MAPPING_CURRICULUM_TYPE.LESSON,
  ],
  [MAPPING_CURRICULUM_TYPE.MODULE]: [MAPPING_CURRICULUM_TYPE.LESSON],
  [MAPPING_CURRICULUM_TYPE.LESSON]: [], // 자식 노드 추가 불가
} as const;

export interface FormState {
  activeFormType: MAPPING_CURRICULUM_TYPE | null;
  selectedNode: TreeNode | null;
  parentNode: TreeNode | null;
  isEditing: boolean;
}

export interface CurriculumFormData {
  curriculumName: string;
  curriculumDescription: string;
  curriculumType: string;
  languageCountryCode: string;
  coordinatorName?: string;
  coordinatorTelNo?: string;
}

export interface ModuleFormData {
  moduleName: string;
  moduleDescription: string;
  moduleOrder: number;
}

export interface LessonFormData {
  lessonName: string;
  lessonDescription: string;
  lessonOrder: number;
  duration: number;
}

export type FormData = CurriculumFormData | ModuleFormData | LessonFormData;
