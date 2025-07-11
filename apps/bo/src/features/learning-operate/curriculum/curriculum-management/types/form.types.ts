import { TreeNode } from '@learnway/ui';

export enum NODE_TYPE {
  CURRICULUM = 'curriculum',
  MODULE = 'module',
  LESSON = 'lesson',
}

export interface FormState {
  activeFormType: NODE_TYPE | null;
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