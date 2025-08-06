import { Tag } from '@entities/learning-resource';
import { QuestionBankFormData } from '@features/learning-resource/learning-resource-management/service/question-bank/type';
import { ContentAddInfoType } from '@shared/types/enums';

export const getQuestionBankRequestData = (options: {
  data: QuestionBankFormData;
  contentUuid?: string;
}) => {
  const payload = {
    ...options.data,
    contentUseStartDate: options.data.contentUseDate?.from,
    contentUseEndDate: options.data.contentUseDate?.to,
    contentAddInfoType: ContentAddInfoType.EXAM_ADD_INFO,
    contentAddInfo: 0,
    tags: options.data.tags.map((tag: Tag | string) => ({
      tagName: typeof tag === 'string' ? tag : tag.tagName,
    })),
  };

  if (options.contentUuid) {
    Object.assign(payload, {
      contentUuid: options.contentUuid,
    });
  }

  if (payload?.contentUseDate) {
    delete payload.contentUseDate;
  }

  return payload;
};
