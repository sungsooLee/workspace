import { ExamQuestionGenType, TestPaperBasicInfoDetail, TestPaperBasicInfoSaveReq } from '@types';
import { Dispatch, SetStateAction } from 'react';

export enum PageMode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum ExamTab {
  PAPER = 'PAPER',
  QUESTION = 'QUESTION',
}

export interface TabFormRef {
  save: () => Promise<void> | void;
  getValues?: () => any;
  updateFormData?: (data?: Record<string, any>) => void;
  updateFormDataByKey?: (key: string, value: any) => void;
}

export interface ExamBasicInfoProps {
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
