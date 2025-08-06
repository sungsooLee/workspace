import {
  EnQuestionLevel,
  EnQuestionType,
  ExamQuestionGenType,
  QuestionCountInfo,
  TestPaperBasicInfoDetail,
  TestPaperBasicInfoSaveReq,
} from '@entities/learning-resource';
import { DynamicFormProvider, UseDynamicFormResult } from '@learnway/hooks';
import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

export enum PageMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum ExamTab {
  PAPER = 'PAPER',
  QUESTION = 'QUESTION',
}

export interface TabFormRef {
  save?: (data: Record<string, any>) => Promise<void> | void;
  complete?: () => Promise<void> | void;
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
  basicInfoForm: UseDynamicFormResult;
  saveBasicInfo?: (data: Record<string, any>) => Promise<void>;
  contentUuid?: string;
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

export type LevelKey = keyof Omit<QuestionCountInfo, 'questionType'>;
