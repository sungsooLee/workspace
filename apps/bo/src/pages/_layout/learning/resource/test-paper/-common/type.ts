import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { ExamQuestionGenType, TestPaperBasicInfoDetail, TestPaperBasicInfoSaveReq } from '@types';
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
  onSubmit?: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  saveBasicInfo?: (data: any) => Promise<void>;
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
