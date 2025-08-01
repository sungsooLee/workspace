import { ContentBaseInfo } from '@types';

export interface QuestionBankTabFormRef {
  save?: (data?: Record<string, any>) => Promise<void> | void;
  complete?: () => Promise<void> | void;
}

export interface QuestionBankFormData extends ContentBaseInfo {
  contentUseDate?: { from: Date | undefined; to: Date | undefined };
}

export type QuestionMutationResponse = { result: boolean };
