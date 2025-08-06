import { ContentBaseInfo } from '@entities/learning-resource';

export enum QuestionTab {
  QUESTION_BASE = 'QUESTION_BASE',
  QUESTION_ITEM = 'QUESTION_ITEM',
}

export interface QuestionBankTabFormRef {
  save?: (data?: Record<string, any>) => Promise<void> | void;
  complete?: () => Promise<void> | void;
}

export interface QuestionBankFormData extends ContentBaseInfo {
  contentUseDate?: { from: Date | undefined; to: Date | undefined };
}
