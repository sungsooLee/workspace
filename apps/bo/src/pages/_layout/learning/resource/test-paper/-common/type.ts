import { ExamQuestionGenType, TestPaperBasicInfoSaveReq, TestPaperDetailRes } from '@types';

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
}

export interface ExamBasicInfoProps {
  tenantId: number;
  mode: PageMode;
  data?: Partial<TestPaperDetailRes>;
  hasMapping?: boolean;
}

export interface ExamQuestionInfoProps extends ExamBasicInfoProps {
  questionGenType: ExamQuestionGenType;
}

export interface TestPaperBasicInfoFormData extends TestPaperBasicInfoSaveReq {
  contentUseDate?: { from: Date | undefined; to: Date | undefined };
}
