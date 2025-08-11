import { UseDynamicFormResult } from '@learnway/hooks';
import { ContentBaseInfo, ContentInformation } from '@entities/learning-resource';

export enum AssignmentTab {
  BASIC_INFO = 'BASIC_INFO',
  SUBMISSION = 'SUBMISSION',
}

export interface AssignmentTabRef {
  save?: (data: Record<string, any>) => Promise<void> | void;
  complete?: () => Promise<void> | void;
}

export interface AssignmentBasicInfoFormData extends ContentBaseInfo {
  contentUseDate?: { from: Date | undefined; to: Date | undefined };
}

export interface AssignmentBasicInfoProps {
  basicInfoForm: UseDynamicFormResult;
  content?: Partial<ContentInformation>;
  hasMapping?: boolean;
}

export interface AssignmentSubmissionProps {
  content?: Partial<ContentInformation>;
  hasMapping?: boolean;
}
