import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import {
  EnQuestionLevel,
  EnQuestionType,
  ExamQuestionGenType,
  RandomQuestionCountInfo,
  TestPaperBasicInfoDetail,
  TestPaperBasicInfoSaveReq,
} from '@types';
import { DynamicFormProvider } from '@learnway/hooks';

export enum PageMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum ExamTab {
  PAPER = 'PAPER',
  QUESTION = 'QUESTION',
}

export interface TabFormRef {
  save?: () => Promise<void> | void;
  update?: () => Promise<void> | void;
  getValues?: () => any;
  updateFormData?: (data?: Record<string, any>) => void;
  updateFormDataByKey?: (key: string, value: any) => void;
}

type ExamBasicInfoForm = {
  provider: DynamicFormProvider;
  getValues: UseFormGetValues<FieldValues>;
  updateFormData?: (data?: Record<string, any>) => void;
  updateFormDataByKey?: (key: string, value: any) => void;
  onFormChange?: (values?: Record<string, any>) => void;
  onSubmit?: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  saveBasicInfo?: (data: any, isOnGenTypeChange?: boolean) => Promise<void>;
};

export interface ExamBasicInfoProps {
  basicInfoForm: ExamBasicInfoForm;
  contentUuid?: string;
  tenantId: number;
  mode: PageMode;
  data?: Partial<TestPaperBasicInfoDetail>;
  hasMapping?: boolean;
}

export interface ExamQuestionInfoProps extends ExamBasicInfoProps {
  questionGenType: ExamQuestionGenType;
  setQuestionGenType: Dispatch<SetStateAction<ExamQuestionGenType>>;
}

export interface TestPaperBasicInfoFormData extends TestPaperBasicInfoSaveReq {
  contentUseDate?: { from: Date | undefined; to: Date | undefined };
}

export type QuestionStatisticRow = {
  title: string;
  hard: number;
  medium: number;
  easy: number;
  type: EnQuestionType;
};

export type SelectedQuestionState = Record<
  EnQuestionType,
  Partial<Record<EnQuestionLevel, number>>
>;

export type LevelKey = keyof Omit<RandomQuestionCountInfo, 'questionType'>;
